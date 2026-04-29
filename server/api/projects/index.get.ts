import type { Prisma } from '@prisma/client'
import { prisma } from '../../utils/prisma'

function parsePositiveInt(value: string | undefined, fallback: number) {
  if (value === undefined || value === '') return fallback
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) && n >= 0 ? n : fallback
}

export default defineEventHandler(async (event) => {
  const q = getQuery(event)

  const limit = Math.min(parsePositiveInt(q.limit as string, 20), 100)
  const skip = parsePositiveInt(q.skip as string, 0)

  const city = typeof q.city === 'string' ? q.city.trim() : ''
  const search = typeof q.q === 'string' ? q.q.trim() : ''
  const developerId = typeof q.developerId === 'string' ? q.developerId.trim() : ''
  const minPrice = typeof q.minPrice === 'string' ? Number.parseFloat(q.minPrice) : NaN
  const maxPrice = typeof q.maxPrice === 'string' ? Number.parseFloat(q.maxPrice) : NaN
  const status =
    typeof q.status === 'string' && ['AVAILABLE', 'SOLD_OUT', 'COMING_SOON'].includes(q.status)
      ? (q.status as 'AVAILABLE' | 'SOLD_OUT' | 'COMING_SOON')
      : undefined

  const where: Prisma.ProjectWhereInput = {}

  if (city) {
    where.location = { contains: city, mode: 'insensitive' }
  }

  if (developerId) {
    where.developerId = developerId
  }

  if (status) {
    where.status = status
  }

  const priceFilter: Prisma.FloatFilter = {}
  if (Number.isFinite(minPrice)) priceFilter.gte = minPrice
  if (Number.isFinite(maxPrice)) priceFilter.lte = maxPrice
  if (Object.keys(priceFilter).length > 0) {
    where.startPrice = priceFilter
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { location: { contains: search, mode: 'insensitive' } },
      {
        developer: {
          name: { contains: search, mode: 'insensitive' }
        }
      }
    ]
  }

  const select = {
    id: true,
    name: true,
    location: true,
    description: true,
    startPrice: true,
    promo: true,
    image: true,
    status: true,
    createdAt: true,
    developer: {
      select: { id: true, name: true, logo: true }
    },
    _count: { select: { gallery: true } }
  } satisfies Prisma.ProjectSelect

  const [total, rawProjects] = await prisma.$transaction([
    prisma.project.count({ where }),
    prisma.project.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select
    })
  ])

  const projects = rawProjects.map(({ _count, ...p }) => ({
    ...p,
    galleryCount: _count.gallery
  }))

  return {
    projects,
    pagination: { total, limit, skip }
  }
})

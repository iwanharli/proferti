import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  const developers = await prisma.developer.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true, logo: true },
    take: 200
  })
  return { developers }
})

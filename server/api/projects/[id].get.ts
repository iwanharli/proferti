import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, message: 'ID proyek diperlukan' })
  }

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      developer: {
        select: {
          id: true,
          name: true,
          logo: true,
          description: true,
          website: true
        }
      },
      gallery: { orderBy: { id: 'asc' }, take: 20 }
    }
  })

  if (!project) {
    throw createError({ statusCode: 404, message: 'Proyek tidak ditemukan' })
  }

  return { project }
})

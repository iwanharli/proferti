// POST /api/projects/[id]/gallery — auth-validated add image
import { getServerSession } from '#auth'

const BE_URL = process.env.BE_URL || 'http://localhost:8080'

export default defineEventHandler(async (event): Promise<any> => {
  const session = await getServerSession(event)
  if (!(session?.user as any)?.id) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  return $fetch(`${BE_URL}/api/projects/${id}/gallery`, { method: 'POST', body })
})

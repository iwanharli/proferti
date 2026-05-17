// PUT /api/projects/[id] — auth-validated update, Go BE resolves userId → developerId
import { getServerSession } from '#auth'

const BE_URL = process.env.BE_URL || 'http://localhost:8080'

export default defineEventHandler(async (event): Promise<any> => {
  const session = await getServerSession(event)
  const userId = (session?.user as any)?.id
  if (!userId) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  return $fetch(`${BE_URL}/api/projects/${id}`, {
    method: 'PUT',
    body: { ...body, userId }
  })
})

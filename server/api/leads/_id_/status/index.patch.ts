// PATCH /api/leads/[id]/status — auth-validated, Go BE resolves userId → developerId
import { getServerSession } from '#auth'

const BE_URL = process.env.BE_URL || 'http://localhost:8080'

export default defineEventHandler(async (event): Promise<any> => {
  const session = await getServerSession(event)
  const userId = (session?.user as any)?.id
  if (!userId) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const id = getRouterParam(event, 'id')
  const { status } = await readBody(event)
  return $fetch(`${BE_URL}/api/leads/${id}/status`, {
    method: 'PATCH',
    body: { userId, status }
  })
})

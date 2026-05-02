// DELETE /api/projects/[id] — auth-validated delete
import { getServerSession } from '#auth'

const BE_URL = process.env.BE_URL || 'http://localhost:8080'

export default defineEventHandler(async (event): Promise<any> => {
  const session = await getServerSession(event)
  const userId = (session?.user as any)?.id
  if (!userId) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const devRes = await $fetch<{ developer: { id: string } }>(
    `${BE_URL}/api/developers/me?userId=${userId}`
  ).catch(() => null)
  if (!devRes?.developer) throw createError({ statusCode: 403, message: 'Bukan developer terdaftar' })

  const id = getRouterParam(event, 'id')
  return $fetch(`${BE_URL}/api/projects/${id}?developerId=${devRes.developer.id}`, {
    method: 'DELETE'
  })
})

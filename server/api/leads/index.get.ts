// GET /api/leads — auth-validated, returns developer's leads
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

  const { limit, skip } = getQuery(event) as { limit?: string; skip?: string }
  return $fetch(`${BE_URL}/api/leads`, {
    query: { developerId: devRes.developer.id, limit, skip }
  })
})

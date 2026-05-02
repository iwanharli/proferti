// DELETE /api/gallery/[id] — auth-validated remove image
import { getServerSession } from '#auth'

const BE_URL = process.env.BE_URL || 'http://localhost:8080'

export default defineEventHandler(async (event): Promise<any> => {
  const session = await getServerSession(event)
  if (!(session?.user as any)?.id) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const id = getRouterParam(event, 'id')
  const { projectId } = getQuery(event) as { projectId: string }
  return $fetch(`${BE_URL}/api/gallery/${id}?projectId=${projectId}`, { 
    method: 'DELETE' as any 
  })
})

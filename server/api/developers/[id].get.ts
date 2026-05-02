// GET /api/developers/[id] — proxy to Go BE
const BE_URL = process.env.BE_URL || 'http://localhost:8080'

export default defineEventHandler(async (event): Promise<any> => {
  const id = getRouterParam(event, 'id')
  return $fetch(`${BE_URL}/api/developers/${id}`)
})

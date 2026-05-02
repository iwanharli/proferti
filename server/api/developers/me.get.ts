// GET /api/developers/me — passthrough
const BE_URL = process.env.BE_URL || 'http://localhost:8080'
export default defineEventHandler(async (event): Promise<any> => {
  const { userId } = getQuery(event) as { userId: string }
  return $fetch(`${BE_URL}/api/developers/me?userId=${userId}`)
})

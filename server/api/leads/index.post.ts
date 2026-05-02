// POST /api/leads — public, no auth required
const BE_URL = process.env.BE_URL || 'http://localhost:8080'
export default defineEventHandler(async (event): Promise<any> => {
  const body = await readBody(event)
  return $fetch(`${BE_URL}/api/leads`, { method: 'POST', body })
})

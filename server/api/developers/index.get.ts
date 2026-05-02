// GET /api/developers — passthrough
const BE_URL = process.env.BE_URL || 'http://localhost:8080'
export default defineEventHandler(async (): Promise<any> => {
  return $fetch(`${BE_URL}/api/developers`)
})

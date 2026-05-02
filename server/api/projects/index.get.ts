// GET /api/projects — passthrough to Go BE
const BE_URL = process.env.BE_URL || 'http://localhost:8080'
export default defineEventHandler(async (event): Promise<any> => {
  const query = getQuery(event)
  try {
    return await $fetch(`${BE_URL}/api/projects`, { query })
  } catch (e) {
    console.error('BE Fetch Error:', e)
    return { projects: [] }
  }
})

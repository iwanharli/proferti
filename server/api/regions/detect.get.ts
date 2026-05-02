const BE_URL = process.env.BE_URL || 'http://127.0.0.1:8080'
export default defineEventHandler(async (event): Promise<any> => {
  const query = getQuery(event)
  try {
    return await $fetch(`${BE_URL}/api/regions/detect`, { query })
  } catch (e) {
    console.error('BE Detect Region Fetch Error:', e)
    throw createError({ statusCode: 404, message: 'Region not found' })
  }
})

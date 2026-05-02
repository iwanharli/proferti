const BE_URL = process.env.BE_URL || 'http://127.0.0.1:8080'
export default defineEventHandler(async (event): Promise<any> => {
  try {
    return await $fetch(`${BE_URL}/api/projects/meta`)
  } catch (e) {
    console.error('BE Projects Meta Fetch Error:', e)
    return { types: [], minPrice: 0, maxPrice: 0 }
  }
})

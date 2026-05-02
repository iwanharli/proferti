const BE_URL = process.env.BE_URL || 'http://127.0.0.1:8080'
export default defineEventHandler(async (event): Promise<any> => {
  try {
    return await $fetch(`${BE_URL}/api/locations`)
  } catch (e) {
    console.error('BE Locations Fetch Error:', e)
    return { locations: [] }
  }
})

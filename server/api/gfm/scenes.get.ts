const BE_URL = process.env.BE_URL || 'http://127.0.0.1:8080'

export default defineEventHandler(async (event): Promise<any> => {
  try {
    return await $fetch(`${BE_URL}/api/gfm/scenes`, {
      query: getQuery(event)
    })
  } catch (e: any) {
    console.error('BE GFM Scenes Fetch Error:', e)
    return { scenes: [] }
  }
})

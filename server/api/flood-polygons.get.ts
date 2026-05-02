// GET /api/flood-polygons — passthrough to Go BE
const BE_URL = process.env.BE_URL || 'http://localhost:8080'
export default defineEventHandler(async (event): Promise<any> => {
  try {
    return await $fetch(`${BE_URL}/api/flood-polygons`)
  } catch (e) {
    console.error('BE Fetch Error (Flood Polygons):', e)
    return { type: 'FeatureCollection', features: [] }
  }
})

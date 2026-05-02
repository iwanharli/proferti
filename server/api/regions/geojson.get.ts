const BE_URL = process.env.BE_URL || 'http://127.0.0.1:8080'
export default defineEventHandler(async (event): Promise<any> => {
  try {
    const query = getQuery(event)
    return await $fetch(`${BE_URL}/api/regions/geojson`, { query })
  } catch (e) {
    console.error('BE GeoJSON Fetch Error:', e)
    return { type: 'FeatureCollection', features: [] }
  }
})

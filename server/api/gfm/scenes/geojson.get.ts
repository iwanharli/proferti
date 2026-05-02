const BE_URL = process.env.BE_URL || 'http://127.0.0.1:8080'

export default defineEventHandler(async (event): Promise<any> => {
  try {
    return await $fetch(`${BE_URL}/api/gfm/scenes/geojson`)
  } catch (e: any) {
    console.error('BE GFM GeoJSON Fetch Error:', e)
    return { type: 'FeatureCollection', features: [] }
  }
})

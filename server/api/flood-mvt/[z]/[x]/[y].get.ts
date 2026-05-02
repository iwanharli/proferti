export default defineEventHandler(async (event) => {
  const z = getRouterParam(event, 'z')
  const x = getRouterParam(event, 'x')
  let y = getRouterParam(event, 'y') || ''
  
  // Bersihkan .pbf jika ada (agar tidak double)
  y = y.replace('.pbf', '')
  
  const query = getQuery(event)
  
  // Forward to Go Backend
  const backendUrl = `http://localhost:8080/api/flood-mvt/${z}/${x}/${y}.pbf?start=${query.start || ''}&end=${query.end || ''}`
  
  return proxyRequest(event, backendUrl)
})

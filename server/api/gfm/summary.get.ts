export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Teruskan request ke Backend Go (Port 8080)
  const backendUrl = `http://localhost:8080/api/gfm/summary?lat=${query.lat}&lng=${query.lng}`
  
  // Gunakan proxyRequest untuk menghindari error "Excessive stack depth"
  // dan performa yang lebih baik (streaming).
  return proxyRequest(event, backendUrl)
})

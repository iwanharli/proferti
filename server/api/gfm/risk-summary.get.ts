export default defineEventHandler(async (event) => {
  // Teruskan request ke Backend Go (Port 8080)
  const backendUrl = `http://localhost:8080/api/gfm/risk-summary`
  
  // Gunakan proxyRequest
  return proxyRequest(event, backendUrl)
})

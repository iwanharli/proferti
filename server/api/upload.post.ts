// POST /api/upload — proxy to Go BE
const BE_URL = process.env.BE_URL || 'http://localhost:8080'

export default defineEventHandler(async (event): Promise<any> => {
  // We use readMultipartFormData to handle the file correctly
  const formData = await readMultipartFormData(event)
  if (!formData) throw createError({ statusCode: 400, message: 'No data' })

  // Construct a new FormData for $fetch
  const body = new FormData()
  for (const part of formData) {
    if (part.name === 'file' && part.data) {
      const blob = new Blob([new Uint8Array(part.data)], { type: part.type })
      body.append('file', blob, part.filename)
    } else if (part.name && part.data) {
      body.append(part.name, part.data.toString())
    }
  }

  return $fetch(`${BE_URL}/api/upload`, {
    method: 'POST' as any,
    body
  })
})

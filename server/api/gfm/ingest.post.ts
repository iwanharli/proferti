const BE_URL = process.env.BE_URL || 'http://127.0.0.1:8080'

export default defineEventHandler(async (event): Promise<any> => {
  try {
    return await $fetch(`${BE_URL}/api/gfm/ingest`, {
      method: 'POST',
      body: await readBody(event).catch(() => ({}))
    })
  } catch (e: any) {
    console.error('BE GFM Ingest Fetch Error:', e)
    throw createError({
      statusCode: e.response?.status || 500,
      statusMessage: e.message || 'Ingest Failed',
    })
  }
})

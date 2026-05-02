import { getServerSession } from '#auth'

const BE_URL = process.env.BE_URL || 'http://localhost:8080'

export default defineEventHandler(async (event): Promise<any> => {
  const session = await getServerSession(event)
  const user    = session?.user as any

  if (!user?.id) {
    throw createError({
      statusCode: 401,
      message: 'Masuk terlebih dahulu.'
    })
  }

  const userId         = user.id as string
  const nameFromSession = user.name as string | undefined

  const body = await readBody(event).catch(() => ({}))

  const name =
    typeof body?.name === 'string' && body.name.trim().length > 0
      ? body.name.trim()
      : nameFromSession || (user.email as string)?.split('@')[0] || 'Developer'

  const description =
    typeof body?.description === 'string' ? body.description.trim().slice(0, 5000) || undefined : undefined
  const website =
    typeof body?.website === 'string' ? body.website.trim().slice(0, 512) || undefined : undefined

  // Delegate to Go BE — all DB operations happen there
  const res = await $fetch<{ ok: boolean; message: string }>(
    `${BE_URL}/api/developers/register`,
    {
      method: 'POST',
      body: { userId, name, description, website }
    }
  ).catch((err: any) => {
    const status  = err?.response?.status ?? err?.statusCode ?? 500
    const message = err?.data?.error ?? err?.message ?? 'Terjadi kesalahan sistem.'

    throw createError({ statusCode: status, message })
  })

  return res
})

import { getServerSession } from '#auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const email = session?.user?.email
  const nameFromSession = session?.user?.name

  if (!email || !session?.user?.id) {
    throw createError({
      statusCode: 401,
      message: 'Masuk dengan GitHub terlebih dahulu.'
    })
  }

  const userId = session.user.id

  const body = await readBody(event).catch(() => ({}))

  const name =
    typeof body?.name === 'string' && body.name.trim().length > 0
      ? body.name.trim()
      : nameFromSession || email.split('@')[0] || 'Developer'

  const existing = await prisma.developer.findUnique({ where: { userId } })
  if (existing) {
    throw createError({ statusCode: 409, message: 'Akun ini sudah terdaftar sebagai developer.' })
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { role: 'DEVELOPER' }
    })
    await tx.developer.create({
      data: {
        userId,
        name,
        description:
          typeof body?.description === 'string' ? body.description.trim().slice(0, 5000) : null,
        website: typeof body?.website === 'string' ? body.website.trim().slice(0, 512) || null : null
      }
    })
  })

  return { ok: true, message: 'Profil developer berhasil dibuat.' }
})

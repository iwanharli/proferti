import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { AdapterUser } from '@auth/core/adapters'
import { prisma } from '../../utils/prisma'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'my-auth-secret-123',
  adapter: PrismaAdapter(prisma) as any,

  providers: [
    // @ts-expect-error Use Github provider
    (GithubProvider.default || GithubProvider)({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    })
  ],

  callbacks: {
    async session({ session, user }) {
      const u = user as AdapterUser
      const s = session as any
      if (s.user && u?.id) {
        s.user.id = u.id
        const db = await prisma.user.findUnique({
          where: { id: u.id },
          select: { role: true }
        })
        s.user.role = db?.role ?? 'USER'
      }
      return s
    }
  }

})

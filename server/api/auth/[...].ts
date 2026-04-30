import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../../utils/prisma'
import bcrypt from 'bcryptjs'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'my-auth-secret-123',
  adapter: PrismaAdapter(prisma) as any,

  providers: [
    // @ts-expect-error Use Github provider
    (GithubProvider.default || GithubProvider)({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    }),
    // @ts-expect-error Use Credentials provider
    (CredentialsProvider.default || CredentialsProvider)({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.password) return null
        const isMatch = await bcrypt.compare(credentials.password, user.password)
        if (isMatch) {
          return { id: user.id, email: user.email, name: user.name, role: user.role }
        }
        return null
      }
    })
  ],
  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // user.role is available if from CredentialsProvider, otherwise fetch from DB
        let role = (user as any).role
        if (!role) {
          const db = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } })
          role = db?.role ?? 'developer'
        }
        token.role = role
      }
      return token
    },
    async session({ session, token }) {
      const s = session as any
      if (s.user && token) {
        s.user.id = token.id
        s.user.role = token.role
      }
      return s
    }
  }

})

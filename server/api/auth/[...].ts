import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

const BE_URL = process.env.BE_URL || 'http://localhost:8080'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'my-auth-secret-123',

  // No Prisma adapter — JWT strategy only.
  // All DB operations go through proferti-be (Go).

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
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const res = await $fetch<{ user: { id: string; email: string; name: string; role: string } }>(
            `${BE_URL}/api/auth/login`,
            {
              method: 'POST',
              body: { email: credentials.email, password: credentials.password }
            }
          )
          return res.user ?? null
        } catch {
          return null
        }
      }
    })
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // ── First sign-in via Credentials ─────────────────────
      // `user` is what authorize() returned → { id, email, name, role }
      if (user && !account?.provider) {
        token.id   = (user as any).id
        token.role = (user as any).role
        return token
      }

      // ── First sign-in via OAuth (GitHub) ──────────────────
      if (account && profile) {
        const email = (profile as any).email as string | undefined
        const name  = (profile as any).name || (profile as any).login || email || 'user'
        const image = (profile as any).avatar_url as string | undefined

        if (email) {
          try {
            const res = await $fetch<{ user: { id: string; email: string; name: string; role: string } }>(
              `${BE_URL}/api/auth/oauth-sync`,
              {
                method: 'POST',
                body: { email, name, image: image ?? null }
              }
            )
            token.id   = res.user.id
            token.role = res.user.role
            token.email = res.user.email
            token.name  = res.user.name
          } catch (e) {
            console.error('[auth] oauth-sync failed:', e)
          }
        }
      }

      // ── Subsequent requests: token already populated ───────
      return token
    },

    async session({ session, token }) {
      const s = session as any
      if (s.user && token) {
        s.user.id   = token.id
        s.user.role = token.role
      }
      return s
    }
  }
})

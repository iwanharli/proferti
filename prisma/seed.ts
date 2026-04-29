import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'bsd-dev@proferti.seed' },
    create: {
      email: 'bsd-dev@proferti.seed',
      name: 'BSD Land',
      emailVerified: new Date(),
      role: 'DEVELOPER'
    },
    update: { role: 'DEVELOPER' }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'bandung-dev@proferti.seed' },
    create: {
      email: 'bandung-dev@proferti.seed',
      name: 'Dago Hills',
      emailVerified: new Date(),
      role: 'DEVELOPER'
    },
    update: { role: 'DEVELOPER' }
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'jakarta-dev@proferti.seed' },
    create: {
      email: 'jakarta-dev@proferti.seed',
      name: 'Cibubur Prime',
      emailVerified: new Date(),
      role: 'DEVELOPER'
    },
    update: { role: 'DEVELOPER' }
  })

  const dev1 = await prisma.developer.upsert({
    where: { userId: user1.id },
    create: {
      userId: user1.id,
      name: 'BSD Land',
      description: 'Developer contoh — BSD City',
      website: 'https://example.com'
    },
    update: {}
  })

  const dev2 = await prisma.developer.upsert({
    where: { userId: user2.id },
    create: {
      userId: user2.id,
      name: 'Dago Hills',
      description: 'Developer contoh — Bandung',
      website: 'https://example.com'
    },
    update: {}
  })

  const dev3 = await prisma.developer.upsert({
    where: { userId: user3.id },
    create: {
      userId: user3.id,
      name: 'Cibubur Prime',
      description: 'Developer contoh — Jakarta',
      website: 'https://example.com'
    },
    update: {}
  })

  const projects = [
    {
      developerId: dev1.id,
      name: 'The Grand Residence',
      location: 'BSD City, Tangerang',
      description: 'Cluster premium dekat tol dan mall.',
      startPrice: 1_200_000_000,
      promo: 'Free BPHTB',
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600',
      status: 'AVAILABLE' as const
    },
    {
      developerId: dev2.id,
      name: 'Serene Hills Cluster',
      location: 'Dago, Bandung',
      description: 'Udara sejuk dengan view pegunungan.',
      startPrice: 850_000_000,
      promo: 'Cicilan 5 Jt-an',
      image:
        'https://images.unsplash.com/photo-1600607687940-c52af04657b3?auto=format&fit=crop&w=600',
      status: 'AVAILABLE' as const
    },
    {
      developerId: dev3.id,
      name: 'Modern Oasis',
      location: 'Cibubur, Jakarta',
      description: 'Akses langsung ke corridor ekonomi timur.',
      startPrice: 1_500_000_000,
      promo: 'Full Furnished',
      image:
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600',
      status: 'AVAILABLE' as const
    }
  ]

  for (const p of projects) {
    const existing = await prisma.project.findFirst({
      where: { name: p.name, developerId: p.developerId }
    })
    if (existing) {
      await prisma.project.update({
        where: { id: existing.id },
        data: {
          location: p.location,
          description: p.description,
          startPrice: p.startPrice,
          promo: p.promo,
          image: p.image,
          status: p.status
        }
      })
    } else {
      await prisma.project.create({ data: p })
    }
  }

  console.log('Seed selesai: 3 developer, 3 proyek.')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })

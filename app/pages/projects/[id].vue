<template>
  <div class="detail">
    <nav class="subnav">
      <div class="container nav-row">
        <NuxtLink to="/projects" class="back">&larr; Daftar proyek</NuxtLink>
        <NuxtLink to="/" class="muted-link">Beranda</NuxtLink>
      </div>
    </nav>

    <article v-if="pending" class="container state">Memuat…</article>
    <article v-else-if="fetchError || !proj" class="container state">
      {{ fetchError ? 'Terjadi kesalahan saat memuat proyek.' : 'Proyek tidak ditemukan.' }}
    </article>

    <template v-else>
      <header class="hero-detail">
        <div class="container hero-grid">
          <div class="hero-main">
            <p class="eyebrow">{{ proj.developer.name }}</p>
            <h1>{{ proj.name }}</h1>
            <p class="location">
              <LucideMapPin size="18" /> {{ proj.location }}
            </p>
            <div class="price">Mulai {{ formatPropertyPrice(proj.startPrice) }}</div>
            <p v-if="proj.promo" class="promo-chip">{{ proj.promo }}</p>
          </div>
          <div class="hero-cover">
            <NuxtImg
              :src="proj.image || DEFAULT_IMG"
              :alt="proj.name"
              width="900"
              height="560"
            />
          </div>
        </div>
      </header>

      <section class="container body">
        <div class="main-col">
          <div class="lead" v-html="formattedDescription" />
          <div v-if="proj.gallery?.length" class="gallery">
            <h2>Galeri</h2>
            <div class="gallery-grid">
              <NuxtImg
                v-for="g in proj.gallery"
                :key="g.id"
                :src="g.url"
                alt=""
                width="320"
                height="200"
                class="gallery-img"
              />
            </div>
          </div>
        </div>
        <aside v-if="proj.developer" class="aside">
          <h3>Developer</h3>
          <p><strong>{{ proj.developer.name }}</strong></p>
          <p v-if="proj.developer.description">{{ proj.developer.description }}</p>
          <a v-if="proj.developer.website" :href="proj.developer.website" target="_blank" rel="noopener" class="ext">
            Kunjungi website
          </a>
        </aside>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { LucideMapPin } from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

const DEFAULT_IMG =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900'

const route = useRoute()
const id = computed(() => route.params.id as string)

type ProjectPayload = {
  project: {
    id: string
    name: string
    location: string
    description: string | null
    startPrice: number
    promo: string | null
    image: string | null
    status: string
    developer: {
      id: string
      name: string
      logo: string | null
      description: string | null
      website: string | null
    }
    gallery: { id: string; url: string }[]
  }
}

const { data, pending, error: fetchError } = await useFetch<ProjectPayload>(
  () => `/api/projects/${id.value}`,
  { watch: [id] }
)

const proj = computed(() => data.value?.project)

const formattedDescription = computed(() => {
  const d = proj.value?.description
  if (!d) return `<p>Hunian bermutu dari developer partner Proferti. Hubungi kami untuk janji tayang lokasi dan simulasi KPR.</p>`
  const escaped = d
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped.split(/\n+/).filter(Boolean).map((line) => `<p>${line}</p>`).join('')
})

watchEffect(() => {
  const p = proj.value
  if (!p) return
  useSeoMeta({
    title: `${p.name} — Proferti`,
    description: `${p.name} · ${p.location}. ${p.promo ?? 'Proyek pilihan di Proferti.'}`
  })
})
</script>

<style scoped>
.detail {
  min-height: 100vh;
}

.subnav {
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
}

.nav-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back {
  font-weight: 600;
  color: var(--accent);
}

.muted-link {
  color: var(--text-muted);
  font-size: 15px;
}

.state {
  padding: 120px 0;
  font-size: 18px;
  color: var(--text-muted);
}

.hero-detail {
  padding: 48px 0 64px;
  background: radial-gradient(circle at 90% 0%, var(--accent-soft), transparent 45%);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.eyebrow {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  margin-bottom: 12px;
}

h1 {
  margin-bottom: 16px;
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  margin-bottom: 24px;
  font-size: 18px;
}

.price {
  font-size: 28px;
  font-weight: 800;
  color: var(--accent);
}

.promo-chip {
  display: inline-block;
  margin-top: 20px;
  background: var(--primary);
  color: white;
  padding: 8px 20px;
  border-radius: 100px;
  font-weight: 600;
}

.hero-cover img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.12);
}

.body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
  align-items: start;
  padding-bottom: 96px;
}

.main-col {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.lead :deep(p) {
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 1.65;
}

.gallery h2 {
  margin-bottom: 20px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.gallery-img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  height: 140px;
}

.aside {
  background: white;
  border: 1px solid var(--border);
  padding: 24px;
  border-radius: var(--radius);
  position: sticky;
  top: 96px;
}

.aside h3 {
  margin-bottom: 12px;
}

.aside p {
  margin-bottom: 12px;
  font-size: 15px;
  color: var(--text-muted);
}

.ext {
  font-weight: 600;
  color: var(--accent);
}

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .body {
    grid-template-columns: 1fr;
  }

  .aside {
    position: static;
  }
}
</style>

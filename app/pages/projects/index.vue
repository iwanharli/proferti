<template>
  <div class="projects-page">
    <nav class="subnav">
      <div class="container subnav-inner">
        <NuxtLink to="/" class="brand-link">&larr; Proferti</NuxtLink>
        <span class="subnav-title">Cari Proyek</span>
      </div>
    </nav>

    <section class="filters-section">
      <div class="container">
        <form class="filters glass-card" @submit.prevent="applyFilters">
          <div class="field">
            <label><LucideMapPin size="16" /> Kota / wilayah</label>
            <input v-model="local.city" type="text" placeholder="Mis. Jakarta, Tangerang…" autocomplete="address-level2">
          </div>
          <div class="field">
            <label><LucideDollarSign size="16" /> Harga mulai ≥ (Rp)</label>
            <input v-model="local.minPrice" type="number" min="0" step="10000000" placeholder="Mis. 500000000">
          </div>
          <div class="field">
            <label>Harga sampai ≤ (Rp)</label>
            <input v-model="local.maxPrice" type="number" min="0" step="10000000" placeholder="Mis. 2000000000">
          </div>
          <div class="field">
            <label><LucideBuilding size="16" /> Developer</label>
            <select v-model="local.developerId">
              <option value="">Semua developer</option>
              <option v-for="d in devList?.developers ?? []" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>
          </div>
          <div class="field span-search">
            <label><LucideSearch size="16" /> Cari nama / lokasi</label>
            <input v-model="local.q" type="search" placeholder="Kata kunci…">
          </div>
          <button type="submit" class="btn btn-accent submit-btn"><LucideSearch /> Terapkan</button>
          <button v-if="hasActiveFilters" type="button" class="btn btn-outline reset-btn" @click="clearFilters">
            Reset
          </button>
        </form>
      </div>
    </section>

    <section class="results-section">
      <div class="container">
        <p v-if="pending" class="muted">Memuat proyek…</p>
        <p v-else-if="error" class="error">Tidak dapat memuat daftar. Periksa koneksi dan database Anda.</p>
        <template v-else-if="projects.length">
          <p class="result-count">{{ data?.pagination?.total ?? 0 }} hasil</p>
          <div class="project-grid">
            <article v-for="p in projects" :key="p.id" class="project-card">
              <NuxtLink :to="`/projects/${p.id}`" class="card-link card-image-wrap">
                <NuxtImg
                  :src="p.image || DEFAULT_IMG"
                  :alt="p.name"
                  width="600"
                  height="240"
                />
                <span v-if="p.promo" class="card-badge">{{ p.promo }}</span>
              </NuxtLink>
              <div class="card-body">
                <div class="card-location">
                  <LucideMapPin size="14" aria-hidden="true" />
                  {{ p.location }}
                </div>
                <h3 class="card-title">
                  <NuxtLink :to="`/projects/${p.id}`">{{ p.name }}</NuxtLink>
                </h3>
                <p v-if="p.developer?.name" class="dev-name">{{ p.developer.name }}</p>
                <div class="card-price">
                  Mulai {{ formatPropertyPrice(p.startPrice) }}
                </div>
                <NuxtLink class="btn btn-outline btn-full" :to="`/projects/${p.id}`">Lihat detail</NuxtLink>
              </div>
            </article>
          </div>
        </template>
        <p v-else class="muted">Belum ada proyek atau filter terlalu ketat.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  LucideMapPin,
  LucideSearch,
  LucideBuilding,
  LucideDollarSign
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

const DEFAULT_IMG =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600'

const route = useRoute()
const router = useRouter()

const local = reactive({
  city: '',
  minPrice: '' as string,
  maxPrice: '' as string,
  developerId: '',
  q: ''
})

function hydrateFromRoute() {
  local.city = typeof route.query.city === 'string' ? route.query.city : ''
  local.minPrice = typeof route.query.minPrice === 'string' ? route.query.minPrice : ''
  local.maxPrice = typeof route.query.maxPrice === 'string' ? route.query.maxPrice : ''
  local.developerId = typeof route.query.developerId === 'string' ? route.query.developerId : ''
  local.q = typeof route.query.q === 'string' ? route.query.q : ''
}

watch(() => route.query, hydrateFromRoute, { immediate: true })

const fetchQuery = computed(() => ({
  city: typeof route.query.city === 'string' && route.query.city.trim() ? route.query.city.trim() : undefined,
  minPrice: typeof route.query.minPrice === 'string' ? route.query.minPrice : undefined,
  maxPrice: typeof route.query.maxPrice === 'string' ? route.query.maxPrice : undefined,
  developerId:
    typeof route.query.developerId === 'string' ? route.query.developerId || undefined : undefined,
  q: typeof route.query.q === 'string' && route.query.q.trim() ? route.query.q.trim() : undefined,
  limit: '50',
  skip: '0'
}))

const { data, pending, error } = await useFetch<{
  projects: Array<{
    id: string
    name: string
    location: string
    startPrice: number
    promo: string | null
    image: string | null
    developer: { id: string; name: string; logo: string | null }
  }>
  pagination: { total: number; limit: number; skip: number }
}>('/api/projects', {
  query: fetchQuery,
  watch: [fetchQuery]
})

const projects = computed(() => data.value?.projects ?? [])
const devList = ref<{ developers: { id: string; name: string }[] } | null>(null)

onMounted(async () => {
  try {
    devList.value = await $fetch<{ developers: { id: string; name: string }[] }>('/api/developers')
  } catch {
    devList.value = { developers: [] }
  }
})

const hasActiveFilters = computed(
  () =>
    !!local.city.trim() ||
    !!local.minPrice ||
    !!local.maxPrice ||
    !!local.developerId ||
    !!local.q.trim()
)

function applyFilters() {
  const q: Record<string, string> = {}
  if (local.city.trim()) q.city = local.city.trim()
  if (local.minPrice) q.minPrice = local.minPrice
  if (local.maxPrice) q.maxPrice = local.maxPrice
  if (local.developerId) q.developerId = local.developerId
  if (local.q.trim()) q.q = local.q.trim()
  router.push({ path: '/projects', query: q })
}

function clearFilters() {
  Object.assign(local, { city: '', minPrice: '', maxPrice: '', developerId: '', q: '' })
  router.replace({ path: '/projects', query: {} })
}

useSeoMeta({
  title: 'Cari proyek — Proferti',
  description:
    'Filter proyek perumahan menurut kota, harga band, dan developer. Proferti — marketplace developer terpercaya.'
})
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, var(--accent-soft), transparent 30%);
}

.subnav {
  padding: 24px 0 16px;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.9);
}

.subnav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-link {
  font-weight: 600;
  color: var(--accent);
}

.subnav-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  color: var(--primary);
}

.filters-section {
  padding: 32px 0 0;
}

.filters {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) auto auto;
  gap: 16px;
  align-items: end;
  padding: 24px;
  border-radius: var(--radius);
}

.field.span-search {
  grid-column: span 2;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.field input,
.field select {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 15px;
}

.submit-btn {
  height: 50px;
  white-space: nowrap;
}

.reset-btn {
  height: 50px;
}

.results-section {
  padding: 40px 0 100px;
}

.result-count {
  margin-bottom: 20px;
  color: var(--text-muted);
  font-size: 15px;
}

.muted {
  color: var(--text-muted);
}

.error {
  color: #b91c1c;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.project-card {
  border-radius: 24px;
  overflow: hidden;
  background: white;
  border: 1px solid var(--border);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
}

.card-link {
  color: inherit;
}

.card-image-wrap {
  display: block;
  position: relative;
  height: 240px;
}

.card-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--accent);
  color: white;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
}

.card-body {
  padding: 24px;
}

.card-location {
  font-size: 14px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 22px;
  margin-bottom: 8px;
}

.card-title a {
  color: var(--primary);
}

.card-title a:hover {
  color: var(--accent);
}

.dev-name {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.card-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 24px;
}

.btn-full {
  width: 100%;
  justify-content: center;
  text-align: center;
}

@media (max-width: 1100px) {
  .filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .field.span-search {
    grid-column: span 2;
  }

  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .filters {
    grid-template-columns: 1fr;
  }

  .field.span-search {
    grid-column: span 1;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>

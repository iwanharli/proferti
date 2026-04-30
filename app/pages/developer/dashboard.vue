<template>
  <div class="dev-dashboard">
    <!-- Top Navbar for Dashboard -->
    <nav class="dash-nav glass-card">
      <div class="nav-left">
        <NuxtLink to="/" class="logo">
          <LucideHome :size="20" class="text-accent" />
          <span>PROFERTI</span>
        </NuxtLink>
        <span class="divider">/</span>
        <span class="nav-current">Developer Console</span>
      </div>
      <div class="nav-right">
        <div class="user-info">
          <span class="user-email">{{ userEmail }}</span>
          <button @click="handleLogout" class="btn btn-sm btn-outline">Keluar</button>
        </div>
      </div>
    </nav>

    <div class="container dash-content">
      <header class="page-header">
        <div class="header-text">
          <h1>Kelola Proyek Rumah</h1>
          <p>Kelola listing properti dan pantau statistik performa Anda.</p>
        </div>
        <button class="btn btn-primary">
          <LucidePlus :size="20" /> Tambah Proyek Baru
        </button>
      </header>

      <!-- Dashboard Stats -->
      <div class="dashboard-stats">
        <div class="dash-card glass-card">
          <span class="dash-label">Proyek Aktif</span>
          <span class="dash-value">3</span>
        </div>
        <div class="dash-card glass-card">
          <span class="dash-label">Total Dilihat</span>
          <span class="dash-value">1,420</span>
        </div>
        <div class="dash-card glass-card">
          <span class="dash-label">Lead Diterima</span>
          <span class="dash-value">28</span>
        </div>
      </div>

      <!-- Project List Section -->
      <section class="project-section">
        <div class="section-header">
          <h2>Daftar Proyek Anda</h2>
        </div>

        <div v-if="pending" class="loading-state">Memuat data...</div>
        <div v-else-if="!projects.length" class="empty-state glass-card">
          <LucideFolderOpen :size="48" class="text-muted" />
          <p>Anda belum memiliki proyek yang terdaftar.</p>
          <button class="btn btn-primary btn-sm">Mulai Tambah Proyek</button>
        </div>
        
        <div v-else class="dash-project-list">
          <div v-for="p in projects" :key="p.id" class="dash-project-card glass-card">
            <div class="card-img">
              <NuxtImg :src="p.image || DEFAULT_IMG" :alt="p.name" />
            </div>
            <div class="card-info">
              <div class="card-meta">
                <span :class="['status-badge', p.status.toLowerCase()]">{{ p.status }}</span>
                <span class="location"><LucideMapPin :size="14" /> {{ p.location }}</span>
              </div>
              <h3>{{ p.name }}</h3>
              <p class="price">Mulai {{ formatPropertyPrice(p.startPrice) }}</p>
            </div>
            <div class="card-actions">
              <button class="btn btn-icon btn-outline" title="Edit"><LucideEdit :size="18" /></button>
              <button class="btn btn-icon btn-outline" title="View"><LucideEye :size="18" /></button>
              <button class="btn btn-icon btn-danger-outline" title="Delete"><LucideTrash2 :size="18" /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideHome, LucidePlus, LucideMapPin, 
  LucideEdit, LucideEye, LucideTrash2,
  LucideFolderOpen
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1600585154340-be6191da110e?auto=format&fit=crop&w=600'

const { data: authData, signOut } = useAuth()
const userEmail = computed(() => authData.value?.user?.email || 'Developer')

async function handleLogout() {
  await signOut({ callbackUrl: '/login' })
}

// Fetch only projects for this developer (logic will need backend adjustment for true filtering, 
// but for now we'll fetch general projects for demonstration)
const { data: payload, pending } = await useFetch<any>('/api/projects', {
  query: { limit: '10' }
})
const projects = computed(() => payload.value?.projects || [])

useSeoMeta({
  title: 'Developer Console - Proferti'
})
</script>

<style scoped>
.dev-dashboard {
  min-height: 100vh;
  background-color: #f8fafc;
  padding-bottom: 80px;
}

.dash-nav {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  margin: 20px 40px;
  background: white;
  border-radius: 100px;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-family: var(--font-display);
  color: var(--primary);
}

.divider {
  color: var(--border);
}

.nav-current {
  font-weight: 600;
  color: var(--text-muted);
  font-size: 14px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-email {
  font-size: 14px;
  font-weight: 500;
  color: var(--primary);
}

.dash-content {
  margin-top: 40px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.header-text h1 {
  font-size: 32px;
  margin-bottom: 4px;
}

.header-text p {
  color: var(--text-muted);
}

/* Dashboard Stats */
.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.dash-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: white;
}

.dash-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
}

.dash-value {
  font-size: 32px;
  font-weight: 800;
  color: var(--primary);
}

/* Project List */
.section-header {
  margin-bottom: 24px;
}

.dash-project-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dash-project-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  gap: 24px;
}

.card-img {
  width: 120px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.status-badge {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-badge.available { background: #dcfce7; color: #166534; }

.location {
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-info h3 {
  font-size: 18px;
  margin-bottom: 4px;
}

.price {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
}

.card-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  justify-content: center;
}

.btn-danger-outline {
  color: #ef4444;
  border: 1px solid #fee2e2;
  background: white;
}

.btn-danger-outline:hover {
  background: #fef2f2;
  border-color: #fca5a5;
}

.empty-state {
  text-align: center;
  padding: 80px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-state p {
  color: var(--text-muted);
  font-weight: 500;
}
</style>

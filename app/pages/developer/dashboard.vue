<template>
  <div class="dash-layout">
    <!-- Elite Sidebar -->
    <aside class="dash-sidebar">
      <div class="flex items-center gap-3 mb-12">
        <LucideHome :size="28" class="text-accent" />
        <span class="font-black text-xl tracking-widest text-white">PROFERTI</span>
      </div>
      
      <nav class="flex flex-col gap-2 flex-1">
        <NuxtLink to="/developer/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all bg-accent text-white">
          <LucideLayoutDashboard :size="20" /> Dashboard
        </NuxtLink>
        <NuxtLink to="/developer/leads" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-slate-400 hover:bg-white/10 hover:text-white">
          <LucideUsers :size="20" /> Leads
          <span v-if="leadTotal > 0" class="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{{ leadTotal }}</span>
        </NuxtLink>
        <div class="mt-6 mb-2 text-[11px] font-extrabold uppercase text-slate-600 tracking-wider">Manajemen</div>
        <NuxtLink to="/developer/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-slate-400 hover:bg-white/10 hover:text-white">
          <LucideBuilding :size="20" /> Proyek Saya
        </NuxtLink>
        <NuxtLink to="/developer/register" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-slate-400 hover:bg-white/10 hover:text-white">
          <LucideUser :size="20" /> Profil Perusahaan
        </NuxtLink>
      </nav>

      <div class="pt-6 border-t border-slate-800">
        <button @click="handleLogout" class="flex items-center gap-2 text-red-500 font-bold opacity-80 hover:opacity-100 hover:translate-x-1 transition-all">
          <LucideLogOut :size="18" /> Keluar Sesi
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="dash-main">
      <header class="flex justify-between items-end mb-12">
        <div>
          <h1 class="text-4xl font-black text-primary mb-2">Console Developer</h1>
          <p class="text-slate-500 font-medium">Pantau perkembangan properti dan respon lead Anda di sini.</p>
        </div>
        <div>
          <button class="btn btn-accent" @click="openCreate">
            <LucidePlus :size="20" /> Tambah Proyek Baru
          </button>
        </div>
      </header>

      <!-- Elite Stat Cards -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div class="glass-card p-8 flex items-center gap-5 relative overflow-hidden">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-emerald-400 to-emerald-600">
            <LucideBuilding2 :size="24" />
          </div>
          <div>
            <span class="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Proyek Aktif</span>
            <span class="text-3xl font-black text-primary">{{ projectTotal }}</span>
          </div>
          <div class="flex items-end gap-1 h-10 ml-auto">
             <div class="w-1 bg-accent rounded-full opacity-30 h-[40%]"></div>
             <div class="w-1 bg-accent rounded-full opacity-30 h-[70%]"></div>
             <div class="w-1 bg-accent rounded-full opacity-30 h-[50%]"></div>
             <div class="w-1 bg-accent rounded-full opacity-30 h-[90%]"></div>
          </div>
        </div>
        
        <div class="glass-card p-8 flex items-center gap-5 relative overflow-hidden">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-indigo-400 to-indigo-600">
            <LucideUsers :size="24" />
          </div>
          <div>
            <span class="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Total Lead</span>
            <span class="text-3xl font-black text-primary">{{ leadTotal }}</span>
          </div>
        </div>

        <div class="glass-card p-8 flex items-center gap-5 relative overflow-hidden">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-purple-400 to-purple-600">
            <LucideTrendingUp :size="24" />
          </div>
          <div>
            <span class="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Status Akun</span>
            <span class="text-3xl font-black text-primary">Verified</span>
          </div>
        </div>
      </section>

      <!-- Project List Section -->
      <section>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-black text-primary">Portofolio Proyek</h2>
          <div class="flex items-center gap-3 bg-white px-4 py-2.5 rounded-full border border-slate-100 w-72 shadow-sm">
            <LucideSearch :size="18" class="text-slate-400" />
            <input type="text" placeholder="Cari proyek..." class="border-none outline-none text-sm w-full font-medium" />
          </div>
        </div>

        <div v-if="projectPending" class="py-24 text-center">
          <div class="w-10 h-10 border-4 border-slate-100 border-t-accent rounded-full animate-spin mx-auto"></div>
        </div>

        <div v-else-if="projects.length === 0" class="glass-card p-20 text-center flex flex-col items-center gap-4">
          <LucideInbox :size="64" class="text-slate-300" />
          <h3 class="text-2xl font-black">Mulai Perjalanan Anda</h3>
          <p class="max-w-md text-slate-500 font-medium mb-3">Anda belum memiliki proyek yang terdaftar. Tambahkan proyek pertama untuk mulai mendapatkan lead.</p>
          <button class="btn btn-accent" @click="openCreate">Tambah Proyek Sekarang</button>
        </div>

        <div v-else class="flex flex-col gap-4">
          <div v-for="p in projects" :key="p.id" class="glass-card p-4 flex items-center gap-6 group">
            <div class="w-36 h-24 rounded-2xl overflow-hidden relative flex-shrink-0">
              <img :src="p.image || DEFAULT_IMG" :alt="p.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute bottom-2 left-2 text-[9px] font-black uppercase bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-md">{{ statusLabel(p.status) }}</div>
            </div>
            
            <div class="flex-1">
              <div class="flex items-center gap-1.5 text-[13px] font-bold text-slate-500 mb-1">
                <LucideMapPin :size="14" /> {{ p.location.name }}, {{ p.location.city }}
              </div>
              <h3 class="text-lg font-black text-primary mb-1">{{ p.name }}</h3>
              <p class="font-black text-accent">Mulai {{ formatPropertyPrice(p.startPrice) }}</p>
            </div>

            <div class="pr-4">
              <NuxtLink :to="`/developer/projects/${p.id}`" class="btn btn-outline border-slate-200 hover:border-accent hover:text-accent group/btn">
                Kelola Proyek <LucideArrowRight :size="16" class="transition-transform group-hover/btn:translate-x-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Modals -->
    <ProjectFormModal
      v-if="showModal"
      :project="editProject"
      @close="showModal = false"
      @saved="onSaved"
    />
  </div>
</template>

<script setup lang="ts">
import {
  LucideHome, LucideLayoutDashboard, LucideUsers, LucideBuilding, 
  LucideUser, LucideLogOut, LucidePlus, LucideBuilding2, 
  LucideTrendingUp, LucideSearch, LucideInbox, LucideMapPin,
  LucideArrowRight
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

const DEFAULT_IMG = 'https://www.dummyimg.in/placeholder?width=1200&height=800'

const { data: authData, signOut } = useAuth()
const userId = computed(() => (authData.value?.user as any)?.id || '')

// Fetch Developer Detail
const { data: devData } = await useFetch<{ developer: { id: string } }>(
  () => `/api/developers/me?userId=${userId.value}`,
  { key: 'dev-profile-dash' }
)
const developerId = computed(() => devData.value?.developer?.id || '')

// Fetch Projects
const { data: projData, pending: projectPending, refresh: refreshProjects } = await useFetch<{
  projects: any[]
  pagination: { total: number }
}>(
  '/api/projects',
  {
    query: computed(() => ({ developerId: developerId.value, limit: 100 })),
    watch: [developerId]
  }
)
const projects     = computed(() => projData.value?.projects ?? [])
const projectTotal = computed(() => projData.value?.pagination?.total ?? 0)

// Fetch Lead count
const { data: leadData, refresh: refreshLeads } = await useFetch<{ pagination: { total: number } }>(
  '/api/leads',
  { key: 'dev-leads-count-dash' }
)
const leadTotal = computed(() => leadData.value?.pagination?.total ?? 0)

// Modal Logic
const showModal = ref(false)
const editProject = ref<any>(null)

function openCreate() { editProject.value = null; showModal.value = true }
async function onSaved() {
  showModal.value = false
  await refreshProjects()
}

async function handleLogout() {
  await signOut({ callbackUrl: '/login' })
}

function statusLabel(s: string) {
  return s === 'active' ? 'Tersedia' : s === 'soldout' ? 'Habis Terjual' : 'Segera Hadir'
}

useSeoMeta({ title: 'Developer Elite Console — Proferti' })
</script>

<style scoped>
/* No more custom CSS needed! Everything is handled by Tailwind or main.css utility layers */
</style>

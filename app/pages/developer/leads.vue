<template>
  <div class="dash-layout">
    <!-- Elite Sidebar -->
    <aside class="dash-sidebar">
      <div class="flex items-center gap-3 mb-12">
        <LucideHome :size="28" class="text-accent" />
        <span class="font-black text-xl tracking-widest text-white">PROFERTI</span>
      </div>
      
      <nav class="flex flex-col gap-2 flex-1">
        <NuxtLink to="/developer/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-slate-400 hover:bg-white/10 hover:text-white">
          <LucideLayoutDashboard :size="20" /> Dashboard
        </NuxtLink>
        <NuxtLink to="/developer/leads" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all bg-accent text-white">
          <LucideUsers :size="20" /> Leads
          <span v-if="leads.length > 0" class="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{{ leads.length }}</span>
        </NuxtLink>
        <div class="mt-6 mb-2 text-[11px] font-extrabold uppercase text-slate-600 tracking-wider">Manajemen</div>
        <NuxtLink to="/developer/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-slate-400 hover:bg-white/10 hover:text-white">
          <LucideBuilding :size="20" /> Proyek Saya
        </NuxtLink>
      </nav>

      <div class="pt-6 border-t border-slate-800">
        <NuxtLink to="/developer/dashboard" class="flex items-center gap-2 text-white/60 font-semibold hover:text-white transition-all">
          <LucideChevronLeft :size="18" /> Kembali
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="dash-main">
      <header class="flex justify-between items-end mb-12">
        <div>
          <h1 class="text-4xl font-black text-primary mb-2">Pusat Lead</h1>
          <p class="text-slate-500 font-medium">Kelola calon pembeli yang tertarik dengan proyek Anda.</p>
        </div>
        <div>
           <button class="btn btn-outline" @click="() => refreshLeads()">
             <LucideRefreshCw :size="18" :class="{ 'animate-spin': pending }" /> Refresh Data
           </button>
        </div>
      </header>

      <!-- Leads Content -->
      <section>
        <div v-if="pending" class="py-24 text-center">
          <div class="w-10 h-10 border-4 border-slate-100 border-t-accent rounded-full animate-spin mx-auto"></div>
        </div>

        <div v-else-if="leads.length === 0" class="glass-card p-20 text-center flex flex-col items-center gap-4">
          <LucideInbox :size="64" class="text-slate-300" />
          <h3 class="text-2xl font-black">Belum Ada Lead</h3>
          <p class="max-w-md text-slate-500 font-medium mb-3">Promosikan proyek Anda untuk mulai mendapatkan calon pembeli potensial.</p>
        </div>

        <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div v-for="l in leads" :key="l.id" class="glass-card p-6 flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <div :class="['text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full', 
                l.status === 'new' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600']">
                {{ l.status }}
              </div>
              <span class="text-xs font-semibold text-slate-400">{{ formatDate(l.createdAt) }}</span>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg">
                {{ l.name.charAt(0) }}
              </div>
              <div>
                <h3 class="text-lg font-black text-primary">{{ l.name }}</h3>
                <p class="text-[13px] font-semibold text-slate-500 flex items-center gap-1">
                  <LucideBuilding :size="14" /> {{ l.projectName }}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-3 py-3 border-y border-slate-100">
               <div class="flex items-center gap-1.5 text-[13px] font-semibold text-slate-600">
                 <LucidePhone :size="14" /> {{ l.phone || '-' }}
               </div>
               <div class="flex items-center gap-1.5 text-[13px] font-semibold text-slate-600">
                 <LucideMail :size="14" /> {{ l.email || '-' }}
               </div>
               <div v-if="l.budget" class="flex items-center gap-1.5 text-[13px] font-extrabold text-accent">
                 <LucideWallet :size="14" /> {{ formatPropertyPrice(l.budget) }}
               </div>
            </div>

            <div v-if="l.message" class="text-[13px] text-slate-500 italic leading-relaxed bg-slate-50 p-3 rounded-xl">
               "{{ l.message }}"
            </div>

            <div class="flex gap-3 mt-auto">
               <select :value="l.status" @change="updateStatus(l.id, ($event.target as HTMLSelectElement).value)" class="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold outline-none focus:border-accent">
                 <option value="new">Baru</option>
                 <option value="contacted">Dihubungi</option>
                 <option value="qualified">Kualifikasi</option>
                 <option value="closed">Selesai</option>
               </select>
               <a :href="`https://wa.me/${formatWA(l.phone)}`" target="_blank" class="bg-[#25d366] text-white px-4 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-all hover:bg-[#128c7e] hover:-translate-y-0.5">
                 <LucideMessageSquare :size="16" /> Hubungi WA
               </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideHome, LucideLayoutDashboard, LucideUsers, LucideBuilding, 
  LucideChevronLeft, LucideRefreshCw, LucideInbox, LucidePhone,
  LucideMail, LucideWallet, LucideMessageSquare
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

const { data: authData } = useAuth()
const userId = computed(() => (authData.value?.user as any)?.id || '')

// Fetch Developer Detail first
const { data: devData } = await useFetch<{ developer: { id: string } }>(
  () => `/api/developers/me?userId=${userId.value}`
)
const developerId = computed(() => devData.value?.developer?.id || '')

// Fetch Leads
const { data: leadData, pending, refresh: refreshLeads } = await useFetch<{
  leads: any[]
}>(
  '/api/leads',
  {
    query: computed(() => ({ developerId: developerId.value })),
    watch: [developerId]
  }
)
const leads = computed(() => leadData.value?.leads ?? [])

async function updateStatus(leadId: string, newStatus: string) {
  try {
    await $fetch(`/api/leads/${leadId}/status`, {
      method: 'PATCH',
      body: { developerId: developerId.value, status: newStatus }
    })
    await refreshLeads()
  } catch (e: any) {
    alert('Gagal memperbarui status')
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

function formatWA(p?: string) {
  if (!p) return ''
  return p.replace(/[^0-9]/g, '').replace(/^0/, '62')
}

useSeoMeta({ title: 'Manajemen Lead — Proferti Elite' })
</script>

<style scoped>
/* No custom CSS needed! */
</style>

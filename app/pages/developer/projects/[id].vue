<template>
  <div class="dash-layout">
    <!-- Elite Sidebar (Same as dashboard for consistency) -->
    <aside class="dash-sidebar">
      <div class="flex items-center gap-3 mb-12">
        <LucideHome :size="28" class="text-accent" />
        <span class="font-black text-xl tracking-widest text-white">PROFERTI</span>
      </div>
      
      <nav class="flex flex-col gap-2 flex-1">
        <NuxtLink to="/developer/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-slate-400 hover:bg-white/10 hover:text-white">
          <LucideLayoutDashboard :size="20" /> Dashboard
        </NuxtLink>
        <NuxtLink to="/developer/leads" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-slate-400 hover:bg-white/10 hover:text-white">
          <LucideUsers :size="20" /> Leads
        </NuxtLink>
        <div class="mt-6 mb-2 text-[11px] font-extrabold uppercase text-slate-600 tracking-wider">Manajemen</div>
        <NuxtLink to="/developer/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all bg-accent text-white">
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
      <header class="flex justify-between items-end mb-10">
        <div>
          <div class="flex items-center gap-2 text-[13px] font-bold text-slate-400 mb-3">
            <NuxtLink to="/developer/dashboard" class="hover:text-accent">Dashboard</NuxtLink>
            <LucideChevronRight :size="14" />
            <span>Manajemen Proyek</span>
          </div>
          <h1 v-if="proj" class="text-4xl font-black text-primary">{{ proj.name }}</h1>
        </div>
        <div class="flex gap-3" v-if="proj">
          <button class="btn btn-outline" @click="openEdit">
            <LucideEdit :size="18" /> Edit Detail
          </button>
          <button class="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-100 text-red-500 font-bold hover:bg-red-50 transition-all" @click="confirmDelete">
            <LucideTrash2 :size="18" /> Hapus
          </button>
        </div>
      </header>

      <div v-if="proj" class="flex flex-col gap-10">
        <!-- Project Hero Card -->
        <div class="glass-card p-8 flex flex-col md:flex-row gap-8">
          <div class="w-full md:w-72 h-44 rounded-2xl overflow-hidden flex-shrink-0">
            <img :src="proj.image || DEFAULT_IMG" alt="banner" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 flex flex-col justify-center">
             <div class="flex items-center gap-4 mb-4">
               <span :class="['text-[11px] font-black uppercase px-3 py-1 rounded-full', 
                 proj.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600']">
                 {{ statusLabel(proj.status) }}
               </span>
               <span class="text-sm font-bold text-slate-500 flex items-center gap-1.5"><LucideMapPin :size="14" /> {{ proj.location.name }}, {{ proj.location.city }}</span>
             </div>
             <div class="mb-6">
               <span class="block text-[12px] font-black text-slate-400 uppercase tracking-wider mb-1">Harga Mulai</span>
               <span class="text-3xl font-black text-primary">{{ formatPropertyPrice(proj.startPrice) }}</span>
             </div>
             <div class="flex gap-8">
               <div class="flex items-center gap-2 text-[15px] font-bold text-slate-600">
                 <LucideHome :size="18" />
                 <b>{{ proj.unitTypes?.length || 0 }}</b> Tipe Unit
               </div>
               <div class="flex items-center gap-2 text-[15px] font-bold text-slate-600">
                 <LucideMessageSquare :size="18" />
                 <b>{{ leadTotal }}</b> Total Lead
               </div>
             </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <!-- Units Management -->
          <section class="glass-card p-8 flex flex-col gap-6">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-black text-primary">Daftar Tipe Unit</h3>
              <button class="btn btn-accent py-2 text-xs" @click="openEdit">
                <LucidePlus :size="16" /> Update Unit
              </button>
            </div>

            <div class="flex flex-col">
              <div class="grid grid-cols-[1.5fr_0.8fr_1.2fr_1.5fr] pb-3 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <span>Nama Tipe</span>
                <span>Stok</span>
                <span>Harga</span>
                <span>Spesifikasi</span>
              </div>
              <div v-for="u in proj.unitTypes" :key="u.id" class="grid grid-cols-[1.5fr_0.8fr_1.2fr_1.5fr] py-4 border-b border-slate-50 items-center text-sm">
                <span class="font-black text-primary">{{ u.typeName }}</span>
                <span :class="['font-bold', u.stock < 3 ? 'text-red-500' : 'text-slate-500']">{{ u.stock }} Unit</span>
                <span class="font-black text-accent">{{ formatPropertyPrice(u.price) }}</span>
                <span class="text-slate-500 font-bold text-[13px]">{{ u.bedroom }}KT · {{ u.bathroom }}KM · {{ u.landSize }}m²</span>
              </div>
            </div>
          </section>

          <!-- Sidebar Actions -->
          <aside class="flex flex-col gap-6">
            <div class="glass-card p-6 bg-primary text-white">
              <h4 class="text-lg font-black mb-2">Publikasi</h4>
              <p class="text-sm text-slate-300 leading-relaxed mb-6">Proyek Anda sedang aktif di marketplace Proferti.</p>
              <NuxtLink :to="`/projects/${proj.id}`" target="_blank" class="btn btn-accent w-full text-sm">
                <LucideExternalLink :size="16" /> Buka Halaman Publik
              </NuxtLink>
            </div>
            
            <div class="glass-card p-6">
              <h4 class="text-lg font-black text-primary mb-2">Tips Proferti</h4>
              <p class="text-sm text-slate-500 leading-relaxed">Pastikan galeri foto Anda lengkap untuk menarik lebih banyak lead.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <ProjectFormModal
      v-if="showEdit"
      :project="proj"
      @close="showEdit = false"
      @saved="onSaved"
    />

    <!-- Delete Confirmation -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1100] flex items-center justify-center p-4" @click.self="showDeleteConfirm = false">
        <div class="bg-white rounded-[24px] p-10 max-w-md w-full shadow-2xl animate-scale-up">
          <h3 class="text-2xl font-black text-red-500 mb-3">Hapus Proyek Permanen?</h3>
          <p class="text-slate-500 leading-relaxed mb-8">Tindakan ini tidak dapat dibatalkan. Seluruh data proyek dan unit akan terhapus dari sistem.</p>
          <div class="flex gap-3 justify-end">
            <button class="btn btn-outline" @click="showDeleteConfirm = false">Batal</button>
            <button class="bg-red-500 text-white px-6 py-3 rounded-xl font-black hover:bg-red-600 transition-all" @click="doDelete" :disabled="busy">
              {{ busy ? 'Menghapus...' : 'Ya, Hapus Sekarang' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideHome, LucideLayoutDashboard, LucideUsers, LucideBuilding, 
  LucideChevronLeft, LucideChevronRight, LucideEdit, LucideTrash2,
  LucideMapPin, LucidePlus, LucideExternalLink, LucideMessageSquare
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const DEFAULT_IMG = 'https://www.dummyimg.in/placeholder?width=1200&height=800'

const showEdit = ref(false)
const showDeleteConfirm = ref(false)
const busy = ref(false)

const { data: projData, refresh: refreshProj } = await useFetch<{ project: any }>(`/api/projects/${id}`)
const proj = computed(() => projData.value?.project)

const { data: leadData } = await useFetch<{ pagination: { total: number } }>(`/api/leads`, {
  query: { projectId: id }
})
const leadTotal = computed(() => leadData.value?.pagination?.total || 0)

function openEdit() { showEdit.value = true }
function confirmDelete() { showDeleteConfirm.value = true }

async function onSaved() {
  showEdit.value = false
  await refreshProj()
}

async function doDelete() {
  busy.value = true
  try {
    await $fetch(`/api/projects/${id}`, { method: 'DELETE' })
    router.push('/developer/dashboard')
  } catch (e: any) {
    alert(e?.data?.error || 'Gagal menghapus')
  } finally {
    busy.value = false
  }
}

function statusLabel(s: string) {
  return s === 'active' ? 'Tersedia' : s === 'soldout' ? 'Habis Terjual' : 'Segera Hadir'
}

useSeoMeta({ title: `Kelola ${proj.value?.name || 'Proyek'} — Proferti` })
</script>

<style scoped>
@keyframes scale-up {
  from { transform: scale(0.95); opacity: 0; }
  to   { transform: scale(1);    opacity: 1; }
}
.animate-scale-up {
  animation: scale-up 0.2s ease-out;
}
</style>

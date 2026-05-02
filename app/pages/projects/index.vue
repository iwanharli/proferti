<template>
  <div class="relative min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif]">

    <!-- Search Header -->
    <header class="pt-44 pb-20 bg-[radial-gradient(circle_at_top_right,_var(--accent-soft),_transparent_40%),_radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.05),_transparent_40%)] text-center animate-fade-in relative z-20">
      <div class="container mx-auto px-4">
        <div class="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-8">
          <LucideBuilding :size="14" class="text-accent" />
          <span class="text-accent text-[10px] font-black uppercase tracking-[0.3em]">Marketplace Properti</span>
        </div>
        <h1 class="text-7xl font-black text-primary mb-6 tracking-tighter leading-none">Temukan <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Hunian Impian</span></h1>
        <p class="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">Jelajahi berbagai pilihan properti dari developer terverifikasi di seluruh Indonesia.</p>
        
        <!-- Expanded Main Filter Bar -->
        <div class="glass-card grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 p-4 max-w-7xl mx-auto shadow-2xl relative z-30">
          <div class="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-2xl group focus-within:border-accent transition-all">
            <LucideSearch :size="18" class="text-slate-400 group-focus-within:text-accent" />
            <input v-model="filters.q" placeholder="Cari nama hunian..." @input="debouncedSearch" class="w-full border-none outline-none font-bold text-sm" />
          </div>
          
          <div class="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-2xl">
            <LucideHome :size="18" class="text-slate-400" />
            <select v-model="filters.type" @change="fetchProjects" class="w-full border-none outline-none font-bold text-sm bg-transparent appearance-none cursor-pointer capitalize">
              <option value="">Semua Tipe</option>
              <option v-for="t in propertyTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>

          <div class="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-2xl relative group">
            <LucideMapPin :size="18" class="text-slate-400 group-hover:text-accent transition-colors" />
            <select v-model="filters.city" @change="fetchProjects" class="w-full border-none outline-none font-bold text-sm bg-transparent appearance-none cursor-pointer">
              <option value="">Semua Lokasi</option>
              <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
            </select>
            <button 
              @click="detectLocation" 
              :disabled="detecting"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-accent transition-all active:scale-90"
              title="Gunakan Lokasi Saya"
            >
               <LucideLocate :size="16" :class="{ 'animate-spin': detecting }" />
            </button>
          </div>

          <div class="flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-2xl">
            <LucideArrowUpDown :size="18" class="text-slate-400" />
            <select v-model="filters.sort" @change="fetchProjects" class="w-full border-none outline-none font-bold text-sm bg-transparent appearance-none cursor-pointer">
              <option value="newest">Terbaru</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
            </select>
          </div>

          <div class="flex gap-3">
             <button 
               @click="showAdvanced = true"
               class="bg-slate-50 hover:bg-slate-100 text-primary border border-slate-200 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all relative"
             >
                <LucideSlidersHorizontal :size="16" />
                Filter
                <span v-if="activeFiltersCount > 0" class="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-[10px] border-4 border-white shadow-lg">{{ activeFiltersCount }}</span>
             </button>
             <NuxtLink 
                to="/projects-map"
                class="bg-slate-900 hover:bg-accent text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
              >
                <LucideMap :size="16" />
                Peta
              </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Wide Glassmorphic Location Toast -->
    <Transition
      enter-active-class="transform transition duration-700 ease-out"
      enter-from-class="translate-y-20 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-20 opacity-0 scale-95"
    >
      <div v-if="suggestedCity" class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000] w-full max-w-2xl px-8">
        <div class="bg-white/40 backdrop-blur-xl border border-white/30 p-4 rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] flex items-center gap-8">
          <div class="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent/20 shrink-0">
            <LucideLocate :size="18" class="animate-pulse" />
          </div>
          <div class="flex-1">
            <p class="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Lokasi Terdeteksi</p>
            <h4 class="text-sm font-black text-primary tracking-tight">Cari di {{ suggestedCity }}?</h4>
          </div>
          <div class="flex gap-2">
            <button @click="useSuggestedCity" class="bg-slate-900 text-white px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-accent transition-all shadow-lg shadow-slate-900/10">
              Filter
            </button>
            <button @click="suggestedCity = ''" class="px-4 py-2 rounded-lg bg-white/50 text-slate-500 hover:bg-white hover:text-primary transition-all font-black text-[9px] uppercase tracking-widest">
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Grid Mode Results -->
    <section class="py-12 animate-slide-up relative z-10">
      <div class="container mx-auto px-4">
        <!-- Results Stats -->
        <div class="flex items-center justify-between mb-10 text-slate-500 font-bold text-sm">
           <p>{{ projects.length }} Hunian Ditemukan</p>
           <button @click="resetFilters" v-if="activeFiltersCount > 0" class="text-accent hover:underline flex items-center gap-2 uppercase tracking-widest text-[10px] font-black">
              <LucideRefreshCcw :size="14" />
              Reset Semua Filter
           </button>
        </div>

        <div v-if="pending" class="py-24 text-center">
          <div class="w-16 h-16 border-4 border-slate-200 border-t-accent rounded-full animate-spin mx-auto mb-6"></div>
          <p class="font-black text-slate-400 uppercase tracking-widest text-xs">Menyusun Katalog Hunian...</p>
        </div>

        <div v-else-if="projects.length === 0" class="py-32 text-center flex flex-col items-center gap-8">
          <div class="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center shadow-inner">
            <LucideInbox :size="64" class="text-slate-200" />
          </div>
          <p class="text-2xl font-black text-slate-900 tracking-tight">Hunian tidak ditemukan.</p>
          <button class="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all shadow-xl shadow-slate-900/20" @click="resetFilters">Reset Filter</button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <NuxtLink 
            v-for="(p, idx) in projects" 
            :key="p.id" 
            :to="`/projects/${p.slug}`" 
            class="group relative bg-white rounded-[48px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 flex flex-col isolation-isolate transform-gpu"
            :style="{ transitionDelay: `${idx * 50}ms` }"
          >

            <div class="h-72 overflow-hidden relative transform-gpu">
              <img :src="p.image || 'https://www.dummyimg.in/placeholder?width=1200&height=800'" :alt="p.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu" />
              <div v-if="p.promo" class="absolute top-6 left-6 bg-accent/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">{{ p.promo }}</div>
              <div class="absolute bottom-6 left-6 right-6">
                 <div class="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl inline-flex items-center gap-2 border border-white/50 shadow-lg">
                    <div class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                    <span class="text-[9px] font-black text-primary uppercase tracking-widest">{{ p.status }}</span>
                 </div>
              </div>
            </div>
            <div class="p-10 flex-1 flex flex-col">
              <div class="flex justify-between items-center mb-6">
                <NuxtLink :to="`/developers/${p.developer?.slug}`" class="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-accent transition-colors">{{ p.developer?.name }}</NuxtLink>
                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-accent group-hover:bg-accent/10 transition-colors">
                   <LucideCheckCircle :size="18" />
                </div>
              </div>
              <h3 class="text-3xl font-black text-primary mb-2 tracking-tighter group-hover:text-accent transition-colors leading-tight">{{ p.name }}</h3>
              <p class="flex items-center gap-2 text-sm font-bold text-slate-500 mb-10">
                <LucideMapPin :size="16" class="text-accent" /> {{ p.location.name }}, {{ p.location.city }}
              </p>
              
              <div class="mt-auto pt-8 border-t border-slate-50 flex justify-between items-center">
                <div>
                  <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Mulai dari</span>
                  <span class="text-2xl font-black text-primary tracking-tight">{{ formatPropertyPrice(p.startPrice) }}</span>
                </div>
                <div class="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:scale-110 shadow-xl shadow-slate-900/10">
                  <LucideArrowRight :size="24" />
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Advanced Filter Drawer -->
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="showAdvanced" class="fixed inset-y-0 right-0 w-full max-w-md z-[2000] bg-white shadow-2xl border-l border-slate-100 flex flex-col">
         <div class="p-10 border-b border-slate-100 flex justify-between items-center">
            <div>
               <h2 class="text-2xl font-black text-primary tracking-tight">Advanced Filter</h2>
               <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Sesuaikan preferensi Anda</p>
            </div>
            <button @click="showAdvanced = false" class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary hover:bg-slate-100 transition-all">
               <LucideX :size="24" />
            </button>
         </div>

         <div class="flex-1 overflow-y-auto p-10 space-y-12 pb-32">
            <!-- Price Range -->
            <section class="space-y-6">
               <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Rentang Harga</label>
               <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                     <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Min (Rp)</p>
                     <input v-model="filters.minPrice" type="number" placeholder="0" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 font-bold text-sm outline-none focus:border-accent" />
                  </div>
                  <div class="space-y-2">
                     <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Max (Rp)</p>
                     <input v-model="filters.maxPrice" type="number" placeholder="10M+" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 font-bold text-sm outline-none focus:border-accent" />
                  </div>
               </div>
            </section>

            <!-- Rooms -->
            <section class="space-y-6">
               <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Kamar Tidur & Mandi</label>
               <div class="space-y-6">
                  <div class="flex items-center justify-between">
                     <span class="font-bold text-primary">Kamar Tidur</span>
                     <div class="flex gap-2">
                        <button v-for="n in [1, 2, 3, 4]" :key="n" 
                           @click="filters.bedrooms = n"
                           :class="['w-10 h-10 rounded-xl font-black text-xs transition-all border', 
                           filters.bedrooms === n ? 'bg-accent border-accent text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200']"
                        >{{ n }}+</button>
                     </div>
                  </div>
                  <div class="flex items-center justify-between">
                     <span class="font-bold text-primary">Kamar Mandi</span>
                     <div class="flex gap-2">
                        <button v-for="n in [1, 2, 3]" :key="n" 
                           @click="filters.bathrooms = n"
                           :class="['w-10 h-10 rounded-xl font-black text-xs transition-all border', 
                           filters.bathrooms === n ? 'bg-accent border-accent text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200']"
                        >{{ n }}+</button>
                     </div>
                  </div>
               </div>
            </section>

            <!-- Status -->
            <section class="space-y-6">
               <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Status Proyek</label>
               <div class="flex flex-wrap gap-3">
                  <button v-for="s in ['active', 'ready', 'indent']" :key="s" 
                     @click="filters.status = s"
                     :class="['px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border', 
                     filters.status === s ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400']"
                  >{{ s === 'active' ? 'Semua' : s }}</button>
               </div>
            </section>

            <!-- Developers -->
            <section class="space-y-6">
               <div class="flex items-center justify-between">
                  <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Elite Developer</label>
                  <span v-if="filters.developerIds.length > 0" @click="filters.developerIds = []" class="text-[9px] font-black text-accent uppercase tracking-widest cursor-pointer hover:underline">Reset ({{ filters.developerIds.length }})</span>
               </div>

               <!-- Developer Search within Drawer -->
               <div class="relative group">
                  <LucideSearch :size="14" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" />
                  <input v-model="devSearchQuery" placeholder="Cari developer..." class="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 font-bold text-xs outline-none focus:border-accent transition-all" />
               </div>

               <div class="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2">
                  <button v-for="d in filteredDevsInDrawer" :key="d.id"
                    @click="toggleDeveloper(d.id)"
                    :class="['flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group/item',
                    filters.developerIds.includes(d.id) ? 'bg-accent/5 border-accent shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200']"
                  >
                     <div class="w-10 h-10 bg-white rounded-lg p-1.5 shadow-sm border border-slate-50 flex items-center justify-center overflow-hidden">
                        <img v-if="d.logo && !brokenLogos.has(d.id)" :src="d.logo" @error="brokenLogos.add(d.id)" class="max-w-full max-h-full object-contain" />
                        <span v-else class="text-sm font-black text-slate-300 uppercase">{{ d.name?.[0] }}</span>
                     </div>
                     <span :class="['font-bold text-sm', filters.developerIds.includes(d.id) ? 'text-accent' : 'text-primary']">{{ d.name }}</span>
                     <LucideCheck v-if="filters.developerIds.includes(d.id)" :size="16" class="ml-auto text-accent" />
                  </button>
               </div>
            </section>
         </div>

         <div class="absolute bottom-0 left-0 right-0 p-10 bg-white/80 backdrop-blur-md border-t border-slate-100 flex gap-4">
            <button @click="resetFilters" class="flex-1 bg-slate-100 text-primary font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Reset</button>
            <button @click="applyAdvanced" class="flex-[2] bg-accent text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-emerald-500 shadow-xl shadow-accent/20 transition-all">Tampilkan Hasil</button>
         </div>
      </div>
    </Transition>

    <!-- Overlay -->
    <div v-if="showAdvanced" @click="showAdvanced = false" class="fixed inset-0 z-[1900] bg-slate-900/40 backdrop-blur-sm animate-fade-in"></div>

  </div>
</template>

<script setup lang="ts">
import { 
  LucideSearch, LucideMapPin, LucideDollarSign, LucideInbox, 
  LucideArrowRight, LucideLocate, LucideMap, LucideLayoutGrid,
  LucideBuilding, LucideCheckCircle, LucideX, LucideArrowUpRight,
  LucideHome, LucideArrowUpDown, LucideSlidersHorizontal, LucideRefreshCcw,
  LucideCheck
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

const filters = reactive({
  q: '',
  city: '',
  minPrice: '',
  maxPrice: '',
  type: '',
  sort: 'newest',
  bedrooms: null as number | null,
  bathrooms: null as number | null,
  status: '',
  developerIds: [] as string[]
})

const showAdvanced = ref(false)
const devSearchQuery = ref('')
const brokenLogos = ref(new Set<string>())
const priceRange = ref('')
const suggestedCity = ref('')
const { data: locData } = await useFetch<{ locations: any[] }>('/api/locations')
const { data: metaData } = await useFetch<{ types: string[], minPrice: number, maxPrice: number }>('/api/projects/meta')

const cities = computed(() => {
  const list = locData.value?.locations || []
  const names = list.map(l => l.city || l.name)
  return [...new Set(names)].sort()
})

const propertyTypes = computed(() => metaData.value?.types || [])
const minPrice = computed(() => metaData.value?.minPrice || 0)
const maxPrice = computed(() => metaData.value?.maxPrice || 0)

const detecting = ref(false)

const { data: devData } = await useFetch<{ developers: any[] }>('/api/developers')
const developers = computed(() => devData.value?.developers || [])

const filteredDevsInDrawer = computed(() => {
  if (!devSearchQuery.value) return developers.value
  return developers.value.filter(d => d.name.toLowerCase().includes(devSearchQuery.value.toLowerCase()))
})

const { data: payload, pending, refresh } = await useFetch<{ projects: any[] }>('/api/projects', {
  query: filters,
  watch: false
})

const projects = computed(() => payload.value?.projects || [])

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.type) count++
  if (filters.minPrice) count++
  if (filters.maxPrice) count++
  if (filters.bedrooms) count++
  if (filters.bathrooms) count++
  if (filters.status && filters.status !== 'active') count++
  if (filters.developerIds.length > 0) count++
  return count
})

function toggleDeveloper(id: string) {
  const index = filters.developerIds.indexOf(id)
  if (index === -1) {
    filters.developerIds.push(id)
  } else {
    filters.developerIds.splice(index, 1)
  }
}

function fetchProjects() {
  refresh()
}

function applyAdvanced() {
  showAdvanced.value = false
  fetchProjects()
}

async function detectLocation() {
  if (detecting.value) return
  detecting.value = true
  try {
    if (!navigator.geolocation) throw new Error('Geolocation not supported')
    
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
    })
    
    const { latitude: lat, longitude: lng } = pos.coords
    const data = await $fetch<{ name: string }>('/api/regions/detect', {
      query: { lat, lng }
    })
    
    if (data?.name) {
      suggestedCity.value = data.name
    }
  } catch (err) {
    console.error('Geolocation error:', err)
  } finally {
    detecting.value = false
  }
}

function useSuggestedCity() {
  filters.city = suggestedCity.value
  suggestedCity.value = ''
  fetchProjects()
}

onMounted(() => {
  // Auto-detect on page load
  detectLocation()
})

function handlePriceChange() {
  if (!priceRange.value) {
    filters.minPrice = ''
    filters.maxPrice = ''
  } else {
    const [min, max] = priceRange.value.split('-')
    if (min) filters.minPrice = (parseInt(min) * 1000000).toString()
    if (max) filters.maxPrice = (parseInt(max) * 1000000).toString()
  }
  fetchProjects()
}

let searchTimer: any = null
function debouncedSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => fetchProjects(), 500)
}

function resetFilters() {
  Object.assign(filters, {
    q: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    sort: 'newest',
    bedrooms: null,
    bathrooms: null,
    status: '',
    developerIds: []
  })
  priceRange.value = ''
  devSearchQuery.value = ''
  suggestedCity.value = ''
  fetchProjects()
}

useHead({ title: 'Cari Proyek Hunian - Proferti' })
</script>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-slide-up {
  animation: slide-up 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

/* Custom Scrollbar for Drawer */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>

<template>
  <div class="relative min-h-screen bg-[#0a0f1a] font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
    

    <!-- Satellite Intelligence HUD (Right: Satellite & Flood) -->
    <div class="fixed top-28 right-8 z-[100] animate-fade-in">
      <div class="bg-white/70 backdrop-blur-2xl border border-white/40 p-2 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-2">
        <button @click="toggleSatelliteLayer" class="flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all border active:scale-95" :class="showSatelliteLayer ? 'bg-violet-100 text-violet-700 border-violet-200' : 'bg-black/[0.04] text-slate-600 border-black/[0.08] hover:bg-black/[0.08] hover:text-slate-900'">
          <LucideRocket :size="13" />
          <span class="text-[10px] font-extrabold uppercase tracking-[0.15em]">{{ showSatelliteLayer ? 'Orbit On' : 'Satelit' }}</span>
        </button>
        <button @click="toggleFloodLayer" class="flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all border active:scale-95" :class="showFloodLayer ? 'bg-cyan-100 text-cyan-700 border-cyan-200' : 'bg-black/[0.04] text-slate-600 border-black/[0.08] hover:bg-black/[0.08] hover:text-slate-900'">
          <LucideWaves :size="13" />
          <span class="text-[10px] font-extrabold uppercase tracking-[0.15em]">{{ showFloodLayer ? 'Flood On' : 'Banjir' }}</span>
        </button>
        <div v-if="showFloodLayer" class="flex items-center bg-black/[0.04] rounded-xl border border-black/[0.08] ml-1 animate-fade-in">
          <div class="flex flex-col px-3 py-1.5">
            <span class="text-[7px] font-black text-slate-500 uppercase tracking-wider">From</span>
            <input v-model="startDate" type="date" class="bg-transparent text-[10px] font-bold text-slate-800 outline-none cursor-pointer" />
          </div>
          <div class="w-px h-5 bg-black/[0.12]"></div>
          <div class="flex flex-col px-3 py-1.5">
            <span class="text-[7px] font-black text-slate-500 uppercase tracking-wider">To</span>
            <input v-model="endDate" type="date" class="bg-transparent text-[10px] font-bold text-slate-800 outline-none cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
    <!-- Top 5 Flood Cities (Dynamic based on Date) -->
    <Transition name="slide-left">
      <div v-if="showFloodLayer && topFloodCities.length > 0" class="fixed top-[220px] right-8 z-[100] w-[240px] animate-fade-in">
        <div class="bg-white/70 backdrop-blur-2xl border border-white/40 p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
           <div class="flex items-center gap-2 mb-4">
              <div class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              <h3 class="text-[9px] font-black text-slate-900 uppercase tracking-[0.15em]">Top 5 Wilayah Banjir</h3>
           </div>
           <div class="space-y-3">
              <div v-for="(city, index) in topFloodCities" :key="city.admin_code" class="flex items-center gap-3 group/city">
                 <div class="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-400 group-hover/city:bg-cyan-500 group-hover/city:text-white transition-all">
                    {{ index + 1 }}
                 </div>
                 <div class="flex-1 min-w-0">
                    <p class="text-[10px] font-extrabold text-slate-800 truncate">{{ city.admin_name }}</p>
                    <div class="flex items-center gap-1.5">
                       <span class="text-[8px] font-bold text-cyan-600">{{ city.total_area_ha.toFixed(1) }} ha</span>
                       <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                       <span class="text-[8px] font-semibold text-slate-400">{{ city.total_detections }} titik</span>
                    </div>
                 </div>
              </div>
           </div>
           <div class="mt-4 pt-3 border-t border-black/[0.05]">
              <p class="text-[7px] font-bold text-slate-400 uppercase tracking-widest text-center">Data real-time Sentinel-1</p>
           </div>
        </div>
      </div>
    </Transition>

    <!-- Centered Legend Group (Bottom Center) -->
    <div class="fixed bottom-12 left-0 w-full z-[150] pointer-events-none flex flex-col items-center gap-4">
      
      <!-- Satellite Intel (Active when Flood is ON) -->
      <Transition name="slide-up">
        <div v-if="showFloodLayer" class="pointer-events-auto bg-slate-900/90 backdrop-blur-3xl border border-white/10 p-3.5 px-6 rounded-[28px] shadow-2xl flex items-center gap-8 ring-1 ring-white/5 animate-fade-in-up">
          <div class="flex items-center gap-3 border-r border-white/10 pr-6">
            <div class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
            <h4 class="text-[9px] font-black text-white uppercase tracking-[0.2em]">Satellite Intel</h4>
          </div>
          
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-md bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"></div>
              <p class="text-[8px] font-black text-white uppercase tracking-widest">Observed Flood</p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-md bg-slate-800 border border-slate-700"></div>
              <p class="text-[8px] font-black text-white uppercase tracking-widest">Exclusion Area</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- General Projects Legend -->
      <div class="pointer-events-auto bg-white/80 backdrop-blur-2xl border border-white/40 p-3 px-6 rounded-2xl shadow-xl flex items-center gap-8 animate-fade-in-up">
        <div class="flex items-center gap-3">
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
          <span class="text-[9px] font-black text-slate-700 uppercase tracking-widest">Proyek Aktif</span>
        </div>
        <div class="w-px h-4 bg-slate-200"></div>
        <div class="flex items-center gap-3">
          <div class="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[8px] font-black text-emerald-600 shadow-sm">12</div>
          <span class="text-[9px] font-black text-slate-700 uppercase tracking-widest">Clusters</span>
        </div>
      </div>
    </div>

    <!-- Minimalist Location Toast (Top Center) -->
    <Transition
      enter-active-class="transform transition duration-700 cubic-bezier(0.19, 1, 0.22, 1)"
      enter-from-class="-translate-y-20 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="-translate-y-20 opacity-0 scale-95"
    >
      <div v-if="suggestedCity" class="fixed top-28 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
        <div class="pointer-events-auto bg-white/75 backdrop-blur-3xl border border-white/40 px-5 py-3 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex items-center gap-8">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
              <LucideLocate :size="15" class="animate-pulse" />
            </div>
            <div class="flex flex-col">
              <p class="text-[12px] font-black text-slate-900 tracking-tight leading-none">Lihat di <span class="text-emerald-700 underline underline-offset-4 decoration-emerald-500/30">{{ suggestedCity }}</span>?</p>
              <p class="text-[9px] font-extrabold text-slate-600 uppercase tracking-widest mt-1.5">Lokasi Terdeteksi</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="useSuggestedCity" class="bg-slate-900 text-white px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-sm">
              Ya
            </button>
            <button @click="suggestedCity = ''" class="px-4 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all font-black text-[9px] uppercase tracking-widest border border-rose-100/50">
              Tidak
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- GPS Permission Error Toast -->
    <Transition
      enter-active-class="transform transition duration-700 ease-out"
      enter-from-class="translate-y-20 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-20 opacity-0 scale-95"
    >
      <div v-if="permissionError" class="fixed bottom-12 left-1/2 -translate-x-1/2 z-[3000] w-full max-w-lg px-8">
        <div class="bg-white border-2 border-red-100 p-6 rounded-[32px] shadow-2xl flex items-center gap-6">
          <div class="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
            <LucideMapPin :size="20" />
          </div>
          <div class="flex-1">
            <p class="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Akses GPS Diblokir</p>
            <p class="text-xs font-bold text-primary leading-relaxed">
              Silakan klik ikon <span class="bg-slate-100 px-1.5 py-0.5 rounded text-primary inline-flex items-center gap-1"><LucideSlidersHorizontal :size="10" /> Tune</span> di sebelah URL untuk mengaktifkan lokasi.
            </p>
          </div>
          <button @click="permissionError = false" class="text-slate-300 hover:text-primary transition-colors">
            <LucideX :size="18" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- Real Mapbox Canvas -->
    <main class="fixed inset-0 pt-20 overflow-hidden bg-[#0a0f1a]">
       <div ref="mapContainer" class="w-full h-full"></div>
       <div v-if="pending || !mapReady" class="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0f1a]/80 backdrop-blur-xl">
          <div class="flex flex-col items-center gap-6">
             <div class="relative"><div class="w-16 h-16 border-2 border-white/[0.06] border-t-emerald-400/60 rounded-full animate-spin"></div><div class="absolute inset-2 border-2 border-white/[0.03] border-b-violet-400/40 rounded-full animate-spin" style="animation-direction:reverse;animation-duration:1.5s"></div></div>
             <p class="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">Loading Intelligence</p>
          </div>
       </div>
    </main>

    <!-- Sidebar Trigger Button (Top Left) -->
    <button 
      v-if="!isSidebarOpen"
      @click="isSidebarOpen = true"
      class="fixed top-28 left-6 z-[101] group flex items-center gap-3 bg-white/70 backdrop-blur-2xl border border-white/40 pl-3 pr-5 py-2.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/90 transition-all duration-500 active:scale-95 animate-fade-in"
    >
       <div class="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500/20 transition-all">
          <LucideLayoutList :size="15" />
       </div>
       <div class="flex flex-col items-start leading-none">
          <span class="text-[10px] font-extrabold text-slate-900 uppercase tracking-[0.15em]">Daftar Hunian</span>
          <span class="text-[9px] font-semibold text-slate-600 tracking-wider">{{ projects.length }} Properties</span>
       </div>
    </button>

    <!-- Collapsible Discovery Console (Top Left) -->
    <aside 
      class="absolute left-6 top-28 z-40 transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1)"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+40px)]'"
    >
       <!-- Sidebar Content (Glass White) -->
       <div class="pointer-events-auto bg-white/75 backdrop-blur-3xl rounded-2xl border border-white/40 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden w-[340px] relative max-h-[calc(100vh-200px)]">
          <div class="p-5 border-b border-black/[0.03]">
             <div class="flex items-center justify-between mb-5">
                 <div class="flex items-center gap-2.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <h2 class="text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em]">Daftar Hunian</h2>
                 </div>
                <button @click="isSidebarOpen = false" class="w-7 h-7 bg-black/[0.03] hover:bg-black/[0.06] text-slate-400 hover:text-slate-600 rounded-lg flex items-center justify-center transition-all border border-black/[0.05]" title="Minimize">
                   <LucideX :size="12" />
                </button>
             </div>
             <div class="mb-3 flex items-center gap-2.5 bg-black/[0.04] border border-black/[0.08] rounded-xl px-3.5 py-2.5 relative group/select hover:border-black/[0.15] transition-all">
                <LucideMapPin :size="14" class="text-emerald-600" />
                <select v-model="filters.city" @change="fetchProjects" class="bg-transparent border-none outline-none font-bold text-[11px] mr-7 appearance-none cursor-pointer uppercase tracking-[0.12em] text-slate-800 w-full">
                   <option value="">Seluruh Indonesia</option>
                   <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
                </select>
                <button @click="detectLocation" :disabled="detecting" class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-black/[0.06] text-slate-400 hover:text-emerald-700 transition-all">
                   <LucideLocate :size="12" :class="{ 'animate-spin': detecting }" />
                </button>
             </div>
             <div class="flex items-center gap-3 bg-black/[0.04] border border-black/[0.08] rounded-xl px-3.5 py-3 group focus-within:border-emerald-600/40 transition-all">
                <LucideSearch :size="14" class="text-slate-400 group-focus-within:text-emerald-600" />
                <input v-model="filters.q" @input="debouncedSearch" placeholder="Cari hunian..." class="bg-transparent border-none outline-none font-bold text-[12px] w-full text-slate-900 placeholder:text-slate-400" />
             </div>
          </div>

          <div class="flex-1 overflow-y-auto no-scrollbar p-4 space-y-5">
              <div v-for="(devProjects, devName) in groupedProjects" :key="devName">
                <button @click="toggleDeveloper(devName)" class="w-full flex items-center justify-between px-1 mb-3 group/dev">
                   <div class="flex items-center gap-2.5">
                      <div class="w-0.5 h-3.5 rounded-full transition-all group-hover/dev:h-5" :class="getDeveloperColor(devName).bg + ' group-hover/dev:' + getDeveloperColor(devName).bg"></div>
                      <h3 class="text-[10px] font-extrabold text-slate-700 uppercase tracking-[0.2em] group-hover/dev:text-slate-900 transition-colors">{{ devName }}</h3>
                   </div>
                   <div class="flex items-center gap-2">
                      <span class="text-[9px] font-bold text-slate-500">{{ devProjects.length }}</span>
                      <LucideChevronRight :size="12" class="text-slate-400 transition-transform duration-300" :class="{ 'rotate-90': expandedDevelopers[devName] }" />
                   </div>
                </button>

                <div v-if="expandedDevelopers[devName]" class="space-y-2 animate-fade-in">
                   <button 
                      v-for="p in devProjects" 
                      :key="p.id"
                      @click="focusProject(p)"
                      class="w-full flex items-center gap-3.5 p-3 rounded-xl transition-all duration-300 group/item border"
                      :class="selectedProject?.id === p.id 
                        ? 'bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] ' + getDeveloperColor(devName).border 
                        : 'hover:bg-white/60 border-transparent'"
                   >
                      <div class="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-black/[0.05]">
                         <img :src="p.image || 'https://www.dummyimg.in/placeholder?width=400&height=300'" class="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                         <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div class="flex-1 text-left min-w-0">
                         <h4 class="text-[11px] font-extrabold text-slate-900 truncate mb-0.5">{{ p.name }}</h4>
                         <div class="flex items-center gap-2">
                            <span class="text-[10px] font-bold text-emerald-700">{{ formatPropertyPrice(p.startPrice) }}</span>
                            <span class="w-1 h-1 rounded-full bg-slate-400"></span>
                            <span class="text-[9px] font-semibold text-slate-600 truncate">{{ p.location.city }}</span>
                         </div>
                      </div>
                      <LucideChevronRight :size="11" class="text-slate-300 group-hover/item:text-slate-500 transition-all" />
                   </button>
                </div>
             </div>
          </div>
       </div>
    </aside>



    <!-- Right Sidebar Detail (Premium Elite Console) -->
    <!-- Right Floating Detail Card (Premium Elite Console) -->
    <Transition
       enter-active-class="transform transition duration-700 cubic-bezier(0.19, 1, 0.22, 1)"
       enter-from-class="translate-y-20 opacity-0 scale-95"
       enter-to-class="translate-y-0 opacity-100 scale-100"
       leave-active-class="transform transition duration-500 ease-in"
       leave-from-class="translate-y-0 opacity-100 scale-100"
       leave-to-class="translate-y-20 opacity-0 scale-95"
     >
        <div v-if="selectedProject" class="fixed bottom-12 right-8 w-[400px] z-[200]">
          <div class="bg-white/80 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white/40 overflow-hidden flex flex-col group/card max-h-[70vh]">
            <!-- Header Image -->
            <div class="relative h-48 shrink-0 overflow-hidden bg-slate-100">
               <img :src="selectedProject.image || 'https://www.dummyimg.in/placeholder?width=1200&height=800'" class="w-full h-full object-cover" />
               <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
               <button @click="selectedProject = null" class="absolute top-4 right-4 w-8 h-8 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/20"><LucideX :size="14" /></button>
               <div class="absolute bottom-4 left-6">
                  <span class="bg-emerald-500 text-white px-2.5 py-1 rounded-md text-[7px] font-black uppercase tracking-widest">{{ selectedProject.type || 'Eksklusif' }}</span>
               </div>
            </div>

            <!-- Content -->
            <div class="p-6 overflow-y-auto no-scrollbar space-y-6">
               <div class="flex justify-between items-start">
                  <div>
                    <NuxtLink :to="`/developers/${selectedProject.developer.slug}`" class="text-[9px] font-extrabold text-emerald-700 uppercase tracking-widest mb-1 block hover:underline">
                      {{ selectedProject.developer?.name }}
                    </NuxtLink>
                    <h3 class="text-xl font-black text-slate-900 leading-tight">{{ selectedProject.name }}</h3>
                    <p class="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1.5 uppercase tracking-wider"><LucideMapPin :size="10" /> {{ selectedProject.location.city }}</p>
                  </div>
                  <div v-if="selectedProjectFlood" class="flex flex-col items-end gap-1">
                     <span class="text-[7px] font-black text-slate-400 uppercase tracking-widest">Flood Risk</span>
                     <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border" :class="selectedProjectFlood.status === 'flood_detected' ? 'bg-rose-50 text-rose-500 border-rose-100' : 'bg-emerald-50 text-emerald-500 border-emerald-100'">
                        {{ selectedProjectFlood.status === 'flood_detected' ? 'Warning' : 'Low' }}
                     </span>
                  </div>
               </div>

               <div class="grid grid-cols-2 gap-3">
                  <div class="bg-black/[0.03] p-3.5 rounded-2xl border border-black/[0.05]">
                    <p class="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Investment</p>
                    <p class="text-[13px] font-black text-slate-900">{{ formatPropertyPrice(selectedProject.startPrice) }}</p>
                  </div>
                  <div class="bg-black/[0.03] p-3.5 rounded-2xl border border-black/[0.05]">
                    <p class="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Units</p>
                    <p class="text-[13px] font-black text-slate-900">{{ selectedProject.units_count || '12' }} Units</p>
                  </div>
               </div>

               <div v-if="selectedProjectFlood?.status === 'flood_detected'" class="bg-rose-50 p-4 rounded-2xl border border-rose-100/50 flex items-start gap-3">
                  <LucideWaves class="text-rose-500 shrink-0" :size="16" />
                  <p class="text-[9px] font-bold text-rose-600 leading-relaxed uppercase tracking-wider">Terdeteksi genangan air di sekitar lokasi via Sentinel-1 SAR.</p>
               </div>

               <div class="grid grid-cols-2 gap-3">
                 <button class="bg-slate-100 text-slate-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-200 transition-all active:scale-95">
                    <LucideZap :size="14" />
                 </button>
                 <NuxtLink :to="`/projects/${selectedProject.slug}`" class="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10 text-center flex items-center justify-center">
                    Lihat Detail
                 </NuxtLink>
               </div>
               
               <button class="w-full border-2 border-slate-900 text-slate-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all active:scale-95">
                  Hubungi Developer
               </button>
            </div>
          </div>
        </div>
     </Transition>n>

  </div>
</template>

<script setup lang="ts">
import { 
  LucideSearch, LucideMapPin, LucideDollarSign, 
  LucideArrowRight, LucideBuilding, LucideX, LucideLayoutGrid,
  LucideLocate, LucideChevronLeft, LucideChevronRight,
  LucideLayoutList, LucideSlidersHorizontal, LucideWaves, LucideRocket,
  LucideZap, LucideShieldCheck, LucideClock
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const config = useRuntimeConfig()
const MAPBOX_TOKEN = config.public.mapboxToken

definePageMeta({
  hideFooter: true // Custom meta to hide footer in default layout
})

const filters = reactive({
  q: '',
  city: '',
  minPrice: '',
  maxPrice: ''
})

const isSidebarOpen = ref(true)
const mapContainer = ref<HTMLElement | null>(null)
const map = shallowRef<mapboxgl.Map | null>(null) // Use shallowRef to prevent deep reactivity
const mapReady = ref(false)
const selectedProject = ref<any>(null)
const selectedProjectFlood = ref<any>(null)

// Date Range Filter (Default 2 weeks back)
const today = new Date('2026-05-02') // Use static date based on simulation
const twoWeeksAgo = new Date(today)
twoWeeksAgo.setDate(today.getDate() - 14)

const startDate = ref(twoWeeksAgo.toISOString().split('T')[0])
const endDate = ref(today.toISOString().split('T')[0])

// Watch dates to refresh map
watch([startDate, endDate], () => {
  if (showFloodLayer.value) {
    addFloodLayer()
  }
})

const suggestedCity = ref('')
const { data: locData } = await useFetch<{ locations: any[] }>('/api/locations')
const cities = computed(() => {
  const list = locData.value?.locations || []
  const names = list.map(l => l.city || l.name)
  return [...new Set(names)].sort()
})
const detecting = ref(false)
const markers = shallowRef<mapboxgl.Marker[]>([]) // Use shallowRef for markers too

const userLocation = ref<{ lng: number, lat: number } | null>(null)
const userMarker = shallowRef<mapboxgl.Marker | null>(null)
const permissionError = ref(false)

const { data: payload, pending, refresh } = await useFetch<any>('/api/projects', {
  query: computed(() => ({
    ...filters,
    limit: 100 // Ensure all 3 developers are loaded
  }))
})

const showFloodLayer = ref(false)
const showSatelliteLayer = ref(false)
// No more massive GeoJSON fetch!
const floodData = ref({ features: [] }) 
const { data: satelliteData } = await useFetch('/api/gfm/scenes/geojson')
const { data: riskSummaryData } = await useFetch<any[]>('/api/gfm/risk-summary', {
  query: computed(() => ({
    start: startDate.value,
    end: endDate.value
  }))
})

const topFloodCities = computed(() => {
  if (!riskSummaryData.value) return []
  return riskSummaryData.value
    .filter(r => r.admin_level === 'city')
    .slice(0, 5)
})

const { data: geoData } = await useFetch('/api/regions/geojson')

const projects = computed(() => payload.value?.projects || [])

function getProjectRisk(p: any) {
  if (!p || !p.location || !p.location.city || !riskSummaryData.value) return null
  const city = p.location.city.toLowerCase()
  return riskSummaryData.value.find((r: any) => 
    r.admin_level === 'city' && r.admin_name && r.admin_name.toLowerCase().includes(city)
  )
}

function getRiskBadgeClass(risk: any) {
  if (!risk || typeof risk.risk_score !== 'number') return 'bg-slate-500/20 text-slate-400'
  if (risk.risk_score > 5) return 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
  if (risk.risk_score > 1) return 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
  return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
}

// Group projects by developer
const groupedProjects = computed(() => {
  const groups: Record<string, any[]> = {}
  projects.value.forEach((p: any) => {
    const devName = p.developer?.name || 'Lainnya'
    if (!groups[devName]) groups[devName] = []
    groups[devName].push(p)
  })
  return groups
})

function getDeveloperColor(devName: string): { bg: string, hex: string, shadow: string, border: string } {
  const colors: Record<string, { bg: string, hex: string, shadow: string, border: string }> = {
    'Paramount Land': { bg: 'bg-emerald-500', hex: '#10b981', shadow: 'rgba(16, 185, 129, 0.5)', border: 'border-emerald-400/50' },
    'Ciputra Group': { bg: 'bg-cyan-500', hex: '#06b6d4', shadow: 'rgba(6, 182, 212, 0.5)', border: 'border-cyan-400/50' },
    'Pakuwon Group': { bg: 'bg-rose-500', hex: '#f43f5e', shadow: 'rgba(244, 63, 94, 0.5)', border: 'border-rose-400/50' }
  }
  
  return colors[devName] || { 
    bg: 'bg-amber-500', 
    hex: '#f59e0b', 
    shadow: 'rgba(245, 158, 11, 0.5)', 
    border: 'border-amber-400/50' 
  }
}

// Track expanded/collapsed states
const expandedDevelopers = ref<Record<string, boolean>>({})

// Initialize all developers as expanded by default
watch(groupedProjects, (newGroups) => {
  Object.keys(newGroups).forEach(dev => {
    if (expandedDevelopers.value[dev] === undefined) {
      expandedDevelopers.value[dev] = true
    }
  })
}, { immediate: true })

const toggleDeveloper = (devName: string) => {
  expandedDevelopers.value[devName] = !expandedDevelopers.value[devName]
}

function initMap() {
  if (!mapContainer.value) return
  
  mapboxgl.accessToken = MAPBOX_TOKEN
  
  map.value = markRaw(new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // Cinematic Earth View
    center: [106.8456, -6.2088], // Default to Jakarta
    zoom: 1.5, // Start from space
    pitch: 0, 
    projection: 'globe', // 3D Globe Projection
    antialias: true,
    dragRotate: true, // Enable rotation with right-click
    touchZoomRotate: true,
    scrollZoom: true,
    boxZoom: true
  }))


  map.value.on('load', () => {
    if (!map.value) return
    mapReady.value = true

    // Add Atmosphere & Fog for "Space" feel
    map.value.setFog({
      'range': [0.5, 10],
      'color': '#0f172a', // Space Blue
      'high-color': '#020617',
      'space-color': '#020617',
      'horizon-blend': 0.1,
      'star-intensity': 0.8 // Show stars!
    })

    // Event listeners to stop rotation during interaction
    map.value.on('mousedown', () => { userInteracting = true })
    map.value.on('mouseup', () => { userInteracting = false })
    map.value.on('dragstart', () => { userInteracting = true })
    map.value.on('movestart', () => { userInteracting = true })
    map.value.on('moveend', () => { userInteracting = false })
    
    // Add Province Layer with Interactivity
    if (geoData.value && map.value) {
      map.value.addSource('provinces', {
        type: 'geojson',
        data: geoData.value as any,
        generateId: true // Required for feature-state hover effects
      })

      // Province Fill (for Hover & Click detection)
      map.value.addLayer({
        id: 'provinces-fill',
        type: 'fill',
        source: 'provinces',
        paint: {
          'fill-color': '#ef4444',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.1,
            0
          ]
        }
      })

      // Province Outline (Red Dashed Line)
      map.value.addLayer({
        id: 'provinces-outline',
        type: 'line',
        source: 'provinces',
        paint: {
          'line-color': '#ef4444',
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            2.5,
            1.5
          ],
          'line-dasharray': [2, 2],
          'line-opacity': 0.8
        }
      })

      // Hover Effect Listeners
      let hoveredProvinceId: string | number | null = null
      
      map.value.on('mousemove', 'provinces-fill', (e) => {
        if (e.features && e.features.length > 0) {
          if (hoveredProvinceId !== null) {
            map.value?.setFeatureState(
              { source: 'provinces', id: hoveredProvinceId },
              { hover: false }
            )
          }
          hoveredProvinceId = e.features[0].id || null
          if (hoveredProvinceId !== null) {
            map.value?.setFeatureState(
              { source: 'provinces', id: hoveredProvinceId },
              { hover: true }
            )
          }
          map.value!.getCanvas().style.cursor = 'pointer'
        }
      })

      map.value.on('mouseleave', 'provinces-fill', () => {
        if (hoveredProvinceId !== null) {
          map.value?.setFeatureState(
            { source: 'provinces', id: hoveredProvinceId },
            { hover: false }
          )
        }
        hoveredProvinceId = null
        map.value!.getCanvas().style.cursor = ''
      })

      // Click Event
      map.value.on('click', 'provinces-fill', async (e) => {
        if (e.features && e.features.length > 0) {
          const props = e.features[0].properties
          const provinceName = props?.name || 'Provinsi'
          const provinceKode = props?.kode
          
          if (provinceKode) {
            // Fetch cities for this province
            try {
              const cityGeoJSON = await $fetch<any>(`/api/regions/geojson?parent=${provinceKode}`)
              
              if (cityGeoJSON && map.value) {
                // Remove existing city layer if any
                if (map.value.getSource('cities')) {
                  if (map.value.getLayer('cities-outline')) map.value.removeLayer('cities-outline')
                  if (map.value.getLayer('cities-fill')) map.value.removeLayer('cities-fill')
                  map.value.removeSource('cities')
                }

                map.value.addSource('cities', {
                  type: 'geojson',
                  data: cityGeoJSON
                })

                map.value.addLayer({
                  id: 'cities-fill',
                  type: 'fill',
                  source: 'cities',
                  paint: {
                    'fill-color': '#3b82f6', // Blue
                    'fill-opacity': 0.05
                  }
                })

                map.value.addLayer({
                  id: 'cities-outline',
                  type: 'line',
                  source: 'cities',
                  paint: {
                    'line-color': '#3b82f6',
                    'line-width': 1,
                    'line-dasharray': [2, 1],
                    'line-opacity': 0.5
                  }
                })

                // Add popup for city info on click
                map.value.on('click', 'cities-fill', (ev) => {
                  if (ev.features && ev.features.length > 0) {
                    const cProps = ev.features[0].properties
                    new mapboxgl.Popup({ className: 'elite-popup' })
                      .setLngLat(ev.lngLat)
                      .setHTML(`
                        <div class="p-3 bg-slate-900 text-white rounded-xl border border-white/10 shadow-2xl">
                          <p class="text-[8px] font-black uppercase tracking-widest text-blue-400 mb-1">Kota / Kabupaten</p>
                          <h3 class="text-sm font-black">${cProps?.name}</h3>
                        </div>
                      `)
                      .addTo(map.value!)
                  }
                })
              }
            } catch (err) {
              console.error('Failed to fetch city GeoJSON', err)
            }
          }

          new mapboxgl.Popup({ className: 'elite-popup' })
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="p-4 bg-slate-900 text-white rounded-2xl border border-white/10 shadow-2xl">
                <p class="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Wilayah Administrasi</p>
                <h3 class="text-lg font-black">${provinceName}</h3>
                <div class="mt-3 pt-3 border-t border-white/5 shadow-sm">
                   <p class="text-[9px] font-bold text-slate-400 leading-relaxed uppercase tracking-wider">Batas kota/kabupaten telah ditampilkan.</p>
                </div>
              </div>
            `)
            .addTo(map.value!)
        }
      })
    }
    
    // Suppress small shops and POIs for a cleaner "Elite" look
    const layers = map.value?.getStyle().layers
    if (layers) {
      layers.forEach((layer: any) => {
        // Hide POIs
        if (layer.id.includes('poi') || layer.id.includes('business')) {
          map.value?.setLayoutProperty(layer.id, 'visibility', 'none')
        }
        
        // Stylize roads with "Ghost Grid" hierarchy
        if (layer.id.includes('road') || layer.id.includes('bridge')) {
          if (layer.type === 'line') {
            // Major Arteries: Clean Crystal White
            if (layer.id.includes('motorway') || layer.id.includes('primary')) {
              map.value?.setPaintProperty(layer.id, 'line-color', '#ffffff')
              map.value?.setPaintProperty(layer.id, 'line-opacity', 0.4)
              map.value?.setPaintProperty(layer.id, 'line-width', 0.8)
            } 
            // Local Roads: Subtle Slate Shadow
            else {
              map.value?.setPaintProperty(layer.id, 'line-color', '#94a3b8')
              map.value?.setPaintProperty(layer.id, 'line-opacity', 0.15)
              map.value?.setPaintProperty(layer.id, 'line-width', 0.5)
            }
          }
        }
      })
    }

    updateMapData()
    if (showFloodLayer.value) {
      addFloodLayer()
    }
    if (showSatelliteLayer.value) {
      addSatelliteLayer()
    }

    // Start subtle rotation
    rotateGlobe()
  })

  // Global click handler (Cleanup: removed regional summary to focus on projects)
  map.value.on('click', (e) => {
    const popups = document.getElementsByClassName('mapboxgl-popup')
    for (const p of popups) p.remove()
  })
}

let userInteracting = false

function rotateGlobe() {
  const currentMap = map.value
  if (!currentMap || userInteracting) {
    requestAnimationFrame(rotateGlobe)
    return
  }
  
  const zoom = currentMap.getZoom()
  if (zoom < 4) { // Only rotate when zoomed out
    const center = currentMap.getCenter()
    center.lng += 0.05 // Subtle rotation
    currentMap.setCenter(center)
  }
  requestAnimationFrame(rotateGlobe)
}

function addFloodLayer(shouldFit = false) {
  const currentMap = map.value
  if (!currentMap || !mapReady.value) return

  if (currentMap.getSource('flood-zones')) {
    currentMap.setLayoutProperty('flood-fill', 'visibility', 'visible')
    currentMap.setLayoutProperty('flood-outline', 'visibility', 'visible')
    currentMap.setLayoutProperty('flood-glow', 'visibility', 'visible')
    currentMap.setLayoutProperty('exclusion-fill', 'visibility', 'visible')
    // Fix: Force update MVT tiles if dates changed
    const newTiles = [window.location.origin + `/api/flood-mvt/{z}/{x}/{y}.pbf?start=${startDate.value}&end=${endDate.value}&_t=${Date.now()}`]
    const source = currentMap.getSource('flood-zones') as any
    if (source && typeof source.setTiles === 'function') {
      source.setTiles(newTiles)
    }
    return
  }

  currentMap.addSource('flood-zones', {
    type: 'vector',
    tiles: [window.location.origin + `/api/flood-mvt/{z}/{x}/{y}.pbf?start=${startDate.value}&end=${endDate.value}&_t=${Date.now()}`],
    minzoom: 0,
    maxzoom: 22
  })

  // Exclusion Mask (Dark Translucent for Radar Shadow/Urban Canyons)
  currentMap.addLayer({
    id: 'exclusion-fill',
    type: 'fill',
    source: 'flood-zones',
    'source-layer': 'exclusion_layer',
    paint: {
      'fill-color': '#0f172a', // Deep Navy/Slate
      'fill-opacity': 0.5,
      'fill-outline-color': '#334155'
    }
  })

  // Flood Glow (Blurred background for "Heat" feel)
  currentMap.addLayer({
    id: 'flood-glow',
    type: 'fill',
    source: 'flood-zones',
    'source-layer': 'flood_layer',
    paint: {
      'fill-color': '#00ffff',
      'fill-opacity': 0.3,
      'fill-translate': [0, 0]
    }
  })

  // Add blur effect via filter if supported, or just use opacity layers
  
  // Flood Fill (Cinematic Cyan - Higher Opacity)
  currentMap.addLayer({
    id: 'flood-fill',
    type: 'fill',
    source: 'flood-zones',
    'source-layer': 'flood_layer',
    paint: {
      'fill-color': '#00ffff', // Electric Cyan
      'fill-opacity': 0.8,
      'fill-outline-color': '#ffffff'
    }
  })

  // Flood Outline (Glowing White/Cyan)
  currentMap.addLayer({
    id: 'flood-outline',
    type: 'line',
    source: 'flood-zones',
    'source-layer': 'flood_layer',
    paint: {
      'line-color': '#ffffff',
      'line-width': 2,
      'line-opacity': 1
    }
  })

  // Note: fitBounds with MVT is slightly different since we don't have the full GeoJSON in memory.
  // For now, we'll keep the previous behavior or use a specific viewpoint.
}

let animationFrames: number[] = []
const satelliteMarkers = shallowRef<mapboxgl.Marker[]>([])

function animateSatellite(marker: mapboxgl.Marker, startLngLat: [number, number], isDescending: boolean) {
  const speed = 0.001 // Kecepatan gerak (full globe)
  let progress = 0

  // Inisialisasi progress agar mulai di posisi kordinat asli (0 sampai 0.5 adalah fase di depan bumi)
  if (isDescending) {
    progress = 0.5 * (90 - startLngLat[1]) / 180
  } else {
    progress = 0.5 * (startLngLat[1] + 90) / 180
  }

  function step() {
    progress += speed
    if (progress > 1) progress -= 1 // Loop kembali tanpa putus

    let lng, lat
    if (progress < 0.5) {
      // Fase Utama (Sisi depan bumi / melewati kordinat asli)
      const phase = progress / 0.5
      lng = startLngLat[0]
      if (isDescending) {
        lat = 90 - (phase * 180) // Turun dari Utara ke Selatan
      } else {
        lat = -90 + (phase * 180) // Naik dari Selatan ke Utara
      }
    } else {
      // Fase Balik (Sisi belakang bumi / garis bujur seberang)
      const phase = (progress - 0.5) / 0.5
      lng = startLngLat[0] > 0 ? startLngLat[0] - 180 : startLngLat[0] + 180
      if (isDescending) {
        lat = -90 + (phase * 180) // Naik dari Selatan ke Utara
      } else {
        lat = 90 - (phase * 180) // Turun dari Utara ke Selatan
      }
    }

    marker.setLngLat([lng, lat])
    const frameId = requestAnimationFrame(step)
    animationFrames.push(frameId)
  }
  
  step()
}

function addSatelliteLayer() {
  const currentMap = map.value
  if (!currentMap || !mapReady.value || !satelliteData.value) return

  if (currentMap.getSource('satellite-footprints')) {
    currentMap.setLayoutProperty('satellite-fill', 'visibility', 'visible')
    currentMap.setLayoutProperty('satellite-outline', 'visibility', 'visible')
    return
  }

  currentMap.addSource('satellite-footprints', {
    type: 'geojson',
    data: satelliteData.value as any
  })

  // Fill Layer with Dynamic Coloring based on Orbit Direction
  currentMap.addLayer({
    id: 'satellite-fill',
    type: 'fill',
    source: 'satellite-footprints',
    paint: {
      'fill-color': [
        'match',
        ['get', 'orbit_direction'],
        'descending', '#06b6d4', // Cyan
        'ascending', '#8b5cf6',  // Violet
        '#64748b' // Default Slate
      ],
      'fill-opacity': 0.15
    }
  })

  // Glowing Outline
  currentMap.addLayer({
    id: 'satellite-outline',
    type: 'line',
    source: 'satellite-footprints',
    paint: {
      'line-color': [
        'match',
        ['get', 'orbit_direction'],
        'descending', '#22d3ee',
        'ascending', '#a78bfa',
        '#94a3b8'
      ],
      'line-width': 1,
      'line-opacity': 0.5
    }
  })

  // Popup on Click
  currentMap.on('click', 'satellite-fill', (e) => {
    if (!e.features || !e.features[0] || !e.features[0].properties) return
    const props = e.features[0].properties
    
    new mapboxgl.Popup({ className: 'satellite-popup' })
      .setLngLat(e.lngLat)
      .setHTML(`
        <div class="p-3 bg-slate-900 text-white rounded-lg border border-white/10 shadow-2xl">
          <p class="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">Satellite Intelligence</p>
          <p class="text-xs font-black mb-1">Platform: ${props.platform}</p>
          <p class="text-[10px] font-bold text-slate-300">Orbit: ${props.orbit_direction}</p>
          <p class="text-[10px] font-bold text-slate-300">Acquisition: ${new Date(props.acquisition_time).toLocaleString()}</p>
        </div>
      `)
      .addTo(currentMap)
  })

  // Hover cursor
  currentMap.on('mouseenter', 'satellite-fill', () => {
    currentMap.getCanvas().style.cursor = 'pointer'
  })
  currentMap.on('mouseleave', 'satellite-fill', () => {
    currentMap.getCanvas().style.cursor = ''
  })

  // --- Cinematic Satellite Animation ---
  // Hapus marker satelit lama jika ada
  satelliteMarkers.value.forEach(m => m.remove())
  satelliteMarkers.value = []
  animationFrames.forEach(f => cancelAnimationFrame(f))
  animationFrames = []

  const orbitFeatures: any[] = []

  // Ambil 2 titik terjauh untuk simulasi jalur orbit
  const features = (satelliteData.value as any).features
  if (features && features.length > 1) {
    const sorted = [...features].sort((a, b) => b.properties.acquisition_time.localeCompare(a.properties.acquisition_time))
    
    // Tampilkan hanya 1 satelit agar akurat sesuai dunia nyata (Sentinel-1)
    const numSats = 1
    
    for (let i = 0; i < numSats; i++) {
      const feat = features[i * 5] || features[0]
      let start: [number, number] = [0, 0]
      
      if (feat.geometry.type === 'MultiPolygon') {
        const polygon = feat.geometry.coordinates[0]
        const ring = polygon[0]
        start = [ring[0][0], ring[0][1]]
      } else {
        const ring = feat.geometry.coordinates[0]
        start = [ring[0][0], ring[0][1]]
      }

      // Hitung koordinat orbit (Depan & Belakang Bumi)
      const backLng = start[0] > 0 ? start[0] - 180 : start[0] + 180
      orbitFeatures.push(
        {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: [[start[0], 90], [start[0], -90]] },
          properties: { orbit: 'front' }
        },
        {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: [[backLng, -90], [backLng, 90]] },
          properties: { orbit: 'back' }
        }
      )

      // Buat Ikon Satelit dengan Label ala Gambar Referensi
      const el = document.createElement('div')
      el.className = 'satellite-label-marker'
      el.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="bg-indigo-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-indigo-400/50 shadow-2xl flex items-center gap-2 mb-2 group/sat pointer-events-auto cursor-pointer">
            <div class="w-2 h-2 bg-indigo-300 rounded-full animate-ping"></div>
            <span class="text-[9px] font-black text-white uppercase tracking-tighter">${feat.properties.platform} - ${feat.properties.orbit_direction}</span>
          </div>
          <div class="w-0.5 h-12 bg-gradient-to-t from-transparent via-indigo-500/50 to-indigo-500/80"></div>
          <div class="bg-indigo-900 p-1.5 rounded-full border-2 border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.9)] text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7 9 3 5 7l4 4"/><path d="m17 11 4 4-4 4-4-4"/><path d="m8 12 4 4 6-6-4-4Z"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/></svg>
          </div>
        </div>
      `
      
      const marker = markRaw(new mapboxgl.Marker(el)
        .setLngLat(start))
        .addTo(currentMap)
      
      satelliteMarkers.value.push(marker)
      
      const isDescending = feat.properties.orbit_direction === 'descending'
      animateSatellite(marker, start, isDescending)
    }

    // Tambahkan/Update Garis Orbit Putus-putus
    if (currentMap.getSource('satellite-orbit-path')) {
      (currentMap.getSource('satellite-orbit-path') as any).setData({ type: 'FeatureCollection', features: orbitFeatures })
      currentMap.setLayoutProperty('satellite-orbit-line', 'visibility', 'visible')
    } else {
      currentMap.addSource('satellite-orbit-path', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: orbitFeatures }
      })
      currentMap.addLayer({
        id: 'satellite-orbit-line',
        type: 'line',
        source: 'satellite-orbit-path',
        paint: {
          'line-color': '#a78bfa',
          'line-width': 0.8,
          'line-dasharray': [4, 4],
          'line-opacity': 0.3
        }
      })
    }
  }
}

function toggleSatelliteLayer() {
  showSatelliteLayer.value = !showSatelliteLayer.value
  const currentMap = map.value
  if (!currentMap) return

  if (showSatelliteLayer.value) {
    addSatelliteLayer()
  } else {
    if (currentMap.getLayer('satellite-fill')) currentMap.setLayoutProperty('satellite-fill', 'visibility', 'none')
    if (currentMap.getLayer('satellite-outline')) currentMap.setLayoutProperty('satellite-outline', 'visibility', 'none')
    if (currentMap.getLayer('satellite-orbit-line')) currentMap.setLayoutProperty('satellite-orbit-line', 'visibility', 'none')
  }
}

function toggleFloodLayer() {
  showFloodLayer.value = !showFloodLayer.value
  const currentMap = map.value
  if (!currentMap) return

  if (showFloodLayer.value) {
    // Switch to Dark Style for high contrast
    currentMap.setStyle('mapbox://styles/mapbox/dark-v11')
    currentMap.once('style.load', () => {
      addFloodLayer(true) // Fit bounds on first activation
      updateMapData() 
    })
  } else {
    // Switch back to Satellite
    currentMap.setStyle('mapbox://styles/mapbox/satellite-streets-v12')
    currentMap.once('style.load', () => {
      updateMapData()
    })
  }
}

function updateUserLocationMarker() {
  const currentMap = map.value
  if (!currentMap || !userLocation.value) return

  // Remove existing user marker
  if (userMarker.value) {
    userMarker.value.remove()
  }

  // Create Custom Breathing Marker (High-Visibility Red)
  const el = document.createElement('div')
  el.className = 'user-location-beacon'
  el.innerHTML = `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-10 h-10 bg-rose-500/20 rounded-full animate-breath"></div>
      <div class="absolute w-6 h-6 bg-rose-500/40 rounded-full animate-breath-slow"></div>
      <div class="w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(244,63,94,0.6)] relative z-10"></div>
    </div>
  `

  userMarker.value = markRaw(new mapboxgl.Marker(el)
    .setLngLat([userLocation.value.lng, userLocation.value.lat]))
    .addTo(currentMap)
}

function getProjectCenter(p: any) {
  if (p.location?.latitude && p.location?.longitude) {
    return {
      lng: p.location.longitude,
      lat: p.location.latitude,
      polygon: p.polygon
    }
  }
  return null
}

async function focusProject(p: any) {
  if (!p) return
  selectedProject.value = p
  
  // Fetch flood status for this specific project
  try {
    const center = getProjectCenter(p)
    if (center) {
      const resp = await $fetch<any>(`/api/gfm/summary?lat=${center.lat}&lng=${center.lng}`)
      selectedProjectFlood.value = resp
    }
  } catch (e) {
    console.error('Failed to fetch project flood status', e)
    selectedProjectFlood.value = null
  }

  const center = getProjectCenter(p)
  if (center && map.value) {
    map.value.flyTo({
      center: [center.lng, center.lat],
      zoom: 16,
      pitch: 60,
      duration: 2500,
      essential: true
    })
    
    // Refresh polygons to show only the selected one
    updateMapData()
  }
}

let clusterEventsAdded = false;

function updateMapData() {
  const currentMap = map.value
  if (!currentMap || !mapReady.value) return

  // Clear existing markers
  clearProjectMarkers()

  // Ensure user marker stays
  updateUserLocationMarker()

  // Clear existing polygon layer if exists
  if (currentMap.getSource('projects-poly')) {
    if (currentMap.getLayer('projects-fill')) currentMap.removeLayer('projects-fill')
    if (currentMap.getLayer('projects-outline')) currentMap.removeLayer('projects-outline')
    currentMap.removeSource('projects-poly')
  }

  const features: any[] = []
  const pointFeatures: any[] = []

  projects.value.forEach((p: any) => {
    const center = getProjectCenter(p)
    if (!center) return

    const devName = p.developer?.name || 'Lainnya'
    const devColor = getDeveloperColor(devName)

    // Add to Polygon Features (Only if selected)
    if (p.polygon?.coordinates && selectedProject.value?.id === p.id) {
      features.push({
        type: 'Feature',
        geometry: p.polygon,
        properties: { 
          id: p.id, 
          name: p.name,
          color: devColor.hex
        }
      })
    }

    // Add to Point Features (For Clustering)
    pointFeatures.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [center.lng, center.lat]
      },
      properties: {
        project: p,
        devColor: devColor
      }
    })
  })
  // Add/Update Point Source with Clustering
  if (currentMap.getSource('project-points')) {
    (currentMap.getSource('project-points') as mapboxgl.GeoJSONSource).setData({
      type: 'FeatureCollection',
      features: pointFeatures
    })
  } else {
    currentMap.addSource('project-points', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: pointFeatures
      },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    })

    currentMap.addLayer({
      id: 'cluster-points-trigger',
      type: 'circle',
      source: 'project-points',
      paint: { 
        'circle-radius': 20,
        'circle-opacity': 0,
        'circle-stroke-width': 0
      }
    })

    if (!clusterEventsAdded) {
      currentMap.on('move', renderProjectMarkers)
      currentMap.on('moveend', renderProjectMarkers)
      currentMap.on('data', (e: any) => {
        if (e.sourceId === 'project-points' && e.isSourceLoaded) {
          renderProjectMarkers()
        }
      })
      clusterEventsAdded = true
    }
  }

  // Add GeoJSON Source for Polygons
  currentMap.addSource('projects-poly', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: features
    }
  })

  // Add Fill Layer
  currentMap.addLayer({
    id: 'projects-fill',
    type: 'fill',
    source: 'projects-poly',
    paint: {
      'fill-color': ['get', 'color'],
      'fill-opacity': 0.4
    }
  }, 'settlement-subdivision-label')

  // Add Outline Layer
  currentMap.addLayer({
    id: 'projects-outline',
    type: 'line',
    source: 'projects-poly',
    paint: {
      'line-color': ['get', 'color'],
      'line-width': 2.5,
      'line-opacity': 0.8
    }
  }, 'settlement-subdivision-label')

  // Initial render with retry
  setTimeout(() => renderProjectMarkers(), 100)
  setTimeout(() => renderProjectMarkers(), 500)
  setTimeout(() => renderProjectMarkers(), 1000)

  // Fit bounds if we have projects
  if (features.length > 0) {
    const bounds = new mapboxgl.LngLatBounds()
    features.forEach(f => {
      // GeoJSON Polygon coordinates are [lng, lat]
      f.geometry.coordinates[0].forEach((c: any) => bounds.extend(c))
    })
    currentMap.fitBounds(bounds, { padding: 100, duration: 2000 })
  }
}

const markersOnScreen = ref<Record<string, mapboxgl.Marker>>({})

function clearProjectMarkers() {
  markers.value.forEach(m => m.remove())
  markers.value = []
  
  for (const id in markersOnScreen.value) {
    markersOnScreen.value[id]?.remove()
  }
  markersOnScreen.value = {}
}

function renderProjectMarkers() {
  const currentMap = map.value
  if (!currentMap || !mapReady.value) return

  const newMarkers: Record<string, mapboxgl.Marker> = {}
  const queriedFeatures = currentMap.queryRenderedFeatures({ layers: ['cluster-points-trigger'] })

  queriedFeatures.forEach((f: any) => {
    const coords = (f.geometry as any).coordinates
    const props = f.properties
    
    // Parse project if it's serialized as a string (Mapbox behavior for GeoJSON properties)
    const project = typeof props.project === 'string' ? JSON.parse(props.project) : props.project
    const id = props.cluster ? `cluster-${props.cluster_id}` : `point-${project.id}`

    if (markersOnScreen.value[id]) {
      newMarkers[id] = markersOnScreen.value[id]
      return
    }

    let el: HTMLElement
    if (props.cluster) {
      el = document.createElement('div')
      el.className = 'custom-cluster-marker cursor-pointer'
      el.innerHTML = `
        <div class="w-12 h-12 bg-white/80 backdrop-blur-xl rounded-full border-2 border-emerald-500/30 shadow-[0_10px_40px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center text-emerald-700 transition-all hover:scale-110 active:scale-95 animate-solar-glow group">
           <span class="text-xs font-black leading-none mb-0.5">${props.point_count}</span>
           <span class="text-[6px] font-black uppercase tracking-widest text-emerald-600/50 group-hover:text-emerald-600">Projects</span>
        </div>
      `
      el.addEventListener('click', () => {
        const source = currentMap.getSource('project-points') as mapboxgl.GeoJSONSource
        source.getClusterExpansionZoom(props.cluster_id, (err, zoom) => {
          if (err || zoom === undefined || zoom === null) return
          currentMap.easeTo({ center: coords, zoom: zoom + 1 })
        })
      })
    } else {
      const devColor = typeof props.devColor === 'string' ? JSON.parse(props.devColor) : props.devColor
      
      el = document.createElement('div')
      el.className = 'custom-marker group cursor-pointer'
      el.innerHTML = `
        <div class="relative flex flex-col items-center">
          <div class="w-10 h-10 ${devColor.bg} text-slate-900 rounded-xl flex items-center justify-center border-2 border-white/40 transition-all animate-solar-glow group-hover:scale-125 group-hover:-rotate-12 group-hover:text-white" style="box-shadow: 0 0 30px ${devColor.shadow}">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
          </div>
          <div class="w-2.5 h-2.5 ${devColor.bg} rounded-full mt-1 animate-pulse border-2 border-white" style="box-shadow: 0 0 15px ${devColor.shadow}"></div>
        </div>
      `
      el.addEventListener('click', (e) => {
        e.stopPropagation() // Prevent map click from closing sidebar
        focusProject(project)
      })
    }

    const marker = markRaw(new mapboxgl.Marker(el)
      .setLngLat(coords)
      .addTo(currentMap))
    
    newMarkers[id] = marker
  })

  for (const id in markersOnScreen.value) {
    if (!newMarkers[id]) {
      markersOnScreen.value[id]?.remove()
    }
  }

  markersOnScreen.value = newMarkers
}


watch(projects, () => {
  updateMapData()
})

watch(selectedProject, (val) => {
  if (!val) {
    updateMapData()
  }
})

watch([userLocation, mapReady], ([newLoc, ready]) => {
  if (newLoc && ready) {
    updateUserLocationMarker()
  }
}, { immediate: true })

async function detectLocation() {
  if (detecting.value) return
  detecting.value = true
  permissionError.value = false
  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      })
    })
    
    userLocation.value = {
      lng: pos.coords.longitude,
      lat: pos.coords.latitude
    }
    
    // Smoothly pan to user if map is ready
    if (map.value && mapReady.value) {
      map.value.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 14,
        duration: 3000
      })
    }

    const { latitude: lat, longitude: lng } = pos.coords
    const data = await $fetch<{ name: string }>('/api/regions/detect', {
      query: { lat, lng }
    })
    
    if (data?.name) {
      suggestedCity.value = data.name
    }
  } catch (err: any) {
    console.warn('GPS Error:', err)
    if (err.code === 1) { // PERMISSION_DENIED
      permissionError.value = true
      setTimeout(() => { permissionError.value = false }, 8000)
    }
  } finally {
    detecting.value = false
  }
}

function focusUserLocation() {
  if (userLocation.value && map.value) {
    map.value.flyTo({
      center: [userLocation.value.lng, userLocation.value.lat],
      zoom: 16,
      pitch: 45,
      duration: 3000,
      essential: true
    })
  } else {
    detectLocation()
  }
}

function useSuggestedCity() {
  filters.city = suggestedCity.value
  suggestedCity.value = ''
  fetchProjects()
}

function fetchProjects() {
  refresh()
}

let searchTimer: any = null
function debouncedSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => fetchProjects(), 500)
}

onMounted(() => {
  initMap()
  detectLocation()
})

useHead({ title: 'Peta Proyek Hunian - Proferti' })
</script>

<style>
/* Hide Scrollbars */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom Marker Styling */
.shadow-glow {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

/* Custom Navigation Styling */
.mapboxgl-ctrl-group {
  background: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
}

.mapboxgl-ctrl-group button {
  color: white !important;
}

.mapboxgl-ctrl-group button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.mapboxgl-ctrl-bottom-right, .mapboxgl-ctrl-bottom-left {
  display: none !important; /* Clean minimal UI */
}

.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* User GPS Beacon Animations */
@keyframes breath {
  0% { transform: scale(0.8); opacity: 0.2; }
  50% { transform: scale(2.5); opacity: 0.6; }
  100% { transform: scale(0.8); opacity: 0.2; }
}

@keyframes breath-slow {
  0% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.8); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.4; }
}

.animate-breath {
  animation: breath 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-breath-slow {
  animation: breath-slow 4s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

/* Solar Glow Animation for Amber Markers */
@keyframes solar-glow {
  0% { box-shadow: 0 0 10px rgba(245, 158, 11, 0.3); }
  50% { box-shadow: 0 0 35px rgba(245, 158, 11, 0.7); }
  100% { box-shadow: 0 0 10px rgba(245, 158, 11, 0.3); }
}

/* Satellite Label Marker Styling */
.satellite-label-marker {
  pointer-events: none;
  z-index: 1000;
}

.satellite-popup .mapboxgl-popup-content {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  border-radius: 12px !important;
}

.satellite-popup .mapboxgl-popup-tip {
  border-top-color: #0f172a !important;
}

.animate-solar-glow {
  animation: solar-glow 2.5s infinite ease-in-out;
}

.flood-popup .mapboxgl-popup-content {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
}

.flood-popup .mapboxgl-popup-tip {
  border-top-color: rgba(15, 23, 42, 0.9) !important;
}

.summary-popup .mapboxgl-popup-content {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  border-radius: 20px !important;
}

.summary-popup .mapboxgl-popup-tip {
  border-top-color: rgba(15, 23, 42, 0.95) !important;
}

.summary-popup .mapboxgl-popup-close-button {
  color: white !important;
  right: 10px !important;
  top: 10px !important;
  font-size: 16px !important;
}
</style>

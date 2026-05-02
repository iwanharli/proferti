<template>
  <div class="min-h-screen bg-slate-50/50 font-['Plus_Jakarta_Sans',sans-serif]">
    <!-- Hero Header: Elite Dark Theme -->
    <header class="bg-slate-900 pt-44 pb-24 relative overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col md:flex-row gap-10 items-center md:items-end">
          <!-- Big Logo -->
            <div class="w-48 h-48 bg-white rounded-[40px] p-4 shadow-2xl shadow-black/20 flex items-center justify-center relative group overflow-hidden">
              <div class="absolute inset-0 bg-accent/5 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                v-if="dev?.logo && !logoError" 
                :src="dev.logo" 
                :alt="dev.name" 
                @error="logoError = true"
                class="max-w-full max-h-full object-contain relative z-10" 
              />
              <div v-else class="text-7xl font-black text-slate-200 uppercase select-none relative z-10">{{ dev?.name?.[0] }}</div>
            </div>

          <!-- Title & Meta -->
          <div class="flex-1 text-center md:text-left">
            <div class="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              <span class="bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-accent/20">Verified Partner</span>
              <span class="bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">Est. 2024</span>
            </div>
            <h1 class="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">{{ dev?.name }}</h1>
            
            <div class="flex flex-wrap justify-center md:justify-start gap-8">
              <a v-if="dev?.website" :href="dev.website" target="_blank" class="flex items-center gap-2.5 text-slate-300 hover:text-accent font-bold transition-colors">
                <LucideGlobe :size="20" class="text-accent" />
                <span>{{ dev.website.replace(/https?:\/\//, '') }}</span>
              </a>
              <div class="flex items-center gap-2.5 text-slate-300 font-bold">
                <LucideBuilding :size="20" class="text-accent" />
                <span>{{ projects.length }} Proyek Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 -mt-12 relative z-20 pb-24">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <!-- Project Listing -->
        <div class="space-y-10">
          <div class="flex items-end justify-between border-b border-slate-200 pb-6">
            <h2 class="text-3xl font-black text-slate-900 tracking-tight">Katalog Proyek</h2>
            <p class="text-slate-500 font-medium hidden md:block">Portofolio properti unggulan dari {{ dev?.name }}</p>
          </div>

          <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="i in 2" :key="i" class="h-[400px] bg-white rounded-[32px] animate-pulse"></div>
          </div>

          <div v-else-if="projects.length === 0" class="bg-white rounded-[40px] p-20 text-center shadow-sm border border-slate-100">
            <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <LucideInbox :size="40" class="text-slate-300" />
            </div>
            <h3 class="text-xl font-black text-slate-900 mb-2">Belum ada proyek</h3>
            <p class="text-slate-500 font-medium">Developer ini belum mempublikasikan proyek apapun saat ini.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NuxtLink 
              v-for="p in projects" 
              :key="p.id" 
              :to="`/projects/${p.slug}`" 
              class="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all hover:-translate-y-2"
            >

              <div class="relative h-64 overflow-hidden">
                <img :src="p.image || 'https://www.dummyimg.in/placeholder?width=1200&height=800'" :alt="p.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute top-5 left-5">
                  <span class="bg-white/90 backdrop-blur-md text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{{ p.status }}</span>
                </div>
              </div>
              <div class="p-8">
                <h3 class="text-2xl font-black text-primary mb-2 group-hover:text-accent transition-colors leading-tight">{{ p.name }}</h3>
                <p class="flex items-center gap-2 text-slate-500 font-medium text-sm mb-6">
                  <LucideMapPin :size="14" class="text-accent" /> {{ p.location.name }}, {{ p.location.city }}
                </p>
                <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mulai Dari</p>
                    <p class="text-xl font-black text-primary tracking-tight">{{ formatPropertyPrice(p.startPrice) }}</p>
                  </div>
                  <div class="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-accent flex items-center justify-center transition-colors">
                    <LucideArrowRight :size="20" class="text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Sidebar Info -->
        <aside class="space-y-8">
          <div class="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
            <h4 class="text-xs font-black uppercase text-slate-400 tracking-widest mb-6">Tentang Developer</h4>
            <p class="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{{ dev?.description || 'Tidak ada deskripsi tersedia.' }}</p>
            
            <div v-if="dev?.website" class="mt-8 pt-8 border-t border-slate-50">
              <a :href="dev.website" target="_blank" class="flex items-center justify-center gap-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl transition-all">
                <LucideExternalLink :size="18" />
                <span>Kunjungi Website Resmi</span>
              </a>
            </div>
          </div>

          <div class="bg-accent rounded-[40px] p-8 text-white relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <h4 class="text-xl font-black mb-2 relative z-10">Berminat?</h4>
            <p class="text-white/80 font-medium text-sm mb-6 relative z-10">Dapatkan penawaran eksklusif dan konsultasi langsung dengan {{ dev?.name }}.</p>
            <button class="w-full bg-white text-accent font-black py-4 rounded-2xl hover:scale-105 transition-transform relative z-10">
              Hubungi Developer
            </button>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideGlobe, LucideBuilding, LucideMapPin, 
  LucideArrowRight, LucideInbox, LucideExternalLink 
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const logoError = ref(false)

// Fetch Developer Detail
const { data: devData } = await useFetch<{ developer: any }>(() => `/api/developers/${slug.value}`)
const dev = computed(() => devData.value?.developer)

// Fetch Developer Projects (Reactive based on developer ID)
const { data: projData, pending } = await useFetch<{ projects: any[] }>(`/api/projects`, {
  query: computed(() => ({ 
    developerId: dev.value?.id, 
    limit: 100 
  })),
  watch: [dev]
})
const projects = computed(() => projData.value?.projects || [])

useHead({
  title: computed(() => `${dev.value?.name || 'Developer'} - Proferti Elite`),
  meta: [
    { name: 'description', content: computed(() => dev.value?.description || 'Profil developer properti di Proferti') }
  ]
})
</script>

<style scoped>
/* No more legacy CSS. Tailwind handles everything! */
</style>

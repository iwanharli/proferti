<template>
  <div class="min-h-screen bg-slate-50/50 font-['Plus_Jakarta_Sans',sans-serif]">
    
    <div v-if="pending" class="min-h-screen flex items-center justify-center bg-white">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        <p class="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Menyiapkan Ruang Impian...</p>
      </div>
    </div>

    <template v-else-if="unit">
      <!-- Minimalist Header -->
      <nav class="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div class="container mx-auto px-4 h-20 flex items-center justify-between">
          <NuxtLink :to="`/projects/${slug}`" class="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors group">
            <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
              <LucideArrowLeft :size="18" />
            </div>
            <span class="text-sm font-black uppercase tracking-widest">Kembali ke Proyek</span>
          </NuxtLink>
          
          <div class="hidden md:flex items-center gap-8">
            <span class="text-slate-300">|</span>
            <div class="flex items-center gap-3">
              <span class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Tipe Unit</span>
              <span class="text-sm font-black text-primary">{{ unit.typeName }}</span>
            </div>
          </div>

          <button @click="scrollTo('inquiry')" class="bg-primary text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-accent transition-all">
            Minat Unit Ini
          </button>
        </div>
      </nav>

      <main class="pt-32 pb-32">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16">
            
            <!-- Left: Visuals -->
            <div class="space-y-12">
              <div class="relative group">
                <div class="absolute -inset-4 bg-accent/5 rounded-[48px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div class="relative bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200">
                  <img :src="unit.image || DEFAULT_IMG" :alt="unit.typeName" class="w-full h-auto object-cover" />
                  <div class="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/50 shadow-xl">
                     <span class="text-[11px] font-black text-primary uppercase tracking-widest">{{ unit.typeName }}</span>
                  </div>
                </div>
              </div>

              <!-- Floor Plan Mockup -->
              <section class="space-y-8">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <LucideLayout :size="24" class="text-accent" />
                  </div>
                  <div>
                    <h3 class="text-3xl font-black text-primary tracking-tight">Denah Lantai</h3>
                    <p class="text-slate-500 font-medium">Visualisasi pembagian ruang yang efisien dan lega.</p>
                  </div>
                </div>

                <div class="bg-white border border-slate-100 rounded-[40px] p-8 md:p-16 shadow-inner relative group overflow-hidden">
                   <!-- Floorplan Image -->
                   <img src="https://www.dummyimg.in/placeholder?width=1200&height=800" class="w-full opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                   
                   <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 backdrop-blur-sm">
                      <button class="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3">
                        <LucideMaximize2 :size="20" /> Perbesar Denah
                      </button>
                   </div>
                </div>
              </section>
            </div>

            <!-- Right: Content -->
            <div class="space-y-12">
              <div class="space-y-6">
                <h1 class="text-5xl md:text-6xl font-black text-primary tracking-tighter leading-none">{{ unit.typeName }}</h1>
                <div class="flex items-center gap-4">
                  <p class="text-3xl font-black text-accent tracking-tight">{{ formatPropertyPrice(unit.price) }}</p>
                  <span class="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{{ unit.stock }} Tersedia</span>
                </div>
              </div>

              <!-- Specs Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div v-for="s in specs" :key="s.label" class="bg-white border border-slate-100 p-8 rounded-[32px] hover:border-accent/30 transition-colors group">
                  <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                    <component :is="s.icon" :size="24" class="text-slate-400 group-hover:text-accent transition-colors" />
                  </div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ s.label }}</p>
                  <p class="text-xl font-black text-primary">{{ s.value }} {{ s.suffix }}</p>
                </div>
              </div>

              <!-- Features list -->
              <section class="space-y-6">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest">Keunggulan Unit</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="f in ['Plafon Tinggi (High Ceiling)', 'Pencahayaan Alami Maksimal', 'Cross Ventilation', 'Sistem Smart Home', 'Instalasi AC Siap Pakai', 'Material Premium']" :key="f" class="flex items-center gap-3">
                    <div class="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <LucideCheck :size="12" class="text-accent" />
                    </div>
                    <span class="text-sm font-bold text-slate-600">{{ f }}</span>
                  </div>
                </div>
              </section>

              <!-- Inquiry Card (Repurposed from project page) -->
              <div id="inquiry" class="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <h4 class="text-2xl font-black mb-2 relative z-10">Jadwalkan Survey</h4>
                <p class="text-slate-400 text-sm font-medium mb-8 relative z-10">Dapatkan simulasi KPR dan lihat unit contoh secara langsung.</p>
                <form class="space-y-6 relative z-10">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase text-slate-500 tracking-widest">Nama Lengkap</label>
                    <input type="text" placeholder="John Doe" class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:border-accent transition-all" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase text-slate-500 tracking-widest">No. WhatsApp</label>
                    <input type="tel" placeholder="0812..." class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:border-accent transition-all" />
                  </div>
                  <button type="button" class="w-full bg-accent hover:bg-emerald-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 active:scale-95">
                    <LucideArrowRight :size="20" />
                    <span class="uppercase tracking-widest text-xs font-black">Minta Penawaran Khusus</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideArrowLeft, LucideMaximize2, LucideLayout, 
  LucideBed, LucideBath, LucideCar, LucideMaximize, 
  LucideArrowRight, LucideCheck 
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

const route = useRoute()
const id = computed(() => route.params.id as string)
const slug = computed(() => route.params.slug as string)
const DEFAULT_IMG = 'https://www.dummyimg.in/placeholder?width=1200&height=800'

const { data, pending } = await useFetch<{ unitType: any }>(
  () => `/api/unit-types/${id.value}`,
  { watch: [id] }
)

const unit = computed(() => data.value?.unitType)

// Fetch Project Info to get the name for the title
const { data: projectData } = await useFetch<{ project: any }>(
  () => `/api/projects/${slug.value}`,
  { watch: [slug] }
)
const proj = computed(() => projectData.value?.project)

const specs = computed(() => {
  if (!unit.value) return []
  return [
    { label: 'Luas Tanah', value: unit.value.landSize || '0', suffix: 'm²', icon: LucideMaximize },
    { label: 'Luas Bangunan', value: unit.value.buildingSize || '0', suffix: 'm²', icon: LucideLayout },
    { label: 'Kamar Tidur', value: unit.value.bedroom || '0', suffix: 'Kamar', icon: LucideBed },
    { label: 'Kamar Mandi', value: unit.value.bathroom || '0', suffix: 'Ruang', icon: LucideBath },
    { label: 'Garasi/Parkir', value: unit.value.garage || '0', suffix: 'Mobil', icon: LucideCar },
    { label: 'Stok Unit', value: unit.value.stock || '0', suffix: 'Tersedia', icon: LucideCheck },
  ]
})

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

useHead({
  title: computed(() => `${unit.value?.typeName || 'Detail Unit'} - ${proj.value?.name || 'Proyek'} - Proferti`)
})
</script>

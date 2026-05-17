<template>
  <div class="relative min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden">

    <!-- Cinematic Hero Section -->
    <header class="relative pt-32 pb-44 overflow-hidden bg-slate-900">
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="animate-fade-in">
            <div class="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
              <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span class="text-accent text-[10px] font-black uppercase tracking-[0.3em]">Elite Real Estate Platform</span>
            </div>
            <h1 class="text-6xl md:text-8xl font-black leading-[0.95] text-white mb-8 tracking-tighter">
              Temukan <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">Hunian Impian</span> <br />
              Anda
            </h1>
            <p class="text-xl text-slate-400 font-medium max-w-lg mb-12 leading-relaxed">
              Platform marketplace properti paling eksklusif di Indonesia. Menghadirkan kurasi hunian terbaik dari developer terpercaya.
            </p>
            <div class="flex flex-wrap gap-5">
              <NuxtLink to="/projects" class="bg-accent hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-glow active:scale-95 flex items-center gap-3">
                Mulai Eksplorasi <LucideArrowRight :size="18" />
              </NuxtLink>
              <NuxtLink to="/projects-map" class="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md flex items-center gap-3">
                <LucideMap :size="18" /> Lihat Peta
              </NuxtLink>
            </div>
          </div>

          <!-- Hero Slider — pause on hover -->
          <div
            class="relative lg:h-[600px] hidden lg:block animate-slide-up"
            @mouseenter="pauseSlider"
            @mouseleave="resumeSlider"
          >
            <div class="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[60px] blur-3xl opacity-50"></div>
            <div class="relative h-full w-full rounded-[60px] overflow-hidden border border-white/10 shadow-2xl">
              <div
                v-for="(slide, idx) in slides"
                :key="idx"
                class="absolute inset-0 transition-all duration-1000 ease-in-out"
                :class="[currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none']"
              >
                <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                <div
                  class="absolute bottom-12 left-12 right-12 z-20 transition-all duration-700"
                  :class="[currentSlide === idx ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0']"
                >
                  <div class="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[40px] shadow-2xl">
                    <div class="flex items-center justify-between gap-4">
                      <div class="min-w-0">
                        <p class="text-[10px] font-black uppercase text-accent tracking-[0.3em] mb-2">{{ slide.label }}</p>
                        <h4 class="text-3xl font-black text-white tracking-tight mb-2 truncate">{{ slide.title }}</h4>
                        <div class="flex items-center gap-2 text-slate-300 font-bold text-sm">
                          <LucideMapPin :size="14" class="text-accent shrink-0" /> {{ slide.location }}
                        </div>
                      </div>
                      <div class="bg-accent text-white px-6 py-4 rounded-2xl font-black text-sm shadow-glow shrink-0">
                        {{ slide.price }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Slide Nav -->
              <div class="absolute top-1/2 -translate-y-1/2 right-8 z-30 flex flex-col gap-3">
                <button
                  v-for="(_, idx) in slides"
                  :key="idx"
                  @click="currentSlide = idx"
                  class="w-2 rounded-full transition-all duration-500"
                  :class="[currentSlide === idx ? 'h-10 bg-accent shadow-glow' : 'h-2 bg-white/30 hover:bg-white']"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Floating Search Hub -->
    <section class="-mt-20 relative z-30 pb-32">
      <div class="container mx-auto px-4">
        <div class="bg-white p-6 md:p-8 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
          <div class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                <LucideMapPin :size="10" /> Pilihan Lokasi
              </label>
              <div class="relative group">
                <select v-model="quickFilter.city" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-black text-primary text-lg outline-none cursor-pointer appearance-none group-focus-within:border-accent transition-all">
                  <option value="">Seluruh Indonesia</option>
                  <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
                </select>
                <LucideChevronDown :size="20" class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-accent transition-colors" />
              </div>
            </div>
            <div class="space-y-2 border-l border-slate-100 pl-8">
              <label class="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1">
                <LucideDollarSign :size="10" /> Estimasi Harga
              </label>
              <div class="relative group">
                <select v-model="quickFilter.price" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-black text-primary text-lg outline-none cursor-pointer appearance-none group-focus-within:border-accent transition-all">
                  <option value="">Semua Range</option>
                  <option value="0-1000">Di bawah 1 M</option>
                  <option value="1000-3000">1 M – 3 M</option>
                  <option value="3000-5000">3 M – 5 M</option>
                  <option value="5000-100000">Di atas 5 M</option>
                </select>
                <LucideChevronDown :size="20" class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-accent transition-colors" />
              </div>
            </div>
          </div>
          <button @click="goSearch" class="bg-slate-900 hover:bg-accent text-white h-[72px] lg:h-[80px] px-12 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 flex items-center gap-4 group">
            <LucideSearch :size="20" class="group-hover:rotate-12 transition-transform" /> Cari Hunian
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section v-if="featuredProjects.length > 0" class="bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div>
            <span class="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-3 block">Pilihan Terbaik</span>
            <h2 class="text-4xl font-black text-primary tracking-tighter">Proyek <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Unggulan</span></h2>
          </div>
          <NuxtLink to="/projects" class="text-slate-400 hover:text-accent font-black text-xs uppercase tracking-widest transition-colors flex items-center gap-2 shrink-0">
            Lihat Semua <LucideArrowRight :size="16" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="p in featuredProjects"
            :key="p.id"
            :to="`/projects/${p.slug}`"
            class="group bg-white rounded-[28px] border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <div class="relative h-52 overflow-hidden bg-slate-100">
              <img
                :src="p.image || 'https://www.dummyimg.in/placeholder?width=800&height=600'"
                :alt="p.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span class="absolute top-3 left-3 bg-accent text-white px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                {{ p.type || 'Properti' }}
              </span>
            </div>
            <div class="p-5">
              <p class="text-[8px] font-black text-accent uppercase tracking-widest mb-1.5">{{ p.developer?.name }}</p>
              <h3 class="font-black text-primary text-[15px] leading-snug mb-2 line-clamp-2">{{ p.name }}</h3>
              <div class="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold mb-3">
                <LucideMapPin :size="9" /> {{ p.location?.city || p.location?.name }}
              </div>
              <p class="text-accent font-black text-[15px]">{{ formatPropertyPrice(p.startPrice) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Proferti? -->
    <section class="py-32 bg-slate-50/50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-24">
          <span class="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Platform Excellence</span>
          <h2 class="text-5xl font-black text-primary tracking-tighter mb-6">Kenapa Memilih <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Proferti?</span></h2>
          <p class="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            Kami mendefinisikan ulang cara Anda menemukan hunian melalui standar kurasi yang ketat dan transparansi total.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
            v-for="(feat, idx) in features"
            :key="idx"
            class="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
          >
            <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-accent mb-10 group-hover:bg-accent group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
              <component :is="feat.icon" :size="32" />
            </div>
            <h4 class="text-2xl font-black text-primary mb-4 tracking-tight">{{ feat.title }}</h4>
            <p class="text-slate-500 font-medium leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Discovery Teaser -->
    <section class="py-44 relative overflow-hidden">
      <div class="absolute inset-0 bg-slate-900 pointer-events-none">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] opacity-20 mix-blend-overlay grayscale blur-[2px]"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <div class="max-w-4xl mx-auto bg-white/80 backdrop-blur-3xl p-16 rounded-[60px] border border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]">
          <div class="w-24 h-24 bg-accent rounded-[32px] flex items-center justify-center text-white mx-auto mb-10 shadow-glow animate-bounce-slow">
            <LucideMap :size="40" />
          </div>
          <h2 class="text-5xl font-black text-primary tracking-tighter mb-8 leading-tight">Eksplorasi Hunian <br /> dalam Dimensi Baru</h2>
          <p class="text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Visualisasikan lokasi hunian impian Anda dengan fitur peta interaktif berbasis satelit tercanggih di Indonesia.
          </p>
          <NuxtLink to="/projects-map" class="bg-slate-900 hover:bg-accent text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl active:scale-95 inline-flex items-center gap-4">
            Buka Peta Interaktif <LucideArrowUpRight :size="20" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="py-32">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 border-b border-slate-100 pb-12">
          <h2 class="text-4xl font-black text-primary tracking-tighter">Developer <span class="text-accent">Terpercaya</span></h2>
          <NuxtLink to="/developers" class="text-slate-400 hover:text-accent font-black text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
            Lihat Semua Partner <LucideArrowRight :size="16" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <NuxtLink
            v-for="d in developers.slice(0, 5)"
            :key="d.id"
            :to="`/developers/${d.slug}`"
            class="group bg-white p-10 rounded-[32px] border border-slate-100 flex items-center justify-center grayscale hover:grayscale-0 hover:border-accent/30 hover:shadow-xl transition-all duration-500 overflow-hidden"
          >
            <img
              v-if="d.logo && !brokenLogos.has(d.id)"
              :src="d.logo"
              :alt="d.name"
              @error="brokenLogos.add(d.id)"
              class="max-h-12 w-auto object-contain transition-transform group-hover:scale-110"
            />
            <div v-else class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-accent text-2xl font-black transition-colors group-hover:bg-accent group-hover:text-white">
              {{ d.name?.[0] }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import {
  LucideSearch, LucideMapPin, LucideArrowRight,
  LucideMap, LucideBuilding, LucideShieldCheck, LucideGem,
  LucideChevronDown, LucideDollarSign, LucideArrowUpRight
} from 'lucide-vue-next'
import { formatPropertyPrice } from '~/utils/currency'

defineOptions({ inheritAttrs: false })

definePageMeta({ hideFooter: false })

const router = useRouter()
const quickFilter = reactive({ city: '', price: '' })
const brokenLogos = ref(new Set<string>())

const features = [
  {
    icon: LucideShieldCheck,
    title: 'Keamanan Transaksi',
    desc: 'Semua developer telah melalui proses verifikasi ketat untuk menjamin keamanan investasi properti Anda.'
  },
  {
    icon: LucideGem,
    title: 'Kualitas Mahakarya',
    desc: 'Kurasi properti yang hanya mengedepankan standar kualitas material dan desain arsitektur kelas dunia.'
  },
  {
    icon: LucideBuilding,
    title: 'Akses Eksklusif',
    desc: 'Dapatkan akses pertama ke proyek-proyek terbaru dan unit-unit premium sebelum dirilis ke pasar umum.'
  }
]

// Hero Slider
const currentSlide = ref(0)
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000',
    label: 'Mahakarya Elite',
    title: 'The Elite Pavilion',
    location: 'BSD City, Tangerang',
    price: 'Mulai 1.2 M'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=2000',
    label: 'Modern Skyline',
    title: 'Skyline Residence',
    location: 'SCBD, Jakarta Selatan',
    price: 'Mulai 3.5 M'
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000',
    label: 'Exclusive Villa',
    title: 'Cliff Mansion',
    location: 'Uluwatu, Bali',
    price: 'Mulai 8.9 M'
  }
]

let slideTimer: ReturnType<typeof setInterval> | null = null

function pauseSlider() {
  if (slideTimer) { clearInterval(slideTimer); slideTimer = null }
}
function resumeSlider() {
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 6000)
}

onMounted(() => resumeSlider())
onUnmounted(() => pauseSlider())

// Data fetching
const [{ data: devPayload }, { data: locData }, { data: projectPayload }] = await Promise.all([
  useFetch<{ developers: any[] }>('/api/developers'),
  useFetch<{ locations: any[] }>('/api/locations'),
  useFetch<{ projects: any[] }>('/api/projects', { query: { limit: 4, sort: 'newest' } })
])

const developers = computed(() => devPayload.value?.developers || [])

// Kota dari API — bukan hardcode
const cities = computed(() => {
  const list = locData.value?.locations || []
  const names = list.map((l: any) => l.city || l.name).filter(Boolean)
  return [...new Set(names)].sort() as string[]
})

const featuredProjects = computed(() => projectPayload.value?.projects || [])

function goSearch() {
  const query: Record<string, string> = {}
  if (quickFilter.city) query.city = quickFilter.city
  if (quickFilter.price) {
    const [min, max] = quickFilter.price.split('-')
    const minN = parseInt(min)
    const maxN = parseInt(max)
    if (minN > 0) query.minPrice = (minN * 1_000_000).toString()
    if (maxN < 100000) query.maxPrice = (maxN * 1_000_000).toString()
  }
  router.push({ path: '/projects', query })
}

useHead({ title: 'Proferti - Elevate Your Living Standard' })
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(-3%); }
  50%       { transform: translateY(0); }
}

.animate-fade-in   { animation: fade-in   1s   cubic-bezier(0.19, 1, 0.22, 1) forwards; }
.animate-slide-up  { animation: slide-up  1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
.animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }

.shadow-glow { box-shadow: 0 0 30px rgba(16, 185, 129, 0.4); }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>

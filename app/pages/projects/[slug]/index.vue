<template>
  <div class="bg-slate-50/50 font-['Plus_Jakarta_Sans',sans-serif]">

    <div v-if="pending" class="min-h-screen flex items-center justify-center bg-slate-950">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        <p class="text-slate-500 font-bold tracking-widest uppercase text-[10px]">Memuat Mahakarya...</p>
      </div>
    </div>

    <template v-else-if="proj">
      <!-- Immersive Hero Section -->
      <header class="relative h-[85vh] min-h-[600px] bg-slate-950 flex items-end pb-20 overflow-hidden">
        <!-- Hero Image with Overlay -->
        <div class="absolute inset-0 z-0">
          <img :src="proj.image || DEFAULT_IMG" :alt="proj.name" class="w-full h-full object-cover opacity-60 scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        </div>

        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl">
            <NuxtLink :to="`/developers/${proj.developer.slug}`" class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 hover:bg-white/20 transition-all group overflow-hidden">
              <div v-if="proj.developer.logo && !logoError" class="w-6 h-6 shrink-0">
                <img :src="proj.developer.logo" @error="logoError = true" class="w-full h-full object-contain" />
              </div>
              <div v-else class="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center text-[10px] font-black text-accent uppercase">{{ proj.developer.name?.[0] }}</div>
              <span class="text-white text-xs font-black uppercase tracking-widest">{{ proj.developer.name }}</span>
              <LucideArrowRight :size="14" class="text-accent group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            
            <h1 class="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">{{ proj.name }}</h1>
            
            <div class="flex flex-wrap items-center gap-8 text-white/80">
              <div class="flex items-center gap-2.5 font-bold text-xl">
                <LucideMapPin :size="24" class="text-accent" />
                <span>{{ proj.location.name }}, {{ proj.location.city }}</span>
              </div>
              <div class="h-8 w-px bg-white/20 hidden md:block"></div>
              <div class="flex items-center gap-2.5 font-bold text-xl">
                <LucideCalendar :size="24" class="text-accent" />
                <span>Rilis: {{ formattedDate }}</span>
              </div>
              <div class="h-8 w-px bg-white/20 hidden md:block"></div>
              <div class="flex items-center gap-3">
                <div v-for="i in 5" :key="i" class="w-1.5 h-1.5 rounded-full bg-accent"></div>
                <span class="font-black uppercase tracking-[0.2em] text-xs text-accent">Eksklusif Proferti</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Grid -->
      <main class="container mx-auto px-4 -mt-16 relative z-30 pb-32">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          
          <div class="space-y-12">
            <!-- Project Stats Bar -->
            <div class="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-1">
                <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Penawaran Mulai Dari</p>
                <h2 class="text-4xl font-black text-primary tracking-tighter">{{ formatPropertyPrice(proj.startPrice) }}</h2>
              </div>
              <div v-if="proj.promo" class="flex items-center">
                <div class="bg-accent/10 border border-accent/20 rounded-3xl p-6 w-full flex items-center justify-between group overflow-hidden relative">
                   <div class="relative z-10">
                     <p class="text-[10px] font-black text-accent uppercase tracking-widest mb-1">Promo Terbatas</p>
                     <p class="text-xl font-black text-primary leading-tight">{{ proj.promo }}</p>
                   </div>
                   <LucideSparkles class="text-accent/20 absolute -right-4 -bottom-4 w-24 h-24 rotate-12 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>



            <!-- Masonry Gallery & Virtual Tour -->
            <section class="space-y-10">
               <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                 <div>
                   <h3 class="text-3xl font-black text-primary tracking-tight">Eksplorasi Visual</h3>
                   <p class="text-slate-500 font-medium">Lihat setiap detail kemewahan dari berbagai sudut pandang.</p>
                 </div>
                 <button class="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 group">
                   <LucideView :size="18" class="text-accent group-hover:rotate-12 transition-transform" />
                   Tur Virtual 360°
                 </button>
               </div>

               <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                 <div v-for="(g, idx) in displayGallery" :key="idx" 
                   class="relative rounded-[32px] overflow-hidden cursor-pointer group shadow-sm transition-all"
                   :class="[
                     Number(idx) === 0 ? 'md:col-span-2 md:row-span-2 h-full' : '',
                     Number(idx) === 1 ? 'md:col-span-2 h-full' : '',
                     Number(idx) > 1 ? 'h-full' : ''
                   ]"
                 >
                   <img :src="g" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                     <LucideMaximize2 :size="32" class="text-white scale-75 group-hover:scale-100 transition-transform" />
                     <span class="text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all delay-100">Perbesar Gambar</span>
                   </div>
                 </div>
               </div>
            </section>

            <!-- About Section -->
            <section class="space-y-6 bg-white border border-slate-100 rounded-[40px] p-12 shadow-sm">
              <h3 class="text-3xl font-black text-primary tracking-tight">Visi & Konsep Hunian</h3>
              <div class="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                {{ proj.description || 'Hunian bermutu dengan standar kualitas tinggi yang dirancang khusus untuk kenyamanan keluarga modern.' }}
              </div>
            </section>

            <!-- Exclusive Facilities -->
            <section class="space-y-10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center">
                  <LucideSparkles :size="24" class="text-accent" />
                </div>
                <div>
                  <h2 class="text-3xl font-black text-primary tracking-tight">Fasilitas Eksklusif</h2>
                  <p class="text-slate-500 text-sm font-medium">Kenyamanan modern dalam jangkauan tangan Anda.</p>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="f in facilities" :key="f.name" class="bg-white p-8 rounded-[32px] border border-slate-100 flex flex-col items-center text-center gap-4 group hover:shadow-xl hover:shadow-slate-200 transition-all">
                  <div class="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center group-hover:bg-accent/10 transition-all">
                    <component :is="f.icon" :size="32" class="text-slate-400 group-hover:text-accent transition-colors" />
                  </div>
                  <span class="font-black text-primary text-[10px] uppercase tracking-widest">{{ f.name }}</span>
                </div>
              </div>
            </section>

            <!-- Neighborhood Section -->
            <section class="space-y-10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center">
                  <LucideMapPin :size="24" class="text-accent" />
                </div>
                <div>
                  <h2 class="text-3xl font-black text-primary tracking-tight">Konektivitas Strategis</h2>
                  <p class="text-slate-500 text-sm font-medium">Akses mudah ke berbagai fasilitas publik utama.</p>
                </div>
              </div>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div v-for="f in nearbyFacilities" :key="f.label" class="glass-card p-8 border-slate-100 flex flex-col gap-6 group hover:border-accent transition-all">
                  <div class="w-14 h-14 bg-slate-50 rounded-[20px] flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-inner">
                    <component :is="f.icon" :size="28" class="text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h5 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{{ f.label }}</h5>
                    <p class="text-lg font-black text-primary">{{ f.time }} Menit</p>
                  </div>
                </div>
              </div>
            </section>
            
            <!-- Land Area / Polygon Section -->
            <section class="space-y-10">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center">
                  <LucideMap :size="24" class="text-accent" />
                </div>
                <div>
                  <h2 class="text-3xl font-black text-primary tracking-tight">Masterplan & Area</h2>
                  <p class="text-slate-500 text-sm font-medium">Batas wilayah dan pengembangan lahan proyek.</p>
                </div>
              </div>

              <div class="relative h-[400px] bg-slate-100 rounded-[40px] overflow-hidden group shadow-inner border border-slate-200">
                <!-- Mock Map Background -->
                <div class="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
                
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="relative">
                    <!-- SVG Polygon visualization (Dynamic based on GeoJSON) -->
                    <svg v-if="proj.polygon?.coordinates" width="300" height="200" viewBox="0 0 100 100" class="drop-shadow-2xl">
                       <polygon points="10,10 90,10 90,90 10,90" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="2" />
                    </svg>
                    <div v-else class="text-slate-400 font-bold text-center">
                      <LucideMapPin :size="48" class="mx-auto mb-4 opacity-20" />
                      Data Masterplan Sedang Disiapkan
                    </div>
                  </div>
                </div>

                <div class="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div class="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Koordinat Area</p>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="(coord, idx) in proj.polygon?.coordinates?.[0]?.slice(0, 4)" :key="idx" class="bg-slate-50 px-3 py-1.5 rounded-lg text-[11px] font-bold text-primary">
                        {{ coord[1].toFixed(3) }}, {{ coord[0].toFixed(3) }}
                      </span>
                      <span v-if="proj.polygon?.length > 4" class="text-slate-400 text-xs font-bold self-center">...</span>
                    </div>
                  </div>
                  <button class="bg-primary text-white p-5 rounded-2xl shadow-xl hover:scale-110 transition-transform active:scale-95">
                    <LucideMaximize2 :size="20" />
                  </button>
                </div>
              </div>
            </section>

            <!-- Unit Types Grid -->
            <section class="space-y-8">
              <div class="flex items-end justify-between border-b border-slate-200 pb-6">
                <h3 class="text-3xl font-black text-primary tracking-tight">Pilihan Tipe Unit</h3>
                <span class="text-slate-400 font-bold text-sm">{{ displayUnitTypes.length }} Varian Tersedia</span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div v-for="(u, i) in displayUnitTypes" :key="i" class="bg-white border border-slate-100 rounded-[40px] overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all group flex flex-col">
                  <!-- Unit Image/Placeholder -->
                  <div class="h-56 bg-slate-100 relative overflow-hidden">
                    <img :src="u.image || 'https://www.dummyimg.in/placeholder?width=1200&height=800'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary">
                      {{ u.typeName }}
                    </div>
                  </div>

                  <div class="p-8 flex-1 flex flex-col">
                    <div class="flex justify-between items-start mb-8">
                      <div>
                        <h4 class="text-2xl font-black text-primary group-hover:text-accent transition-colors">{{ u.typeName }}</h4>
                        <p class="text-accent font-black text-lg mt-1">{{ formatPropertyPrice(u.price) }}</p>
                      </div>
                      <div class="bg-slate-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                        {{ u.stock }} Tersedia
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3 mb-8">
                      <div class="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                        <LucideMaximize2 :size="18" class="text-slate-400" />
                        <div>
                          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Luas Tanah</p>
                          <p class="text-sm font-black text-primary">{{ u.landSize }} m²</p>
                        </div>
                      </div>
                      <div class="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                        <LucideLayout :size="18" class="text-slate-400" />
                        <div>
                          <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Luas Bangunan</p>
                          <p class="text-sm font-black text-primary">{{ u.buildingSize }} m²</p>
                        </div>
                      </div>
                    </div>

                    <div class="flex gap-6 border-t border-slate-50 pt-6 mt-auto">
                      <div class="flex items-center gap-2 text-slate-600 font-bold text-sm">
                        <LucideBed :size="18" class="text-accent" />
                        <span>{{ u.bedroom }} K. Tidur</span>
                      </div>
                      <div class="flex items-center gap-2 text-slate-600 font-bold text-sm">
                        <LucideBath :size="18" class="text-accent" />
                        <span>{{ u.bathroom }} K. Mandi</span>
                      </div>
                    </div>
                    
                    <NuxtLink :to="`/projects/${slug}/units/${u.slug}`" class="w-full mt-8 border-2 border-accent/20 hover:bg-accent hover:text-white text-accent font-bold py-4 rounded-2xl text-sm transition-all text-center flex items-center justify-center">
                      Detail & Denah Unit
                    </NuxtLink>

                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar Inquiry -->
          <aside id="inquiry" class="relative">
            <div class="sticky top-32 space-y-8">
              <!-- Inquiry Card -->
              <div class="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <h4 class="text-2xl font-black mb-2 relative z-10">Mulai Hunian Baru</h4>
                <p class="text-slate-400 text-sm font-medium mb-8 relative z-10 leading-relaxed">Tim developer akan mengirimkan brosur lengkap dan menjadwalkan survey lokasi untuk Anda.</p>
                
                <form v-if="!leadSent" @submit.prevent="submitLead" class="space-y-6 relative z-10">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase text-slate-500 tracking-widest">Nama Lengkap</label>
                    <input v-model="leadForm.name" type="text" placeholder="John Doe" required 
                      class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:border-accent transition-all" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase text-slate-500 tracking-widest">No. WhatsApp</label>
                    <input v-model="leadForm.phone" type="tel" placeholder="0812..." required 
                      class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:border-accent transition-all" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black uppercase text-slate-500 tracking-widest">Email (Opsional)</label>
                    <input v-model="leadForm.email" type="email" placeholder="john@email.com" 
                      class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:border-accent transition-all" />
                  </div>
                  <button type="submit" class="w-full bg-accent hover:bg-emerald-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50" :disabled="sendingLead">
                    <LucideArrowRight v-if="!sendingLead" :size="20" />
                    <span v-if="sendingLead" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span class="uppercase tracking-widest text-xs font-black">{{ sendingLead ? 'Mengirim...' : 'Request Info Lengkap' }}</span>
                  </button>
                  <p v-if="leadErr" class="text-red-400 text-[10px] font-bold text-center mt-2">{{ leadErr }}</p>
                </form>

                <div v-else class="text-center py-10 relative z-10">
                   <div class="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                     <LucideCheckCircle :size="48" class="text-accent animate-bounce" />
                   </div>
                   <h4 class="text-2xl font-black mb-2">Terima Kasih!</h4>
                   <p class="text-slate-400 text-sm font-medium mb-8">Data Anda telah dikirim ke developer. Mohon tunggu kabar melalui WhatsApp.</p>
                   <button @click="leadSent = false" class="text-accent font-black hover:underline text-sm uppercase tracking-widest">Kirim Pesan Lain</button>
                </div>
              </div>

              <!-- Dev Quick Info -->
              <div class="bg-white border border-slate-100 rounded-[32px] p-8 flex items-center gap-4 group">
                <div class="w-16 h-16 bg-slate-50 rounded-2xl p-3 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                  <img v-if="proj.developer.logo && !logoError" :src="proj.developer.logo" @error="logoError = true" class="max-w-full max-h-full object-contain" />
                  <div v-else class="text-3xl font-black text-slate-300 uppercase">{{ proj.developer.name?.[0] }}</div>
                </div>
                <div class="flex-1 overflow-hidden">
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Developer Partner</p>
                  <h4 class="text-lg font-black text-primary truncate">{{ proj.developer.name }}</h4>
                  <NuxtLink :to="`/developers/${proj.developer.slug}`" class="text-xs font-black text-accent hover:underline flex items-center gap-1 mt-1 uppercase tracking-tighter">
                    Lihat Portofolio <LucideArrowRight :size="12" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideMapPin, LucideCheckCircle, 
  LucideMaximize2, LucideHome, LucideBed, LucideBath,
  LucideArrowRight, LucideSparkles, LucideMap,
  LucideHospital, LucideGraduationCap, LucideShoppingBag, LucideTrain,
  LucideView, LucideLayout, LucideShieldCheck, LucideWaves, 
  LucideUsers, LucideBaby, LucideZap, LucideDribbble, LucideCalendar
} from 'lucide-vue-next'

const facilities = [
  { name: 'Smart Home System', icon: LucideZap },
  { name: '24/7 Security', icon: LucideShieldCheck },
  { name: 'Infinity Pool', icon: LucideWaves },
  { name: 'Clubhouse', icon: LucideUsers },
  { name: 'Children Playground', icon: LucideBaby },
  { name: 'Jogging Track', icon: LucideDribbble }
]
import { formatPropertyPrice } from '~/utils/currency'

const logoError = ref(false)
const route = useRoute()
const slug = computed(() => route.params.slug as string)
const DEFAULT_IMG = 'https://www.dummyimg.in/placeholder?width=1200&height=800'

const { data, pending } = await useFetch<{ project: any }>(
  () => `/api/projects/${slug.value}`,
  { watch: [slug] }
)

const proj = computed(() => data.value?.project)

const formattedDate = computed(() => {
  if (!proj.value?.createdAt) return ''
  return new Date(proj.value.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const displayGallery = computed(() => {
  if (proj.value?.gallery?.length) return proj.value.gallery.map((g: any) => g.url)
  return [
    'https://www.dummyimg.in/placeholder?width=1200&height=800',
    'https://www.dummyimg.in/placeholder?width=1200&height=800',
    'https://www.dummyimg.in/placeholder?width=1200&height=800',
    'https://www.dummyimg.in/placeholder?width=1200&height=800'
  ]
})

const displayUnitTypes = computed(() => {
  if (proj.value?.unitTypes?.length) return proj.value.unitTypes
  return [
    { typeName: 'Signature Suite', price: 1200000000, landSize: 120, buildingSize: 80, bedroom: 2, bathroom: 2, stock: 'Limited', image: 'https://www.dummyimg.in/placeholder?width=1200&height=800' },
    { typeName: 'Presidential Wing', price: 2500000000, landSize: 250, buildingSize: 180, bedroom: 4, bathroom: 3, stock: 'Limited', image: 'https://www.dummyimg.in/placeholder?width=1200&height=800' }
  ]
})

// Lead form
const leadSent = ref(false)
const sendingLead = ref(false)
const leadErr = ref('')
const leadForm = reactive({ name: '', phone: '', email: '', message: '' })

async function submitLead() {
  if (!proj.value?.id) return
  leadErr.value = ''
  sendingLead.value = true
  try {
    await $fetch('/api/leads', {
      method: 'POST',
      body: { projectId: proj.value.id, ...leadForm }
    })
    leadSent.value = true
    Object.assign(leadForm, { name: '', phone: '', email: '', message: '' })
  } catch (e: any) {
    leadErr.value = e?.data?.message || 'Gagal mengirim pesan.'
  } finally {
    sendingLead.value = false
  }
}

useHead({
  title: computed(() => `${proj.value?.name || 'Proyek'} - Proferti Elite Showcase`)
})

// Nearby Facilities
const nearbyFacilities = [
  { icon: LucideHospital, label: 'Rumah Sakit', time: '10' },
  { icon: LucideGraduationCap, label: 'Universitas', time: '15' },
  { icon: LucideShoppingBag, label: 'Pusat Belanja', time: '5' },
  { icon: LucideTrain, label: 'Stasiun MRT', time: '8' }
]
</script>

<style scoped>
.shadow-glow {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
}
</style>

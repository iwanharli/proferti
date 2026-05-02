<template>
  <div class="bg-slate-50 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-accent selection:text-white">
    <!-- Bright Elite Hero Section -->
    <header class="relative bg-white pt-64 pb-48 overflow-hidden border-b border-slate-100">
      <!-- Airy Background Effects -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 right-0 w-[1000px] h-[800px] bg-accent/5 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/4"></div>
        <div class="absolute bottom-0 left-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/4"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10 text-center">
        <Transition appear
          enter-active-class="transform transition duration-1000 ease-out"
          enter-from-class="-translate-y-10 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
        >
          <div class="inline-flex items-center gap-3 bg-accent/5 border border-accent/10 px-6 py-2.5 rounded-full mb-12 shadow-sm">
            <LucideShieldCheck :size="16" class="text-accent" />
            <span class="text-accent text-[10px] font-black uppercase tracking-[0.5em]">Official Elite Partners</span>
          </div>
        </Transition>
        
        <h1 class="text-7xl md:text-9xl font-black text-primary mb-10 tracking-tighter leading-none animate-slide-up">
          The <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">Architects</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto mb-20 leading-relaxed animate-slide-up delay-100">
          Kurasi eksklusif pengembang visioner yang mendefinisikan ulang <br class="hidden md:block" /> standar kemewahan dan kenyamanan hunian modern.
        </p>

        <!-- Premium Bright Search -->
        <div class="max-w-3xl mx-auto relative group animate-slide-up delay-200">
          <div class="absolute -inset-1 bg-gradient-to-r from-accent to-emerald-400 rounded-[32px] blur opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
          <div class="relative bg-white border border-slate-200 rounded-[30px] p-2 flex items-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
            <div class="flex-1 flex items-center px-8">
              <LucideSearch class="text-slate-400 group-focus-within:text-accent transition-colors" :size="24" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari pengembang mahakarya..."
                class="w-full bg-transparent border-none py-6 px-5 text-primary font-bold text-xl outline-none placeholder:text-slate-400"
              />
            </div>
            <button class="bg-slate-900 text-white px-10 py-6 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-slate-900/10 active:scale-95">
              Explore
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 -mt-28 relative z-20 pb-56">
      <!-- Loading Skeleton -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div v-for="i in 6" :key="i" class="h-[450px] bg-white rounded-[56px] animate-pulse border border-slate-100"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredDevelopers.length === 0" class="bg-white rounded-[64px] p-40 text-center shadow-2xl border border-slate-100 animate-fade-in">
        <div class="w-32 h-32 bg-slate-50 rounded-[48px] flex items-center justify-center mx-auto mb-12 shadow-inner">
          <LucideBuilding2 :size="64" class="text-slate-300" />
        </div>
        <h3 class="text-4xl font-black text-primary mb-6 tracking-tight">Tidak Ada Hasil</h3>
        <p class="text-slate-500 font-medium max-w-sm mx-auto text-xl leading-relaxed mb-12">
          Maaf, mitra yang Anda cari belum masuk dalam daftar eksklusif kami.
        </p>
        <button @click="searchQuery = ''" class="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent transition-all shadow-2xl">Reset Pencarian</button>
      </div>

      <!-- Developer Grid with Transitions -->
      <TransitionGroup 
        v-else
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        move-class="transition-all duration-700 ease-in-out"
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-10 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="absolute transition-all duration-500 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >
        <NuxtLink 
          v-for="(dev, idx) in filteredDevelopers" 
          :key="dev.id" 
          :to="`/developers/${dev.id}`"
          class="group relative bg-white rounded-[56px] p-14 border border-slate-100 shadow-sm hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.08)] hover:-translate-y-5 transition-all duration-700 flex flex-col overflow-hidden"
        >
          <!-- Decorative Background Elements -->
          <div class="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-bl-[120px] -mr-20 -mt-20 group-hover:bg-accent/5 transition-colors duration-700"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-slate-50/50 rounded-tr-[80px] -ml-16 -mb-16 group-hover:bg-accent/5 transition-colors duration-700"></div>

          <!-- Logo & Badge Section -->
          <div class="flex justify-between items-start mb-14 relative z-10">
            <div class="relative">
              <div class="absolute -inset-4 bg-accent/5 rounded-[40px] scale-0 group-hover:scale-100 transition-transform duration-700"></div>
              <div class="w-32 h-32 bg-white rounded-[38px] p-5 flex items-center justify-center relative shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
                <img 
                  v-if="dev.logo && !brokenLogos.has(dev.id)" 
                  :src="dev.logo" 
                  :alt="dev.name" 
                  @error="onLogoError(dev.id)"
                  class="max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-110" 
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-6xl font-black text-slate-300 uppercase">
                  {{ dev.name?.[0] }}
                </div>
              </div>
            </div>
            
            <div class="flex flex-col items-end gap-3">
              <div class="bg-accent/10 px-5 py-2.5 rounded-2xl flex items-center gap-2 border border-accent/10 shadow-sm">
                <LucideShieldCheck :size="16" class="text-accent" />
                <span class="text-[11px] font-black text-accent uppercase tracking-widest">Verified Partner</span>
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="flex-1 relative z-10">
            <h3 class="text-5xl font-black text-primary mb-8 tracking-tighter group-hover:text-accent transition-colors leading-none uppercase">{{ dev.name }}</h3>
            <p class="text-slate-500 font-medium leading-relaxed line-clamp-3 mb-16 text-xl">
              {{ dev.description || 'Dedikasi tinggi dalam menghadirkan standar hunian kelas dunia bagi masyarakat Indonesia.' }}
            </p>
          </div>

          <!-- Refined Footer Stats -->
          <div class="pt-12 border-t border-slate-50 flex items-center justify-between mt-auto relative z-10">
            <div class="flex flex-col gap-3">
              <span class="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Portfolio</span>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                   <LucideLayoutGrid :size="22" />
                </div>
                <div>
                   <span class="text-3xl font-black text-primary tracking-tighter">{{ dev.projectCount || 0 }}</span>
                   <span class="text-sm text-slate-400 font-bold ml-2">Units</span>
                </div>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-3xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-accent transition-all duration-500 shadow-xl shadow-slate-900/10 active:scale-90">
                <LucideArrowUpRight :size="28" class="transition-transform group-hover:scale-110" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </TransitionGroup>

      <!-- Premium Developer Registration CTA -->
      <section class="mt-40 relative group animate-slide-up delay-200">
        <div class="absolute -inset-1 bg-gradient-to-r from-accent via-emerald-400 to-primary rounded-[64px] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div class="relative bg-white border border-slate-100 rounded-[64px] p-16 md:p-24 overflow-hidden shadow-2xl">
          <!-- Background Decorative -->
          <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div class="inline-flex items-center gap-3 bg-slate-900 text-white px-6 py-2.5 rounded-full mb-10 shadow-xl">
                 <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                 <span class="text-[10px] font-black uppercase tracking-[0.3em]">Join the Elite Network</span>
              </div>
              <h2 class="text-6xl md:text-8xl font-black text-primary tracking-tighter leading-none mb-10">
                Partner with the <span class="text-accent">Best.</span>
              </h2>
              <p class="text-xl text-slate-500 font-medium leading-relaxed mb-16">
                Bergabunglah dengan ekosistem properti paling eksklusif di Indonesia. Kelola proyek, pantau analitik, dan jangkau audiens premium secara instan.
              </p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
                <div class="flex items-start gap-5">
                  <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                    <LucideLineChart :size="24" />
                  </div>
                  <div>
                    <h4 class="font-black text-primary text-sm uppercase tracking-widest mb-1">Smart Analytics</h4>
                    <p class="text-slate-500 text-sm font-medium">Dashboard performa real-time untuk setiap proyek.</p>
                  </div>
                </div>
                <div class="flex items-start gap-5">
                  <div class="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <LucideZap :size="24" />
                  </div>
                  <div>
                    <h4 class="font-black text-primary text-sm uppercase tracking-widest mb-1">Global Exposure</h4>
                    <p class="text-slate-500 text-sm font-medium">Tampilkan mahakarya Anda pada audiens kelas dunia.</p>
                  </div>
                </div>
              </div>

              <NuxtLink to="/login" class="bg-slate-900 text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-accent transition-all shadow-2xl shadow-slate-900/20 active:scale-95 flex items-center gap-4 w-fit">
                Daftar Sebagai Developer
                <LucideArrowRight :size="20" />
              </NuxtLink>
            </div>

            <div class="hidden lg:block relative">
               <!-- Abstract Visualization -->
               <div class="aspect-square bg-slate-50 rounded-[80px] p-12 border border-slate-100 shadow-inner relative overflow-hidden group/viz">
                  <div class="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover/viz:opacity-100 transition-opacity duration-1000"></div>
                  <div class="relative h-full border-2 border-dashed border-slate-200 rounded-[60px] flex items-center justify-center">
                     <LucideBuilding2 :size="120" class="text-slate-200 group-hover/viz:text-accent transition-all duration-1000 group-hover/viz:scale-110" />
                     <!-- Floating Elements -->
                     <div class="absolute top-10 left-10 w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-accent animate-bounce delay-700">
                        <LucideUsers :size="32" />
                     </div>
                     <div class="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-primary animate-pulse">
                        <LucideLineChart :size="40" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideBuilding2, LucideShieldCheck, LucideSearch, 
  LucideLayoutGrid, LucideArrowUpRight, LucideLineChart,
  LucideZap, LucideArrowRight, LucideUsers
} from 'lucide-vue-next'

const { data: devData, pending } = await useFetch<{ developers: any[] }>('/api/developers')
const developers = computed(() => devData.value?.developers ?? [])

const brokenLogos = ref(new Set<string>())
function onLogoError(id: string) {
  brokenLogos.value.add(id)
}

const searchQuery = ref('')
const filteredDevelopers = computed(() => {
  if (!searchQuery.value) return developers.value
  return developers.value.filter(d => 
    d.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

useHead({
  title: 'Direktori Developer Properti Terpercaya — Proferti Elite'
})
</script>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-slide-up {
  animation: slide-up 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-gradient {
  animation: gradient 6s linear infinite;
}

.delay-100 { animation-delay: 0.2s; }
.delay-200 { animation-delay: 0.4s; }

::selection {
  background: #10b981;
  color: white;
}
</style>

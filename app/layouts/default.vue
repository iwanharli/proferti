<template>
  <div class="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif]">
    <!-- Global Navbar -->
    <nav :class="[
      'fixed top-0 left-0 right-0 h-20 z-[1000] transition-all flex items-center',
      isScrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-100 shadow-sm' : 'bg-white border-b border-slate-50'
    ]">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <!-- Dynamic Back Button -->
          <NuxtLink v-if="showBackButton" :to="backTarget" class="group flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all text-primary hover:text-accent">
            <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-white bg-slate-100">
              <LucideChevronLeft :size="14" />
            </div>
            <span class="hidden sm:inline">Kembali</span>
          </NuxtLink>

          <NuxtLink to="/" class="flex items-center gap-2.5 font-black text-2xl no-underline">
            <LucideHome :size="28" class="text-accent" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent tracking-tighter">Proferti</span>
          </NuxtLink>
        </div>
        
        <div class="hidden md:flex items-center gap-10">
          <NuxtLink to="/projects" active-class="!text-accent border-accent" class="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary hover:text-accent transition-all border-b-2 border-transparent pb-1">
            <LucideSearch :size="14" />
            Cari Hunian
          </NuxtLink>
          <NuxtLink to="/projects-map" active-class="!text-accent border-accent" class="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary hover:text-accent transition-all border-b-2 border-transparent pb-1">
            <LucideMap :size="14" />
            Peta Hunian
          </NuxtLink>
          <NuxtLink to="/developers" active-class="!text-accent border-accent" class="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary hover:text-accent transition-all border-b-2 border-transparent pb-1">
            <LucideBuilding :size="14" />
            Developer
          </NuxtLink>
          
          <NuxtLink v-if="status === 'authenticated'" to="/developer/dashboard" 
            class="bg-slate-900 hover:bg-slate-800 text-white w-11 h-11 rounded-xl transition-all shadow-glow flex items-center justify-center group relative"
            title="Panel Kontrol">
            <LucideLayoutGrid :size="18" />
            <span class="absolute top-full mt-2 px-2 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Dashboard</span>
          </NuxtLink>
          <NuxtLink v-else to="/login" 
            class="bg-accent hover:bg-emerald-500 text-white w-11 h-11 rounded-xl transition-all shadow-glow flex items-center justify-center group relative"
            title="Masuk Platform">
            <LucideUser :size="18" />
            <span class="absolute top-full mt-2 px-2 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Masuk</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <slot />

    <!-- Global Elite Footer -->
    <footer v-if="!route.meta.hideFooter" class="bg-slate-50 pt-32 pb-16 text-primary mt-32 relative overflow-hidden border-t border-slate-100">
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-emerald-400"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-3/4"></div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <!-- Branding Column -->
          <div class="space-y-10">
            <NuxtLink to="/" class="flex items-center gap-3 group">
              <LucideHome :size="32" class="text-accent transition-transform group-hover:scale-110" />
              <span class="font-black text-3xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Proferti</span>
            </NuxtLink>
            <p class="text-slate-500 font-medium leading-relaxed text-lg">
              Platform marketplace properti paling eksklusif di Indonesia. Menghadirkan hunian mahakarya bagi mereka yang menghargai kualitas hidup.
            </p>
            <div class="flex items-center gap-4">
              <a href="#" class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-all shadow-sm border border-slate-100"><LucideInstagram :size="20" /></a>
              <a href="#" class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-all shadow-sm border border-slate-100"><LucideFacebook :size="20" /></a>
              <a href="#" class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:bg-accent hover:text-white transition-all shadow-sm border border-slate-100"><LucideTwitter :size="20" /></a>
            </div>
          </div>

          <!-- Quick Navigation -->
          <div>
            <h4 class="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-10">Main Navigation</h4>
            <ul class="space-y-5">
              <li><NuxtLink to="/" class="text-slate-600 hover:text-accent font-bold transition-colors">Beranda Utama</NuxtLink></li>
              <li><NuxtLink to="/projects" class="text-slate-600 hover:text-accent font-bold transition-colors">Cari Hunian</NuxtLink></li>
              <li><NuxtLink to="/projects-map" class="text-slate-600 hover:text-accent font-bold transition-colors">Peta Hunian</NuxtLink></li>
              <li><NuxtLink to="/developers" class="text-slate-600 hover:text-accent font-bold transition-colors">Daftar Developer</NuxtLink></li>
              <li><NuxtLink to="/login" class="text-slate-600 hover:text-accent font-bold transition-colors">Masuk Platform</NuxtLink></li>
            </ul>
          </div>

          <!-- Property Categories -->
          <div>
            <h4 class="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-10">Eksplorasi</h4>
            <ul class="space-y-5 text-slate-600 font-bold">
              <li><a href="#" class="hover:text-accent transition-colors">Hunian Minimalis</a></li>
              <li><a href="#" class="hover:text-accent transition-colors">Apartemen SCBD</a></li>
              <li><a href="#" class="hover:text-accent transition-colors">Villa Eksklusif</a></li>
              <li><a href="#" class="hover:text-accent transition-colors">Kawasan Industri</a></li>
            </ul>
          </div>

          <!-- Contact & Newsletter -->
          <div>
            <h4 class="text-[11px] font-black uppercase tracking-[0.3em] text-accent mb-10">Connect With Us</h4>
            <div class="space-y-8">
              <div class="flex items-start gap-4 group">
                <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-accent shadow-sm border border-slate-100 group-hover:bg-accent group-hover:text-white transition-all">
                   <LucideMail :size="18" />
                </div>
                <div>
                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Dukungan Email</p>
                  <p class="font-black text-primary">hello@proferti.com</p>
                </div>
              </div>
              <div class="flex items-start gap-4 group">
                <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-accent shadow-sm border border-slate-100 group-hover:bg-accent group-hover:text-white transition-all">
                   <LucidePhone :size="18" />
                </div>
                <div>
                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Layanan Hotline</p>
                  <p class="font-black text-primary">+62 812 3456 7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Footer -->
        <div class="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <p class="text-slate-400 text-sm font-bold tracking-tight">© 2026 Proferti Elite Showcase. Crafted with Precision.</p>
          <div class="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideHome, LucideChevronLeft, LucideInstagram, 
  LucideFacebook, LucideTwitter, LucideMail, LucidePhone,
  LucideSearch, LucideMap, LucideBuilding, LucideLayoutGrid, LucideUser
} from 'lucide-vue-next'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const { status } = useAuth()
const route = useRoute()

const showBackButton = computed(() => {
  return ['projects-id', 'developers-id'].includes(route.name as string)
})

const backTarget = computed(() => {
  if (route.name === 'projects-id') return '/projects'
  if (route.name === 'developers-id') return '/developers'
  return '/'
})

const isScrolled = computed(() => y.value > 50)
</script>

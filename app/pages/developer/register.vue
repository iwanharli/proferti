<template>
  <div :class="['min-h-screen relative overflow-hidden', isRegistered ? 'dash-layout bg-white' : 'bg-slate-950 flex items-center justify-center p-8 md:p-20 font-[\'Plus_Jakarta_Sans\',sans-serif]']">
    
    <!-- Background for Unregistered (Cinematic Blooms) -->
    <template v-if="!isRegistered">
      <div class="absolute top-0 right-0 w-[1000px] h-[1000px] bg-accent/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    </template>

    <!-- Elite Sidebar (Only for registered) -->
    <aside v-if="isRegistered" class="dash-sidebar bg-slate-900 border-r border-white/5 animate-fade-in-left">
      <div class="px-8 py-10">
        <NuxtLink to="/" class="flex items-center gap-3 mb-16 group">
          <div class="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-glow">
            <LucideHome :size="24" />
          </div>
          <span class="font-black text-xl tracking-[0.2em] text-white">PROFERTI</span>
        </NuxtLink>
        <nav class="flex flex-col gap-3">
          <NuxtLink to="/developer/dashboard" class="flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-slate-400 hover:bg-white/5 hover:text-white group">
            <LucideLayoutDashboard :size="20" class="group-hover:text-accent transition-colors" /> Dashboard
          </NuxtLink>
          <NuxtLink to="/developer/leads" class="flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-slate-400 hover:bg-white/5 hover:text-white group">
            <LucideUsers :size="20" class="group-hover:text-accent transition-colors" /> Leads
          </NuxtLink>
          <div class="mt-8 mb-4 px-5 text-[10px] font-black uppercase text-slate-600 tracking-[0.3em]">Console Management</div>
          <NuxtLink to="/developer/dashboard" class="flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-slate-400 hover:bg-white/5 hover:text-white group">
            <LucideBuilding :size="20" class="group-hover:text-accent transition-colors" /> Proyek Saya
          </NuxtLink>
          <NuxtLink to="/developer/register" class="flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all bg-accent text-white shadow-glow">
            <LucideUser :size="20" /> Profil Perusahaan
          </NuxtLink>
        </nav>
      </div>
      <div class="p-8 border-t border-white/5">
        <NuxtLink to="/developer/dashboard" class="flex items-center gap-3 text-slate-500 font-black text-xs uppercase tracking-widest hover:text-white transition-all group">
          <LucideChevronLeft :size="18" class="group-hover:-translate-x-1 transition-transform" /> Kembali ke Console
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content -->
    <main :class="[isRegistered ? 'dash-main flex-1 p-12 bg-slate-50/50 relative overflow-y-auto' : 'w-full max-w-[1400px] relative z-10']">
      
      <!-- ONBOARDING VIEW (UNREGISTERED) -->
      <div v-if="!isRegistered" class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <!-- Left: Brand & Benefits -->
        <div class="text-left animate-fade-in-left">
          <NuxtLink to="/" class="inline-flex items-center gap-4 font-black text-4xl mb-16 no-underline group">
            <div class="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-glow">
              <LucideHome :size="28" />
            </div>
            <span class="text-white tracking-tighter uppercase tracking-[0.2em]">PROFERTI <span class="text-accent">PARTNER</span></span>
          </NuxtLink>
          
          <h1 class="text-7xl font-black text-white leading-[1] mb-10 tracking-tighter">
            Perluas Jangkauan <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Proyek Properti</span> <br />
            Mahakarya Anda
          </h1>
          
          <p class="text-2xl text-slate-400 font-medium mb-16 leading-relaxed max-w-2xl">
            Bergabunglah dengan ekosistem marketplace properti paling modern di Indonesia. Kelola proyek, pantau lead, dan tingkatkan penjualan dalam satu panel eksklusif.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div class="flex gap-6 items-start group">
              <div class="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-500 shadow-inner">
                <LucideLayoutDashboard class="text-accent group-hover:text-white transition-colors" :size="32" />
              </div>
              <div>
                <h4 class="text-white font-black text-xl mb-2 tracking-tight">Console Terpadu</h4>
                <p class="text-slate-500 font-medium leading-relaxed">Kelola seluruh unit dan proyek Anda dengan antarmuka kelas dunia.</p>
              </div>
            </div>
            <div class="flex gap-6 items-start group">
              <div class="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-500 shadow-inner">
                <LucideUsers class="text-accent group-hover:text-white transition-colors" :size="32" />
              </div>
              <div>
                <h4 class="text-white font-black text-xl mb-2 tracking-tight">Lead Intelligence</h4>
                <p class="text-slate-500 font-medium leading-relaxed">Jangan lewatkan calon pembeli potensial dengan sistem tracking otomatis.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Registration Form -->
        <div class="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[60px] p-12 md:p-20 shadow-2xl animate-slide-up">
           <div class="mb-14">
             <div class="inline-flex items-center gap-3 bg-accent/20 border border-accent/20 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
                <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span class="text-accent text-[10px] font-black uppercase tracking-[0.3em]">Step 1: Elite Profile</span>
             </div>
             <h2 class="text-4xl font-black text-white tracking-tighter">Lengkapi Identitas Developer</h2>
           </div>

           <form class="space-y-10" @submit.prevent="handleSave">
             <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">
                <div class="space-y-4">
                  <label class="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-2">Logo Resmi Perusahaan</label>
                  <div class="relative group">
                    <div class="w-full aspect-square rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center p-8 transition-all group-hover:border-accent/50 overflow-hidden shadow-inner backdrop-blur-sm">
                      <img :src="form.logo || DEFAULT_LOGO" alt="Logo" class="w-full h-full object-contain filter brightness-110" />
                    </div>
                    <div class="mt-5">
                      <ImageUploader @uploaded="(url) => form.logo = url" />
                    </div>
                  </div>
                </div>

                <div class="space-y-10">
                  <div class="space-y-3">
                    <label class="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-2 flex items-center gap-2">
                       <LucideBuilding :size="10" /> Nama Perusahaan / PT Resmi
                    </label>
                    <input v-model="form.name" type="text" placeholder="Masukkan nama resmi..." required 
                      class="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[24px] text-white font-bold text-xl outline-none focus:border-accent focus:bg-white/10 transition-all placeholder:text-slate-600" />
                  </div>
                  <div class="space-y-3">
                    <label class="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-2 flex items-center gap-2">
                       <LucideGlobe :size="10" /> Website Perusahaan
                    </label>
                    <div class="relative group">
                      <LucideGlobe :size="20" class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-accent transition-colors" />
                      <input v-model="form.website" type="url" placeholder="https://..." 
                        class="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/10 rounded-[24px] text-white font-bold text-xl outline-none focus:border-accent focus:bg-white/10 transition-all placeholder:text-slate-600" />
                    </div>
                  </div>
                </div>
             </div>

             <div class="space-y-3">
               <label class="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-2 flex items-center gap-2">
                  <LucideSave :size="10" /> Visi & Deskripsi Singkat
               </label>
               <textarea v-model="form.description" rows="4" placeholder="Ceritakan pengalaman dan visi besar perusahaan Anda..." 
                 class="w-full p-8 bg-white/5 border border-white/10 rounded-[32px] text-white font-semibold text-lg outline-none focus:border-accent focus:bg-white/10 transition-all resize-none placeholder:text-slate-600 leading-relaxed"></textarea>
             </div>

             <button type="submit" class="w-full bg-accent hover:bg-emerald-500 text-white font-black py-6 rounded-[24px] transition-all shadow-glow active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 group" :disabled="busy">
               <LucideCheck v-if="!busy" :size="24" class="group-hover:scale-125 transition-transform" />
               <span v-if="busy" class="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
               <span class="text-lg uppercase tracking-[0.2em]">{{ busy ? 'Memproses Data...' : 'Konfirmasi Pendaftaran' }}</span>
             </button>
           </form>
        </div>
      </div>

      <!-- REGISTERED / PROFILE EDITOR VIEW (Premium Console Style) -->
      <div v-else class="animate-fade-in-up">
        <header class="flex justify-between items-end mb-16 border-b border-slate-100 pb-12">
          <div>
            <div class="inline-flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full mb-4">
              <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span class="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Identity Console</span>
            </div>
            <h1 class="text-5xl font-black text-primary tracking-tighter mb-2">Profil Developer</h1>
            <p class="text-slate-500 font-medium text-lg">Kelola identitas publik dan branding eksklusif perusahaan Anda.</p>
          </div>
        </header>

        <div class="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-12">
          <div class="bg-white p-16 rounded-[60px] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]">
            <form class="flex flex-col gap-12" @submit.prevent="handleSave">
              <div class="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-16">
                <div class="flex flex-col gap-6">
                  <label class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Logo Eksklusif</label>
                  <div class="w-full aspect-square rounded-[48px] bg-slate-50 flex items-center justify-center p-10 border border-slate-100 overflow-hidden shadow-inner">
                    <img :src="form.logo || DEFAULT_LOGO" alt="Logo" class="w-full h-full object-contain" />
                  </div>
                  <ImageUploader @uploaded="(url) => form.logo = url" />
                </div>
                <div class="flex flex-col gap-10">
                  <div class="flex flex-col gap-3">
                    <label class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Nama Developer / PT</label>
                    <input v-model="form.name" type="text" required class="px-8 py-5 rounded-[24px] border border-slate-100 font-black text-xl text-primary outline-none focus:bg-white focus:border-accent transition-all bg-slate-50/50 shadow-sm" />
                  </div>
                  <div class="flex flex-col gap-3">
                    <label class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Website Resmi</label>
                    <div class="relative group">
                      <LucideGlobe :size="20" class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" />
                      <input v-model="form.website" type="url" class="w-full pl-16 pr-8 py-5 rounded-[24px] border border-slate-100 font-black text-xl text-primary outline-none focus:bg-white focus:border-accent transition-all bg-slate-50/50 shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3">
                <label class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Deskripsi Mahakarya Perusahaan</label>
                <textarea v-model="form.description" rows="6" class="p-8 rounded-[32px] border border-slate-100 font-semibold text-lg text-primary outline-none focus:bg-white focus:border-accent transition-all resize-none bg-slate-50/50 leading-relaxed shadow-sm"></textarea>
              </div>
              
              <div v-if="successMsg" class="bg-emerald-50 text-emerald-600 p-8 rounded-[32px] font-black text-sm border border-emerald-100 flex items-center gap-4 animate-slide-up">
                <LucideCheck :size="24" /> {{ successMsg }}
              </div>

              <div class="pt-12 border-t border-slate-50 flex justify-end">
                <button type="submit" class="bg-slate-900 hover:bg-accent text-white px-16 py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-4 group" :disabled="busy">
                  <LucideSave v-if="!busy" :size="20" class="group-hover:rotate-12 transition-transform" />
                  {{ busy ? 'Menyimpan...' : 'Simpan Perubahan Profil' }}
                </button>
              </div>
            </form>
          </div>

          <aside class="flex flex-col gap-10">
            <div class="bg-slate-900 p-12 rounded-[50px] text-white relative overflow-hidden group shadow-2xl">
              <div class="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/30 transition-all duration-700"></div>
              <div class="relative z-10">
                <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent mb-8 shadow-inner">
                  <LucideGem :size="32" />
                </div>
                <h4 class="text-2xl font-black mb-4 tracking-tight">Public Branding</h4>
                <p class="text-slate-400 font-medium leading-relaxed mb-10">Profil ini akan ditampilkan secara eksklusif di direktori developer Proferti Elite.</p>
                <NuxtLink :to="`/developers/${devData?.developer?.id}`" target="_blank" class="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all group/link">
                  <LucideExternalLink :size="16" class="group-hover/link:rotate-12 transition-transform" /> Lihat Profil Publik
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideHome, LucideLayoutDashboard, LucideUsers, LucideBuilding, 
  LucideUser, LucideChevronLeft, LucideGlobe, LucideSave, 
  LucideCheck, LucideExternalLink, LucideGem
} from 'lucide-vue-next'

definePageMeta({
  hideFooter: true
})

const DEFAULT_LOGO = 'https://www.dummyimg.in/placeholder?width=1200&height=800'

const { data: authData } = useAuth()
const userId = computed(() => (authData.value?.user as any)?.id || '')

const busy = ref(false)
const successMsg = ref('')

const form = reactive({
  name: '',
  description: '',
  website: '',
  logo: ''
})

const { data: devData, refresh } = await useFetch<{ developer: any }>(
  () => `/api/developers/me?userId=${userId.value}`
)

const isRegistered = computed(() => !!devData.value?.developer)

watchEffect(() => {
  if (devData.value?.developer) {
    const d = devData.value.developer
    form.name = d.name || ''
    form.description = d.description || ''
    form.website = d.website || ''
    form.logo = d.logo || ''
  }
})

async function handleSave() {
  busy.value = true
  successMsg.value = ''
  try {
    await $fetch('/api/developers/register', {
      method: 'POST' as any,
      body: { name: form.name, description: form.description, website: form.website, logo: form.logo }
    })
    successMsg.value = isRegistered.value ? 'Profil Elite diperbarui!' : 'Selamat! Anda resmi terdaftar sebagai Partner Elite.'
    await refresh()
    setTimeout(() => successMsg.value = '', 5000)
  } catch (e: any) {
    alert(e?.data?.message || 'Gagal menyimpan data')
  } finally {
    busy.value = false
  }
}

useSeoMeta({ title: 'Partner Registration — Proferti Elite' })
</script>

<style scoped>
@keyframes fade-in-left {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-left {
  animation: fade-in-left 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-slide-up {
  animation: slide-up 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.dash-layout {
  display: flex;
}

.dash-sidebar {
  width: 320px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.shadow-glow {
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.05);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.1);
}
</style>

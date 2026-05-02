<template>
  <div class="min-h-screen flex bg-white font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
    <!-- Cinematic Left Sidebar -->
    <div class="hidden lg:flex lg:w-[45%] bg-slate-900 relative overflow-hidden flex-col justify-between p-20 text-white animate-fade-in-left">
      <!-- Decorative Background Blooms (Matching Landing Page) -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
      
      <NuxtLink to="/" class="relative z-10 flex items-center gap-4 font-black text-4xl no-underline">
        <div class="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-glow">
          <LucideHome :size="28" />
        </div>
        <span class="tracking-tighter uppercase tracking-[0.2em]">PROFERTI</span>
      </NuxtLink>

      <div class="relative z-10 max-w-lg">
        <div class="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
          <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span class="text-accent text-[10px] font-black uppercase tracking-[0.3em]">Exclusive Access</span>
        </div>
        <h1 class="text-7xl font-black leading-[0.9] tracking-tighter mb-10">
          Gerbang Menuju <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">Kemewahan</span> <br />
          Properti.
        </h1>
        <p class="text-slate-400 text-xl font-medium leading-relaxed mb-12">
          Platform elite yang menghubungkan developer terbaik dengan pembeli yang mendambakan kesempurnaan hunian.
        </p>
        
        <div class="grid grid-cols-1 gap-6">
          <div v-for="(feat, i) in features" :key="i" class="flex items-center gap-5 group">
            <div class="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
              <LucideCheckCircle :size="24" class="text-accent group-hover:text-white transition-colors" />
            </div>
            <span class="font-bold text-slate-200 text-lg">{{ feat }}</span>
          </div>
        </div>
      </div>

      <div class="relative z-10 pt-10 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
        <span>© 2026 Proferti Elite Platform</span>
        <div class="flex gap-8">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>

    <!-- Glassmorphic Right Content: Login Form -->
    <div class="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50 relative overflow-hidden">
      <!-- Background Patterns -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div class="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]"></div>
      
      <!-- Back to Home Floating Button -->
      <NuxtLink to="/" class="absolute top-12 right-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-accent transition-all group z-20">
        <LucideArrowLeft :size="16" class="group-hover:-translate-x-1 transition-transform" />
        Kembali ke Beranda
      </NuxtLink>

      <div class="w-full max-w-lg relative z-10 animate-slide-up">
        <div class="bg-white/80 backdrop-blur-3xl p-16 rounded-[60px] border border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)]">
          <div class="text-center mb-16">
            <div class="w-20 h-20 bg-slate-900 rounded-[32px] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
              <LucideLock :size="32" />
            </div>
            <h2 class="text-4xl font-black text-primary tracking-tighter mb-4">Elite Console</h2>
            <p class="text-slate-500 font-medium text-lg leading-relaxed">Kelola portofolio properti Anda sekarang.</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-8">
            <div v-if="errorMsg" class="bg-red-50 text-red-600 p-6 rounded-[24px] text-sm font-black text-center border border-red-100 flex items-center justify-center gap-3 animate-shake">
              <LucideShieldAlert :size="18" /> {{ errorMsg }}
            </div>

            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2 flex items-center gap-2">
                <LucideMail :size="10" /> Alamat Email Resmi
              </label>
              <div class="relative group">
                <input 
                  v-model="email" 
                  type="email" 
                  required
                  placeholder="developer@proferti.com"
                  class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 font-bold text-primary text-lg outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between items-end px-2">
                <label class="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                  <LucideKey :size="10" /> Kata Sandi
                </label>
                <a href="#" class="text-[10px] font-black uppercase text-accent hover:underline tracking-widest">Lupa Password?</a>
              </div>
              <div class="relative group">
                <input 
                  v-model="password" 
                  type="password" 
                  required
                  placeholder="••••••••"
                  class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 font-bold text-primary text-lg outline-none focus:bg-white focus:border-accent transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <button type="submit" class="w-full bg-slate-900 hover:bg-accent text-white font-black py-6 rounded-[24px] transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50 group" :disabled="loading">
              <span v-if="loading" class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
              <template v-else>
                <span class="uppercase tracking-[0.2em] text-xs">Akses Console Sekarang</span>
                <LucideArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
              </template>
            </button>
          </form>

          <div class="relative my-12">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
            <div class="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span class="bg-white/0 backdrop-blur-md px-6 text-slate-400">Atau masuk melalui</span></div>
          </div>

          <button @click="signInGoogle" class="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-black py-5 rounded-[24px] transition-all flex items-center justify-center gap-4 group">
            <div class="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
              <LucideChrome :size="20" />
            </div>
            <span class="uppercase tracking-widest text-[10px]">Lanjutkan dengan Google</span>
          </button>
        </div>

        <p class="text-center mt-12 text-slate-500 font-medium">
          Belum memiliki akun partner? 
          <NuxtLink to="/developer/register" class="text-accent font-black hover:underline ml-2 transition-all">Daftar Developer Sekarang</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideHome, LucideMail, LucideLock, LucideChrome, 
  LucideCheckCircle, LucideArrowLeft, LucideArrowRight,
  LucideKey, LucideShieldAlert
} from 'lucide-vue-next'

definePageMeta({
  hideFooter: true
})

const { signIn } = useAuth()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)
const router = useRouter()

const features = [
  'Manajemen Proyek Real-time',
  'Analisis Leads & Engagement',
  'Eksplorasi Galeri Visual 4K',
  'Kalkulator Finansial Interaktif'
]

async function handleLogin() {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const res = await signIn('credentials', {
      redirect: false,
      email: email.value,
      password: password.value
    })

    if (res?.error) {
      errorMsg.value = 'Email atau password salah.'
    } else {
      const { data } = useAuth()
      const user = data.value?.user as any
      
      if (user?.role === 'ADMIN') {
        router.push('/admin/dashboard')
      } else if (user?.role === 'DEVELOPER') {
        router.push('/')
      } else {
        router.push('/')
      }
    }
  } catch (err) {
    errorMsg.value = 'Terjadi kesalahan sistem.'
  } finally {
    loading.value = false
  }
}

async function signInGoogle() {
  await signIn('google', { callbackUrl: '/' })
}

useSeoMeta({ title: 'Login — Proferti Elite Console' })
</script>

<style scoped>
@keyframes fade-in-left {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-fade-in-left {
  animation: fade-in-left 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-slide-up {
  animation: slide-up 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}

.shadow-glow {
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
}
</style>


<template>
  <div class="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
    <!-- Animated Background Orbs -->
    <div class="absolute top-0 -left-4 w-72 h-72 bg-accent opacity-20 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute bottom-0 -right-4 w-96 h-96 bg-indigo-600 opacity-20 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s"></div>

    <div class="w-full max-w-md relative z-10">
      <!-- Logo & Welcome -->
      <div class="text-center mb-10">
        <NuxtLink to="/" class="inline-flex items-center gap-2.5 font-black text-3xl mb-4 no-underline">
          <LucideHome :size="32" class="text-accent" />
          <span class="text-white tracking-tighter">PROFERTI</span>
        </NuxtLink>
        <h2 class="text-white text-2xl font-black mb-2">Buat Akun Proferti</h2>
        <p class="text-slate-400 font-medium text-sm">Bergabunglah untuk mulai mencari atau memasarkan properti.</p>
      </div>

      <!-- Register Card -->
      <div class="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div v-if="errorMsg" class="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-bold text-center">
            {{ errorMsg }}
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-black uppercase text-slate-400 tracking-wider">Nama Lengkap</label>
            <div class="relative group">
              <LucideUser :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" />
              <input v-model="name" type="text" placeholder="Masukkan nama Anda" required 
                class="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 font-medium focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all" />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-black uppercase text-slate-400 tracking-wider">Email Address</label>
            <div class="relative group">
              <LucideMail :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" />
              <input v-model="email" type="email" placeholder="nama@email.com" required 
                class="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 font-medium focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all" />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-black uppercase text-slate-400 tracking-wider">Password</label>
            <div class="relative group">
              <LucideLock :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" />
              <input v-model="password" type="password" placeholder="Minimal 8 karakter" required 
                class="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 font-medium focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all" />
            </div>
          </div>

          <button type="submit" class="w-full bg-accent hover:bg-emerald-500 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50" :disabled="loading">
            <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span v-else>Daftar Sekarang</span>
          </button>
        </form>

        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
          <div class="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span class="bg-slate-900/50 px-4 text-slate-500">Atau daftar dengan</span></div>
        </div>

        <button @click="signInGoogle" class="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3">
          <LucideChrome :size="20" />
          <span>Lanjutkan dengan Google</span>
        </button>
      </div>

      <p class="text-center mt-8 text-slate-500 text-sm font-medium">
        Sudah memiliki akun? 
        <NuxtLink to="/login" class="text-accent font-black hover:underline ml-1">Masuk ke Akun</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucideHome, LucideMail, LucideLock, LucideChrome, LucideUser } from 'lucide-vue-next'

const { signIn } = useAuth()
const name = ref('')
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)
const router = useRouter()

async function handleRegister() {
  loading.value = true
  errorMsg.value = ''
  
  try {
    // Simulasi pendaftaran (Anda perlu endpoint backend /api/auth/register)
    await $fetch('/api/auth/register', {
      method: 'POST' as any,
      body: { name: name.value, email: email.value, password: password.value }
    })

    // Setelah daftar, langsung login
    const res = await signIn('credentials', {
      redirect: false,
      email: email.value,
      password: password.value
    })

    if (res?.error) {
      errorMsg.value = 'Pendaftaran berhasil, tapi gagal masuk otomatis.'
    } else {
      router.push('/')
    }
  } catch (err: any) {
    errorMsg.value = err?.data?.message || 'Gagal melakukan pendaftaran.'
  } finally {
    loading.value = false
  }
}

async function signInGoogle() {
  await signIn('google', { callbackUrl: '/' })
}

useSeoMeta({ title: 'Daftar Akun — Proferti Elite' })
</script>

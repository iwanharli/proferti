<template>
  <div class="login-page">
    <div class="login-container glass-card">
      <div class="login-header">
        <h2>Masuk ke Akun Anda</h2>
        <p>Silakan masuk menggunakan kredensial Anda.</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="errorMsg" class="error-alert">
          {{ errorMsg }}
        </div>

        <div class="field">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="contoh@gmail.com" required />
        </div>

        <div class="field">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          <span v-if="loading">Memproses...</span>
          <span v-else>Masuk</span>
        </button>
      </form>

      <div class="divider">
        <span>ATAU</span>
      </div>

      <button @click="signInGithub" class="btn btn-outline btn-full github-btn">
        Masuk dengan GitHub
      </button>

      <div class="login-footer">
        Belum punya akun? <NuxtLink to="/developer/register">Daftar Developer</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { signIn } = useAuth()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)
const router = useRouter()

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
      // Tunggu sebentar agar session terupdate
      const { data } = useAuth()
      const user = data.value?.user as any
      
      if (user?.role === 'ADMIN') {
        router.push('/admin/dashboard')
      } else if (user?.role === 'DEVELOPER') {
        router.push('/developer/dashboard')
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

async function signInGithub() {
  await signIn('github', { callbackUrl: '/' })
}

useSeoMeta({
  title: 'Login - Proferti'
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, var(--soft-bg), #fff);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: var(--radius);
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  font-size: 24px;
  color: var(--primary);
  margin-bottom: 8px;
}

.login-header p {
  font-size: 14px;
  color: var(--text-muted);
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 8px;
}

.field label {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
}

.field input {
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 15px;
  transition: border-color 0.3s;
}

.field input:focus {
  outline: none;
  border-color: var(--accent);
}

.btn-full {
  width: 100%;
  justify-content: center;
}

.error-alert {
  background: #fef2f2;
  color: #b91c1c;
  padding: 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #fecaca;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: var(--text-muted);
  font-size: 12px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--border);
}

.divider span {
  padding: 0 10px;
}

.github-btn {
  margin-bottom: 20px;
}

.login-footer {
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
}

.login-footer a {
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
}
</style>

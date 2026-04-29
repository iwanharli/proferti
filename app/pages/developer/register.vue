<template>
  <div class="page">
    <nav class="subnav container">
      <NuxtLink to="/" class="back">&larr; Beranda</NuxtLink>
    </nav>

    <main class="container panel">
      <h1>Gabung sebagai developer</h1>
      <p class="lead">
        Buat akun Partner dengan GitHub lalu lengkapi profil perusahaan Anda. Konten proyek dapat dikelola lewat pusat Developer (dalam pengembangan).
      </p>

      <template v-if="status === 'unauthenticated'">
        <p class="hint">Langkah pertama: masuk dengan GitHub.</p>
        <button type="button" class="btn btn-primary btn-lg" @click="onSignIn">Masuk dengan GitHub</button>
      </template>

      <template v-else-if="status === 'loading'">
        <p class="hint">Memeriksa sesi…</p>
      </template>

      <template v-else-if="alreadyDeveloper">
        <p class="ok">Akun Anda sudah terdaftar sebagai developer Partner.</p>
        <NuxtLink to="/projects" class="btn btn-outline">Lihat proyek</NuxtLink>
      </template>

      <template v-else-if="registered">
        <p class="ok">{{ message }}</p>
        <NuxtLink to="/projects" class="btn btn-accent">Telusuri proyek</NuxtLink>
      </template>

      <form v-else class="form" @submit.prevent="submit">
        <label>
          Nama developer / PT
          <input v-model="form.name" type="text" required maxlength="200" autocomplete="organization">
        </label>
        <label>
          Deskripsi singkat (opsional)
          <textarea v-model="form.description" rows="4" maxlength="5000" />
        </label>
        <label>
          Website (opsional)
          <input v-model="form.website" type="url" maxlength="512" placeholder="https://…">
        </label>
        <p v-if="err" class="err">{{ err }}</p>
        <button type="submit" class="btn btn-accent btn-lg" :disabled="busy">
          {{ busy ? 'Menyimpan…' : 'Selesai daftar' }}
        </button>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
const { status, signIn, data } = useAuth()

const busy = ref(false)
const registered = ref(false)
const message = ref('')
const err = ref('')
const alreadyDeveloper = computed(
  () => status.value === 'authenticated' && data?.value?.user?.role === 'DEVELOPER'
)

const form = reactive({
  name: '',
  description: '',
  website: ''
})

watch(
  () => data.value?.user,
  (user) => {
    if (user?.name && !form.name) form.name = String(user.name)
  },
  { immediate: true }
)

async function onSignIn() {
  await signIn('github', { callbackUrl: '/developer/register' })
}

async function submit() {
  err.value = ''
  busy.value = true
  try {
    const res = await $fetch<{ ok: boolean; message: string }>('/api/developer/register', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        website: form.website.trim() || undefined
      }
    })
    registered.value = true
    message.value = res.message
  } catch (e: unknown) {
    let statusCode = 0
    if (typeof e === 'object' && e !== null && 'statusCode' in e) {
      const code = (e as { statusCode?: number }).statusCode
      if (typeof code === 'number') statusCode = code
    }
    let msg = 'Terjadi kesalahan. Coba lagi.'
    if (typeof e === 'object' && e !== null && 'data' in e) {
      const d = (e as { data?: { message?: string } }).data
      if (d && typeof d.message === 'string') msg = d.message
    }
    if (statusCode === 409) msg = 'Akun sudah terdaftar sebagai developer.'
    err.value = msg
  } finally {
    busy.value = false
  }
}

useSeoMeta({
  title: 'Gabung sebagai developer — Proferti',
  description: 'Daftar Partner Developer Proferti dengan GitHub dan lengkapi profil Anda.'
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--soft-bg);
}

.subnav {
  padding: 24px 24px 0;
}

.back {
  font-weight: 600;
  color: var(--accent);
}

.panel {
  max-width: 560px;
  margin: 0 auto;
  padding: 40px 24px 96px;
}

.lead {
  margin: 16px 0 32px;
  color: var(--text-muted);
  line-height: 1.65;
}

h1 {
  font-size: 36px;
}

.hint,
.ok {
  margin-bottom: 20px;
  color: var(--text-muted);
}

.ok {
  color: var(--primary);
  font-weight: 600;
}

.form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  font-weight: 600;
}

.form input,
.form textarea {
  font-weight: 400;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: inherit;
}

.err {
  color: #b91c1c;
  margin-bottom: 12px;
  font-weight: 500;
}
</style>

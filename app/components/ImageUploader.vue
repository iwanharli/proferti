<template>
  <div class="w-full">
    <div 
      class="relative w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all bg-slate-50 hover:border-accent hover:bg-emerald-50"
      :class="{ 'border-solid border-slate-200': previewUrl || modelValue, 'border-accent bg-emerald-50': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="fileInput?.click()"
    >
      <input 
        ref="fileInput" 
        type="file" 
        accept="image/*" 
        class="hidden" 
        @change="handleFileSelect" 
      />
      
      <div v-if="loading" class="absolute inset-0 bg-slate-900/40 text-white flex flex-col items-center justify-center gap-2 text-sm font-bold z-10">
        <div class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span>Mengunggah...</span>
      </div>

      <template v-if="previewUrl || modelValue">
        <img :src="previewUrl || modelValue" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] text-white flex flex-col items-center justify-center gap-2 text-sm font-bold opacity-0 hover:opacity-100 transition-opacity">
          <LucideUpload :size="20" />
          <span>Ganti Gambar</span>
        </div>
      </template>

      <div v-else class="text-center text-slate-400">
        <LucideImage :size="32" class="mb-2 mx-auto" />
        <p class="text-sm font-bold mb-1">Klik atau drop gambar di sini</p>
        <span class="text-[11px] opacity-70">JPG, PNG, WebP (Maks 5MB)</span>
      </div>
    </div>
    
    <p v-if="error" class="text-red-500 text-[12px] mt-2 font-semibold">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { LucideImage, LucideUpload } from 'lucide-vue-next'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [string]
  'uploaded': [string]
}>()

const isDragging = ref(false)
const loading = ref(false)
const error = ref('')
const previewUrl = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

async function handleFileSelect(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) uploadFile(file)
}

function handleDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) uploadFile(file)
}

async function uploadFile(file: File) {
  // Client-side validation
  if (!file.type.startsWith('image/')) {
    error.value = 'Hanya file gambar yang diizinkan.'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Ukuran file maksimal 5MB.'
    return
  }

  error.value = ''
  loading.value = true
  
  // Create local preview immediately
  previewUrl.value = URL.createObjectURL(file)

  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await $fetch<{ url: string }>('/api/upload', {
      method: 'POST' as any,
      body: formData
    })
    
    emit('update:modelValue', res.url)
    emit('uploaded', res.url)
  } catch (e: any) {
    error.value = e?.data?.error || 'Gagal mengunggah gambar.'
    previewUrl.value = '' // reset preview on error
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Tailwind handles the rest */
</style>

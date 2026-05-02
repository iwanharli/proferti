<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4" @click.self="$emit('close')">
      <div class="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_40px_80px_rgba(0,0,0,0.25)] animate-slide-up overflow-hidden">
        <div class="px-7 py-5 border-b border-slate-100 flex justify-between items-center shrink-0">
          <h2 class="text-xl font-black text-primary">{{ isEdit ? 'Edit Proyek' : 'Tambah Proyek Baru' }}</h2>
          <button class="text-slate-400 p-2 rounded-lg hover:bg-slate-50 transition-colors" @click="$emit('close')"><LucideX :size="20" /></button>
        </div>

        <form class="overflow-y-auto px-7 py-6 flex flex-col gap-8" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="md:col-span-2 flex flex-col gap-1.5">
              <label class="text-[13px] font-bold text-primary">Nama Proyek *</label>
              <input v-model="form.name" type="text" required maxlength="255" placeholder="Mis. Grand Residence Cluster A" class="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-accent transition-all" />
            </div>
            <div class="md:col-span-2 flex flex-col gap-1.5">
              <label class="text-[13px] font-bold text-primary">Lokasi *</label>
              <select v-model="form.locationId" required class="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-accent transition-all bg-transparent">
                <option value="" disabled>Pilih Lokasi</option>
                <option v-for="l in locations" :key="l.id" :value="l.id">
                  {{ l.city }} - {{ l.name }}
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[13px] font-bold text-primary">Harga Mulai (Rp) *</label>
              <input v-model="form.startPrice" type="number" required min="0" step="1000000" placeholder="1200000000" class="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-accent transition-all" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[13px] font-bold text-primary">Status</label>
              <select v-model="form.status" class="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-accent transition-all bg-transparent">
                <option value="AVAILABLE">Tersedia</option>
                <option value="SOLDOUT">Habis Terjual</option>
                <option value="UPCOMING">Segera Hadir</option>
              </select>
            </div>
            <div class="md:col-span-2 flex flex-col gap-1.5">
              <label class="text-[13px] font-bold text-primary">Teks Promo (opsional)</label>
              <input v-model="form.promo" type="text" maxlength="255" placeholder="Mis. Free BPHTB, Cicilan 5 Jt-an" class="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-accent transition-all" />
            </div>
            <div class="md:col-span-2 flex flex-col gap-1.5">
              <label class="text-[13px] font-bold text-primary">Cover Image *</label>
              <ImageUploader v-model="form.coverImage" />
            </div>
            <div class="md:col-span-2 flex flex-col gap-1.5">
              <label class="text-[13px] font-bold text-primary">Deskripsi (opsional)</label>
              <textarea v-model="form.description" rows="4" maxlength="5000" placeholder="Ceritakan keunggulan proyek Anda..." class="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-accent transition-all resize-none"></textarea>
            </div>
          </div>

          <!-- Gallery Section -->
          <div class="border-t border-slate-100 pt-6 flex flex-col gap-4">
            <div>
              <h3 class="text-base font-black text-primary">Galeri Foto</h3>
              <p class="text-xs text-slate-400 font-semibold mt-0.5">Upload foto proyek atau masukkan URL gambar.</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div v-for="(img, i) in form.gallery" :key="i" class="relative group">
                <ImageUploader v-model="form.gallery[i]" />
                <button type="button" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center text-red-500 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity" @click="form.gallery.splice(i, 1)">
                  <LucideTrash2 :size="14" />
                </button>
              </div>
              <button type="button" class="h-40 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 bg-slate-50 hover:border-accent hover:text-accent hover:bg-emerald-50 transition-all" @click="form.gallery.push('')">
                <LucidePlus :size="24" />
                <span class="text-xs font-bold uppercase tracking-wider">Tambah Foto</span>
              </button>
            </div>
          </div>

          <!-- Unit Types Section -->
          <div class="border-t border-slate-100 pt-6 flex flex-col gap-4">
            <div>
              <h3 class="text-base font-black text-primary">Tipe Unit</h3>
              <p class="text-xs text-slate-400 font-semibold mt-0.5">Daftarkan tipe-tipe unit yang tersedia di proyek ini.</p>
            </div>
            
            <div v-if="form.unitTypes.length" class="flex flex-col gap-2">
              <div class="grid grid-cols-[2fr_1fr_1fr_1.5fr_0.6fr_36px] gap-2 px-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <span>Tipe</span><span>Lt / Lb</span><span>KT/KM</span><span>Harga</span><span>Stok</span><span></span>
              </div>
              <div v-for="(u, i) in form.unitTypes" :key="i" class="grid grid-cols-[2fr_1fr_1fr_1.5fr_0.6fr_36px] gap-2 items-center">
                <input v-model="u.typeName" placeholder="Tipe" class="px-2.5 py-2 border border-slate-200 rounded-lg text-[13px] font-medium outline-none focus:border-accent" />
                <input v-model="u.landSize" placeholder="Lt/Lb" class="px-2.5 py-2 border border-slate-200 rounded-lg text-[13px] font-medium outline-none focus:border-accent" />
                <div class="flex gap-1">
                  <input v-model="u.bedroom" type="number" min="0" placeholder="KT" class="w-full px-1 py-2 border border-slate-200 rounded-lg text-[11px] font-bold text-center outline-none focus:border-accent" />
                  <input v-model="u.bathroom" type="number" min="0" placeholder="KM" class="w-full px-1 py-2 border border-slate-200 rounded-lg text-[11px] font-bold text-center outline-none focus:border-accent" />
                </div>
                <input v-model="u.price" type="number" min="0" placeholder="Harga" class="px-2.5 py-2 border border-slate-200 rounded-lg text-[13px] font-black text-accent outline-none focus:border-accent" />
                <input v-model="u.stock" type="number" min="0" placeholder="Stok" class="px-1 py-2 border border-slate-200 rounded-lg text-[13px] font-bold text-center outline-none focus:border-accent" />
                <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 border border-slate-100 hover:bg-red-50 transition-colors" @click="form.unitTypes.splice(i, 1)">
                  <LucideTrash2 :size="14" />
                </button>
              </div>
            </div>
            
            <button type="button" class="btn btn-outline self-start py-2 text-xs" @click="addUnitType">
              <LucidePlus :size="16" /> Tambah Tipe Unit
            </button>
          </div>

          <p v-if="errMsg" class="text-[13px] font-bold text-red-600 bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-2">
            {{ errMsg }}
          </p>

          <div class="shrink-0 pt-6 pb-2 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" class="btn btn-outline" @click="$emit('close')">Batal</button>
            <button type="submit" class="btn btn-accent px-8" :disabled="busy">
              <span v-if="busy">Menyimpan…</span>
              <span v-else>{{ isEdit ? 'Simpan Perubahan' : 'Buat Proyek' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { LucideX, LucidePlus, LucideTrash2 } from 'lucide-vue-next'

interface UnitTypeForm {
  id?: string
  typeName: string
  landSize: string
  buildingSize: string
  bedroom: number | null
  bathroom: number | null
  garage: number | null
  price: number
  stock: number
}

interface ProjectForm {
  name: string
  locationId: string
  startPrice: number
  status: string
  promo: string
  coverImage: string
  description: string
  gallery: string[]
  unitTypes: UnitTypeForm[]
}

const props = defineProps<{
  project?: any  // existing project for edit mode
}>()

const emit = defineEmits<{
  close: []
  saved: []
}>()

const isEdit = computed(() => !!props.project?.id)
const busy = ref(false)
const errMsg = ref('')

// Fetch available locations
const { data: locData } = await useFetch<{ locations: any[] }>('/api/locations')
const locations = computed(() => locData.value?.locations || [])

const form = reactive<ProjectForm>({
  name: '',
  locationId: '',
  startPrice: 0,
  status: 'AVAILABLE',
  promo: '',
  coverImage: '',
  description: '',
  gallery: [],
  unitTypes: []
})

// Populate form when editing
watch(() => props.project, (p) => {
  if (!p) return
  form.name = p.name ?? ''
  form.locationId = p.location?.id ?? ''
  form.startPrice = p.startPrice ?? 0
  form.status = p.status ?? 'AVAILABLE'
  form.promo = p.promo ?? ''
  form.coverImage = p.image ?? ''
  form.description = p.description ?? ''
  form.gallery = (p.gallery ?? []).map((g: any) => g.url ?? g)
  form.unitTypes = (p.unitTypes ?? []).map((u: any) => ({
    id: u.id,
    typeName: u.typeName,
    landSize: u.landSize ?? '',
    buildingSize: u.buildingSize ?? '',
    bedroom: u.bedroom ?? null,
    bathroom: u.bathroom ?? null,
    garage: u.garage ?? null,
    price: u.price,
    stock: u.stock
  }))
}, { immediate: true })

function addUnitType() {
  form.unitTypes.push({ typeName: '', landSize: '', buildingSize: '', bedroom: null, bathroom: null, garage: null, price: 0, stock: 0 })
}

async function handleSubmit() {
  errMsg.value = ''
  busy.value = true
  try {
    const body = {
      name: form.name.trim(),
      locationId: form.locationId,
      startPrice: Number(form.startPrice),
      status: form.status,
      promo: form.promo.trim(),
      coverImage: form.coverImage.trim(),
      description: form.description.trim()
    }

    let projectId: string

    if (isEdit.value) {
      await $fetch(`/api/projects/${props.project.id}`, { method: 'PUT' as any, body })
      projectId = props.project.id
    } else {
      const res = await $fetch<{ project: { id: string } }>('/api/projects', { method: 'POST' as any, body })
      projectId = res.project.id
    }

    // Sync gallery (new images only for create; for edit we just add new ones)
    for (const url of form.gallery.filter(u => u.trim())) {
      const alreadyExists = props.project?.gallery?.some((g: any) => (g.url ?? g) === url.trim())
      if (!alreadyExists) {
        await $fetch(`/api/projects/${projectId}/gallery`, {
          method: 'POST' as any,
          body: { url: url.trim() }
        }).catch(() => {})
      }
    }

    // Create or Update unit types
    for (const u of form.unitTypes.filter(u => u.typeName.trim())) {
      const uBody = {
        typeName: u.typeName.trim(),
        landSize: u.landSize || null,
        buildingSize: u.buildingSize || null,
        bedroom: u.bedroom || null,
        bathroom: u.bathroom || null,
        garage: u.garage || null,
        price: Number(u.price),
        stock: Number(u.stock),
        projectId: projectId
      }
      if (u.id) {
        await $fetch(`/api/unit-types/${u.id}`, { method: 'PUT' as any, body: uBody }).catch(() => {})
      } else {
        await $fetch(`/api/projects/${projectId}/unit-types`, { method: 'POST' as any, body: uBody }).catch(() => {})
      }
    }

    emit('saved')
  } catch (e: any) {
    errMsg.value = e?.data?.error ?? e?.message ?? 'Terjadi kesalahan.'
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>

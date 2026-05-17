<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">

    <!-- Subtle background gradient -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.06)_0%,_transparent_60%)] pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center text-center px-6 animate-fade-in">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 mb-16 no-underline group">
        <div class="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_32px_rgba(16,185,129,0.5)] transition-all duration-500">
          <LucideHome :size="20" class="text-white" />
        </div>
        <span class="text-white font-black text-xl tracking-[0.25em] uppercase">Proferti</span>
      </NuxtLink>

      <!-- Badge -->
      <div class="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
        <div class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
        <span class="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">Segera Hadir</span>
      </div>

      <!-- Heading -->
      <h1 class="text-5xl sm:text-6xl font-black text-white tracking-tighter leading-[1] mb-6">
        Under<br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Development</span>
      </h1>

      <!-- Description -->
      <p class="text-slate-400 text-base font-medium leading-relaxed max-w-sm mb-12">
        Fitur login sedang kami siapkan dengan pengalaman terbaik untuk Anda. Pantau terus perkembangan platform kami.
      </p>

      <!-- Back button -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-black text-[11px] uppercase tracking-[0.2em] px-6 py-3.5 rounded-2xl transition-all duration-300 group"
      >
        <LucideArrowLeft :size="14" class="group-hover:-translate-x-0.5 transition-transform" />
        Kembali ke Beranda
      </NuxtLink>

    </div>

    <!-- Bottom wordmark -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-700">
      © 2026 Proferti Elite Platform
    </div>

  </div>
</template>

<script setup lang="ts">
import { LucideHome, LucideArrowLeft } from 'lucide-vue-next'

definePageMeta({ hideFooter: true })
useSeoMeta({ title: 'Masuk — Proferti' })
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}
</style>

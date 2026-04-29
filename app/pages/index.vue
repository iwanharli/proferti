<template>
  <div class="landing-page">
    <!-- 1. Navbar -->
    <nav :class="['navbar', { 'navbar-scrolled': scrolled }]">
      <div class="container nav-content">
        <div class="nav-left">
          <NuxtLink to="/" class="logo">
            <div class="logo-icon"><LucideHome /></div>
            <span>PROFERTI</span>
          </NuxtLink>
        </div>
        <div class="nav-center">
          <NuxtLink to="/" class="nav-link">Beranda</NuxtLink>
          <NuxtLink to="/projects" class="nav-link">Cari Proyek</NuxtLink>
          <NuxtLink to="/developer/register" class="nav-link">Developer</NuxtLink>
          <a href="#cta-dev" class="nav-link">Tentang</a>
          <a href="#footer-kontak" class="nav-link">Kontak</a>
        </div>
        <div class="nav-right">
          <button type="button" class="nav-btn-link" @click="signInGithub">Masuk Developer</button>
          <NuxtLink to="/developer/register" class="btn btn-primary">Daftar Developer</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- 2. Hero Section -->
    <header class="hero">
      <div class="container hero-grid">
        <div class="hero-text" v-reveal>
          <h1 class="headline">Temukan Proyek Rumah Terbaik dari <span class="text-accent">Developer Terpercaya</span></h1>
          <p class="subheadline">Bandingkan lokasi, harga, dan promo dari berbagai developer dalam satu platform.</p>
          <div class="hero-ctas">
            <NuxtLink class="btn btn-primary btn-lg" to="/projects">Lihat Proyek</NuxtLink>
            <button type="button" class="btn btn-outline btn-lg" @click="openMail">Jadwalkan Konsultasi</button>
          </div>
          <div class="trust-badges">
            <div class="badge">
              <span class="badge-num">50+</span>
              <span class="badge-label">Developer</span>
            </div>
            <div class="badge">
              <span class="badge-num">300+</span>
              <span class="badge-label">Proyek</span>
            </div>
            <div class="badge">
              <span class="badge-num">1.200+</span>
              <span class="badge-label">Unit Tersedia</span>
            </div>
          </div>
        </div>
        <div class="hero-visual" v-reveal="{ delay: 200 }">
          <div class="image-wrapper">
             <NuxtImg src="https://images.unsplash.com/photo-1600585154340-be6191da110e?auto=format&fit=crop&w=1200" alt="Premium House" class="hero-img" />
             <div class="image-overlay"></div>
          </div>
        </div>
      </div>

      <!-- 3. Smart Search Box -->
      <div class="search-container container" v-reveal="{ delay: 400 }">
        <div class="search-box glass-card">
          <div class="search-field">
            <label><LucideMapPin size="16" /> Kota</label>
            <select v-model="searchCity">
              <option value="">Semua Kota</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Tangerang">Tangerang</option>
            </select>
          </div>
          <div class="search-field">
            <label><LucideDollarSign size="16" /> Harga</label>
            <select v-model="priceBand">
              <option value="">Mulai Dari</option>
              <option value="lt500">&lt; 500 Jt</option>
              <option value="500to1000">500 Jt - 1 M</option>
              <option value="gt1000">&gt; 1 M</option>
            </select>
          </div>
          <div class="search-field">
            <label><LucideHome size="16" /> Tipe Rumah</label>
            <select v-model="houseType">
              <option value="">Semua Tipe</option>
              <option value="Modern">Modern</option>
              <option value="Classic">Classic</option>
              <option value="Minimalist">Minimalist</option>
            </select>
          </div>
          <div class="search-field">
            <label><LucideBuilding size="16" /> Developer</label>
            <select v-model="searchDeveloperId">
              <option value="">Semua Developer</option>
              <option v-for="d in devOptions" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>
          </div>
          <button type="button" class="btn btn-accent search-btn" @click="runHomeSearch">
            <LucideSearch /> Cari
          </button>
        </div>
      </div>
    </header>

    <!-- 4. Featured Projects -->
    <section class="featured">
      <div class="container">
        <h2 class="section-title" v-reveal>Proyek Pilihan <span class="text-accent">Minggu Ini</span></h2>
        <p v-if="featuredPending" class="featured-hint">Memuat proyek…</p>
        <p v-else-if="featuredError" class="featured-hint">Data proyek belum tersedia. Jalankan migrasi database dan <code>npm run db:seed</code>.</p>
        <p v-else-if="!featuredProjects.length" class="featured-hint">Belum ada proyek dalam database.</p>
        <div v-else class="project-grid">
          <div v-for="(project, i) in featuredProjects" :key="project.id" class="project-card" v-reveal="{ delay: i * 100 }">
            <NuxtLink :to="`/projects/${project.id}`" class="card-image card-image-link">
              <NuxtImg :src="project.image || DEFAULT_IMG" :alt="project.name" />
              <div v-if="project.promo" class="card-badge">{{ project.promo }}</div>
            </NuxtLink>
            <div class="card-body">
              <div class="card-location"><LucideMapPin size="14" /> {{ project.location }}</div>
              <h3 class="card-title">{{ project.name }}</h3>
              <div class="card-price">Mulai {{ formatPropertyPrice(project.startPrice) }}</div>
              <NuxtLink class="btn btn-outline btn-full" :to="`/projects/${project.id}`">Lihat Detail</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Why Choose Us -->
    <section class="why-us bg-soft">
      <div class="container">
        <div class="why-grid">
          <div v-for="(item, i) in whyUs" :key="i" class="why-card" v-reveal="{ delay: i * 100 }">
            <div class="why-icon"><component :is="item.icon" /></div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Premium Showcase Banner -->
    <section class="showcase">
      <div class="container">
        <div class="showcase-content" v-reveal>
          <h2 class="showcase-title">Hunian Bernilai <span class="text-accent">Investasi Tinggi</span></h2>
          <p>Kualitas bangunan premium di lokasi paling strategis.</p>
          <NuxtLink class="btn btn-accent btn-lg" to="/projects">Lihat Cluster Premium</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 8. Testimonials -->
    <section class="testimonials">
      <div class="container">
        <div class="testimonial-grid">
          <div v-for="(testi, i) in testimonials" :key="i" class="testimonial-card" v-reveal="{ delay: i * 150 }">
            <div class="quote-icon"><LucideQuote size="32" /></div>
            <p class="quote-text">“{{ testi.text }}”</p>
            <div class="quote-author">— {{ testi.author }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. CTA Untuk Developer -->
    <section id="cta-dev" class="cta-dev">
      <div class="container">
        <div class="cta-dev-content" v-reveal>
          <h2>Punya Proyek Perumahan? <br>Pasarkan Lebih Cepat Bersama Kami</h2>
          <NuxtLink class="btn btn-accent btn-lg" to="/developer/register">Gabung Sebagai Developer</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 10. Footer -->
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-info">
          <div class="logo inverted">
            <LucideHome />
            <span>PROFERTI</span>
          </div>
          <p>Platform marketplace properti terpercaya untuk hunian masa depan Anda.</p>
          <div class="socials">
            <LucideInstagram />
            <LucideTwitter />
            <LucideFacebook />
          </div>
        </div>
        <div class="footer-menu">
          <h5>Layanan</h5>
          <NuxtLink to="/projects">Cari Proyek</NuxtLink>
          <a href="#">Simulasi KPR</a>
          <a href="#">Konsultasi Gratis</a>
        </div>
        <div class="footer-menu">
          <h5>Perusahaan</h5>
          <a href="#">Tentang Kami</a>
          <a href="#">Karir</a>
          <a href="#">Developer Partnership</a>
        </div>
        <div id="footer-kontak" class="footer-contact">
          <h5>Kontak</h5>
          <p><LucideMail size="16" /> hello@proferti.com</p>
          <p><LucidePhone size="16" /> +62 21 1234 5678</p>
          <p><LucideMapPin size="16" /> Jakarta, Indonesia</p>
        </div>
      </div>
      <div class="footer-bottom container">
        <p>&copy; 2026 Proferti. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideHome, LucideSearch, LucideMapPin, LucideDollarSign, 
  LucideBuilding, LucideShieldCheck, LucideZap, LucideCalendar,
  LucideQuote, LucideInstagram, LucideTwitter, LucideFacebook,
  LucideMail, LucidePhone
} from 'lucide-vue-next'
import { useWindowScroll } from '@vueuse/core'
import { formatPropertyPrice } from '~/utils/currency'

const DEFAULT_IMG =
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600'

const router = useRouter()
const { signIn } = useAuth()

async function signInGithub() {
  await signIn('github', { callbackUrl: '/developer/register' })
}

function openMail() {
  if (import.meta.client) {
    window.location.href = 'mailto:hello@proferti.com?subject=Konsultasi%20Proferti'
  }
}

const searchCity = ref('')
const priceBand = ref('')
const houseType = ref('')
const searchDeveloperId = ref('')
const devOptions = ref<{ id: string; name: string }[]>([])

onMounted(async () => {
  try {
    const res = await $fetch<{ developers: { id: string; name: string }[] }>('/api/developers')
    devOptions.value = res.developers
  } catch {
    devOptions.value = []
  }
})

function runHomeSearch() {
  const query: Record<string, string> = {}
  if (searchCity.value) query.city = searchCity.value
  if (searchDeveloperId.value) query.developerId = searchDeveloperId.value
  if (priceBand.value === 'lt500') query.maxPrice = '500000000'
  else if (priceBand.value === '500to1000') {
    query.minPrice = '500000000'
    query.maxPrice = '1000000000'
  } else if (priceBand.value === 'gt1000') query.minPrice = '1000000000'
  if (houseType.value) query.q = houseType.value
  router.push({ path: '/projects', query })
}

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 50)

const {
  data: featuredPayload,
  pending: featuredPending,
  error: featuredError
} = await useFetch<{
  projects: {
    id: string
    name: string
    location: string
    startPrice: number
    promo: string | null
    image: string | null
  }[]
}>('/api/projects', {
  query: { limit: '3', status: 'AVAILABLE', skip: '0' },
  key: 'landing-featured-projects'
})

const featuredProjects = computed(() => featuredPayload.value?.projects ?? [])

// Custom reveal directive for scroll animations
const vReveal = {
  mounted: (el, binding) => {
    const delay = binding.value?.delay || 0
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1 })
    observer.observe(el)
  }
}

const whyUs = [
  {
    title: 'Developer Terverifikasi',
    desc: 'Kami hanya bekerjasama dengan developer bereputasi tinggi.',
    icon: LucideShieldCheck
  },
  {
    title: 'Harga Transparan',
    desc: 'Tidak ada biaya tersembunyi, semua sesuai brosur resmi.',
    icon: LucideDollarSign
  },
  {
    title: 'Simulasi KPR Instan',
    desc: 'Hitung cicilan Anda dalam hitungan detik.',
    icon: LucideZap
  },
  {
    title: 'Booking Survey Mudah',
    desc: 'Atur jadwal kunjungan lokasi langsung via aplikasi.',
    icon: LucideCalendar
  }
]

const testimonials = [
  {
    text: 'Dalam 2 hari dapat 14 lead berkualitas dari Proferti.',
    author: 'Developer X'
  },
  {
    text: 'Website ini bantu closing lebih cepat dengan fitur simulasi KPR-nya.',
    author: 'Developer Y'
  },
  {
    text: 'User experience yang sangat elegan memudahkan customer mencari rumah.',
    author: 'Marketing Manager Z'
  }
]

useSeoMeta({
  title: 'Proferti - Proyek Rumah Terbaik dari Developer Terpercaya',
  description: 'Bandingkan lokasi, harga, dan promo dari berbagai developer properti terbaik di Indonesia dalam satu platform.'
})
</script>

<style scoped>
/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  z-index: 1000;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.5px;
  color: var(--primary);
}

.logo-icon {
  color: var(--accent);
}

.nav-center {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 15px;
  font-weight: 500;
  position: relative;
  padding: 4px 0;
  color: var(--text);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-btn-link {
  font-weight: 600;
  font-size: 15px;
  color: var(--text-muted);
}

/* Hero */
.hero {
  padding: 160px 0 120px;
  background: radial-gradient(circle at 80% 20%, var(--accent-soft), transparent 40%);
  position: relative;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
}

.headline {
  margin-bottom: 24px;
}

.text-accent {
  color: var(--accent);
}

.subheadline {
  font-size: 20px;
  color: var(--text-muted);
  margin-bottom: 40px;
  max-width: 500px;
}

.hero-ctas {
  display: flex;
  gap: 16px;
  margin-bottom: 60px;
}

.btn-lg {
  padding: 16px 36px;
  font-size: 18px;
}

.trust-badges {
  display: flex;
  gap: 40px;
}

.badge {
  display: flex;
  flex-direction: column;
}

.badge-num {
  font-size: 32px;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
}

.badge-label {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 4px;
}

.image-wrapper {
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.hero-img {
  width: 100%;
  height: 600px;
  object-fit: cover;
  transition: transform 1s ease;
}

.image-wrapper:hover .hero-img {
  transform: scale(1.05);
}

/* Search Box */
.search-container {
  margin-top: -60px;
  position: relative;
  z-index: 10;
}

.search-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 20px;
  padding: 30px;
  border-radius: var(--radius);
  align-items: flex-end;
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-field label {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-field select {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: white;
  font-family: inherit;
  font-size: 15px;
  outline: none;
}

.search-btn {
  height: 50px;
}

/* Featured Section */
.section-title {
  text-align: center;
  margin-bottom: 60px;
}

.featured-hint {
  text-align: center;
  margin-bottom: 32px;
  color: var(--text-muted);
  font-size: 16px;
}

.featured-hint code {
  font-size: 0.9em;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.project-card {
  border-radius: 24px;
  overflow: hidden;
  background: white;
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
  height: 240px;
}

.card-image-link {
  display: block;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: var(--accent);
  color: white;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
}

.card-body {
  padding: 24px;
}

.card-location {
  font-size: 14px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 22px;
  margin-bottom: 12px;
}

.card-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 24px;
}

.btn-full {
  width: 100%;
  justify-content: center;
}

/* Why Us */
.bg-soft { background-color: var(--soft-bg); }

.why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.why-card {
  padding: 32px;
  text-align: center;
}

.why-icon {
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: var(--accent);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.why-card h4 {
  margin-bottom: 12px;
}

.why-card p {
  font-size: 14px;
  color: var(--text-muted);
}

/* Showcase Banner */
.showcase {
  background: linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), 
              url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  text-align: center;
  padding: 120px 0;
}

.showcase-title {
  color: white;
  font-size: 48px;
  margin-bottom: 16px;
}

.showcase-content p {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.8;
}

/* Testimonials */
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.testimonial-card {
  padding: 40px;
  background: white;
  border-radius: 24px;
  border: 1px solid var(--border);
}

.quote-icon {
  color: var(--accent-soft);
  margin-bottom: 24px;
}

.quote-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
  line-height: 1.6;
}

.quote-author {
  font-weight: 700;
  color: var(--primary);
}

/* Developer CTA */
.cta-dev {
  background-color: var(--primary);
  color: white;
  text-align: center;
  padding: 80px 0;
}

.cta-dev h2 {
  color: white;
  font-size: 36px;
  margin-bottom: 40px;
}

/* Footer */
.footer {
  background: var(--soft-bg);
  padding: 80px 0 40px;
  border-top: 1px solid var(--border);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 60px;
  margin-bottom: 60px;
}

.footer-info p {
  margin: 20px 0;
  color: var(--text-muted);
}

.socials {
  display: flex;
  gap: 16px;
  color: var(--primary);
}

.footer-menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-menu h5, .footer-contact h5 {
  margin-bottom: 12px;
}

.footer-menu a {
  color: var(--text-muted);
  font-size: 15px;
}

.footer-menu a:hover {
  color: var(--accent);
}

.footer-contact p {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid var(--border);
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .nav-center { display: none; }
  .hero-grid { grid-template-columns: 1fr; }
  .search-box { grid-template-columns: 1fr 1fr; }
  .project-grid, .why-grid, .testimonial-grid, .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  .project-grid, .why-grid, .testimonial-grid, .footer-grid { grid-template-columns: 1fr; }
  .search-box { grid-template-columns: 1fr; }
  .hero-ctas { flex-direction: column; }
  .trust-badges { flex-wrap: wrap; gap: 20px; }
  .showcase-title { font-size: 32px; }
  .hero-img { height: 400px; }
}
</style>

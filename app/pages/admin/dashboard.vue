<template>
  <div class="admin-dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <LucideHome :size="24" class="text-accent" />
        <span class="logo-text">ADMIN PANEL</span>
      </div>
      
      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">
          <LucideLayoutDashboard :size="20" /> Dashboard
        </a>
        <a href="#" class="nav-item">
          <LucideBuilding :size="20" /> Developers
        </a>
        <a href="#" class="nav-item">
          <LucideHome :size="20" /> Proyek Rumah
        </a>
        <a href="#" class="nav-item">
          <LucideUsers :size="20" /> User Management
        </a>
        <a href="#" class="nav-item">
          <LucideSettings :size="20" /> Pengaturan
        </a>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="logout-btn">
          <LucideLogOut :size="20" /> Keluar
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="content-header">
        <div class="header-left">
          <h1>Dashboard Overview</h1>
          <p>Selamat datang kembali, Admin.</p>
        </div>
        <div class="header-right">
          <div class="user-profile">
            <div class="avatar">A</div>
            <span>{{ userEmail }}</span>
          </div>
        </div>
      </header>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card glass-card">
          <div class="stat-icon bg-blue"><LucideUsers :size="24" /></div>
          <div class="stat-info">
            <span class="stat-label">Total User</span>
            <span class="stat-value">1,284</span>
          </div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon bg-purple"><LucideBuilding :size="24" /></div>
          <div class="stat-info">
            <span class="stat-label">Developer</span>
            <span class="stat-value">42</span>
          </div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon bg-orange"><LucideHome :size="24" /></div>
          <div class="stat-info">
            <span class="stat-label">Total Proyek</span>
            <span class="stat-value">315</span>
          </div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon bg-green"><LucideTrendingUp :size="24" /></div>
          <div class="stat-info">
            <span class="stat-label">Lead Bulan Ini</span>
            <span class="stat-value">+12%</span>
          </div>
        </div>
      </div>

      <!-- Recent Activity / Table Section -->
      <section class="content-section">
        <div class="section-header">
          <h2>Pendaftaran Developer Terbaru</h2>
          <button class="btn btn-link">Lihat Semua</button>
        </div>
        <div class="table-container glass-card">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Nama Perusahaan</th>
                <th>Email</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>BSD Land Group</strong></td>
                <td>contact@bsdland.com</td>
                <td><span class="badge badge-success">Aktif</span></td>
                <td>30 Apr 2026</td>
                <td><button class="btn btn-sm btn-outline">Detail</button></td>
              </tr>
              <tr>
                <td><strong>Dago Hills Dev</strong></td>
                <td>admin@dagohills.id</td>
                <td><span class="badge badge-warning">Pending</span></td>
                <td>28 Apr 2026</td>
                <td><button class="btn btn-sm btn-outline">Detail</button></td>
              </tr>
              <tr>
                <td><strong>Cibubur Prime</strong></td>
                <td>hello@cibubur.com</td>
                <td><span class="badge badge-success">Aktif</span></td>
                <td>25 Apr 2026</td>
                <td><button class="btn btn-sm btn-outline">Detail</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  LucideHome, LucideLayoutDashboard, LucideBuilding, 
  LucideUsers, LucideSettings, LucideLogOut, 
  LucideTrendingUp 
} from 'lucide-vue-next'

const { data, signOut } = useAuth()
const userEmail = computed(() => data.value?.user?.email || 'Admin')

async function handleLogout() {
  await signOut({ callbackUrl: '/login' })
}

useSeoMeta({
  title: 'Admin Dashboard - Proferti'
})
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background-color: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
}

.sidebar-header {
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: 1px;
}

.sidebar-nav {
  flex: 1;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #94a3b8;
  font-weight: 500;
  transition: all 0.3s;
}

.nav-item:hover, .nav-item.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.sidebar-footer {
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 12px;
  transition: background 0.3s;
}

.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 40px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.content-header h1 {
  font-size: 28px;
  margin-bottom: 4px;
}

.content-header p {
  color: var(--text-muted);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: white;
  border-radius: 100px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.avatar {
  width: 32px;
  height: 32px;
  background: var(--accent);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: white;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.bg-blue { background-color: #3b82f6; }
.bg-purple { background-color: #a855f7; }
.bg-orange { background-color: #f97316; }
.bg-green { background-color: #22c55e; }

.stat-label {
  display: block;
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
}

/* Sections & Tables */
.content-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.table-container {
  padding: 0;
  overflow: hidden;
  background: white;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th {
  text-align: left;
  padding: 16px 24px;
  background-color: #f8fafc;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
}

.admin-table td {
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  font-size: 15px;
}

.badge {
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
}

.badge-success { background: #dcfce7; color: #166534; }
.badge-warning { background: #fef9c3; color: #854d0e; }

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
}
</style>

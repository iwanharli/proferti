export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth()
  const user = data.value?.user as any

  // 1. Daftar rute terproteksi
  const isAdminRoute = to.path.startsWith('/admin')
  const isDevRoute = to.path.startsWith('/developer/dashboard')

  // 2. Jika user belum login dan mencoba akses rute terproteksi
  if (status.value !== 'authenticated' && (isAdminRoute || isDevRoute)) {
    return navigateTo('/login')
  }

  // 3. Proteksi rute Admin (Hanya Role ADMIN)
  if (isAdminRoute && user?.role !== 'ADMIN') {
    return navigateTo('/')
  }

  // 4. Proteksi rute Developer (Hanya Role DEVELOPER)
  if (isDevRoute && user?.role !== 'DEVELOPER') {
    return navigateTo('/')
  }

  // 5. Jika sudah login dan mencoba akses halaman login, lempar ke dashboard masing-masing
  if (status.value === 'authenticated' && to.path === '/login') {
    if (user?.role === 'ADMIN') return navigateTo('/admin/dashboard')
    if (user?.role === 'DEVELOPER') return navigateTo('/developer/dashboard')
    return navigateTo('/')
  }
})

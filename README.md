# Proferti Frontend (Nuxt 4)

Frontend aplikasi Proferti menggunakan Nuxt 4 dengan desain premium dan sistem autentikasi terintegrasi.

## Teknologi
- **Framework**: [Nuxt 4](https://nuxt.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [sidebase/nuxt-auth](https://auth.sidebase.io/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)

## Persiapan
1. Instal dependensi:
   ```bash
   npm install
   ```
2. Pastikan file `.env` sudah dikonfigurasi mengikuti `.env.example`.
3. Sinkronisasi Prisma Client (Tanpa merusak database Go):
   ```bash
   npx prisma generate
   ```

## Pengembangan
Jalankan server pengembangan:
```bash
npm run dev
```
Aplikasi akan tersedia di `http://localhost:3000` (atau `3001` jika port 3000 terpakai).

## Integrasi Database
Proyek ini berbagi database dengan **proferti-be** (Go). 
- Semua perubahan skema database dilakukan melalui migrasi Go di repository `proferti-be`.
- Frontend hanya menggunakan Prisma untuk membaca/menulis data dengan mapping yang sudah disesuaikan (`@map("t_...")` dan `@map("na_...")`).

## Fitur Utama
- **Premium Design System**: Menggunakan glassmorphism dan animasi modern.
- **Unified Auth**: Login menggunakan GitHub OAuth yang tersimpan di PostgreSQL.
- **Marketplace Listing**: Menampilkan data properti langsung dari database.

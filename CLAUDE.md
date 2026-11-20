# CLAUDE.md: ANTORA Website

Panduan untuk Claude (atau pengembang lain) saat mengubah proyek ini.

## Ringkasan
Situs resmi ANTORA ($ANTA), merek kripto/Web3 berbasis komunitas dengan tema hitam-emas dan simbol semut.
Slogan: SMALL ANT. MASSIVE POWER. Filosofi: STRENGTH IN UNITY. POWER IN COMMUNITY.
Akun X resmi: https://x.com/AntoraAI

## Teknologi
Situs statis: HTML + CSS + JavaScript biasa (tanpa framework, tanpa build step).
Font Inter dan Sora dari Google Fonts. Dijalankan dengan `npm start` (paket `serve`) atau server statis apa pun.

## Struktur
- `index.html`: seluruh markup (13 bagian, navigasi, footer).
- `css/styles.css`: design system (token warna dan font di `:root`) dan semua gaya.
- `js/config.js`: SATU-SATUNYA tempat nilai resmi diisi (URL, token, alokasi).
- `js/main.js`: perilaku (menu mobile, scroll spy, FAQ, pemilih ekosistem, donut tokenomics, partikel hero).
- `assets/`: tempat berkas logo lokal (opsional).

## Aturan yang tidak boleh dilanggar
1. Jangan mengarang blockchain, alamat kontrak, total supply, harga, listing bursa, kemitraan, status audit, atau statistik keuangan. Gunakan TBD / "To Be Announced" sampai ada informasi resmi.
2. Tombol Buy, Download Whitepaper, Telegram, Discord, dan Copy kontrak tetap nonaktif sampai nilainya diisi di `js/config.js`.
3. Roadmap dan komponen ekosistem selalu ditampilkan sebagai rencana/konsep, bukan pencapaian.
4. Selalu pakai logo resmi `https://i.imgur.com/avTQLwi.png` (atau salinan lokalnya di `assets/`). Jangan ganti emblem semut dengan maskot lain dan jangan ubah proporsinya.
5. Palet: #080808, #111111, #D4A017, #FFD700, #8C6914, #FFFFFF. Pertahankan teks yang terbaca (kontras) dan `prefers-reduced-motion`.
6. Teks Privacy Policy dan Terms of Use di footer masih placeholder; ganti dengan dokumen hukum resmi sebelum peluncuran.

## Perintah
- `npm install` lalu `npm start`: jalankan di http://localhost:3000
- `npm run check`: cek sintaks JavaScript

## Catatan pengembangan
- Setelah menambah bagian baru, daftarkan id-nya di array `ids` pada scroll spy di `js/main.js`.
- Jika ingin dipindah ke Next.js/TypeScript/Tailwind/Framer Motion, pertahankan konten, aturan di atas, dan struktur data `ANTORA_CONFIG`.

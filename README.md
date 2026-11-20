# ANTORA ($ANTA) Official Website

Situs resmi ANTORA bertema hitam-emas: hero beranimasi dengan partikel emas dan elemen heksagonal, nilai inti, visualisasi ekosistem interaktif, informasi token, dashboard tokenomics, roadmap, whitepaper, komunitas, FAQ akordeon, dan footer dengan disclaimer risiko.

> **SMALL ANT. MASSIVE POWER.** Strength in Unity. Power in Community.

Proyek ini adalah **situs statis** (HTML, CSS, JavaScript). Tidak ada build step. Informasi yang belum resmi (blockchain, supply, kontrak, persentase alokasi, vesting) ditampilkan sebagai TBD dan tidak dikarang.

## Isi proyek

```
ANTORA-WEBSITE/
├── index.html        Markup semua bagian
├── css/styles.css    Design system dan gaya
├── js/config.js      Nilai resmi yang bisa diedit
├── js/main.js        Perilaku situs
├── assets/           Tempat logo lokal (opsional)
├── package.json
├── .env.example
├── .gitignore
├── CLAUDE.md
└── README.md
```

## Menjalankan di komputer

Pilih salah satu.

**A. Dengan Node.js (disarankan, Node 18 atau lebih baru)**
```bash
npm install
npm start
```
Buka http://localhost:3000

**B. Dengan Python (tanpa instalasi paket)**
```bash
python3 -m http.server 3000
```
Buka http://localhost:3000

**C. Langsung**
Klik dua kali `index.html`. Sebagian besar fitur berjalan, tetapi server lokal (A atau B) lebih disarankan.

Pastikan komputer terhubung ke internet agar font Google dan logo resmi dari Imgur dapat dimuat.

## Mengisi informasi resmi

Buka `js/config.js` dan isi nilainya hanya setelah resmi diumumkan:

| Kunci | Efek saat diisi |
|---|---|
| `buyUrl` | Tombol **Buy ANTORA** aktif (harus diawali `https://`) |
| `whitepaperUrl` | Tombol **Download whitepaper** aktif |
| `telegramUrl`, `discordUrl` | Tombol komunitas aktif |
| `blockchain`, `totalSupply`, `utility`, `vesting` | Menggantikan TBD |
| `contractAddress` | Menampilkan alamat dan mengaktifkan tombol **Copy** |
| `allocations[].pct` | Isi angka untuk **semua** enam kategori agar donut menampilkan proporsi resmi |

Jangan mengisi nilai dengan tebakan. Biarkan kosong jika belum resmi.

## Logo

Situs memakai logo resmi dari `https://i.imgur.com/avTQLwi.png`. Jika gambar gagal dimuat, tampil tulisan ANTORA sebagai cadangan.

Untuk memakai salinan lokal: simpan logo sebagai `assets/antora-logo.png`, lalu ganti `https://i.imgur.com/avTQLwi.png` dengan `assets/antora-logo.png` di `index.html` (cari dan ganti semua kemunculannya). Jangan mengubah bentuk atau proporsi logo.

## Deploy

Karena statis, folder ini bisa diunggah apa adanya ke Netlify, Vercel, Cloudflare Pages, GitHub Pages, atau hosting biasa. Tidak ada perintah build; direktori yang dipublikasikan adalah root folder.

## Sebelum peluncuran

- Ganti teks placeholder **Privacy Policy** dan **Terms of Use** di footer (`index.html`) dengan dokumen hukum resmi.
- Tambahkan gambar pratinjau sosial (Open Graph) jika dibutuhkan.
- Periksa ulang bahwa semua klaim di situs sesuai informasi resmi.

## Pindah ke Next.js

Jika ingin Next.js, TypeScript, Tailwind CSS, Framer Motion, dan Lucide Icons, struktur data di `js/config.js` dan konten di `index.html` bisa dijadikan acuan langsung. `.env.example` sudah memuat padanan variabel `NEXT_PUBLIC_*`.

## Disclaimer

Kripto berisiko tinggi dan dapat menyebabkan kehilangan seluruh nilai. Situs ini hanya informasi, tidak menawarkan penjualan token, dan bukan saran keuangan. Ikuti hanya akun X resmi: https://x.com/AntoraAI

© 2026 ANTORA. All Rights Reserved.

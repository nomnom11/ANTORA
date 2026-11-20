/*
 * ANTORA: konfigurasi yang bisa diedit.
 * Isi nilai di bawah HANYA setelah informasi resmi tersedia.
 * Nilai kosong ("") berarti tombol/bagian terkait tetap nonaktif atau tampil sebagai TBD.
 */
window.ANTORA_CONFIG = {
  buyUrl: "",            // URL pembelian resmi (harus diawali https://). Kosong = tombol Buy nonaktif.
  whitepaperUrl: "",     // URL/berkas whitepaper resmi. Kosong = tombol Download nonaktif.
  telegramUrl: "",       // Tautan Telegram resmi
  discordUrl: "",        // Tautan Discord resmi
  blockchain: "",        // Nama jaringan blockchain setelah diumumkan
  totalSupply: "",       // Total supply resmi
  contractAddress: "",   // Alamat kontrak resmi. Terisi = tombol Copy aktif.
  utility: "",           // Deskripsi utilitas token resmi
  vesting: "",           // Jadwal vesting resmi
  allocations: [         // Isi pct (angka) untuk SEMUA kategori setelah tokenomics disetujui
    { name: "Community Allocation", pct: null },
    { name: "Ecosystem Development", pct: null },
    { name: "Liquidity", pct: null },
    { name: "Marketing", pct: null },
    { name: "Team", pct: null },
    { name: "Treasury", pct: null }
  ]
};

# Portfolio Website — Rencana & Spesifikasi

> Dokumen perencanaan buat portfolio kamu. Disusun dari fondasi (positioning) → konten → tech stack → roadmap → tips. Bisa dikerjain bertahap, gak harus sekali jadi.

---

## 1. Positioning — Ini Fondasinya (baca ini dulu)

**Identitas kamu: Computer Science × Statistics. Jangan dipisah, justru gabungin.**

Kombinasi ini langka & bernilai tinggi:
- Anak CS biasanya lemah di statistik/modeling.
- Anak Statistics biasanya gak bisa bangun aplikasi produksi.
- **Kamu bisa dua-duanya** → ini diferensiasi kamu.

### Arah positioning yang disarankan
> *"Aku bangun produk software yang juga pinter sama data."*
> (Data-driven web apps / arah ke Data Science & ML Engineering)

- Proyek **IT/web** kamu = bukti kemampuan **membangun** (engineering).
- Proyek **statistik** kamu = bukti kemampuan **menganalisis** (modeling/insight).
- Digabung = satu narasi kuat, bukan dua orang berbeda.

### Tagline (pilih/adaptasi salah satu)
- "Computer Science × Statistics — building software that understands data."
- "I turn data into products people actually use."
- "Full-stack developer with a statistician's brain."

> **Aturan emas:** HR & engineer mutusin kesan pertama dalam < 5 detik di hero section. Tagline + 1 kalimat harus langsung bikin mereka ngerti siapa kamu.

---

## 2. Struktur Halaman & Konten

Dibagi 3 tier: **Wajib (MVP)**, **Pembeda (bikin naik kelas)**, **Bonus (wow factor)**.

### TIER 1 — Wajib Ada (MVP)

| Section | Isi | Kenapa penting |
|---|---|---|
| **Hero / Landing** | Nama, tagline positioning, 1 kalimat, tombol CTA (Lihat Proyek / Kontak / Download CV) | Kesan pertama. Penentu HR lanjut scroll atau nggak. |
| **About** | Cerita singkat, angle double degree, apa yang bikin kamu beda, foto profesional | Bikin kamu jadi "manusia", bukan cuma list skill |
| **Projects** | Showcase web2 kamu. Filterable: kategori *Engineering* & *Data/Stats*. Tiap proyek: judul, masalah yang diselesaikan, peran kamu, tech yang dipakai, hasil, link live + GitHub | **Jantung portfolio.** Ini yang paling dilihat |
| **Skills / Tech Stack** | Dikelompokin per kategori (lihat bawah), bukan list acak | Recruiter scan cepat buat cek match sama lowongan |
| **Contact** | Form + link GitHub, LinkedIn, email. Tombol download CV/Resume | HR butuh cara hubungin + CV buat ATS mereka |

**Cara nampilin Skills (kelompokin gini):**
- **Languages:** Python, JavaScript/TypeScript, R, SQL, (Java/C++ kalau ada)
- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, FastAPI / Flask, REST API
- **Data & ML:** pandas, NumPy, scikit-learn, statistical modeling, (PyTorch/TensorFlow kalau ada)
- **Data Viz:** D3.js, Recharts, Plotly, (Tableau/Power BI kalau ada)
- **Tools:** Git, Docker, Vercel, dll.

> Sesuaikan sama skill asli kamu — jangan cantumin yang gak nguasain, HR sering nanya pas interview.

### TIER 2 — Pembeda (ini yang bikin naik kelas dari "list proyek")

| Section | Isi | Kenapa powerful |
|---|---|---|
| **Blog / Writing / "Notes"** | 3-5 tulisan teknis singkat atau writeup analisis data | Nunjukin kamu **bisa komunikasi + punya kedalaman**. Bagus juga buat SEO & personal branding |
| **Deep Case Study (1-2 proyek)** | Pilih proyek flagship, ceritain proses lengkap: masalah → keputusan & trade-off → hasil/metrik → apa yang dipelajari | HR & engineer suka liat **proses berpikir**, bukan cuma hasil jadi |
| **Interactive Data Viz / Live Demo** | Embed chart/dashboard interaktif yang jalan langsung di web | **Senjata utama kamu** — skill statistik kamu kelihatan *jalan di browser*, bukan cuma diklaim. Show, don't tell. |

### TIER 3 — Bonus (kalau sempat)

- **"By the Numbers"** — statistik diri (jumlah proyek, commit, teknologi). On-brand banget buat anak stats.
- **GitHub stats integration** — tarik kontribusi GitHub otomatis.
- **Testimonials** — dari dosen, teammate, atau mentor magang (bagus buat freelance ke depan).
- **"Now" page** — lagi belajar/ngerjain apa sekarang. Sentuhan personal branding.
- **Uses / Toolkit** — tools & setup yang kamu pakai.

---

## 3. Tech Stack (Rekomendasi)

> Prinsip: bukan cuma "paling canggih", tapi **paling pas buat tujuan kamu** (impress HR + cari kerja + maintainable + gratis dijalanin).

| Kategori | Pilihan | Alasan |
|---|---|---|
| **Framework** | **Next.js 15 (App Router)** | Standar industri, paling sering diminta di lowongan → **sinyal karier kuat ke HR**. SEO bagus (SSG), cepat, ekosistem besar, ada serverless API route built-in |
| **Language** | **TypeScript** | Nunjukin kamu nulis kode type-safe & production-grade — recruiter notice |
| **Styling** | **Tailwind CSS + shadcn/ui** | Tailwind cepat & modern; shadcn = komponen siap pakai yang aksesibel & rapi → keliatan pro tanpa desain dari nol |
| **Konten (blog & data proyek)** | **MDX** (via Velite / next-mdx-remote) | Markdown-based, version controlled, **gak butuh database**, gratis. Bisa selipin komponen React di dalam tulisan |
| **Animasi** | **Framer Motion (Motion)** | Transisi halus & scroll animation → bikin kesan "premium" yang nge-wow |
| **Data Viz** | **Recharts** (mudah) atau **visx / D3** (lebih custom & impressive) | Buat embed chart interaktif — superpower statistik kamu |
| **Form** | **React Hook Form + Zod** | Validasi rapi & standar industri |
| **Email/Contact** | **Next.js API route + Resend** (atau **Web3Forms** kalau mau tanpa backend) | Resend = email API modern, sekalian nunjukin skill backend kamu |
| **Deployment** | **Vercel** | Gratis, dibuat khusus Next.js, auto-deploy dari GitHub (CI/CD), preview deployment, support custom domain |
| **Analytics** | **Vercel Analytics** atau **Plausible** | Track pengunjung — on-brand buat anak data, sekalian useful |
| **Dark Mode** | **next-themes** | Udah jadi ekspektasi standar di portfolio dev modern |
| **SEO** | next-sitemap + metadata + **dynamic OG image** (next/og) | OG image bikin link kamu keliatan pro pas di-share di LinkedIn |

### Alternatif yang dipertimbangkan (biar kamu paham trade-off-nya)
- **Astro** — sebenernya **lebih ringan & cepat** buat situs konten/blog (ship 0 JS by default), dan tetap bisa selipin komponen React buat bagian interaktif. **Tapi** Next.js menang di "dikenal HR" + relevansi lowongan kerja. Karena tujuanmu cari kerja → **Next.js dipilih**. Kalau prioritasmu murni kecepatan & kesederhanaan, Astro pilihan valid.

### Biaya
Semua **gratis** kecuali domain custom (~Rp150-250rb/tahun). **Beli domain custom** (`namamu.dev` / `.com`) — ini boost kredibilitas gede dibanding subdomain `.vercel.app`.

---

## 4. Roadmap Pembangunan (bertahap)

### Phase 1 — MVP (target: portfolio udah layak dipajang)
1. Setup project: Next.js + TypeScript + Tailwind + shadcn/ui
2. Bikin layout dasar + navbar + dark mode (next-themes)
3. Hero section (tagline positioning)
4. About section
5. Projects grid (data proyek dari file MDX/JSON)
6. Skills section (dikelompokin)
7. Contact form (React Hook Form + Zod + Web3Forms/Resend)
8. Tombol download CV
9. Deploy ke Vercel + pasang domain custom

✅ *Sampai sini aja udah portfolio yang solid.*

### Phase 2 — Pembeda
1. Setup blog dengan MDX
2. Tulis 1-2 deep case study buat proyek flagship
3. Tambah animasi (Framer Motion) — halus aja, jangan lebay
4. Dynamic OG image (next/og)
5. SEO polish (sitemap, metadata) + Analytics

### Phase 3 — Wow Factor
1. Interactive data viz / live dashboard demo (Recharts/D3)
2. GitHub stats integration
3. "By the Numbers" section
4. Testimonials / Now page

---

## 5. Tips Desain (biar "gacor" di mata HR)

- **Whitespace banyak + tipografi kuat.** Pilih font yang enak (mis. Geist/Inter buat body + 1 font heading yang punya karakter). Tipografi bagus = keliatan mahal.
- **Satu warna aksen, konsisten.** Jangan rame-warni.
- **Screenshot/GIF asli proyek**, bukan kotak placeholder. Ini gede pengaruhnya.
- **Smooth scroll animation** yang subtil — nambah kesan premium. Tapi jangan sampai gimmick/lambat.
- **Mobile-first & responsive.** Banyak HR buka dari HP.
- **Cepat.** Target Lighthouse score 90+. Engineer suka iseng ngecek performa.
- **CTA jelas** di tiap bagian: "Lihat Proyek", "GitHub", "Kontak", "Download CV".
- **Konsistensi > kemewahan.** Mending simpel rapi konsisten daripada rame tapi berantakan.
- **Dark mode default** = kesan "techy" instan.

---

## 6. Checklist Sebelum Launch

- [ ] Domain custom kepasang & HTTPS aktif
- [ ] Semua link proyek (live + GitHub) jalan, gak ada yang 404
- [ ] CV bisa di-download
- [ ] Form kontak udah dites (email beneran masuk)
- [ ] Responsive di HP & desktop
- [ ] Lighthouse 90+ (Performance, Accessibility, SEO)
- [ ] Metadata + OG image bener (tes share ke LinkedIn/WA)
- [ ] Gak ada typo (HR notice typo)
- [ ] Favicon kepasang
- [ ] LinkedIn & GitHub udah di-update biar konsisten sama portfolio

---

## Ringkasan Keputusan Kunci

1. **Positioning:** Gabungin CS + Statistics → "data-driven products". Jangan dipisah.
2. **Konten pembeda:** Blog + deep case study + **interactive data viz** (senjata utama kamu).
3. **Stack:** Next.js + TypeScript + Tailwind + shadcn/ui → Vercel. (Next.js dipilih karena sinyal karier ke HR.)
4. **Kerjain bertahap:** MVP dulu → pembeda → wow factor.

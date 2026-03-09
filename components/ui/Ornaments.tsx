'use client';

// ╔══════════════════════════════════════════════════════════════╗
// ║  ORNAMENTS.tsx — Semua SVG kultural Sunda-Jawa ada di sini  ║
// ║                                                              ║
// ║  Cara ganti / edit SVG:                                      ║
// ║  Cari komentar  // 🎨 SVG: NamaKomponen                     ║
// ║  lalu edit path/polygon/ellipse di bawahnya.                 ║
// ║                                                              ║
// ║  Komponen:                                                   ║
// ║   1. GununganIcon   — bentuk wayang kekayon                  ║
// ║   2. KawungRow      — pola ellips khas Sunda                 ║
// ║   3. MegaMendung    — awan bertingkat khas Cirebon           ║
// ║   4. ParangDivider  — motif diagonal Jawa                    ║
// ║   5. TruntumFlower  — bunga bintang khas Jawa               ║
// ║   6. BatikFrame     — bingkai sudut ornamental               ║
// ╚══════════════════════════════════════════════════════════════╝


// ─────────────────────────────────────────────────────────────────
// 1. GUNUNGAN / KEKAYON
//    Bentuk: segitiga tumpul → badan → kaki
//    Ubah: path "d" di bawah untuk reshape keseluruhan silhouette
//    Ubah: cx/cy/r circle untuk posisi & ukuran lingkaran tengah
//    Ubah: path diamond untuk arah & ukuran petal-petal kelopak
// ─────────────────────────────────────────────────────────────────
export function GununganIcon({ size = 40, opacity = 0.7, color = 'var(--gold)' }: {
  size?: number; opacity?: number; color?: string;
}) {
  return (
    // 🎨 SVG: GununganIcon — wayang kekayon / gunungan shape
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none" style={{ opacity }}>
      {/* Badan luar — ganti d= untuk reshape keseluruhan */}
      <path d="M20 2 L38 18 L38 54 C38 56.2 36.2 58 34 58 L6 58 C3.8 58 2 56.2 2 54 L2 18 Z"
        fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1"/>
      {/* Layer dalam 1 — ganti d= untuk mengatur margin dalam */}
      <path d="M20 8 L32 20 L32 52 L8 52 L8 20 Z"
        fill="none" stroke={color} strokeWidth="0.6" opacity="0.5"/>
      {/* Layer dalam 2 — paling dalam */}
      <path d="M20 10 L28 18 L28 50 L12 50 L12 18 Z"
        fill="none" stroke={color} strokeWidth="0.4" opacity="0.3"/>
      {/* Lingkaran tengah — ganti cx cy r untuk posisi & ukuran */}
      <circle cx="20" cy="32" r="7" fill="none" stroke={color} strokeWidth="0.8" opacity="0.6"/>
      <circle cx="20" cy="32" r="3" fill={color} fillOpacity="0.4"/>
      {/* Petal atas — d="M titikTengah L ujungKiri L titikTengah L ujungKanan Z" */}
      <path d="M20 18 L22 26 L20 28 L18 26 Z" fill={color} opacity="0.55"/>
      {/* Petal bawah */}
      <path d="M20 46 L22 38 L20 36 L18 38 Z" fill={color} opacity="0.55"/>
      {/* Petal kiri */}
      <path d="M10 32 L18 30 L20 32 L18 34 Z" fill={color} opacity="0.55"/>
      {/* Petal kanan */}
      <path d="M30 32 L22 30 L20 32 L22 34 Z" fill={color} opacity="0.55"/>
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 2. KAWUNG ROW
//    Bentuk: deretan ellips bertumpuk (pola khas Sunda)
//    Ubah: rx ry untuk rasio horizontal/vertikal tiap ellips
//    Ubah: count prop untuk jumlah motif
//    Ubah: width prop untuk total lebar baris
// ─────────────────────────────────────────────────────────────────
export function KawungRow({ count = 5, width = 160 }: { count?: number; width?: number }) {
  const spacing = width / count;
  return (
    // 🎨 SVG: KawungRow — pola ellips Sunda berulang
    <svg width={width} height={24} viewBox={`0 0 ${width} 24`} fill="none">
      {Array.from({ length: count }).map((_, i) => {
        const cx = spacing * i + spacing / 2;
        return (
          <g key={i}>
            {/* Ellips horizontal — ganti rx (lebar) & ry (tinggi) */}
            <ellipse cx={cx} cy={12} rx={spacing * 0.38} ry={6}
              fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0.55"/>
            {/* Ellips vertikal kecil di tengah */}
            <ellipse cx={cx} cy={12} rx={spacing * 0.18} ry={9}
              fill="none" stroke="var(--gold)" strokeWidth="0.6" opacity="0.35"/>
          </g>
        );
      })}
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 3. MEGA MENDUNG
//    Bentuk: gelombang awan bertingkat khas Cirebon
//    Ubah: Q control points untuk bentuk lengkung setiap awan
//    Ubah: stroke & strokeWidth untuk ketebalan garis
//    Ubah: offset x (step 40) untuk jarak antar awan
// ─────────────────────────────────────────────────────────────────
export function MegaMendung({ width = 200, opacity = 0.5 }: { width?: number; opacity?: number }) {
  return (
    // 🎨 SVG: MegaMendung — awan Cirebon bertingkat
    <svg width={width} height={40} viewBox="0 0 200 40" fill="none" style={{ opacity }}>
      {[0, 40, 80, 120, 160].map((x, i) => (
        <g key={i}>
          {/* Garis awan luar — Q = titik kontrol bezier */}
          <path d={`M${x} 40 Q${x+10} 20 ${x+20} 30 Q${x+25} 10 ${x+35} 30 Q${x+40} 20 ${x+50} 40 Z`}
            fill="none" stroke="var(--gold)" strokeWidth="0.8"/>
          {/* Garis awan dalam (lebih tipis) */}
          <path d={`M${x+5} 40 Q${x+15} 25 ${x+25} 33 Q${x+30} 15 ${x+40} 33 Q${x+45} 25 ${x+55} 40`}
            fill="none" stroke="var(--gold)" strokeWidth="0.4" opacity="0.5"/>
        </g>
      ))}
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 4. PARANG DIVIDER
//    Bentuk: motif diagonal berulang khas batik Jawa
//    Ubah: Q control points untuk kelengkungan tiap segmen
//    Ubah: step (20) untuk lebar tiap unit motif
//    Ubah: h (16) untuk tinggi keseluruhan
// ─────────────────────────────────────────────────────────────────
export function ParangDivider({ width = 280 }: { width?: number }) {
  const h = 16;
  return (
    // 🎨 SVG: ParangDivider — motif diagonal batik Jawa
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none">
      {Array.from({ length: Math.floor(width / 20) }).map((_, i) => (
        // Ganti Q points untuk mengubah kelengkungan diagonal
        <path key={i}
          d={`M${i*20} ${h} Q${i*20+6} ${h/2} ${i*20+10} 0 Q${i*20+14} ${h/2} ${i*20+20} ${h}`}
          fill="none" stroke="var(--gold)" strokeWidth="0.7" opacity="0.45"/>
      ))}
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 5. TRUNTUM FLOWER
//    Bentuk: bunga bintang dari 4 ellips yang berotasi
//    Ubah: rx ry ellips untuk ukuran & proporsi kelopak
//    Ubah: angle array [0,45,90,135] untuk jumlah & sudut kelopak
//    Ubah: r circle tengah untuk ukuran inti bunga
// ─────────────────────────────────────────────────────────────────
export function TruntumFlower({ size = 32, color = 'var(--gold)' }: { size?: number; color?: string }) {
  return (
    // 🎨 SVG: TruntumFlower — bunga bintang batik Jawa (truntum)
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Kelopak — rotate untuk masing-masing arah */}
      {[0, 45, 90, 135].map((angle, i) => (
        // rx = lebar kelopak, ry = panjang kelopak
        <ellipse key={i} cx="16" cy="16" rx="5" ry="12"
          fill={color} fillOpacity="0.25"
          stroke={color} strokeWidth="0.5"
          transform={`rotate(${angle} 16 16)`}/>
      ))}
      {/* Lingkaran tengah luar */}
      <circle cx="16" cy="16" r="4" fill={color} fillOpacity="0.6"/>
      {/* Titik inti */}
      <circle cx="16" cy="16" r="2" fill={color}/>
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 6. BATIK FRAME
//    Bentuk: bingkai sudut 4 titik (ornamental bracket)
//    Ubah: path "d" di setiap SVG untuk panjang garis sudut
//    Ubah: strokeWidth untuk ketebalan
//    Ubah: opacity untuk transparansi
// ─────────────────────────────────────────────────────────────────
export function BatikFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    // 🎨 SVG: BatikFrame — sudut ornamental 4 pojok
    <div className={`relative inline-block ${className}`}>
      {/* Sudut kiri atas — ganti L untuk panjang garis */}
      <svg className="absolute -top-2 -left-2" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 2 L18 2 L18 6 M2 2 L2 18 L6 18" stroke="var(--gold)" strokeWidth="1.2" opacity="0.7"/>
      </svg>
      {/* Sudut kanan atas */}
      <svg className="absolute -top-2 -right-2" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M18 2 L2 2 L2 6 M18 2 L18 18 L14 18" stroke="var(--gold)" strokeWidth="1.2" opacity="0.7"/>
      </svg>
      {/* Sudut kiri bawah */}
      <svg className="absolute -bottom-2 -left-2" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 18 L18 18 L18 14 M2 18 L2 2 L6 2" stroke="var(--gold)" strokeWidth="1.2" opacity="0.7"/>
      </svg>
      {/* Sudut kanan bawah */}
      <svg className="absolute -bottom-2 -right-2" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M18 18 L2 18 L2 14 M18 18 L18 2 L14 2" stroke="var(--gold)" strokeWidth="1.2" opacity="0.7"/>
      </svg>
      {children}
    </div>
  );
}

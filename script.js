<<<<<<< HEAD
const tombolMenu = document.getElementById("tombol-menu");
const menu = document.getElementById("menu");

if (tombolMenu && menu) {
  tombolMenu.addEventListener("click", function () {
    const terbuka = menu.classList.toggle("buka");
    tombolMenu.setAttribute("aria-expanded", terbuka);
  });
}

const bar = document.getElementById("progress");

if (bar) {
  const hitungProgres = function () {
    const tinggi = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (tinggi > 0 ? (window.scrollY / tinggi) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", hitungProgres, { passive: true });
  hitungProgres();
}

const linkToc = document.querySelectorAll("#toc a");

if (linkToc.length && "IntersectionObserver" in window) {
  const petaLink = {};
  linkToc.forEach(function (a) {
    petaLink[a.getAttribute("href").slice(1)] = a;
  });

  const pengamat = new IntersectionObserver(function (daftar) {
    daftar.forEach(function (e) {
      if (!e.isIntersecting) return;
      linkToc.forEach(function (a) { a.classList.remove("aktif"); });
      petaLink[e.target.id].classList.add("aktif");
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  Object.keys(petaLink).forEach(function (id) {
    const el = document.getElementById(id);
    if (el) pengamat.observe(el);
  });
}

const banding = document.getElementById("banding");

if (banding) {
  const geser = banding.querySelector("input");
  geser.addEventListener("input", function () {
    banding.style.setProperty("--pos", geser.value + "%");
  });
}

const daftarSoal = document.querySelectorAll(".kuis .soal");

if (daftarSoal.length) {
  const skor = document.getElementById("skor");
  let jumlahBenar = 0;
  let jumlahJawab = 0;

  daftarSoal.forEach(function (soal) {
    soal.querySelectorAll("button").forEach(function (tombol) {
      tombol.addEventListener("click", function () {
        const benar = tombol.dataset.pilih === soal.dataset.jawab;

        soal.querySelectorAll("button").forEach(function (t) {
          t.disabled = true;
          if (t.dataset.pilih === soal.dataset.jawab) t.classList.add("benar");
        });
        if (!benar) tombol.classList.add("salah");

        const umpan = soal.querySelector(".umpan");
        umpan.textContent = (benar ? "Benar! " : "Belum tepat. ") + umpan.dataset.teks;
        umpan.hidden = false;

        if (benar) jumlahBenar++;
        jumlahJawab++;

        if (jumlahJawab === daftarSoal.length && skor) {
          skor.textContent = "Skor kamu: " + jumlahBenar + " dari " + daftarSoal.length + ".";
          skor.hidden = false;
        }
      });
    });
  });
}
=======
/* ===== PENGATURAN ===== */
// Alamat gambar latar. Taruh gambar Anda di folder yang SAMA dengan index.html,
// lalu tulis namanya di sini, contoh: "karhutla.jpg"
const BG_IMAGE = "karhutla.jpg";
const WAIT_MS  = 6000;  // lama "Sedang login" sebelum muncul "Klik di mana saja"

(function () {
  const pre = document.getElementById("preloader");
  const bg  = document.getElementById("plBg");
  const img = new Image();
  let ready = false;

  /* muat gambar dulu; kalau gagal, pakai latar api cadangan */
  img.onload = function () {
    bg.style.backgroundImage = "url('" + BG_IMAGE + "')";
    bg.classList.add("show");
  };
  img.onerror = function () {
    bg.classList.add("no-img", "show");
    console.warn("Gambar tidak ditemukan: " + BG_IMAGE + ". Cek nama file dan lokasinya.");
  };
  img.src = BG_IMAGE;

  /* setelah WAIT_MS, ganti teks jadi "Klik di mana saja" */
  setTimeout(function () {
    ready = true;
    pre.classList.add("ready");
    pre.focus();
  }, WAIT_MS);

  /* klik di mana saja: preloader bergeser ke atas */
  function openSite() {
    if (!ready) return;
    ready = false;
    pre.classList.add("leave");
    document.body.classList.remove("locked");
    setTimeout(function () { pre.style.display = "none"; }, 1000);
  }
  pre.addEventListener("click", openSite);
  pre.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSite(); }
  });
})();
>>>>>>> 561f887621f3755bfae7d18aebf0b3b92f34962f

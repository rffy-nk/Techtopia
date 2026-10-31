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

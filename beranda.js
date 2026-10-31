const gambarLatar = "karhutla.jpg";
const waktuTunggu = 6000;
const linkInstagram = "https://www.instagram.com/eyes.on.karhutla/";
const daftarFoto = ["karhutla.jpg", "foto2.jpg", "foto3.jpg", "foto4.jpg", "foto5.jpg"];

const preloader = document.getElementById("preloader");
const latar = document.getElementById("plBg");
let siapMasuk = false;

const gambar = new Image();
gambar.onload = function () {
  latar.style.backgroundImage = "url('" + gambarLatar + "')";
  latar.classList.add("show");
};
gambar.onerror = function () {
  latar.classList.add("no-img", "show");
};
gambar.src = gambarLatar;

setTimeout(function () {
  siapMasuk = true;
  preloader.classList.add("ready");
  preloader.focus();
}, waktuTunggu);

function masuk() {
  if (!siapMasuk) return;
  siapMasuk = false;
  preloader.classList.add("leave");
  document.body.classList.remove("locked");
  setTimeout(function () {
    preloader.style.display = "none";
  }, 1000);
}

preloader.addEventListener("click", masuk);
preloader.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    masuk();
  }
});

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const linkMenu = menu.querySelectorAll("a");

burger.addEventListener("click", function () {
  const terbuka = menu.classList.toggle("buka");
  burger.setAttribute("aria-expanded", terbuka);
});

linkMenu.forEach(function (a) {
  a.addEventListener("click", function () {
    menu.classList.remove("buka");
    burger.setAttribute("aria-expanded", "false");
  });
});

const itemMuncul = document.querySelectorAll(".muncul");
const semuaSection = document.querySelectorAll(".sec");

if ("IntersectionObserver" in window) {
  const pengamatMuncul = new IntersectionObserver(function (daftar) {
    daftar.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("tampil");
        pengamatMuncul.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  itemMuncul.forEach(function (el) { pengamatMuncul.observe(el); });

  const pengamatSection = new IntersectionObserver(function (daftar) {
    daftar.forEach(function (e) {
      if (!e.isIntersecting) return;
      linkMenu.forEach(function (a) {
        a.classList.toggle("aktif", a.getAttribute("href") === "#" + e.target.id);
      });
    });
  }, { threshold: 0.5 });
  semuaSection.forEach(function (s) { pengamatSection.observe(s); });
} else {
  itemMuncul.forEach(function (el) { el.classList.add("tampil"); });
}

document.getElementById("tombol-ig").href = linkInstagram;

const dialog = document.getElementById("galeri-dlg");
const wadahFoto = document.getElementById("galeri");

daftarFoto.forEach(function (src, i) {
  const foto = document.createElement("img");
  foto.src = src;
  foto.alt = "Kebakaran hutan dan lahan, foto " + (i + 1);
  foto.loading = "lazy";
  foto.onerror = function () { foto.remove(); };
  wadahFoto.appendChild(foto);
});

document.getElementById("buka-galeri").addEventListener("click", function () {
  dialog.showModal();
});
document.getElementById("tutup-galeri").addEventListener("click", function () {
  dialog.close();
});
dialog.addEventListener("click", function (e) {
  if (e.target === dialog) dialog.close();
});

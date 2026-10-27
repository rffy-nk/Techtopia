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
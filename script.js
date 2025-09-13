// Sidebar toggle
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Theme toggle
const themeSwitcher = document.getElementById("themeSwitcher");
const body = document.body;

function setTheme(mode) {
  if (mode === "dark") {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    themeSwitcher.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    themeSwitcher.textContent = "☀️";
    localStorage.setItem("theme", "light");
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeSwitcher.addEventListener("click", () => {
  if (body.classList.contains("light-theme")) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
});

async function loadBloggerPosts() {
  const feedUrl = "https://onperspectiveside.blogspot.com/feeds/posts/default?alt=json";

  try {
    const res = await fetch(feedUrl);
    const data = await res.json();
    const entries = data.feed.entry || [];

    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = ""; // kosongkan dummy post

    entries.forEach(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate").href;
      const summary = entry.summary ? entry.summary.$t.replace(/<[^>]*>/g, "").slice(0, 100) + "..." : "";

      // ambil gambar (kalau ada)
      let image = "https://via.placeholder.com/500x300?text=No+Image";
      if (entry.media$thumbnail) {
        image = entry.media$thumbnail.url.replace("/s72-c/", "/s500/");
      }

      // buat card
      const article = document.createElement("article");
      article.className = "post-card";
      article.innerHTML = `
        <img src="${image}" alt="${title}" />
        <div class="post-card-content">
          <h3>${title}</h3>
          <p>${summary}</p>
          <a href="${link}" target="_blank">Baca Selengkapnya</a>
        </div>
      `;
      postsContainer.appendChild(article);
    });
  } catch (err) {
    console.error("Gagal memuat postingan Blogger:", err);
  }
}

// jalankan setelah DOM siap
document.addEventListener("DOMContentLoaded", loadBloggerPosts);

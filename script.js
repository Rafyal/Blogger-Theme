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

document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.querySelector(".posts");
  const myPostsContainer = document.getElementById("my-posts");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const closeSidebar = document.getElementById("closeSidebar");
  const themeToggle = document.getElementById("themeToggle");

  // Ganti dengan alamat blogmu
  const feedUrl = "https://onperspectiveside.blogspot.com/feeds/posts/default?alt=json";

  // Load postingan
  fetch(feedUrl)
    .then(res => res.json())
    .then(data => {
      const entries = data.feed.entry || [];
      postsContainer.innerHTML = "";
      myPostsContainer.innerHTML = "";

      entries.forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === "alternate").href;
        const content = entry.content ? entry.content.$t : "";
        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        const img = imgMatch ? imgMatch[1] : "https://via.placeholder.com/300x200";

        // Post card di homepage
        const card = `
          <div class="post-card">
            <img src="${img}" alt="${title}"/>
            <h3>${title}</h3>
            <a href="${link}" class="read-more">Baca Selengkapnya</a>
          </div>
        `;
        postsContainer.insertAdjacentHTML("beforeend", card);

        // Post list di sidebar
        const li = `<li><a href="${link}">${title}</a></li>`;
        myPostsContainer.insertAdjacentHTML("beforeend", li);
      });
    })
    .catch(err => {
      postsContainer.innerHTML = "<p>Gagal memuat postingan.</p>";
      console.error(err);
    });

  // Sidebar toggle
  menuToggle.addEventListener("click", () => sidebar.classList.add("active"));
  closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });
});

// jalankan setelah DOM siap
document.addEventListener("DOMContentLoaded", loadBloggerPosts);


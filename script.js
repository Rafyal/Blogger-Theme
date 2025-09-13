document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.querySelector(".posts");
  const myPostsContainer = document.getElementById("my-posts");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const closeSidebar = document.getElementById("closeSidebar");
  const themeToggle = document.getElementById("themeToggle");

  // 🔹 Feed Blogger kamu
  const feedUrl = "https://onperspectiveside.blogspot.com/feeds/posts/default?alt=json&max-results=5
";

  fetch(feedUrl)
    .then(res => res.json())
    .then(data => {
      const entries = data.feed?.entry || [];
      postsContainer.innerHTML = "";
      myPostsContainer.innerHTML = "";

      if (entries.length === 0) {
        postsContainer.innerHTML = `
          <div class="post-card">
            <img src="https://via.placeholder.com/300x200" alt="Dummy"/>
            <h3>Belum ada postingan</h3>
            <a href="#" class="read-more">Coming Soon</a>
          </div>`;
      } else {
        entries.forEach(entry => {
          const title = entry.title.$t;
          const link = entry.link.find(l => l.rel === "alternate").href;
          const content = entry.content?.$t || entry.summary?.$t || "";
          const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
          const img = imgMatch ? imgMatch[1] : "https://via.placeholder.com/300x200";

          postsContainer.insertAdjacentHTML("beforeend", `
            <div class="post-card">
              <img src="${img}" alt="${title}"/>
              <h3>${title}</h3>
              <a href="${link}" class="read-more">Baca Selengkapnya</a>
            </div>
          `);

          myPostsContainer.insertAdjacentHTML("beforeend", `
            <li><a href="${link}">${title}</a></li>
          `);
        });
      }
    })
    .catch(err => {
      console.error("Feed error:", err);
      postsContainer.innerHTML = "<p>Gagal memuat postingan.</p>";
    });

  // Sidebar toggle
  menuToggle.addEventListener("click", () => sidebar.classList.add("active"));
  closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));

  // Theme toggle
  document.body.classList.add("light-theme");
  themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    }
  });
});



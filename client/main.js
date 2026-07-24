const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const sidebarItems = document.querySelectorAll(".sidebar li");
const navbar = document.querySelector(".navbar");
const searchInput = document.querySelector(".search-container input");
const cards = document.querySelectorAll(".card");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
});

sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        sidebarItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.35)";
    } else {
        navbar.style.boxShadow = "none";
    }
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade");
        }
    });
}, {
    threshold: 0.2
});

cards.forEach(card => observer.observe(card));

searchInput.addEventListener("focus", () => {
    searchInput.parentElement.style.borderColor = "#ff4d4f";
});

searchInput.addEventListener("blur", () => {
    searchInput.parentElement.style.borderColor = "#2d3748";
});
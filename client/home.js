const videosContainer = document.getElementById("videosContainer");
const searchBox = document.querySelector(".search-container input");
const categoryButtons = document.querySelectorAll(".categories button");

let allVideos = [];

async function loadVideos() {

    try {

        const response = await fetch("http://localhost:3000/api/videos");

        const data = await response.json();

        allVideos = data;

        displayVideos(allVideos);

    }

    catch (error) {

        console.error("Error loading videos:", error);

    }

}

function displayVideos(videos) {

    videosContainer.innerHTML = "";

    if (videos.length === 0) {

        videosContainer.innerHTML = `
            <h2 style="color:white;text-align:center;width:100%;">
                No videos found
            </h2>
        `;

        return;

    }

    videos.forEach(video => {

        videosContainer.innerHTML += `

            <div class="card" data-id="${video.id}">

                <img
                    src="http://localhost:3000/uploads/thumbnails/${video.thumbnail_url}"
                    alt="${video.title}"
                >

                <div class="video-info">

                    <img
                        src="https://ui-avatars.com/api/?name=${encodeURIComponent(video.username)}&background=ff4d4f&color=ffffff"
                        alt="${video.username}"
                    >

                    <div class="details">

                        <h3>${video.title}</h3>

                        <p>${video.username}</p>

                        <span>${video.views} Views • ${video.category}</span>

                    </div>

                </div>

            </div>

        `;

    });

    document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click", () => {

        const id = card.dataset.id;

        window.location.href = `watch.html?id=${id}`;

    });

});

}

searchBox.addEventListener("keyup", () => {

    const value = searchBox.value.toLowerCase();

    const filtered = allVideos.filter(video => {

        return (

            video.title.toLowerCase().includes(value) ||

            video.username.toLowerCase().includes(value)

        );

    });

    displayVideos(filtered);

});

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const category = button.textContent.toLowerCase();

        if (category === "all") {

            displayVideos(allVideos);

            return;

        }

        const filtered = allVideos.filter(video => {

            if (!video.category) return false;

            return video.category.toLowerCase() === category;

        });

        displayVideos(filtered);

    });

});

const heroButton = document.querySelector(".hero button");

heroButton.addEventListener("click", () => {

    videosContainer.scrollIntoView({

        behavior: "smooth"

    });

});

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if (window.scrollY > 250) {

        hero.style.opacity = ".85";

    }

    else {

        hero.style.opacity = "1";

    }

});

loadVideos();
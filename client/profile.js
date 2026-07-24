const editButton = document.querySelector(".edit-btn");
const searchInput = document.querySelector(".search-container input");
const videoCards = document.querySelectorAll(".video-card");
const stats = document.querySelectorAll(".stats span");
const profileImage = document.querySelector(".avatar");
const coverImage = document.querySelector(".cover img");

editButton.addEventListener("click", () => {

    alert("Edit Profile feature will be available after backend integration.");

});

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    videoCards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();

        if(title.includes(value)){

            card.style.display = "block";

        }

        else{

            card.style.display = "none";

        }

    });

});

videoCards.forEach(card => {

    card.addEventListener("click", () => {

        window.location.href = "watch.html";

    });

});

stats.forEach(stat => {

    stat.addEventListener("mouseenter", () => {

        stat.style.transform = "translateY(-5px)";

    });

    stat.addEventListener("mouseleave", () => {

        stat.style.transform = "translateY(0)";

    });

});

profileImage.addEventListener("click", () => {

    profileImage.style.transform = "scale(1.08)";

    setTimeout(() => {

        profileImage.style.transform = "scale(1)";

    },300);

});

coverImage.addEventListener("mouseenter", () => {

    coverImage.style.transform = "scale(1.03)";
    coverImage.style.transition = ".5s";

});

coverImage.addEventListener("mouseleave", () => {

    coverImage.style.transform = "scale(1)";

});

window.addEventListener("load", () => {

    videoCards.forEach((card,index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.transition = ".5s";

        },index * 120);

    });

});
const searchBox = document.querySelector(".search-container input");
const videoCards = document.querySelectorAll(".card");
const categoryBtns = document.querySelectorAll(".categories button");

searchBox.addEventListener("keyup", () => {

    const value = searchBox.value.toLowerCase();

    videoCards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();
        const channel = card.querySelector("p").textContent.toLowerCase();

        if (title.includes(value) || channel.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

categoryBtns.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.textContent.toLowerCase();

        videoCards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (
                category === "all" ||
                title.includes(category)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});

videoCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});

window.addEventListener("load", () => {

    videoCards.forEach((card,index)=>{

        card.style.opacity="0";
        card.style.transform="translateY(40px)";

        setTimeout(()=>{

            card.style.transition=".6s ease";
            card.style.opacity="1";
            card.style.transform="translateY(0)";

        },index*120);

    });

});

const heroButton=document.querySelector(".hero button");

heroButton.addEventListener("click",()=>{

    document.querySelector(".videos").scrollIntoView({

        behavior:"smooth"

    });

});

window.addEventListener("scroll",()=>{

    if(window.scrollY>250){

        document.querySelector(".hero").style.opacity=".85";

    }

    else{

        document.querySelector(".hero").style.opacity="1";

    }

});
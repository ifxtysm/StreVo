const params = new URLSearchParams(window.location.search);

const videoId = params.get("id");

const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");

const videoTitle = document.getElementById("videoTitle");
const videoViews = document.getElementById("videoViews");
const channelName = document.getElementById("channelName");
const videoDescription = document.getElementById("videoDescription");
const relatedVideos = document.getElementById("relatedVideos");

async function loadVideo() {

    try {

        const response = await fetch(`http://localhost:3000/api/videos/${videoId}`);

        const video = await response.json();

        videoSource.src = `http://localhost:3000/uploads/videos/${video.video_url}`;

        videoPlayer.load();

        videoTitle.textContent = video.title;

        channelName.textContent = video.username;

        videoDescription.textContent = video.description;

        videoViews.innerHTML = `<i class="fa-solid fa-eye"></i> ${video.views} Views`;

    }

    catch(error){

        console.log(error);

    }

}

async function loadRelatedVideos() {

    const response = await fetch("http://localhost:3000/api/videos");

    const videos = await response.json();

    relatedVideos.innerHTML = "";

    videos.forEach(video => {

        if(video.id == videoId) return;

        relatedVideos.innerHTML += `

            <div class="related-card" onclick="location.href='watch.html?id=${video.id}'">

                <img src="http://localhost:3000/uploads/thumbnails/${video.thumbnail_url}">

                <div>

                    <h4>${video.title}</h4>

                    <span>${video.username}</span>

                </div>

            </div>

        `;

    });

}

loadVideo();

loadRelatedVideos();
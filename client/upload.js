const uploadBox = document.querySelector(".upload-box");
const videoInput = document.getElementById("videoFile");
const thumbnailInput = document.getElementById("thumbnail");
const uploadButton = document.querySelector(".upload-btn");
const progressBar = document.querySelector(".progress-bar");
const titleInput = document.querySelector('input[type="text"]');
const description = document.querySelector("textarea");
const category = document.querySelectorAll("select")[0];
const visibility = document.querySelectorAll("select")[1];
const tags = document.querySelectorAll('input[type="text"]')[1];

uploadBox.addEventListener("click", () => {
    videoInput.click();
});

videoInput.addEventListener("change", () => {

    if(videoInput.files.length > 0){

        uploadBox.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <h3>${videoInput.files[0].name}</h3>
            <span>Video selected successfully</span>
        `;

    }

});

thumbnailInput.addEventListener("change", () => {

    if(thumbnailInput.files.length > 0){

        const label = document.querySelector(".thumbnail-section label");

        label.textContent = `Thumbnail : ${thumbnailInput.files[0].name}`;

    }

});

uploadBox.addEventListener("dragover", e => {

    e.preventDefault();

    uploadBox.style.borderColor = "#ff4d4f";
    uploadBox.style.background = "rgba(255,77,79,.08)";

});

uploadBox.addEventListener("dragleave", () => {

    uploadBox.style.borderColor = "#374151";
    uploadBox.style.background = "transparent";

});

uploadBox.addEventListener("drop", e => {

    e.preventDefault();

    uploadBox.style.borderColor = "#374151";
    uploadBox.style.background = "transparent";

    const files = e.dataTransfer.files;

    if(files.length){

        videoInput.files = files;

        uploadBox.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <h3>${files[0].name}</h3>
            <span>Video ready for upload</span>
        `;

    }

});

uploadButton.addEventListener("click", () => {

    if(
        titleInput.value.trim()==="" ||
        description.value.trim()===""
    ){

        alert("Please complete all required fields.");
        return;

    }

    uploadButton.disabled = true;

    uploadButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Uploading...
    `;

    let progress = 0;

    const interval = setInterval(() => {

        progress += 2;

        progressBar.style.width = progress + "%";

        if(progress >= 100){

            clearInterval(interval);

            uploadButton.innerHTML = `
                <i class="fa-solid fa-circle-check"></i>
                Upload Complete
            `;

            setTimeout(() => {

                alert("Video uploaded successfully!");

                window.location.href = "index.html";

            },1000);

        }

    },40);

});

document.querySelectorAll("input, textarea, select").forEach(element => {

    element.addEventListener("focus", () => {

        element.style.transform = "scale(1.01)";

    });

    element.addEventListener("blur", () => {

        element.style.transform = "scale(1)";

    });

});
const form = document.getElementById("uploadForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    const formData = new FormData();

    formData.append(
        "title",
        document.getElementById("title").value
    );

    formData.append(
        "description",
        document.getElementById("description").value
    );

    formData.append(
        "category",
        document.getElementById("category").value
    );

    formData.append(
        "video",
        document.getElementById("videoFile").files[0]
    );

    formData.append(
        "thumbnail",
        document.getElementById("thumbnail").files[0]
    );

    try {

        const response = await fetch(
            "http://localhost:3000/api/videos/upload",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Video uploaded successfully!");

            window.location.href = "index.html";

        } else {

            alert(data.message || "Upload failed.");

        }

    } catch (error) {

        console.error(error);

        alert("Server error.");

    }

});
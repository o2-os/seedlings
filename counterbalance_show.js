document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const showId = params.get("show");

    if (!showId) {
        document.getElementById("show-title").textContent = "Show not found";
        return;
    }

    fetch("counterbalance_shows.json")
        .then(response => response.json())
        .then(shows => {
            const show = shows.find(s => s.id === showId);

            if (show) {
                document.getElementById("show-title").textContent = show.title;
                document.getElementById("show-description").textContent = show.description;

                // Set SoundCloud link
                const scLink = document.getElementById("sc-link");
                if (scLink) {
                    scLink.href = show.soundcloud;
                    scLink.textContent = "Listen on SoundCloud";
                }

                // Fetch and display tracklist
                if (show.tracklist) {
                    fetch(show.tracklist)
                        .then(response => response.text())
                        .then(text => {
                            document.getElementById("tracklist").innerText = text;
                        })
                        .catch(error => console.error("Error loading tracklist:", error));
                }
            } else {
                document.getElementById("show-title").textContent = "Show not found";
            }
        })
        .catch(error => console.error("Error loading show data:", error));
});

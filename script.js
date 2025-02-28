document.addEventListener("DOMContentLoaded", function () {
    const showList = document.getElementById("show-list");
    const showTitle = document.getElementById("show-title");
    const showDescription = document.getElementById("show-description");
    const scPlayer = document.getElementById("sc-player");

    // Fetch the JSON file
    fetch("counterbalance.json")
        .then(response => response.json())
        .then(shows => {
            // Populate the show list
            shows.forEach(show => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = `#${show.id}`;
                a.textContent = show.title;
                li.appendChild(a);
                showList.appendChild(li);
            });

            // Load content if a hash exists
            function loadShow() {
                const hash = location.hash.substring(1); // Get the hash (without #)
                const selectedShow = shows.find(show => show.id === hash);

                if (selectedShow) {
                    showTitle.textContent = selectedShow.title;
                    showDescription.textContent = selectedShow.description;
                    scPlayer.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(selectedShow.soundcloud)}&color=%23ef659a&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
                }
            }

            window.addEventListener("hashchange", loadShow);
            loadShow(); // Load on page load if a hash exists
        })
        .catch(error => console.error("Error loading show data:", error));
});

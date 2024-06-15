alert('coucou')

document.addEventListener("DOMContentLoaded", function () {
    const parser = new RSSParser();
    const audioContainer = document.getElementById("audio-container");
    const feedSelector = document.getElementById("feed-selector");
    const selectors = feedSelector.querySelectorAll("li");
    const flux = document.querySelector(".radio-bousol-flux");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const timeInfo = document.getElementById("radio-bousol-currenttime");
    const timeDuration = document.getElementById("radio-bousol-duration");
    const progressBar = document.getElementById("progress-bar");
    const title = document.getElementById("radio-bousol-title");
    const autoPlay = false;

    let currentFeedItems = [];
    let currentIndex = 0;
    let audioElement;

    // Ajout des événements pour les éléments du sélecteur de flux
    selectors.forEach((li) => {
        li.addEventListener("click", function () {
            document.querySelector(".radio-bousol-flux-content").style.display =
                "none";
            document.querySelector(".radio-bousol-mask").style.display = "flex";
            loadFeed(this);
        });
    });

    // Ajout de l'événement pour le bouton précédent
    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            displayCurrentItem();
        }
    });

    // Afficher le sélecteur de flux lorsqu'on clique sur le flux
    flux.addEventListener("click", function () {
        feedSelector.style.display = "block";
    });

    // Ajout de l'événement pour le bouton suivant
    nextBtn.addEventListener("click", function () {
        if (currentIndex < currentFeedItems.length - 1) {
            currentIndex++;
            displayCurrentItem();
        }
    });

    // Afficher le flux RSS lorsqu'on clique sur le titre
    title.addEventListener("click", function () {
        document.getElementById("rss-feed").style.display = "block";
        document.querySelector(".radio-bousol-mask").style.display = "none";
    });

    // Ajout de l'événement pour le bouton de lecture/pause
    playPauseBtn.addEventListener("click", function () {
        if (audioElement) {
            if (audioElement.paused) {
                audioElement.play();
                updatePlayPauseButton(true);
            } else {
                audioElement.pause();
                updatePlayPauseButton(false);
            }
        }
    });

    // Ajouter l'événement au bouton de fermeture
    document
        .getElementById("radio-bousol-closeListflux")
        .addEventListener("click", function () {
            document.querySelector(".radio-bousol-flux-content").style.display =
                "none";
            document.querySelector(".radio-bousol-mask").style.display = "flex";
        });

    // Ajouter l'événement au bouton de fermeture
    document
        .getElementById("radio-bousol-openListFlux")
        .addEventListener("click", function () {
            document.querySelector(".radio-bousol-flux-content").style.display =
                "block";
            document.querySelector(".radio-bousol-mask").style.display = "none";
        });

    // Met à jour l'icône du bouton de lecture/pause
    function updatePlayPauseButton(isPlaying) {
        playPauseBtn.innerHTML = isPlaying
            ? "<svg xmlns='http://www.w3.org/2000/svg' height='90px' viewBox='0 -960 960 960' width='90px' fill='#FFFFFF'><path d='M240-320v-320q0-33 23.5-56.5T320-720h320q33 0 56.5 23.5T720-640v320q0 33-23.5 56.5T640-240H320q-33 0-56.5-23.5T240-320Z'/></svg>"
            : "<svg xmlns='http://www.w3.org/2000/svg' height='90px' viewBox='0 -960 960 960' width='90px' fill='#FFFFFF'><path d='M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z'/></svg>";
    }

    function loadFeed(feed) {
        updateBackgroundAndColor(feed);

        const feedUrl = feed.getAttribute("data-url");
        // fetch(`/proxy?url=${encodeURIComponent(feedUrl)}`)
        //     .then((response) => response.text())
        //     .then((str) => parser.parseString(str))
        //     .then((feed) => {
        //         currentFeedItems = feed.items;
        //         currentIndex = 0;
        //         displayCurrentItem();
        //         // feedSelector.style.display = "none";
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });

        fetch(feedUrl)
            .then(response => response.text())
            .then(str => parser.parseString(str))
            .then(feed => {
                currentFeedItems = feed.items;
                currentIndex = 0;
                displayCurrentItem();
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    // Afficher l'élément actuel du flux
    function displayCurrentItem() {
        if (currentFeedItems.length > 0) {
            const item = currentFeedItems[currentIndex];
            if (item) {
                title.textContent = item.title;
                audioContainer.innerHTML = `
              <div class="radio-bousol-head">
                <div class="radio-bousol-logo">
                  <img src="/images/radio/iconcpam.png" alt="Radio Bousol Logo CPAM"/>
                </div>
                <h3>${item.title}</h3>
                <div class="radio-bousol-animation" id="radio-bousol-iconCloseDescription">
                  <svg class="radio-bousol-close" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#FFFFFF"><path d="M480-424L284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
                </div>
              </div>
              <p>${item.contentSnippet}</p>
              <audio id="audio-player" controls ${autoPlay ? "autoplay" : ""}>
                <source src="${item.enclosure.url}" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>`;

                // Ajouter l'événement au bouton de fermeture
                document
                    .getElementById("radio-bousol-iconCloseDescription")
                    .addEventListener("click", function () {
                        document.getElementById("rss-feed").style.display = "none";
                        document.querySelector(".radio-bousol-mask").style.display = "flex";
                    });

                audioElement = document.getElementById("audio-player");

                audioElement.addEventListener("loadedmetadata", updateAudioTime);
                audioElement.addEventListener("timeupdate", updateAudioTime);
                audioElement.addEventListener("timeupdate", updateProgressBar);

                if (autoPlay) {
                    updatePlayPauseButton(true);
                }
            }
        } else {
            audioContainer.innerHTML = "<p>No items to display</p>";
        }
    }

    function updateBackgroundAndColor(element) {
        const color = element.getAttribute("data-color");
        const image = element.getAttribute("data-image");

        if (color) {
            const rgbaColor = adjustColorOpacity(color);
            console.log(rgbaColor);
            document
                .querySelector(".radio-bousol-flux")
                .style.setProperty("background", color);

            document
                .querySelector(".radio-bousol-flux-content")
                .style.setProperty("background", rgbaColor);

            document
                .getElementById("rss-feed")
                .style.setProperty("background", rgbaColor);

            const radioBousol = document.getElementById("radio-bousol");

            radioBousol.addEventListener("mouseenter", function () {
                const maskElementsHover = document.querySelectorAll(
                    ".radio-bousol-mask, #radio-bousol .radio-bousol-mask"
                );

                maskElementsHover.forEach((element) => {
                    const newBackgroundHover = `linear-gradient(to bottom, #ffffff00, ${color}, ${color})`;
                    element.style.setProperty("background", newBackgroundHover);
                });
            });

            radioBousol.addEventListener("mouseleave", function () {
                const maskElementsHover = document.querySelectorAll(
                    ".radio-bousol-mask, #radio-bousol .radio-bousol-mask"
                );

                maskElementsHover.forEach((element) => {
                    const newBackgroundHover = `linear-gradient(to bottom, #ffffff00, #ffffff00, ${color})`;
                    element.style.setProperty("background", newBackgroundHover);
                });
            });
        } else {
            console.error("No data-color attribute found on the element");
        }

        if (image) {
            console.log(`${image}`)
            document.querySelector(
                ".radio-bousol-img"
            ).src = `${image}`;
        } else {
            console.error("No data-image attribute found on the element");
        }
    }

    // Met à jour le temps actuel et la durée de l'audio
    function updateAudioTime() {
        if (audioElement) {
            const currentTime = formatTime(audioElement.currentTime);
            const duration = formatTime(audioElement.duration);
            timeInfo.textContent = `${currentTime}`;
            timeDuration.textContent = `${duration}`;
        }
    }

    // Met à jour la barre de progression
    function updateProgressBar() {
        if (
            audioElement &&
            isFinite(audioElement.currentTime) &&
            isFinite(audioElement.duration) &&
            audioElement.duration > 0
        ) {
            const percentage =
                (audioElement.currentTime / audioElement.duration) * 100;
            progressBar.value = percentage;
        }
    }

    // Formate le temps en minutes et secondes
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    if (selectors.length > 0) {
        loadFeed(selectors[0]);
    }
});

function adjustColorOpacity(color) {
    if (color.startsWith("#")) {
        // Si la couleur est en format hexadécimal
        return hexToRgba(color, 0.8);
    } else if (color.startsWith("rgba")) {
        // Si la couleur est en format rgba
        return adjustRgbaOpacity(color, 0.8);
    } else {
        // Cas par défaut
        return color;
    }
}

// Fonction pour convertir la couleur hexadécimale en rgba
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Fonction pour ajuster l'opacité d'une couleur rgba
function adjustRgbaOpacity(rgba, alpha) {
    const parts = rgba.substring(5, rgba.length - 1).split(",");
    const r = parts[0].trim();
    const g = parts[1].trim();
    const b = parts[2].trim();
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

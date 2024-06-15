(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './styles/app.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _public_js_custom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../public/js/custom.js */ "./public/js/custom.js");
/* harmony import */ var _public_js_custom_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_js_custom_js__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)



/***/ }),

/***/ "./public/js/custom.js":
/*!*****************************!*\
  !*** ./public/js/custom.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "./node_modules/core-js/modules/es.array.for-each.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
__webpack_require__(/*! core-js/modules/es.string.starts-with.js */ "./node_modules/core-js/modules/es.string.starts-with.js");
__webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
alert('coucou');
document.addEventListener("DOMContentLoaded", function () {
  var parser = new RSSParser();
  var audioContainer = document.getElementById("audio-container");
  var feedSelector = document.getElementById("feed-selector");
  var selectors = feedSelector.querySelectorAll("li");
  var flux = document.querySelector(".radio-bousol-flux");
  var prevBtn = document.getElementById("prev-btn");
  var nextBtn = document.getElementById("next-btn");
  var playPauseBtn = document.getElementById("play-pause-btn");
  var timeInfo = document.getElementById("radio-bousol-currenttime");
  var timeDuration = document.getElementById("radio-bousol-duration");
  var progressBar = document.getElementById("progress-bar");
  var title = document.getElementById("radio-bousol-title");
  var autoPlay = false;
  var currentFeedItems = [];
  var currentIndex = 0;
  var audioElement;

  // Ajout des événements pour les éléments du sélecteur de flux
  selectors.forEach(function (li) {
    li.addEventListener("click", function () {
      document.querySelector(".radio-bousol-flux-content").style.display = "none";
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
  document.getElementById("radio-bousol-closeListflux").addEventListener("click", function () {
    document.querySelector(".radio-bousol-flux-content").style.display = "none";
    document.querySelector(".radio-bousol-mask").style.display = "flex";
  });

  // Ajouter l'événement au bouton de fermeture
  document.getElementById("radio-bousol-openListFlux").addEventListener("click", function () {
    document.querySelector(".radio-bousol-flux-content").style.display = "block";
    document.querySelector(".radio-bousol-mask").style.display = "none";
  });

  // Met à jour l'icône du bouton de lecture/pause
  function updatePlayPauseButton(isPlaying) {
    playPauseBtn.innerHTML = isPlaying ? "<svg xmlns='http://www.w3.org/2000/svg' height='90px' viewBox='0 -960 960 960' width='90px' fill='#FFFFFF'><path d='M240-320v-320q0-33 23.5-56.5T320-720h320q33 0 56.5 23.5T720-640v320q0 33-23.5 56.5T640-240H320q-33 0-56.5-23.5T240-320Z'/></svg>" : "<svg xmlns='http://www.w3.org/2000/svg' height='90px' viewBox='0 -960 960 960' width='90px' fill='#FFFFFF'><path d='M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z'/></svg>";
  }
  function loadFeed(feed) {
    updateBackgroundAndColor(feed);
    var feedUrl = feed.getAttribute("data-url");
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

    fetch(feedUrl).then(function (response) {
      return response.text();
    }).then(function (str) {
      return parser.parseString(str);
    }).then(function (feed) {
      currentFeedItems = feed.items;
      currentIndex = 0;
      displayCurrentItem();
    })["catch"](function (error) {
      console.error("Error:", error);
    });
  }

  // Afficher l'élément actuel du flux
  function displayCurrentItem() {
    if (currentFeedItems.length > 0) {
      var item = currentFeedItems[currentIndex];
      if (item) {
        title.textContent = item.title;
        audioContainer.innerHTML = "\n              <div class=\"radio-bousol-head\">\n                <div class=\"radio-bousol-logo\">\n                  <img src=\"/images/radio/iconcpam.png\" alt=\"Radio Bousol Logo CPAM\"/>\n                </div>\n                <h3>".concat(item.title, "</h3>\n                <div class=\"radio-bousol-animation\" id=\"radio-bousol-iconCloseDescription\">\n                  <svg class=\"radio-bousol-close\" xmlns=\"http://www.w3.org/2000/svg\" height=\"36px\" viewBox=\"0 -960 960 960\" width=\"36px\" fill=\"#FFFFFF\"><path d=\"M480-424L284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z\"/></svg>\n                </div>\n              </div>\n              <p>").concat(item.contentSnippet, "</p>\n              <audio id=\"audio-player\" controls ").concat(autoPlay ? "autoplay" : "", ">\n                <source src=\"").concat(item.enclosure.url, "\" type=\"audio/mpeg\">\n                Your browser does not support the audio element.\n              </audio>");

        // Ajouter l'événement au bouton de fermeture
        document.getElementById("radio-bousol-iconCloseDescription").addEventListener("click", function () {
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
    var color = element.getAttribute("data-color");
    var image = element.getAttribute("data-image");
    if (color) {
      var rgbaColor = adjustColorOpacity(color);
      console.log(rgbaColor);
      document.querySelector(".radio-bousol-flux").style.setProperty("background", color);
      document.querySelector(".radio-bousol-flux-content").style.setProperty("background", rgbaColor);
      document.getElementById("rss-feed").style.setProperty("background", rgbaColor);
      var radioBousol = document.getElementById("radio-bousol");
      radioBousol.addEventListener("mouseenter", function () {
        var maskElementsHover = document.querySelectorAll(".radio-bousol-mask, #radio-bousol .radio-bousol-mask");
        maskElementsHover.forEach(function (element) {
          var newBackgroundHover = "linear-gradient(to bottom, #ffffff00, ".concat(color, ", ").concat(color, ")");
          element.style.setProperty("background", newBackgroundHover);
        });
      });
      radioBousol.addEventListener("mouseleave", function () {
        var maskElementsHover = document.querySelectorAll(".radio-bousol-mask, #radio-bousol .radio-bousol-mask");
        maskElementsHover.forEach(function (element) {
          var newBackgroundHover = "linear-gradient(to bottom, #ffffff00, #ffffff00, ".concat(color, ")");
          element.style.setProperty("background", newBackgroundHover);
        });
      });
    } else {
      console.error("No data-color attribute found on the element");
    }
    if (image) {
      console.log("".concat(image));
      document.querySelector(".radio-bousol-img").src = "".concat(image);
    } else {
      console.error("No data-image attribute found on the element");
    }
  }

  // Met à jour le temps actuel et la durée de l'audio
  function updateAudioTime() {
    if (audioElement) {
      var currentTime = formatTime(audioElement.currentTime);
      var duration = formatTime(audioElement.duration);
      timeInfo.textContent = "".concat(currentTime);
      timeDuration.textContent = "".concat(duration);
    }
  }

  // Met à jour la barre de progression
  function updateProgressBar() {
    if (audioElement && isFinite(audioElement.currentTime) && isFinite(audioElement.duration) && audioElement.duration > 0) {
      var percentage = audioElement.currentTime / audioElement.duration * 100;
      progressBar.value = percentage;
    }
  }

  // Formate le temps en minutes et secondes
  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return "".concat(minutes, ":").concat(seconds < 10 ? "0" : "").concat(seconds);
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
  var r = parseInt(hex.substring(1, 3), 16);
  var g = parseInt(hex.substring(3, 5), 16);
  var b = parseInt(hex.substring(5, 7), 16);
  return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
}

// Fonction pour ajuster l'opacité d'une couleur rgba
function adjustRgbaOpacity(rgba, alpha) {
  var parts = rgba.substring(5, rgba.length - 1).split(",");
  var r = parts[0].trim();
  var g = parts[1].trim();
  var b = parts[2].trim();
  return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_concat_js-node_modules_core-js_modules_es_array-9e9712"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxHQUFHRixRQUFRLENBQUNILEdBQUcsQ0FBQ0ksU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDM0MsSUFBTUUsQ0FBQyxHQUFHSCxRQUFRLENBQUNILEdBQUcsQ0FBQ0ksU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDM0MsZUFBQWxDLE1BQUEsQ0FBZWdDLENBQUMsUUFBQWhDLE1BQUEsQ0FBS21DLENBQUMsUUFBQW5DLE1BQUEsQ0FBS29DLENBQUMsUUFBQXBDLE1BQUEsQ0FBSytCLEtBQUs7QUFDMUM7O0FBRUE7QUFDQSxTQUFTRixpQkFBaUJBLENBQUNRLElBQUksRUFBRU4sS0FBSyxFQUFFO0VBQ3BDLElBQU1PLEtBQUssR0FBR0QsSUFBSSxDQUFDSCxTQUFTLENBQUMsQ0FBQyxFQUFFRyxJQUFJLENBQUMzRCxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM2RCxLQUFLLENBQUMsR0FBRyxDQUFDO0VBQzNELElBQU1QLENBQUMsR0FBR00sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDRSxJQUFJLENBQUMsQ0FBQztFQUN6QixJQUFNTCxDQUFDLEdBQUdHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLENBQUM7RUFDekIsSUFBTUosQ0FBQyxHQUFHRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNFLElBQUksQ0FBQyxDQUFDO0VBQ3pCLGVBQUF4QyxNQUFBLENBQWVnQyxDQUFDLFFBQUFoQyxNQUFBLENBQUttQyxDQUFDLFFBQUFuQyxNQUFBLENBQUtvQyxDQUFDLFFBQUFwQyxNQUFBLENBQUsrQixLQUFLO0FBQzFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvY3VzdG9tLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXG4gKlxuICogV2UgcmVjb21tZW5kIGluY2x1ZGluZyB0aGUgYnVpbHQgdmVyc2lvbiBvZiB0aGlzIEphdmFTY3JpcHQgZmlsZVxuICogKGFuZCBpdHMgQ1NTIGZpbGUpIGluIHlvdXIgYmFzZSBsYXlvdXQgKGJhc2UuaHRtbC50d2lnKS5cbiAqL1xuXG4vLyBhbnkgQ1NTIHlvdSBpbXBvcnQgd2lsbCBvdXRwdXQgaW50byBhIHNpbmdsZSBjc3MgZmlsZSAoYXBwLmNzcyBpbiB0aGlzIGNhc2UpXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5jc3MnO1xuaW1wb3J0ICcuLi9wdWJsaWMvanMvY3VzdG9tLmpzJztcbiIsImFsZXJ0KCdjb3Vjb3UnKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFJTU1BhcnNlcigpO1xuICAgIGNvbnN0IGF1ZGlvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhdWRpby1jb250YWluZXJcIik7XG4gICAgY29uc3QgZmVlZFNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZWVkLXNlbGVjdG9yXCIpO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGZlZWRTZWxlY3Rvci5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XG4gICAgY29uc3QgZmx1eCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFkaW8tYm91c29sLWZsdXhcIik7XG4gICAgY29uc3QgcHJldkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldi1idG5cIik7XG4gICAgY29uc3QgbmV4dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmV4dC1idG5cIik7XG4gICAgY29uc3QgcGxheVBhdXNlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5LXBhdXNlLWJ0blwiKTtcbiAgICBjb25zdCB0aW1lSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW8tYm91c29sLWN1cnJlbnR0aW1lXCIpO1xuICAgIGNvbnN0IHRpbWVEdXJhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW8tYm91c29sLWR1cmF0aW9uXCIpO1xuICAgIGNvbnN0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9ncmVzcy1iYXJcIik7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGlvLWJvdXNvbC10aXRsZVwiKTtcbiAgICBjb25zdCBhdXRvUGxheSA9IGZhbHNlO1xuXG4gICAgbGV0IGN1cnJlbnRGZWVkSXRlbXMgPSBbXTtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gMDtcbiAgICBsZXQgYXVkaW9FbGVtZW50O1xuXG4gICAgLy8gQWpvdXQgZGVzIMOpdsOpbmVtZW50cyBwb3VyIGxlcyDDqWzDqW1lbnRzIGR1IHPDqWxlY3RldXIgZGUgZmx1eFxuICAgIHNlbGVjdG9ycy5mb3JFYWNoKChsaSkgPT4ge1xuICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYWRpby1ib3Vzb2wtZmx1eC1jb250ZW50XCIpLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgICAgICAgICAgIFwibm9uZVwiO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYWRpby1ib3Vzb2wtbWFza1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgICAgICBsb2FkRmVlZCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBBam91dCBkZSBsJ8OpdsOpbmVtZW50IHBvdXIgbGUgYm91dG9uIHByw6ljw6lkZW50XG4gICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudEluZGV4ID4gMCkge1xuICAgICAgICAgICAgY3VycmVudEluZGV4LS07XG4gICAgICAgICAgICBkaXNwbGF5Q3VycmVudEl0ZW0oKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWZmaWNoZXIgbGUgc8OpbGVjdGV1ciBkZSBmbHV4IGxvcnNxdSdvbiBjbGlxdWUgc3VyIGxlIGZsdXhcbiAgICBmbHV4LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZlZWRTZWxlY3Rvci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuXG4gICAgLy8gQWpvdXQgZGUgbCfDqXbDqW5lbWVudCBwb3VyIGxlIGJvdXRvbiBzdWl2YW50XG4gICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY3VycmVudEluZGV4IDwgY3VycmVudEZlZWRJdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXgrKztcbiAgICAgICAgICAgIGRpc3BsYXlDdXJyZW50SXRlbSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBZmZpY2hlciBsZSBmbHV4IFJTUyBsb3JzcXUnb24gY2xpcXVlIHN1ciBsZSB0aXRyZVxuICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicnNzLWZlZWRcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYWRpby1ib3Vzb2wtbWFza1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG5cbiAgICAvLyBBam91dCBkZSBsJ8OpdsOpbmVtZW50IHBvdXIgbGUgYm91dG9uIGRlIGxlY3R1cmUvcGF1c2VcbiAgICBwbGF5UGF1c2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGF1ZGlvRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGF1ZGlvRWxlbWVudC5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICBhdWRpb0VsZW1lbnQucGxheSgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVBsYXlQYXVzZUJ1dHRvbih0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXVkaW9FbGVtZW50LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlUGxheVBhdXNlQnV0dG9uKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWpvdXRlciBsJ8OpdsOpbmVtZW50IGF1IGJvdXRvbiBkZSBmZXJtZXR1cmVcbiAgICBkb2N1bWVudFxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpby1ib3Vzb2wtY2xvc2VMaXN0Zmx1eFwiKVxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFkaW8tYm91c29sLWZsdXgtY29udGVudFwiKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICAgICAgICAgICBcIm5vbmVcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFkaW8tYm91c29sLW1hc2tcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICB9KTtcblxuICAgIC8vIEFqb3V0ZXIgbCfDqXbDqW5lbWVudCBhdSBib3V0b24gZGUgZmVybWV0dXJlXG4gICAgZG9jdW1lbnRcbiAgICAgICAgLmdldEVsZW1lbnRCeUlkKFwicmFkaW8tYm91c29sLW9wZW5MaXN0Rmx1eFwiKVxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFkaW8tYm91c29sLWZsdXgtY29udGVudFwiKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICAgICAgICAgICBcImJsb2NrXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhZGlvLWJvdXNvbC1tYXNrXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBNZXQgw6Agam91ciBsJ2ljw7RuZSBkdSBib3V0b24gZGUgbGVjdHVyZS9wYXVzZVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBsYXlQYXVzZUJ1dHRvbihpc1BsYXlpbmcpIHtcbiAgICAgICAgcGxheVBhdXNlQnRuLmlubmVySFRNTCA9IGlzUGxheWluZ1xuICAgICAgICAgICAgPyBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBoZWlnaHQ9JzkwcHgnIHZpZXdCb3g9JzAgLTk2MCA5NjAgOTYwJyB3aWR0aD0nOTBweCcgZmlsbD0nI0ZGRkZGRic+PHBhdGggZD0nTTI0MC0zMjB2LTMyMHEwLTMzIDIzLjUtNTYuNVQzMjAtNzIwaDMyMHEzMyAwIDU2LjUgMjMuNVQ3MjAtNjQwdjMyMHEwIDMzLTIzLjUgNTYuNVQ2NDAtMjQwSDMyMHEtMzMgMC01Ni41LTIzLjVUMjQwLTMyMFonLz48L3N2Zz5cIlxuICAgICAgICAgICAgOiBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBoZWlnaHQ9JzkwcHgnIHZpZXdCb3g9JzAgLTk2MCA5NjAgOTYwJyB3aWR0aD0nOTBweCcgZmlsbD0nI0ZGRkZGRic+PHBhdGggZD0nTTMyMC0yNzN2LTQxNHEwLTE3IDEyLTI4LjV0MjgtMTEuNXE1IDAgMTAuNSAxLjVUMzgxLTcyMWwzMjYgMjA3cTkgNiAxMy41IDE1dDQuNSAxOXEwIDEwLTQuNSAxOVQ3MDctNDQ2TDM4MS0yMzlxLTUgMy0xMC41IDQuNVQzNjAtMjMzcS0xNiAwLTI4LTExLjVUMzIwLTI3M1onLz48L3N2Zz5cIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkRmVlZChmZWVkKSB7XG4gICAgICAgIHVwZGF0ZUJhY2tncm91bmRBbmRDb2xvcihmZWVkKTtcblxuICAgICAgICBjb25zdCBmZWVkVXJsID0gZmVlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVybFwiKTtcbiAgICAgICAgLy8gZmV0Y2goYC9wcm94eT91cmw9JHtlbmNvZGVVUklDb21wb25lbnQoZmVlZFVybCl9YClcbiAgICAgICAgLy8gICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgICAvLyAgICAgLnRoZW4oKHN0cikgPT4gcGFyc2VyLnBhcnNlU3RyaW5nKHN0cikpXG4gICAgICAgIC8vICAgICAudGhlbigoZmVlZCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGN1cnJlbnRGZWVkSXRlbXMgPSBmZWVkLml0ZW1zO1xuICAgICAgICAvLyAgICAgICAgIGN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgIC8vICAgICAgICAgZGlzcGxheUN1cnJlbnRJdGVtKCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gZmVlZFNlbGVjdG9yLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIC8vICAgICB9KTtcblxuICAgICAgICBmZXRjaChmZWVkVXJsKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxuICAgICAgICAgICAgLnRoZW4oc3RyID0+IHBhcnNlci5wYXJzZVN0cmluZyhzdHIpKVxuICAgICAgICAgICAgLnRoZW4oZmVlZCA9PiB7XG4gICAgICAgICAgICAgICAgY3VycmVudEZlZWRJdGVtcyA9IGZlZWQuaXRlbXM7XG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBkaXNwbGF5Q3VycmVudEl0ZW0oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWZmaWNoZXIgbCfDqWzDqW1lbnQgYWN0dWVsIGR1IGZsdXhcbiAgICBmdW5jdGlvbiBkaXNwbGF5Q3VycmVudEl0ZW0oKSB7XG4gICAgICAgIGlmIChjdXJyZW50RmVlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBjdXJyZW50RmVlZEl0ZW1zW2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gaXRlbS50aXRsZTtcbiAgICAgICAgICAgICAgICBhdWRpb0NvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYWRpby1ib3Vzb2wtaGVhZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYWRpby1ib3Vzb2wtbG9nb1wiPlxuICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvaW1hZ2VzL3JhZGlvL2ljb25jcGFtLnBuZ1wiIGFsdD1cIlJhZGlvIEJvdXNvbCBMb2dvIENQQU1cIi8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGgzPiR7aXRlbS50aXRsZX08L2gzPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYWRpby1ib3Vzb2wtYW5pbWF0aW9uXCIgaWQ9XCJyYWRpby1ib3Vzb2wtaWNvbkNsb3NlRGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJyYWRpby1ib3Vzb2wtY2xvc2VcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaGVpZ2h0PVwiMzZweFwiIHZpZXdCb3g9XCIwIC05NjAgOTYwIDk2MFwiIHdpZHRoPVwiMzZweFwiIGZpbGw9XCIjRkZGRkZGXCI+PHBhdGggZD1cIk00ODAtNDI0TDI4NC0yMjhxLTExIDExLTI4IDExdC0yOC0xMXEtMTEtMTEtMTEtMjh0MTEtMjhsMTk2LTE5Ni0xOTYtMTk2cS0xMS0xMS0xMS0yOHQxMS0yOHExMS0xMSAyOC0xMXQyOCAxMWwxOTYgMTk2IDE5Ni0xOTZxMTEtMTEgMjgtMTF0MjggMTFxMTEgMTEgMTEgMjh0LTExIDI4TDUzNi00ODBsMTk2IDE5NnExMSAxMSAxMSAyOHQtMTEgMjhxLTExIDExLTI4IDExdC0yOC0xMUw0ODAtNDI0WlwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwPiR7aXRlbS5jb250ZW50U25pcHBldH08L3A+XG4gICAgICAgICAgICAgIDxhdWRpbyBpZD1cImF1ZGlvLXBsYXllclwiIGNvbnRyb2xzICR7YXV0b1BsYXkgPyBcImF1dG9wbGF5XCIgOiBcIlwifT5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7aXRlbS5lbmNsb3N1cmUudXJsfVwiIHR5cGU9XCJhdWRpby9tcGVnXCI+XG4gICAgICAgICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIGF1ZGlvIGVsZW1lbnQuXG4gICAgICAgICAgICAgIDwvYXVkaW8+YDtcblxuICAgICAgICAgICAgICAgIC8vIEFqb3V0ZXIgbCfDqXbDqW5lbWVudCBhdSBib3V0b24gZGUgZmVybWV0dXJlXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLmdldEVsZW1lbnRCeUlkKFwicmFkaW8tYm91c29sLWljb25DbG9zZURlc2NyaXB0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyc3MtZmVlZFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhZGlvLWJvdXNvbC1tYXNrXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhdWRpb0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImF1ZGlvLXBsYXllclwiKTtcblxuICAgICAgICAgICAgICAgIGF1ZGlvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwgdXBkYXRlQXVkaW9UaW1lKTtcbiAgICAgICAgICAgICAgICBhdWRpb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgdXBkYXRlQXVkaW9UaW1lKTtcbiAgICAgICAgICAgICAgICBhdWRpb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgdXBkYXRlUHJvZ3Jlc3NCYXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGF1dG9QbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBsYXlQYXVzZUJ1dHRvbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdWRpb0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIjxwPk5vIGl0ZW1zIHRvIGRpc3BsYXk8L3A+XCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVCYWNrZ3JvdW5kQW5kQ29sb3IoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb2xvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb2xvclwiKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaW1hZ2VcIik7XG5cbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICBjb25zdCByZ2JhQ29sb3IgPSBhZGp1c3RDb2xvck9wYWNpdHkoY29sb3IpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmdiYUNvbG9yKTtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIucmFkaW8tYm91c29sLWZsdXhcIilcbiAgICAgICAgICAgICAgICAuc3R5bGUuc2V0UHJvcGVydHkoXCJiYWNrZ3JvdW5kXCIsIGNvbG9yKTtcblxuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5yYWRpby1ib3Vzb2wtZmx1eC1jb250ZW50XCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlLnNldFByb3BlcnR5KFwiYmFja2dyb3VuZFwiLCByZ2JhQ29sb3IpO1xuXG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAgIC5nZXRFbGVtZW50QnlJZChcInJzcy1mZWVkXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlLnNldFByb3BlcnR5KFwiYmFja2dyb3VuZFwiLCByZ2JhQ29sb3IpO1xuXG4gICAgICAgICAgICBjb25zdCByYWRpb0JvdXNvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaW8tYm91c29sXCIpO1xuXG4gICAgICAgICAgICByYWRpb0JvdXNvbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFza0VsZW1lbnRzSG92ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgICAgICAgICBcIi5yYWRpby1ib3Vzb2wtbWFzaywgI3JhZGlvLWJvdXNvbCAucmFkaW8tYm91c29sLW1hc2tcIlxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBtYXNrRWxlbWVudHNIb3Zlci5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0JhY2tncm91bmRIb3ZlciA9IGBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjZmZmZmZmMDAsICR7Y29sb3J9LCAke2NvbG9yfSlgO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwiYmFja2dyb3VuZFwiLCBuZXdCYWNrZ3JvdW5kSG92ZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJhZGlvQm91c29sLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXNrRWxlbWVudHNIb3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgIFwiLnJhZGlvLWJvdXNvbC1tYXNrLCAjcmFkaW8tYm91c29sIC5yYWRpby1ib3Vzb2wtbWFza1wiXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIG1hc2tFbGVtZW50c0hvdmVyLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3QmFja2dyb3VuZEhvdmVyID0gYGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNmZmZmZmYwMCwgI2ZmZmZmZjAwLCAke2NvbG9yfSlgO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwiYmFja2dyb3VuZFwiLCBuZXdCYWNrZ3JvdW5kSG92ZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gZGF0YS1jb2xvciBhdHRyaWJ1dGUgZm91bmQgb24gdGhlIGVsZW1lbnRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2ltYWdlfWApXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgIFwiLnJhZGlvLWJvdXNvbC1pbWdcIlxuICAgICAgICAgICAgKS5zcmMgPSBgJHtpbWFnZX1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGRhdGEtaW1hZ2UgYXR0cmlidXRlIGZvdW5kIG9uIHRoZSBlbGVtZW50XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWV0IMOgIGpvdXIgbGUgdGVtcHMgYWN0dWVsIGV0IGxhIGR1csOpZSBkZSBsJ2F1ZGlvXG4gICAgZnVuY3Rpb24gdXBkYXRlQXVkaW9UaW1lKCkge1xuICAgICAgICBpZiAoYXVkaW9FbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IGZvcm1hdFRpbWUoYXVkaW9FbGVtZW50LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gZm9ybWF0VGltZShhdWRpb0VsZW1lbnQuZHVyYXRpb24pO1xuICAgICAgICAgICAgdGltZUluZm8udGV4dENvbnRlbnQgPSBgJHtjdXJyZW50VGltZX1gO1xuICAgICAgICAgICAgdGltZUR1cmF0aW9uLnRleHRDb250ZW50ID0gYCR7ZHVyYXRpb259YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ldCDDoCBqb3VyIGxhIGJhcnJlIGRlIHByb2dyZXNzaW9uXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGF1ZGlvRWxlbWVudCAmJlxuICAgICAgICAgICAgaXNGaW5pdGUoYXVkaW9FbGVtZW50LmN1cnJlbnRUaW1lKSAmJlxuICAgICAgICAgICAgaXNGaW5pdGUoYXVkaW9FbGVtZW50LmR1cmF0aW9uKSAmJlxuICAgICAgICAgICAgYXVkaW9FbGVtZW50LmR1cmF0aW9uID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPVxuICAgICAgICAgICAgICAgIChhdWRpb0VsZW1lbnQuY3VycmVudFRpbWUgLyBhdWRpb0VsZW1lbnQuZHVyYXRpb24pICogMTAwO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIudmFsdWUgPSBwZXJjZW50YWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRm9ybWF0ZSBsZSB0ZW1wcyBlbiBtaW51dGVzIGV0IHNlY29uZGVzXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZShzZWNvbmRzKSB7XG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XG4gICAgICAgIHNlY29uZHMgPSBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCk7XG4gICAgICAgIHJldHVybiBgJHttaW51dGVzfToke3NlY29uZHMgPCAxMCA/IFwiMFwiIDogXCJcIn0ke3NlY29uZHN9YDtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbG9hZEZlZWQoc2VsZWN0b3JzWzBdKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gYWRqdXN0Q29sb3JPcGFjaXR5KGNvbG9yKSB7XG4gICAgaWYgKGNvbG9yLnN0YXJ0c1dpdGgoXCIjXCIpKSB7XG4gICAgICAgIC8vIFNpIGxhIGNvdWxldXIgZXN0IGVuIGZvcm1hdCBoZXhhZMOpY2ltYWxcbiAgICAgICAgcmV0dXJuIGhleFRvUmdiYShjb2xvciwgMC44KTtcbiAgICB9IGVsc2UgaWYgKGNvbG9yLnN0YXJ0c1dpdGgoXCJyZ2JhXCIpKSB7XG4gICAgICAgIC8vIFNpIGxhIGNvdWxldXIgZXN0IGVuIGZvcm1hdCByZ2JhXG4gICAgICAgIHJldHVybiBhZGp1c3RSZ2JhT3BhY2l0eShjb2xvciwgMC44KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDYXMgcGFyIGTDqWZhdXRcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cbn1cblxuLy8gRm9uY3Rpb24gcG91ciBjb252ZXJ0aXIgbGEgY291bGV1ciBoZXhhZMOpY2ltYWxlIGVuIHJnYmFcbmZ1bmN0aW9uIGhleFRvUmdiYShoZXgsIGFscGhhKSB7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMSwgMyksIDE2KTtcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygzLCA1KSwgMTYpO1xuICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDUsIDcpLCAxNik7XG4gICAgcmV0dXJuIGByZ2JhKCR7cn0sICR7Z30sICR7Yn0sICR7YWxwaGF9KWA7XG59XG5cbi8vIEZvbmN0aW9uIHBvdXIgYWp1c3RlciBsJ29wYWNpdMOpIGQndW5lIGNvdWxldXIgcmdiYVxuZnVuY3Rpb24gYWRqdXN0UmdiYU9wYWNpdHkocmdiYSwgYWxwaGEpIHtcbiAgICBjb25zdCBwYXJ0cyA9IHJnYmEuc3Vic3RyaW5nKDUsIHJnYmEubGVuZ3RoIC0gMSkuc3BsaXQoXCIsXCIpO1xuICAgIGNvbnN0IHIgPSBwYXJ0c1swXS50cmltKCk7XG4gICAgY29uc3QgZyA9IHBhcnRzWzFdLnRyaW0oKTtcbiAgICBjb25zdCBiID0gcGFydHNbMl0udHJpbSgpO1xuICAgIHJldHVybiBgcmdiYSgke3J9LCAke2d9LCAke2J9LCAke2FscGhhfSlgO1xufVxuIl0sIm5hbWVzIjpbImFsZXJ0IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFyc2VyIiwiUlNTUGFyc2VyIiwiYXVkaW9Db250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImZlZWRTZWxlY3RvciIsInNlbGVjdG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmbHV4IiwicXVlcnlTZWxlY3RvciIsInByZXZCdG4iLCJuZXh0QnRuIiwicGxheVBhdXNlQnRuIiwidGltZUluZm8iLCJ0aW1lRHVyYXRpb24iLCJwcm9ncmVzc0JhciIsInRpdGxlIiwiYXV0b1BsYXkiLCJjdXJyZW50RmVlZEl0ZW1zIiwiY3VycmVudEluZGV4IiwiYXVkaW9FbGVtZW50IiwiZm9yRWFjaCIsImxpIiwic3R5bGUiLCJkaXNwbGF5IiwibG9hZEZlZWQiLCJkaXNwbGF5Q3VycmVudEl0ZW0iLCJsZW5ndGgiLCJwYXVzZWQiLCJwbGF5IiwidXBkYXRlUGxheVBhdXNlQnV0dG9uIiwicGF1c2UiLCJpc1BsYXlpbmciLCJpbm5lckhUTUwiLCJmZWVkIiwidXBkYXRlQmFja2dyb3VuZEFuZENvbG9yIiwiZmVlZFVybCIsImdldEF0dHJpYnV0ZSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwidGV4dCIsInN0ciIsInBhcnNlU3RyaW5nIiwiaXRlbXMiLCJlcnJvciIsImNvbnNvbGUiLCJpdGVtIiwidGV4dENvbnRlbnQiLCJjb25jYXQiLCJjb250ZW50U25pcHBldCIsImVuY2xvc3VyZSIsInVybCIsInVwZGF0ZUF1ZGlvVGltZSIsInVwZGF0ZVByb2dyZXNzQmFyIiwiZWxlbWVudCIsImNvbG9yIiwiaW1hZ2UiLCJyZ2JhQ29sb3IiLCJhZGp1c3RDb2xvck9wYWNpdHkiLCJsb2ciLCJzZXRQcm9wZXJ0eSIsInJhZGlvQm91c29sIiwibWFza0VsZW1lbnRzSG92ZXIiLCJuZXdCYWNrZ3JvdW5kSG92ZXIiLCJzcmMiLCJjdXJyZW50VGltZSIsImZvcm1hdFRpbWUiLCJkdXJhdGlvbiIsImlzRmluaXRlIiwicGVyY2VudGFnZSIsInZhbHVlIiwic2Vjb25kcyIsIm1pbnV0ZXMiLCJNYXRoIiwiZmxvb3IiLCJzdGFydHNXaXRoIiwiaGV4VG9SZ2JhIiwiYWRqdXN0UmdiYU9wYWNpdHkiLCJoZXgiLCJhbHBoYSIsInIiLCJwYXJzZUludCIsInN1YnN0cmluZyIsImciLCJiIiwicmdiYSIsInBhcnRzIiwic3BsaXQiLCJ0cmltIl0sInNvdXJjZVJvb3QiOiIifQ==
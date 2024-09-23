$(document).ready(function () {
    $('.page-one').addClass('active')
    setTimeout(function () {
        $('.shape-1').animate({'top': -40}, 1000);
        $('.shape-2').animate({'bottom': -40}, 1000);
        $('.form').animate({'left': 0}, 1000, function () {
            $('.form').css('transform', 'skew(0deg)')
            $('#password').focus()
        })
    }, 1000)
})
$('#password').keyup(function () {
    var tag = $(this);
    if (tag.val() == '12345678') {
        $('.page-one').fadeOut(1500)
    }
})
$('.form-icon').click(function () {
    var tag = $(this)
    tag.toggleClass('active')
    if (tag.hasClass('active')) {
        tag.removeClass('fa-eye')
        tag.addClass('fa-eye-slash')
        $('#password').attr('type', 'text')
        $('#password').focus()
    } else {
        tag.removeClass('fa-eye-slash')
        tag.addClass('fa-eye')
        $('#password').attr('type', 'password')
        $('#password').focus()
    }
})


const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");

// Music
const songs = [
    {
        path:
            "media/Aref Vakili - Saraye To.mp3",
        displayName: "Saraye to",
        artist: "Aref Vakily",
        cover:
            "images/Aref-Vakili-Saraye-To (1).jpg",
    },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", function () {
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Update DOM
function loadSong(song) {
    console.log(song);
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = song.path;
    changeCover(song.cover);
}

function changeCover(cover) {
    image.classList.remove("active");
    setTimeout(() => {
        image.src = cover;
        image.classList.add("active");
    }, 100);
    background.src = cover;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const duration = e.srcElement.duration;
        const currentTime = e.srcElement.currentTime;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + "%";
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = durationMinutes + ":" + durationSeconds;
        }
        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

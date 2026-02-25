// Script.js
// Music Player Application

let audio = new Audio();
let playlist = [];
let currentTrackIndex = 0;

// DOM Elements
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-control');
const currentTimeDisplay = document.getElementById('current-time');
const trackDurationDisplay = document.getElementById('track-duration');

// Load playlist from localStorage
function loadPlaylist() {
    const storedPlaylist = localStorage.getItem('playlist');
    if (storedPlaylist) {
        playlist = JSON.parse(storedPlaylist);
    }
}

// Save playlist to localStorage
function savePlaylist() {
    localStorage.setItem('playlist', JSON.stringify(playlist));
}

// Play a track
function playTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    audio.src = playlist[index].url;
    audio.play();
    currentTrackIndex = index;
    updateTrackInfo();
}

// Pause the track
playBtn.addEventListener('click', () => {
    audio.play();
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
});

// Next track
nextBtn.addEventListener('click', () => {
    playTrack((currentTrackIndex + 1) % playlist.length);
});

// Previous track
prevBtn.addEventListener('click', () => {
    playTrack((currentTrackIndex - 1 + playlist.length) % playlist.length);
});

// Update progress
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    trackDurationDisplay.textContent = formatTime(audio.duration);
});

// Change progress on seek
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Volume control
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Auto-play next track when current ends
audio.addEventListener('ended', () => {
    playTrack((currentTrackIndex + 1) % playlist.length);
});

// Search YouTube API for music
async function searchYouTube(query) {
    const API_KEY = 'YOUR_API_KEY'; // Replace with your YouTube API key
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`);
    const data = await response.json();
    return data.items;
}

// Initialize playlist on load
loadPlaylist();

// Sample invocation for testing
// playlist.push({title: 'Song 1', url: 'song1.mp3'});
savePlaylist();
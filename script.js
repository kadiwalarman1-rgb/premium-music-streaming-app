const form = document.getElementById('download-form');
const mediaUrlInput = document.getElementById('media-url');
const videoQualitySelect = document.getElementById('video-quality');
const audioQualitySelect = document.getElementById('audio-quality');
const result = document.getElementById('result');

const videoSizeMap = {
    '2160p': 1800,
    '1440p': 1200,
    '1080p': 850,
    '720p': 560,
    '480p': 300
};

const audioSizeMap = {
    '320kbps': 140,
    '256kbps': 110,
    '192kbps': 80,
    '128kbps': 55
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const mediaUrl = mediaUrlInput.value.trim();
    const videoQuality = videoQualitySelect.value;
    const audioQuality = audioQualitySelect.value;

    if (!mediaUrl) {
        result.textContent = 'Please paste a valid media URL first.';
        return;
    }

    const totalEstimateMb = (videoSizeMap[videoQuality] + audioSizeMap[audioQuality]).toFixed(0);

    result.innerHTML = `
        <strong>Download plan ready ✅</strong><br>
        URL: ${escapeHtml(mediaUrl)}<br>
        Video: ${videoQuality}<br>
        Audio: ${audioQuality}<br>
        Estimated size: ~${totalEstimateMb} MB
    `;
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

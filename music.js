function initializeMusic() {
    const music = document.getElementById('background-music');

    if (!music) {
        return;
    }

    const musicToggle = document.createElement('button');
    musicToggle.className = 'music-toggle';
    musicToggle.type = 'button';
    musicToggle.setAttribute('aria-label', 'Turn music off');
    musicToggle.setAttribute('title', 'Turn music off');
    musicToggle.innerHTML = '<i class="fa-solid fa-volume-high" aria-hidden="true"></i>';
    document.body.appendChild(musicToggle);

    const updateMusicToggle = () => {
        const isPlaying = !music.paused;
        const icon = musicToggle.querySelector('i');

        icon.className = isPlaying ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
        musicToggle.setAttribute('aria-label', isPlaying ? 'Turn music off' : 'Turn music on');
        musicToggle.setAttribute('title', isPlaying ? 'Turn music off' : 'Turn music on');
        musicToggle.classList.toggle('is-muted', !isPlaying);
    };

    const savedTime = sessionStorage.getItem('musicTime');
    const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';

    if (savedTime) {
        music.currentTime = Number(savedTime);
    }

    music.addEventListener('timeupdate', () => {
        sessionStorage.setItem('musicTime', music.currentTime);
    });

    window.addEventListener('pagehide', () => {
        sessionStorage.setItem('musicTime', music.currentTime);
    });

    music.addEventListener('play', updateMusicToggle);
    music.addEventListener('pause', updateMusicToggle);

    musicToggle.addEventListener('click', () => {
        if (music.paused) {
            localStorage.setItem('musicEnabled', 'true');
            music.play().catch(() => updateMusicToggle());
        } else {
            localStorage.setItem('musicEnabled', 'false');
            music.pause();
        }
    });

    if (musicEnabled) {
        music.play().catch(() => updateMusicToggle());
    } else {
        music.pause();
    }

    updateMusicToggle();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMusic, { once: true });
} else {
    initializeMusic();
}

const music = document.getElementById('background-music');

if (music) {
    const savedTime = sessionStorage.getItem('musicTime');

    if (savedTime) {
        music.currentTime = Number(savedTime);
    }

    music.addEventListener('timeupdate', () => {
        sessionStorage.setItem('musicTime', music.currentTime);
    });

    window.addEventListener('pagehide', () => {
        sessionStorage.setItem('musicTime', music.currentTime);
    });

    music.play().catch(() => {
        // The browser may require the first play to come from a user action.
    });
}

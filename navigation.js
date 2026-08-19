const navigationLinks = document.querySelectorAll('a[href$=".html"]');
const pageCache = new Map();

function getPage(url) {
    if (!pageCache.has(url)) {
        pageCache.set(url, fetch(url).then((response) => {
            if (!response.ok) {
                throw new Error('Page could not be loaded.');
            }
            return response.text();
        }));
    }

    return pageCache.get(url);
}

async function loadPage(url, addHistory = true) {
    try {
        const pageText = await getPage(url);
        const pageDocument = new DOMParser().parseFromString(pageText, 'text/html');
        const nextMain = pageDocument.querySelector('main, section.home');
        const currentMain = document.querySelector('main, section.home');

        if (!nextMain || !currentMain) {
            window.location.href = url;
            return;
        }

        currentMain.replaceWith(nextMain);
        document.title = pageDocument.title;

        document.querySelectorAll('nav a').forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === url);
        });

        if (addHistory) {
            window.history.pushState({ url }, '', url);
        }

        document.dispatchEvent(new CustomEvent('pagecontentloaded'));
    } catch {
        window.location.href = url;
    }
}

navigationLinks.forEach((link) => {
    const url = link.getAttribute('href');

    if (url !== 'admin.html') {
        link.addEventListener('pointerenter', () => {
            getPage(url).catch(() => pageCache.delete(url));
        }, { once: true });

        link.addEventListener('click', (event) => {
            event.preventDefault();
            loadPage(url);
        });
    }
});

window.addEventListener('popstate', () => {
    loadPage(window.location.pathname.split('/').pop() || 'index.html', false);
});

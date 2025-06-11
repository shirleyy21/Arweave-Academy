const form = document.getElementById('link-form');
const linksList = document.getElementById('links');

function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links') || '[]');
    linksList.innerHTML = '';
    links.forEach((link, index) => {
        const li = document.createElement('li');
        li.className = 'link-item';
        li.innerHTML = `
            <a href="${link.url}" target="_blank">${link.title}</a>
            <button data-index="${index}">Delete</button>
        `;
        linksList.appendChild(li);
    });
}

function saveLink(title, url) {
    const links = JSON.parse(localStorage.getItem('links') || '[]');
    links.push({ title, url });
    localStorage.setItem('links', JSON.stringify(links));
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const url = document.getElementById('url').value.trim();
    if (title && url) {
        saveLink(title, url);
        form.reset();
        loadLinks();
    }
});

linksList.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');
        const links = JSON.parse(localStorage.getItem('links') || '[]');
        links.splice(index, 1);
        localStorage.setItem('links', JSON.stringify(links));
        loadLinks();
    }
});

document.addEventListener('DOMContentLoaded', loadLinks);

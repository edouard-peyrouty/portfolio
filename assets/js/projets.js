import { createGameOfLife } from 'https://cdn.jsdelivr.net/gh/edouard-peyrouty/Jeu-de-la-vie@main/JavaScript/jeu-de-la-vie.js';

// Intégration du jeu de la vie 

function initJeuDeLaVie() {
    const preview = document.getElementById('canvas-preview');
    const card = preview.closest('.color-box');
    const cols = 18;
    const cell = (card.clientWidth - 60) / cols;

    if (window.previewGame) window.previewGame.clear();

    window.previewGame = createGameOfLife(preview, {
        rows: 10,
        cols: cols,
        cell: cell,
        borderRadius: 3,
        aliveColor: '#CA3C66',
        deadColor: '#E8AABE',
        borderColor: '#F4D6E0',
        borderWidth: 1,
        clickable: false,
        speed: 200
    });    

    const octagon = [
        [0,0,0,1,1,0,0,0],
        [0,0,1,0,0,1,0,0],
        [0,1,0,0,0,0,1,0],
        [1,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,1],
        [0,1,0,0,0,0,1,0],
        [0,0,1,0,0,1,0,0],
        [0,0,0,1,1,0,0,0],
    ];

    window.previewGame.setGrid(octagon);
    window.previewGame.start();
}

initJeuDeLaVie();
window.addEventListener('resize', initJeuDeLaVie);

// Gestion de la taille de la grille des projets

function SetWidthContainerProjects(width) {
    const cartes = document.querySelectorAll('.grid-container-projects a'); 
    // D'abord on rend les cartes invisibles
    cartes.forEach(carte => carte.style.opacity = '0');
    // Puis on réduit la taille du grid
    document.querySelector('.grid-container-projects').style.maxWidth = width;
    // on réaffiche les cartes après la transition du grid
    setTimeout(() => {        
        cartes.forEach(carte => carte.style.opacity = '1');
        initJeuDeLaVie();
    }, 700);
}

function injectElement(id, path) {
  const div = document.getElementById(id);
  fetch(location.hostname.endsWith("github.io") ? "/portfolio" + path : path)
  .then(res => res.text())
  .then(data => {
    div.innerHTML = data;
    // Réexécute les scripts si besoin
    if (path.includes('projet3')) {
        const script = document.createElement('script');
        script.src = '/assets/js/projet3.js?t=' + Date.now();
        script.type = 'module';
        div.appendChild(script);
    }
  })
  .catch(console.error);
}

// quand on clique sur une carte projet
document.querySelectorAll('.color-box[data-src]').forEach(card => {
    card.addEventListener('click', e => {       
        if (card.classList.contains('active')) return;

        const containerDetails = document.getElementById('container-projet-details');
        const divProjet = document.getElementById('projet-details');
        const project_path = card.dataset.src;
        
        // Gestion CSS de la carte sélectinonnée
        document.querySelectorAll('.color-box').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Si le panneaux des cartes de projets n'est pas déjà réduit, on le réduit
        if (document.querySelector('.grid-container-projects').style.maxWidth !== '400px') {             
            SetWidthContainerProjects("400px");
            setTimeout(() => { 
                injectElement("projet-details", project_path); 
                requestAnimationFrame(() => {
                    containerDetails.style.display = 'block';
                        requestAnimationFrame(() => {
                        document.getElementById('btn-close').style.display = 'block';   
                        document.getElementById("projet-details").style.display = 'block';
                        containerDetails.style.transform = 'translateX(0)';
                    });
                });
            }, 700); // même durée que ta transition CSS
        } else {
            divProjet.style.opacity = '0';
            setTimeout(() => {
                injectElement("projet-details", project_path);
                divProjet.style.opacity = '1';
            }, 500);
        }
    });
});

// Gestion du bouton de fermeture du projet
document.getElementById('btn-close').addEventListener('click', () => {
    const containerDetails = document.getElementById('container-projet-details');
    containerDetails.style.transform = 'translateX(calc(100% + 30px))';
    document.querySelectorAll('.color-box').forEach(c => c.classList.remove('active'));
    setTimeout(() => {
        SetWidthContainerProjects("100%")
        containerDetails.style.display = 'none';
        document.getElementById('btn-close').style.display = 'none';   
        document.getElementById("projet-details").style.display = 'none';
    }, 500);
});
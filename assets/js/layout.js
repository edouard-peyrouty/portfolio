const isGithubPages = location.hostname.endsWith("github.io");

fetch(isGithubPages ? "/portfolio/partials/header.html" : "/partials/header.html")
  .then(res => res.text())
  .then(data => {
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
      bgCanvas.style.transition = 'opacity 2s ease';
      bgCanvas.style.opacity = '1';
    }
    const header = document.getElementById("header");
    if(header) {
      header.innerHTML = data;
      setActiveNav();
      header.style.transform = "translateY(0)";
    }
  })
  .catch(console.error);

fetch(isGithubPages ? "/portfolio/partials/footer.html" : "/partials/footer.html")
  .then(res => res.text())
  .then(data => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.innerHTML = data;
      footer.style.transform = "translateY(0)";
    }
  })
  .catch(() => {})
  .finally(() => {
    document.querySelector("main").style.transform = "translateX(0)"
  });

// Fonction pour définir le bouton de navigation actif
function setActiveNav() {
    const currentPage = window.location.pathname.split("/")[isGithubPages ? 2 : 1] || 'index.html';
    const navButtons = document.querySelectorAll(".nav-btn");    
    navButtons.forEach(button => {
        const buttonPage = button.getAttribute("href");
        if (buttonPage === currentPage) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }   
        // Ajoute le onclick à chaque bouton pour gérer l'animation de sortie de page
        button.addEventListener("click", handleLinkClick);  
    });
}

// animation de sortie
function handleLinkClick(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Ignorer les liens externes, ancres, et target="_blank"
    if (!href || href.startsWith('http') || href.startsWith('#') || link.target === '_blank') return;
    
    e.preventDefault();

    document.getElementById('header').style.transform = 'translateY(-100px)';
    document.querySelector('main').style.transform = "translateX(calc(-100% - 30px))";
    
    const footer = document.getElementById('footer');
    if (footer) footer.style.transform = 'translateY(100px)';
    
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {      
      bgCanvas.style.transition = 'opacity 0.5s ease';
      bgCanvas.style.opacity = '0';
    }
    
    setTimeout(() => {
        window.location.href = link.href;
    }, 500);
};

function boutonCopier(text, bouton) {
  navigator.clipboard.writeText(text).then(() => {
    bouton.textContent = '✓ Copié';
    setTimeout(() => bouton.textContent = 'Copier', 3000);
  });
}
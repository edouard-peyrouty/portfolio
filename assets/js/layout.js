const isGithubPages = location.hostname.endsWith("github.io");

fetch(isGithubPages ? "/portfolio/partials/header.html" : "/partials/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    setActiveNav();
  })
  .catch(console.error);

fetch(isGithubPages ? "/portfolio/partials/footer.html" : "/partials/footer.html")
  .then(res => res.text())
  .then(data => {
    const footer = document.getElementById("footer");
    if (footer) footer.innerHTML = data;
  })
  .catch(() => {})
  .finally(() => {
    document.querySelector("main").style.opacity = "1";
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
        // Ajoute le onclick à chaque bouton qui réduit l'opacité du main
        button.addEventListener("click", function() {            
            document.getElementsByClassName("main")[0].style.opacity = "0";
        });    
    });
}
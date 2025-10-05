document.addEventListener("DOMContentLoaded", function () {
  // 🔹 Efeito hover nos links da navbar
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  navLinks.forEach(link => {
    link.style.setProperty("color", "#eaeaea", "important"); // força a cor padrão
    link.addEventListener("mouseenter", () => {
      link.style.setProperty("color", "#ffffff", "important"); // hover
    });
    link.addEventListener("mouseleave", () => {
      link.style.setProperty("color", "#eaeaea", "important"); // volta ao normal
    });
  });

  // 🔹 Filtro de busca no accordion
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const resultados = conceitos.filter(item =>
        item.titulo.toLowerCase().includes(query) ||
        item.descricao.toLowerCase().includes(query)
      );
      renderAccordion(resultados);
    });
  }

  // 🔹 Carregamento do JSON e renderização do accordion
  fetch("zconceitos.json")
    .then(response => response.json())
    .then(data => {
      conceitos = data;
      renderAccordion(conceitos);
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));
});

// 🔹 Função para montar o accordion
function renderAccordion(data) {
  const accordion = document.getElementById("accordionFinanceiro");
  if (!accordion) return;

  accordion.innerHTML = "";
  data.forEach((item, index) => {
    const collapseId = "collapse" + index;
    accordion.innerHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button ${index === 0 ? "" : "collapsed"}"
                  type="button" data-bs-toggle="collapse"
                  data-bs-target="#${collapseId}"
                  aria-expanded="${index === 0 ? "true" : "false"}">
            ${item.titulo}
          </button>
        </h2>
        <div id="${collapseId}" class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
             data-bs-parent="#accordionFinanceiro">
          <div class="accordion-body">
            ${item.descricao}
          </div>
        </div>
      </div>
    `;
  });
}

  // 🔹 Script da busca de publicações

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchPublicacoes");
  const container = document.getElementById("publicacoesContainer");
  const cards = container.querySelectorAll(".publication-card");
  const noResults = document.getElementById("noResults");

  function filterCards(term) {
    let visible = 0;
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const match = text.includes(term);
      card.style.display = match ? "flex" : "none";
      if (match) visible++;
    });
    noResults.classList.toggle("d-none", visible !== 0);
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.trim().toLowerCase();
      filterCards(term);
    });
  }
});

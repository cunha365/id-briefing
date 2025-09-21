let conceitos = []; // Armazena os conceitos carregados do JSON

// Função para montar o accordion
function renderAccordion(data) {
  const accordion = document.getElementById("accordionFinanceiro");
  accordion.innerHTML = ""; // limpa antes de renderizar

  data.forEach((item, index) => {
    const collapseId = "collapse" + index;

    const accordionItem = `
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

    accordion.innerHTML += accordionItem;
  });
}

// Carregar os conceitos do JSON
fetch("zconceitos.json")
  .then(response => response.json())
  .then(data => {
    conceitos = data; // salva os conceitos carregados
    renderAccordion(conceitos); // renderiza todos
  })
  .catch(error => console.error("Erro ao carregar JSON:", error));

// 🔎 Filtro de busca
document.getElementById("searchInput").addEventListener("input", function() {
  const query = this.value.toLowerCase();

  const resultados = conceitos.filter(item =>
    item.titulo.toLowerCase().includes(query) ||
    item.descricao.toLowerCase().includes(query)
  );

  renderAccordion(resultados); // renderiza apenas os filtrados
});

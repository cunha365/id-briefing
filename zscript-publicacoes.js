let publicacoes = []; // Armazena todas as publicações carregadas

// Função para renderizar os cards
function renderPublicacoes(data) {
  const container = document.getElementById("publicacoesContainer");
  container.innerHTML = ""; // limpa antes de renderizar

  if (data.length === 0) {
    container.innerHTML = `<p class="text-center text-muted">Nenhuma publicação encontrada.</p>`;
    return;
  }

  data.forEach(pub => {
    const card = `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="${pub.imagem}" class="card-img-top" alt="${pub.titulo}">
          <div class="card-body">
            <h5 class="card-title">${pub.titulo}</h5>
            <p class="card-text">${pub.descricao}</p>
            <a href="${pub.link}" class="btn btn-primary" target="_blank">Ler mais</a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// Carregar publicações do JSON
fetch("zpublicacoes.json")
  .then(response => response.json())
  .then(data => {
    publicacoes = data; // salva todas
    renderPublicacoes(publicacoes); // mostra tudo no início
  })
  .catch(error => console.error("Erro ao carregar publicações:", error));

// 🔎 Filtro de busca
document.getElementById("searchPublicacoes").addEventListener("input", function () {
  const query = this.value.toLowerCase();

  const resultados = publicacoes.filter(pub =>
    pub.titulo.toLowerCase().includes(query) ||
    pub.descricao.toLowerCase().includes(query)
  );

  renderPublicacoes(resultados);
});

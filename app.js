// Objeto para armazenar as subcategorias por categoria
const subcategorias = {
  Máscaras: ["Mudend", "Contestação", "Rentabilização"],
  Fraseologias: ["Mudend", "Contestação", "Rentabilização"],
  Observações: ["Mudend", "Contestação", "Rentabilização"],
};

function atualizarSubcategorias() {
  const categorySelect = document.getElementById("category").value;
  const subcategorySelect = document.getElementById("subcategory");

  // Limpar subcategorias anteriores
  subcategorySelect.innerHTML = "";

  // Carregar novas subcategorias de acordo com a categoria selecionada
  subcategorias[categorySelect].forEach((sub) => {
    const option = document.createElement("option");
    option.value = sub;
    option.text = sub;
    subcategorySelect.appendChild(option);
  });
}

function adicionarTexto() {
  const category = document.getElementById("category").value;
  const subcategory = document.getElementById("subcategory").value;
  const textInput = document.getElementById("text-input").value;

  if (textInput.trim() === "") {
    alert("Por favor, insira algum texto.");
    return;
  }

  const textList = document.querySelector(".text-list");
  const newTextItem = document.createElement("div");
  newTextItem.classList.add("category");
  newTextItem.setAttribute("data-category", category); // Atributo da categoria
  newTextItem.setAttribute("data-subcategory", subcategory); // Atributo da subcategoria

  // Criar o conteúdo do texto e o botão de copiar
  newTextItem.innerHTML = `
                <div><strong>${category}</strong> (${subcategory}): <span class="text-content">${textInput}</span></div>
                <button class="copy-btn" onclick="copiarTexto(this)">Copiar</button>
                <button class="remove-btn" onclick="removerTexto(this)">Remover</button>
            `;

  textList.appendChild(newTextItem);

  // Limpar o campo de entrada
  document.getElementById("text-input").value = "";
}

function filtrarTextos() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filterCategory = document.getElementById("filter-category").value;
  const filterSubcategory = document.getElementById("filter-subcategory").value;
  const textItems = document.querySelectorAll(".text-list .category");

  let hasVisibleItems = false;

  textItems.forEach((item) => {
    const textContent = item.textContent.toLowerCase();
    const itemCategory = item.getAttribute("data-category");
    const itemSubcategory = item.getAttribute("data-subcategory");

    // Filtrar pelo texto de busca, categoria e subcategoria
    const matchesSearch = textContent.includes(searchInput);
    const matchesCategory =
      filterCategory === "Todos" || itemCategory === filterCategory;
    const matchesSubcategory =
      filterSubcategory === "Todos" || itemSubcategory === filterSubcategory;

    if (matchesSearch && matchesCategory && matchesSubcategory) {
      item.classList.remove("hidden");
      hasVisibleItems = true;
    } else {
      item.classList.add("hidden");
    }
  });

  // Mostrar ou ocultar a lista de textos com base na busca
  document.querySelector(".text-list").style.display = hasVisibleItems
    ? "block"
    : "none";
}

function limparBusca() {
  // Limpar os campos de busca, categoria e subcategoria
  document.getElementById("search-input").value = "";
  document.getElementById("filter-category").value = "Todos";
  document.getElementById("filter-subcategory").value = "Todos";

  // Esconder todos os textos
  const textItems = document.querySelectorAll(".text-list .category");
  textItems.forEach((item) => {
    item.classList.add("hidden");
  });

  // Esconder a lista de textos
  document.querySelector(".text-list").style.display = "none";
}

function copiarTexto(button) {
  const textToCopy =
    button.parentNode.querySelector(".text-content").textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      button.textContent = "Copiado!";
      button.classList.add("copied");

      setTimeout(() => {
        button.textContent = "Copiar";
        button.classList.remove("copied");
      }, 2000);
    })
    .catch((err) => {
      console.error("Erro ao copiar texto: ", err);
    });
}

function removerTexto(button) {
  const textItem = button.parentNode; // Obtém o item de texto correspondente
  textItem.remove(); // Remove o item da lista
}

// Atualizar subcategorias ao carregar a página
atualizarSubcategorias();

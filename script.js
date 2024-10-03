document.addEventListener("DOMContentLoaded", function() {
    fetch("produtos.json")
    .then(response => response.json())
    .then(data => {
        let produtosDiv = document.getElementById("produtos");
        let todosProdutos = data;
        function exibirProdutos(produtos) {
            produtosDiv.innerHTML = "";
            produtos.forEach(produto => {
                let produtoDiv = document.createElement("div");
                produtoDiv.className = "produto";
                let favoritoClass = favoritos.includes(produto.id) ? "favorito" : "";

                produtoDiv.innerHTML = `
                    <h2>${produto.nome}</h2>
                    <p>${produto.descricao}</p>
                    <p class="preco">R$${produto.preco}</p>
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <p><a href="https://wa.me/${produto.whatsapp}" target="_blank">Conversar no WhatsApp</a></p>
                    <button class="${favoritoClass}" onclick="atualizarFavoritos(${produto.id})">Favorito</button>
                `;
                produtosDiv.appendChild(produtoDiv);
            });
        }
        exibirProdutos(todosProdutos);

        document.getElementById("categorias").addEventListener("change", function() {
            let categoriaSelecionada = this.value;
            if (categoriaSelecionada == "todos") {
                exibirProdutos(todosProdutos);
            } else {
                let produtosFiltrados = todosProdutos.filter(produto => produto.categoria == categoriaSelecionada);
                exibirProdutos(produtosFiltrados);
            }
        });
    });
});
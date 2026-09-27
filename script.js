// Busca o campo de pesquisa no HTML.
const campoBusca = document.getElementById("busca");

// Busca todos os cartões de chás.
const chas = document.querySelectorAll(".cha-card");

// Busca o local onde aparecerão as mensagens.
const mensagemBusca = document.getElementById("mensagem-busca");

// Cria uma função para facilitar a comparação dos textos.
function normalizarTexto(texto) {
  return texto
    .toLowerCase() // Transforma as letras em minúsculas.
    .normalize("NFD") // Separa as letras dos acentos.
    .replace(/[\u0300-\u036f]/g, ""); // [\u0300-\u036f] representa o intervalo de caracteres Unicode que contém diversas marcas de acentuação; \u0300 e \u036f são os códigos Unicode que delimitam esse intervalo; os colchetes [] indicam que qualquer caractere desse intervalo pode ser encontrado; a barra / encerra a expressão regular; g significa "global", ou seja, procura todas as ocorrências, e não apenas a primeira; a vírgula separa a expressão regular do segundo argumento do método replace; e "" indica que os caracteres encontrados serão substituídos por nada, removendo-os do texto.
     // Substitui as letras com acentos por suas versões sem acento, permitindo que a pesquisa encontre palavras mesmo quando o usuário não digita os acentos corretamente.
}

// Verifica se os elementos necessários existem no HTML.
if (campoBusca && mensagemBusca) {
  // Executa a função quando o usuário digita ou apaga texto.
  campoBusca.addEventListener("input", function () {
    // Obtém o texto digitado e remove espaços extras.
    const pesquisa = normalizarTexto(campoBusca.value.trim());

    // Inicia o contador de chás encontrados.
    let encontrados = 0;

    // Percorre todos os cartões de chás.
    chas.forEach(function (cha) {
      // Obtém o texto do chá e remove diferenças de acentuação.
      const conteudo = normalizarTexto(cha.textContent);

      // Verifica se o chá contém o texto pesquisado.
      if (conteudo.includes(pesquisa)) {
        cha.style.display = ""; // Mostra o chá encontrado.
         encontrados++; // Aumenta a quantidade de resultados.
      } else {
        cha.style.display = "none"; // Esconde o chá não encontrado.
      }
    });

    // Verifica se o campo de pesquisa está vazio.
     if (pesquisa === "") {
      mensagemBusca.textContent = ""; // Limpa a mensagem.

      // Verifica se nenhum chá foi encontrado.
    } else if (encontrados === 0) {
      mensagemBusca.textContent = "Nenhum chá encontrado!"; // Mostra o aviso.
    } else {
      // Mostra a quantidade de chás encontrados.
      mensagemBusca.textContent =
        encontrados +
        (encontrados === 1
          ? " chá encontrado." // Usa o singular.
          : " chás encontrados."); // Usa o plural.
    }
  });
}

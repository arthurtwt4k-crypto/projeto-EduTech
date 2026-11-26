/* ================================ 
 1) Pegar os elementos no HTML
===================================*/

// Onde os Cards irão aparecer
const listaCursos =  document.querySelector("#listaCursos");

// Campo de busca
const buscaCursos = document.querySelector("#buscaCursos");

/* ================================ 
 2) Criar uma variável para guardar os cursos
===================================*/

let cursos = []; // Aqui a lista irá ficar carregado do JSON

/* ================================ 
 3) FUNÇÃO PARA CARREGAR O JSON 
===================================*/

async function carregarCursos(){
    // Busca o arquivo curso.JSON (como se fosse uma mini API)
    const resposta = await fetch("../DATA/cursos.json");

    // Transformar o JSON em dados que o JS entende
    cursos = await resposta.json();

    // Depois de carregar, já renderiza na tela
    renderizarCursos (cursos);
}

/* ================================ 
 4) FUNÇÃO PARA CRIAR OS CARDS NA TELA (DOM)
===================================*/

function renderizarCursos(lista){
    // limpa o conteúdo antes de desenhar de novo
    listaCursos.innerHTML = ""
    
    // para cada curso da lista, cria um card
    lista.forEach((cursos) => {
        const card = document.createElement("div");

        // coloca uma classe (para o CSS estilizar)
        card.classList.add ("card-curso");

        // coloca o conteúdo dentro do CARD CURSO
        card.innerHTML = `
        <a class = "curso" href = "../pages/detalhes-curso">
            <h3>${cursos.titulo}</h3>
            <img src =" ${cursos.img}">
            <p>${cursos.descrição}</p>
            <P><strong> CH:</strong> ${cursos.cargaHoraria}h</p>
        </a>
        `  
        // coloca o card dentro da lista de cursos
        listaCursos.appendChild(card);

    })

}
/* ================================ 
 5)FIltra a lista quando digitar
===================================*/
buscaCursos.addEventListener("input", function(){
    // pega o que a pessoa digitou no campo de busca, e guarda na variável texto
    const texto = buscaCursos.value.toLowerCase();
    
    const filtrados = cursos.filter((curso)=>
        cursos.titulo.toLowerCase().includes(texto)
    );

    renderizarCursos(filtrados);

})
/* ================================ 
 6) Chama função para iniciar tudo
===================================*/

carregarCursos();
var cenaAtual = 0;
var pontuacao = 0;
var escolhas = [];

var cenas = [
    {
        nome: "Uma novidade",
        titulo: "Um aplicativo que faz quase tudo",
        texto: "Na saída da escola, Lucas vê seus amigos falando sobre uma nova inteligência artificial. Ela consegue responder perguntas, criar textos e produzir imagens em poucos segundos.",
        fala: "Um colega diz: “Dá para fazer qualquer trabalho com isso. Nem precisa pensar muito.”",
        opcoes: [
            {
                texto: "Lucas decide testar, mas quer entender como a ferramenta funciona.",
                pontos: 2,
                resumo: "Decidiu conhecer a ferramenta com cuidado."
            },
            {
                texto: "Lucas acredita que a ferramenta sempre está certa.",
                pontos: 0,
                resumo: "Confiou totalmente na ferramenta."
            }
        ]
    },
    {
        nome: "Trabalho de história",
        titulo: "Uma pesquisa para o dia seguinte",
        texto: "A professora pede um pequeno texto sobre um acontecimento histórico. Lucas pensa em usar a inteligência artificial para ajudar.",
        fala: "Ele precisa escolher entre usar a tecnologia como apoio ou entregar a primeira resposta que aparecer.",
        opcoes: [
            {
                texto: "Pesquisar em outros lugares e usar a IA apenas para organizar ideias.",
                pontos: 2,
                resumo: "Usou a IA como apoio na pesquisa."
            },
            {
                texto: "Copiar a resposta inteira e entregar sem ler.",
                pontos: 0,
                resumo: "Copiou o trabalho sem revisar."
            }
        ]
    },
    {
        nome: "Uma imagem estranha",
        titulo: "Uma foto começa a circular",
        texto: "No grupo da turma aparece uma imagem que parece mostrar um professor em uma situação engraçada. Algumas pessoas já estão compartilhando.",
        fala: "Lucas percebe que a imagem pode ter sido criada ou alterada por inteligência artificial.",
        opcoes: [
            {
                texto: "Não compartilhar e perguntar se a imagem é verdadeira.",
                pontos: 2,
                resumo: "Evitou compartilhar uma imagem duvidosa."
            },
            {
                texto: "Mandar para outros grupos porque parece engraçado.",
                pontos: 0,
                resumo: "Compartilhou sem verificar."
            }
        ]
    },
    {
        nome: "Dados pessoais",
        titulo: "O aplicativo pede informações",
        texto: "Ao criar uma conta, Lucas vê uma tela pedindo nome completo, endereço, telefone e uma foto de documento.",
        fala: "Nem todas essas informações parecem necessárias para usar o serviço.",
        opcoes: [
            {
                texto: "Parar e pedir ajuda a um adulto antes de continuar.",
                pontos: 2,
                resumo: "Protegeu seus dados pessoais."
            },
            {
                texto: "Preencher tudo rapidamente para conseguir entrar.",
                pontos: 0,
                resumo: "Enviou dados sem verificar."
            }
        ]
    },
    {
        nome: "Resultado",
        final: true
    }
];

function mostrarCena() {
    var cena = cenas[cenaAtual];
    document.getElementById("numeroEtapa").innerHTML = "Cena " + (cenaAtual + 1) + " de " + cenas.length;
    document.getElementById("nomeEtapa").innerHTML = cena.nome;

    var conteudo = document.getElementById("conteudoHistoria");
    var areaOpcoes = document.getElementById("areaOpcoes");
    areaOpcoes.innerHTML = "";

    if (cena.final) {
        mostrarFinal();
    } else {
        conteudo.innerHTML =
            '<div class="cena">' +
            '<h2>' + cena.titulo + '</h2>' +
            '<p>' + cena.texto + '</p>' +
            '<div class="caixa-fala">' + cena.fala + '</div>' +
            '</div>';

        for (var i = 0; i < cena.opcoes.length; i++) {
            var botao = document.createElement("button");
            botao.className = "opcao";
            botao.innerHTML = cena.opcoes[i].texto;
            botao.setAttribute("data-indice", i);
            botao.onclick = escolherOpcao;
            areaOpcoes.appendChild(botao);
        }
    }

    document.getElementById("voltar").disabled = cenaAtual === 0;
    atualizarDiario();
}

function escolherOpcao() {
    var indice = Number(this.getAttribute("data-indice"));
    var opcao = cenas[cenaAtual].opcoes[indice];

    if (escolhas[cenaAtual]) {
        pontuacao -= escolhas[cenaAtual].pontos;
    }

    escolhas[cenaAtual] = {
        pontos: opcao.pontos,
        resumo: opcao.resumo
    };

    pontuacao += opcao.pontos;
    cenaAtual++;
    mostrarCena();
}

function voltarCena() {
    if (cenaAtual > 0) {
        cenaAtual--;
        mostrarCena();
    }
}

function atualizarDiario() {
    var lista = document.getElementById("listaEscolhas");
    lista.innerHTML = "";

    var encontrou = false;

    for (var i = 0; i < escolhas.length; i++) {
        if (escolhas[i]) {
            var item = document.createElement("li");
            item.innerHTML = escolhas[i].resumo;
            lista.appendChild(item);
            encontrou = true;
        }
    }

    if (!encontrou) {
        lista.innerHTML = "<li>Nenhuma decisão tomada ainda.</li>";
    }

    var porcentagem = (pontuacao / 8) * 100;
    document.getElementById("nivel").style.width = porcentagem + "%";
}

function mostrarFinal() {
    var titulo;
    var texto;

    if (pontuacao >= 7) {
        titulo = "Final: Lucas usa a tecnologia com responsabilidade";
        texto = "Lucas percebe que a inteligência artificial pode ser muito útil, mas precisa ser usada com atenção. Ele aprende a pesquisar, revisar informações e proteger seus dados.";
    } else if (pontuacao >= 4) {
        titulo = "Final: Lucas ainda tem algumas coisas para aprender";
        texto = "Lucas tomou algumas boas decisões, mas também se arriscou em certos momentos. Depois dessa experiência, ele entende que precisa pensar melhor antes de confiar ou compartilhar.";
    } else {
        titulo = "Final: As escolhas trouxeram problemas";
        texto = "Lucas confiou demais na tecnologia e não conferiu as consequências de suas ações. Ele descobre que ferramentas digitais podem causar problemas quando são usadas sem cuidado.";
    }

    document.getElementById("conteudoHistoria").innerHTML =
        '<div class="final">' +
        '<h2>' + titulo + '</h2>' +
        '<p>' + texto + '</p>' +
        '<p><strong>Pontuação de responsabilidade: ' + pontuacao + ' de 8.</strong></p>' +
        '</div>';

    document.getElementById("areaOpcoes").innerHTML = "";
}

function reiniciarHistoria() {
    cenaAtual = 0;
    pontuacao = 0;
    escolhas = [];
    mostrarCena();
}

mostrarCena();

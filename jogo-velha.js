const X = "X";
const O = "O";

var simboloAtual = X
var teveUmGanhador = false

function reiniciarJogo() {
    simboloAtual = X
    teveUmGanhador = false
    marcarJogadorAtivo(simboloAtual)
    limpaCampos()
    exibirResultado("")
}

function selecionarArea(posicaoLinha, posicaoColuna) {
    if (teveUmGanhador == true || existeSimboloNoQuadrado(posicaoLinha, posicaoColuna)) {
        return
    }

    desenharSimbolo(simboloAtual, posicaoLinha, posicaoColuna)
    teveUmGanhador = validaGanhador(simboloAtual)
    if (teveUmGanhador) {
        exibirResultado("O jogador " + simboloAtual + " ganhou!!!")
    } else if (validaEmpate()) {
        exibirResultado("O jogo deu empate!!!")
    }

    simboloAtual = simboloAtual == X ? O : X
    marcarJogadorAtivo(simboloAtual)
}

function validaGanhador(simbolo) {
    let teveGanhador = false
    teveGanhador = validaHorizontais(simbolo)
    teveGanhador = teveGanhador == true ? teveGanhador : validaVerticais(simbolo)
    teveGanhador = teveGanhador == true ? teveGanhador : validaDiagonais(simbolo)
    
    return teveGanhador
}

function validaHorizontais(simbolo) {
    return validaPorDirecao(simbolo, true)
}

function validaVerticais(simbolo) {
    return validaPorDirecao(simbolo, false)
}

function validaPorDirecao(simbolo, horizontal) {
    let teveUmGanhador = false
    for (let linha = 1; linha <= 3; linha++) { // For para percorrer as linhas
        let count = 0 // Variavel de controle de repetições
        
        for (let coluna = 1; coluna <= 3; coluna++) { // For para percorrer as colunas das linhas
            
            // Pega o valor no quadrado
            let quadradoJogo = horizontal ? 
                document.querySelector(`[data-linha='${linha}'][data-coluna='${coluna}']`) : 
                document.querySelector(`[data-linha='${coluna}'][data-coluna='${linha}']`)
            let simboloQuadradoJogo = quadradoJogo.innerHTML

            // Compara com o valor atual
            if (simboloQuadradoJogo == simbolo) {
                count++ // Atualiza contador de repetições
                if (count == 3) { // Valida se teve 3 repetições
                    teveUmGanhador = true
                    break
                }
            }
        }

        if (teveUmGanhador) { // Impede de validar outras linhas caso já tenha um vencedor
            break
        }
    }

    return teveUmGanhador
}

function validaDiagonais(simbolo) {
    let diagonalEsquerdaDireita = [ // Lista de posições de quadrados da diagonal da esquerda para direita
        {linha: 1, coluna: 1},
        {linha: 2, coluna: 2},
        {linha: 3, coluna: 3}
    ]

    let diagonalDireitaEsquerda = [ // Lista de posições de quadrados da diagonal da direita para esquerda
        {linha: 1, coluna: 3},
        {linha: 2, coluna: 2},
        {linha: 3, coluna: 1}
    ]

    let teveUmGanhador = false
    teveUmGanhador = validaDiagonal(simbolo, diagonalEsquerdaDireita)
    teveUmGanhador = teveUmGanhador == true ? teveUmGanhador : validaDiagonal(simbolo, diagonalDireitaEsquerda)
    return teveUmGanhador
}

function validaDiagonal(simbolo, diagonal) {
    let count = 0
    for (quadrado of diagonal) { // Percorre lista de posições de quadrados e guarda o quadrado atual na variavel quadrado
        let quadradoJogo = document.querySelector(`[data-linha='${quadrado.linha}'][data-coluna='${quadrado.coluna}']`);
        let simboloQuadradoJogo = quadradoJogo.innerHTML

        if (simboloQuadradoJogo == simbolo) { // Compara se é o mesmo simbolo atual
            count++

            if (count == 3) {
                return true
            }
        }
    }
}

function validaEmpate() {
    let empate = true // Inicia a variavel com o valor true
    for (let linha = 1; linha <= 3; linha++) { // Percorre a linha
        for (let coluna = 1; coluna <= 3; coluna++) { // Percorre a coluna da linha
            if (existeSimboloNoQuadrado(linha, coluna) == false) { // Valida se não tem algum simbolo no quadrado
                empate = false // Se não tem simbolo em algum quadrado significa que ainda pode ter jogadas, então seta a variavel pra false
                break
            }
        }

        if (empate == false) { // Se já setou que não é empate, não precisa validar os outros quadrados
            break
        }
    }

    return empate
}

function existeSimboloNoQuadrado(linha, coluna) {
    let quadradoJogo = document.querySelector(`[data-linha='${linha}'][data-coluna='${coluna}']`);
    return quadradoJogo.innerHTML != ""
}

function limpaCampos() {
    for (let linha = 1; linha <= 3; linha++) { // Percorre a linha
        for (let coluna = 1; coluna <= 3; coluna++) { // Percorre a coluna da linha
            // Pega o elemento HTML do quadrado referente a linha e coluna
            let quadradoJogo = document.querySelector(`[data-linha='${linha}'][data-coluna='${coluna}']`);
            
            // Seta vazio no quadrado
            quadradoJogo.innerHTML = ""
        }
    }
}

// Variável para armazenar o resultado acumulado das operações
var resultadoAcumulado = 0;

// Variável para armazenar o valor atual inserido pelo usuário
var valorAtual = 0;

// Variável para armazenar o operador selecionado para a operação (+, -, *, /)
var operadorAtual;

// Booleano para verificar se é o primeiro numero que o usuario seleciona
var primeiroNumero = true;

// Função para atualizar o conteúdo exibido
function atualizarConteudo(conteudo) {
    document.getElementById('resultado').innerText = conteudo;
}

// Função para atualizar o valor exibido quando um número ou ponto decimal é clicado
function atualizarDisplay(numero) {
    // Variável para mudar o valor exibido
    let display = document.getElementById('resultado');

    // Variável que armazena o valor clicado
    let valorBotao = document.getElementById(`botao-${numero}`).value;

    // Se for o primeiro numero, reinicia o valor exibido
    if (primeiroNumero) {

        // Se o valor for ponto decimal, começa o valor com '0.'
        if (valorBotao == '.') {
            display.innerText = '0.';
            valorAtual = 0;
            primeiroNumero = false; 
            return;
        }
        // Exibe o número clicado
        display.innerText = valorBotao;
        primeiroNumero = false;

    } else {

        // Se for o primeiro caractere e for um ponto, exibe '0.'
        if (valorBotao == '.' && display.innerText == '') {
            display.innerText = '0.';
            valorAtual = 0;
            return;
        }

        // Impede a inserção de mais de um ponto decimal
        if (valorBotao == '.' && display.innerText.includes('.')) {
            return;
        }

        // Adiciona o valor ao display e atualiza o valor atual
        display.innerText += valorBotao;
    }

    // Converte o valor no display para numero
    valorAtual = parseFloat(display.innerHTML);

    // Munda a exibição do botão C para CE
    document.getElementById('botao-C').innerText = 'CE';
}

// Função para definir o operador da operação e armazenar o valor atual
function definirOperador(operador) {

    // Verifica se já foi selecionado um operador e se o usuario já digitou o primeiro número
    if (operadorAtual && !primeiroNumero) {
        calcularResultado(); // Como o usuário selecionou os dois numeros e o operador, se calcula essa operação
    } else { // Caso ele não tenha selecionado um operador ou já selecionou o primeiro numero
        // Após escolher a operação vai selecionar de novo o primeiro numero
        primeiroNumero = true;
    }
    // verifica se o operadorAtual está vazio, caso sim o resultadoAcumulado passa a ter o mesmo valord e valorAtual
    if (!operadorAtual) {
        // Guarda o número anterior na variável
        resultadoAcumulado = valorAtual;
    }

    // Salva o operador
    operadorAtual = operador;

    // Exibe na tela o número anterior e a operação
    document.getElementById('valor__acumulado').innerText = `${resultadoAcumulado} ${operador}`;
}

// Função para calcular a operação selecionada pelo usuário após clicar em '='
function retornarValor() {
    // Mostra na tela o que foi efetuado
    document.getElementById('valor__acumulado').innerText = `${resultadoAcumulado} ${operadorAtual} ${valorAtual} = `;
    
    // Faz o calculo de acordo com cada operador
    switch (operadorAtual) {
        case '+':
            resultadoAcumulado += valorAtual;
            break;
        case '-':
            resultadoAcumulado -= valorAtual;
            break;
        case '*':
            resultadoAcumulado *= valorAtual;
            break;
        case '/':
            // Caso seja uma divisão por 0, reinicia o estado da calculadora
            if (valorAtual == 0) {
                atualizarConteudo('Erro');
                //resetarCalculadora();
                return;
            }
            resultadoAcumulado /= valorAtual;
            break;
        default:
            return;
    }
    
    // Atualiza o display com o resultado final
    atualizarConteudo(resultadoAcumulado);
}

// Função para calcular e exibir o resultado da operação
function calcularResultado() {
    retornarValor();
    primeiroNumero = true;
}

// Função para mudar o sinal do valor atual (positivo/negativo)
function inverterSinal() {
    valorAtual *= -1;
    atualizarConteudo(valorAtual);
}

// Função para redefinir todos os valores e limpar o display
function resetarCalculadora() {
    // Reinicia no formato inicial
    document.getElementById('display').innerHTML = `
        <div class="caixa__resultado">
            <p id="valor__acumulado" class="valor__acumulado"></p>
            <p id="resultado">${resultadoAcumulado}</p>
        </div>
    `;

    // Inicializa com os valores padrão
    valorAtual = 0;
    resultadoAcumulado = 0;
    operadorAtual = '';
    primeiroNumero = true;
    atualizarConteudo(valorAtual);

    let botaoCE = document.getElementById('botao-C');
    botaoCE.innerText = 'C';
}

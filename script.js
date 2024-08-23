const numeroSenha = document.querySelector('.parametro-senha__texto');             
let tamanhoSenha = 12; // Tamanho padrão da senha
numeroSenha.textContent = tamanhoSenha; // Exibe o tamanho padrão na tela
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ'; // Letras maiúsculas
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz'; // Letras minúsculas
const numeros = '0123456789'; // 10 números
const simbolos = '!@%*?'; // 5 símbolos
const botoes = document.querySelectorAll('.parametro-senha__botao'); // Botões de adição e remoção
const campoSenha = document.querySelector('#campo-senha'); // Campo de senha
const checkbox = document.querySelectorAll('.checkbox'); // Checkboxes
const forcaSenha = document.querySelector('.forca'); // Barra de força

botoes[0].onclick= diminuiTamanho; // diminui o tamanho da senha
botoes[1].onclick= aumentaTamanho; // aumenta o tamanho da senha

function diminuiTamanho() { // diminui o tamanho da senha
    if (tamanhoSenha > 1) { // se o tamanho da senha for maior que 1
        // tamanhoSenha = tamanhoSenha-1;
        tamanhoSenha--; // diminui o tamanho da senha
    }
    numeroSenha.textContent = tamanhoSenha; // atualiza o tamanho da senha na tela
    geraSenha(); // gera a senha com o novo tamanho
}
function aumentaTamanho() { // aumenta o tamanho da senha
    if (tamanhoSenha < 20) { // se o tamanho da senha for menor que 20
        // tamanhoSenha = tamanhoSenha+1;
        tamanhoSenha++; // aumenta o tamanho da senha
    }
    numeroSenha.textContent = tamanhoSenha; // atualiza o tamanho da senha na tela
    geraSenha(); // gera a senha com o novo tamanho
}

for (i = 0; i < checkbox.length; i++) { 
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);

}

function classificaSenha(tamanhoAlfabeto){
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    forcaSenha.classList.remove('fraca','media','forte');
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57 ) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35){
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha.";
}
let nomes = [];
let rgms = [];
let notas_p = [];
let notas_exer = [];
let notas_proj = [];
let notas_reg = [];

document.querySelector("#btn1").addEventListener("click", function () {
    cadastro();
});

function cadastro() {
    let nome = document.getElementById("nome").value;
    let rgm = document.getElementById("rgm").value;
    let notaParcial = parseFloat(document.getElementById("notaParcial").value);
    let notaExercicios = parseFloat(document.getElementById("notaExercicios").value);
    let notaProjeto = parseFloat(document.getElementById("notaProjeto").value);
    let notaRegimental = parseFloat(document.getElementById("notaRegimental").value);

    if (!nome || !rgm || isNaN(notaParcial) || isNaN(notaExercicios) || isNaN(notaProjeto) || isNaN(notaRegimental)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (notaParcial < 0 || notaParcial > 2 || notaExercicios < 0 || notaExercicios > 1 ||
        notaProjeto < 0 || notaProjeto > 2 || notaRegimental < 0 || notaRegimental > 5) {
        alert("Alguma nota está incorreta.");
        return;
    }

    nomes.push(nome);
    rgms.push(rgm);
    notas_p.push(notaParcial);
    notas_exer.push(notaExercicios);
    notas_proj.push(notaProjeto);
    notas_reg.push(notaRegimental);

    alert("Cadastros realizados com sucesso!");
    document.getElementById("formulario").reset();
}

document.querySelector("#btn2").addEventListener("click", function () {
    exibirDados();
});

function determinarConceito(notaFinal) {
    if (notaFinal >= 6) {
        return {conceito: "Aprovado", cor: "#0000CD"};
    } else if (notaFinal > 1 && notaFinal < 6) {
        return {conceito: "Avaliação Final", cor: "#FFA500"};
    } else {
        return {conceito: "Reprovado", cor: "#FF0000"};
    }
}

function exibirDados() {
    document.getElementById("formulario").style.display = 'none';

    let conteudo = `<div class="tabela-responsivo">                    
                    <table class="tabela">
                      <tr>
                        <th>Nome</th>
                        <th>Rgm</th>
                        <th>Nota Parcial</th>
                        <th>Nota Exercicios</th>
                        <th>Nota Projeto</th>
                        <th>Nota Regimental</th>
                        <th>Nota Final</th>
                        <th>Conceito</th>
                      </tr>`;
    for (let i = 0; i < nomes.length; i++) {
        let notaFinal = notas_p[i] + notas_exer[i] + notas_proj[i] + notas_reg[i]
        let {conceito, cor} = determinarConceito(notaFinal);

        conteudo += `<tr>
                        <td>${nomes[i]}</td>
                        <td>${rgms[i]}</td>
                        <td>${notas_p[i]}</td>
                        <td>${notas_exer[i]}</td>
                        <td>${notas_proj[i]}</td>
                        <td>${notas_reg[i]}</td>
                        <td style="color: ${cor};">${notaFinal.toFixed(2)}</td>
                        <td style="color: ${cor};">${conceito}</td>
                     </tr>`;
    }

    conteudo += `</table><\div>`;

    document.getElementById("saida").innerHTML = conteudo;
}

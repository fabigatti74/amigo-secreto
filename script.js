let nomes = [];

document.getElementById("nome").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        adicionarNome();
    }
});

function adicionarNome() {
    let input = document.getElementById("nome");
    let nome = input.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }

    if (nomes.includes(nome)) {
        alert("Esse nome já foi adicionado!");
        return;
    }

    nomes.push(nome);
    input.value = "";
    atualizarLista();
    document.getElementById("sortear").disabled = nomes.length < 2;
}

function atualizarLista() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    nomes.forEach((nome, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${nome} <button onclick="removerNome(${index})">❌</button>`;
        lista.appendChild(li);
    });
}

function removerNome(index) {
    nomes.splice(index, 1);
    atualizarLista();
    document.getElementById("sortear").disabled = nomes.length < 2;
}

function sortear() {
    if (nomes.length < 2) {
        alert("Adicione pelo menos 2 participantes!");
        return;
    }

    let sorteados = [...nomes];
    let embaralhado;
    let valido = false;

    while (!valido) {
        embaralhado = [...sorteados];

        for (let i = embaralhado.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [embaralhado[i], embaralhado[j]] = [embaralhado[j], embaralhado[i]];
        }

        valido = true;
        for (let i = 0; i < nomes.length; i++) {
            if (nomes[i] === embaralhado[i]) {
                valido = false;
                break;
            }
        }
    }

    let resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "<strong>Resultado do sorteio:</strong>";

    for (let i = 0; i < nomes.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${nomes[i]} tirou ${embaralhado[i]}`;
        resultadoLista.appendChild(li);
    }
}

function reiniciar() {
    nomes = [];
    document.getElementById("lista").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("sortear").disabled = true;
}

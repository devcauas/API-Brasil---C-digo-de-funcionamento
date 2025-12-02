function consultarDDD() {
    const ddd = document.getElementById("dddInput").value.trim();
    const resultado = document.getElementById("resultadoDDD");

    if (!ddd) {
        resultado.className = "resultado erro";
        resultado.innerHTML = "⚠ Informe um DDD válido.";
        return;
    }

    resultado.className = "resultado loading";
    resultado.innerHTML = "⏳ Consultando DDD...";

    fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`)
        .then(r => {
            if (!r.ok) throw new Error();
            return r.json();
        })
        .then(data => {
            resultado.className = "resultado sucesso";
            resultado.innerHTML = `
                <strong>Estado:</strong> <span>${data.state}</span><br><br>
                <strong>Cidades atendidas:</strong>
                <ul>
                    ${data.cities.map(c => `<li>${c}</li>`).join("")}
                </ul>
            `;
        })
        .catch(() => {
            resultado.className = "resultado erro";
            resultado.innerHTML = "❌ DDD não encontrado.";
        });
}


function consultarFeriados() {
    const ano = document.getElementById("anoInput").value.trim();
    const resultado = document.getElementById("resultadoFeriados");

    if (!ano) {
        resultado.className = "resultado erro";
        resultado.innerHTML = "⚠ Informe um ano válido.";
        return;
    }

    resultado.className = "resultado loading";
    resultado.innerHTML = "⏳ Buscando feriados...";

    fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
        .then(r => {
            if (!r.ok) throw new Error();
            return r.json();
        })
        .then(data => {
            resultado.className = "resultado sucesso";

            let html = `<strong>Feriados de ${ano}:</strong><ul>`;

            data.forEach(f => {
                html += `<li><span>${f.date}</span> — ${f.name}</li>`;
            });

            html += "</ul>";
            resultado.innerHTML = html;
        })
        .catch(() => {
            resultado.className = "resultado erro";
            resultado.innerHTML = "❌ Ano inválido ou sem dados.";
        });
}


function consultarCEP() {
    const cep = document.getElementById("cepInput").value.replace("-", "").trim();
    const resultado = document.getElementById("resultadoCEP");

    if (!cep || cep.length !== 8) {
        resultado.className = "resultado erro";
        resultado.innerHTML = "⚠ Informe um CEP válido (8 números).";
        return;
    }

    resultado.className = "resultado loading";
    resultado.innerHTML = "⏳ Consultando CEP...";

    fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then(r => {
            if (!r.ok) throw new Error();
            return r.json();
        })
        .then(data => {
            resultado.className = "resultado sucesso";
            resultado.innerHTML = `
                <strong>Endereço:</strong><br><br>
                <strong>Rua:</strong> <span>${data.street || "N/A"}</span><br>
                <strong>Bairro:</strong> <span>${data.neighborhood || "N/A"}</span><br>
                <strong>Cidade:</strong> <span>${data.city}</span><br>
                <strong>Estado:</strong> <span>${data.state}</span><br>
            `;
        })
        .catch(() => {
            resultado.className = "resultado erro";
            resultado.innerHTML = "❌ CEP não encontrado.";
        });
}


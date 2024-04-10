let saldo = 0;
let selectedDocePrice = 0;

function updateSaldoDisplay() {
    document.getElementById('saldo').innerText = saldo.toFixed(2);
}

function addMoney(amount) {
    if (saldo + amount > 10.00) {
        saldo = 10.00;
        document.getElementById('saldoFeedback').innerText = 'Você atingiu o saldo máximo de R$10,00.';
        document.querySelectorAll('.insert-money button').forEach(button => {
            button.disabled = true;
        });
    } else {
        saldo += amount;
        document.getElementById('saldoFeedback').innerText = `Valor inserido: R$${amount.toFixed(2)}`;
    }
    
    updateSaldoDisplay();
    
    setTimeout(() => {
        document.getElementById('saldoFeedback').innerText = '';
    }, 3000);

    updateDoceButtons();
}

function selectDoce(price) {
    selectedDocePrice = price;
    const selectedDoceButton = document.querySelector('.selectedDoce');
    if (selectedDoceButton) {
        selectedDoceButton.classList.remove('selectedDoce');
    }
    event.target.classList.add('selectedDoce');
    document.getElementById('doceSelecionadoFeedback').innerText = `Doce selecionado: ${event.target.innerText}`;
}

function buy() {
    const output = document.getElementById('output');

    if (saldo < selectedDocePrice) {
        output.innerText = 'Saldo insuficiente para comprar este doce.';
        return;
    }

    saldo -= selectedDocePrice;
    updateSaldoDisplay();
    output.innerHTML = `Você comprou o ${document.querySelector('.selectedDoce').innerText} por R$${selectedDocePrice.toFixed(2)}. Saldo restante: <span style="color:red;">R$${saldo.toFixed(2)}</span>.`;
    document.querySelector('.selectedDoce').classList.remove('selectedDoce');
    document.getElementById('doceSelecionadoFeedback').innerText = '';
    setTimeout(() => {
        output.innerText = '';
    }, 3000);

    updateDoceButtons();
}

function updateDoceButtons() {
    document.getElementById('doceA').disabled = saldo < 6.00;
    document.getElementById('doceB').disabled = saldo < 7.00;
    document.getElementById('doceC').disabled = saldo < 8.00;
}

// Chamamos updateDoceButtons() inicialmente para garantir que os botões de doce estejam corretamente habilitados ou desabilitados no início.
updateDoceButtons();

function adicionar(){

let produto = document.getElementById('produto').value;
let nomeProduto = produto.split('-')[0];
let valorUnitario = produto.split('R$')[1];
let quantidade = document.getElementById('quantidade');
let preco = quantidade.value * valorUnitario;
let lista = document.getElementById('lista-produtos');

adicionarItem(nomeProduto, quantidade.value, valorUnitario, lista);
document.getElementById('valor-total').innerHTML = 'R$' + calcularSubtotal(preco);

}

function limpar(){
    if(document.getElementById('lista-produtos').innerHTML == ''){
    Swal.fire({
        title: "Hey!",
        text: "O carrinho já está vazio",
        icon: "question"
    });
    }else{
    Swal.fire({
        title: 'Limpar Carrinho',
        text: 'Tem certeza que deseja limpar o carrinho? Essa ação é irreversível',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Limpar carrinho',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: "#d33"
    }).then((result) => {
        if (result.isConfirmed){
            document.getElementById('lista-produtos').innerHTML = '';
            document.getElementById('valor-total').innerHTML = ''
            Swal.fire({
                title: "Concluído!",
                text: "O carrinho foi limpo.",
                icon: "success"
        });
    }
    });
}
}

function calcularSubtotal(preco){
    let totalElement = document.getElementById('valor-total');
    let totalAtual = parseFloat(totalElement.innerHTML.replace('R$', '').replace(',', '.')) || 0;
    let totalAtualizado = totalAtual + preco;
    return totalAtualizado;
}

function adicionarItem(nomeProduto, quantidade, preco, lista) {
    if (quantidade <= 0 || quantidade == '') {
        Swal.fire({
            title: 'Opa!',
            text: 'Informe a quantidade desejada antes de adicionar.',
            icon: 'warning',
            customClass: {
                confirmButton: 'btn-confirmar',
            }
        });
        return; 
    }

    let produtos = lista.getElementsByClassName('carrinho__produtos__produto');

    for (let i = 0; i < produtos.length; i++) {
        let item = produtos[i];
        if (item.textContent.includes(nomeProduto)) {
            let spanQtd = item.querySelectorAll('span')[0];
            let spanPreco = item.querySelectorAll('span')[1];
            let qtdAtual = parseInt(spanQtd.textContent.replace('x', ''));
            let novaQtd = qtdAtual + parseInt(quantidade);
            let novoPreco = novaQtd * preco;

            spanQtd.textContent = `${novaQtd}x`;
            spanPreco.textContent = `R$${novoPreco.toFixed(2).replace('.', ',')}`;
            
            document.getElementById('quantidade').value = '';
            return;
        }
    }

    lista.innerHTML += `
        <section class="carrinho__produtos__produto">
            <span class="texto-azul">${quantidade}x</span> ${nomeProduto} <span class="texto-azul">R$${(quantidade * preco).toFixed(2).replace('.', ',')}</span>
        </section>`;
    
    document.getElementById('quantidade').value = '';
}

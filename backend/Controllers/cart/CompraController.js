const db = require("../../db/models/index");

module.exports = {
  async finalizarCompra(req, res) {
    //pegar do estoque diminuindo a quantidad escolhida pelo usuário
    //chamar os itens do carrinho com base no id do cliente
    //adicionar esses dados vindo do carrinho na model purchase
    //apagar os dados do carriho do cliente
    //multiplicar a quantidade total pelo valor de cada produto, somar e mostra na tela de compra
  },

  async cancelarCompra(req, res) {
    //caso o cliente desista da compra nesse estágio ele deve ser cancelado e apagado da tabela purchase
  },
};

const db = require('../db/models/index');

module.exports = {
    async finalBuy(req, res) {
        let IdCliente = req.params.id;

        try {
            const cartItems = await db.Cart.findAll({
                attributes: ['id', 'quantidade', 'total'],
                include: [
                    {
                        model: db.Produtos,
                        attributes: ['id', 'nome', 'Qtd_estoque', 'preco']
                    },
                    {
                        model: db.Clientes,
                        attributes: ['id', 'nome']
                    }
                ],
                where: {
                    IdCliente: IdCliente
                }
            });

            let total = 0;
            let quantidadeTotal = 0;

            // Calcular o total da compra e a quantidade total dos produtos
            for (let i = 0; i < cartItems.length; i++) {
                total += cartItems[i].total
                quantidadeTotal += cartItems[i].quantidade;
            }

            // Excluir todos os itens do carrinho
            await db.Cart.destroy({
                where: {
                    IdCliente: IdCliente
                }
            });

            const createVenda = await db.Vendas.create({
                IdCliente: IdCliente,
                total: total,
                Quantidade: quantidadeTotal,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            res.status(200).json({
                msg: "Carrinho encontrado e compra finalizada com sucesso",
                data: createVenda
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Erro interno do servidor ao finalizar a compra",
                error: error
            });
        }
    }
};

const db = require('../../db/models/index');
module.exports = {
    async createUser(req, res) {
        const { username, email, password, dataInicio } = req.body;
        try {
            const newUser = db.users.create({
                username: username,
                email: email,
                password: password,
                dataInicio: dataInicio
            })
            res.status(200).json({
                msg: 'usuário cadastrado com sucesso',
                user: newUser
            })
        } catch (error) {
            if (res.statusCode == 500) {
                res.send("erro no servidor")
            } else {
                res.send('não foi possível cadastrar o usuário')
            }
        }
    },

    async editUser(req, res) {
        const userId = req.params.id;
        const { name, email } = req.body;

        try {
            const user = await db.users.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            // Atualize os campos do usuário
            user.name = name;
            user.email = email;
            await user.save();

            return res.status(200).json({ msg: 'Usuário atualizado com sucesso', user });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar o usuário' });
        }
    },

    async deleteUser(req, res) {
        const userId = req.params.id;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            // Exclua o usuário
            await user.destroy();

            return res.status(200).json({ msg: 'Usuário excluído com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o usuário' });
        }
    }
}
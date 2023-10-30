const db = require('../../db/models/index');
const bcrypt = require('bcrypt');
module.exports = {
    async createUser(req, res) {
        const { username, email, password } = req.body;
        const hashedPass = bcrypt.hash(password, 10)
        try {
            const newUser = await db.user.create({
                username: username,
                email: email,
                password: hashedPass,
                dataInicio: new Date()
            })

            res.status(200).json({
                msg: 'usuário cadastrado com sucesso',
                newUser
            })

        } catch (error) {
            res.json({
                msg: 'houve um erro meu cabron',
                error: error
            })
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
            const user = await user.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            // Exclua o usuário
            await user.destroy();

            return res.status(200).json({ msg: 'Usuário excluído com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir o usuário' });
        }
    },

    async loginUser(req, res) {
        //fazer login do usuário com base no email e a senha
        const { username } = req.body;
        try {
            const user = await db.user.findOne({
                where: {
                    username: username
                }
            })

            if (user) {
                const matchpass = await bcrypt.compare(password, user.password);
                if (matchpass) {
                    res.status.json({
                        msg: 'usuário logado com sucesso',
                        data: user
                    })
                } else {
                    res.status(401).json({
                        msg: 'credenciais inválidas'
                    })
                }
            } else {
                res.status(404).json({
                    msg: 'usuario nao encontrado'
                })
            }

        } catch (erro) {
            res.status(500).json({
                msg: 'erro no servidor tente novamente'
            })
        }

    }
}
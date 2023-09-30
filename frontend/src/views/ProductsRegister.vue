<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container class="q-pa-md row justify-center">
            <div class="col-md-6 q-gutter-y-xl">
                <q-card>
                    <q-card-section class="bg-primary text-white text-weight-bold shadow-3">
                        <div class="text-h3 text-center">Cadastro de Produtos</div>
                    </q-card-section>
                    <q-card-section>
                        <FormCompt Upload="Foto do Produto" input1="nome do Produto" input2="ativo" input3="ativo"
                            input4="ativo" input5="ativo" @cadastrar="PostApi" @abort="Abort">
                            <template #Input1>
                                <q-input dense standout="bg-primary" v-model="nome_Produto" hint="nome do produto"
                                    class="q-mt-lg" />
                            </template>
                            <template #Input2>
                                <q-input dense standout="bg-primary" hint="Valor do Produto" type="number" class="q-mt-lg"
                                    v-model="valorProduto" />
                                <q-input dense standout="bg-primary" hint="Quandidade em estoqe" class="q-mt-lg"
                                    type="number" v-model="qtdEstoque" />
                            </template>
                            <template #Input3>
                                <q-input dense standout="bg-primary" type="date" v-model="fabricacao"
                                    hint="Data de Fabricação" class="q-mt-lg" />
                                <q-input dense standout="bg-primary" type="date" v-model="Validade" hint="Data de Validade"
                                    class="q-mt-lg" />
                            </template>
                            <template #Input4>
                                <q-select dense standout="bg-primary text-white" v-model="categoria" :options="options"
                                    hint="Categoria do produto" class="q-mt-lg" />

                                <!-- <q-select dense standout="bg-primary text-white" hint="Fornecedor" class="q-mt-lg" /> -->
                            </template>

                            <template #Input5>
                                <q-input dense standout="bg-primary text-white" type="textarea" hint="descricao"
                                    v-model="description"
                                    :rules="[val => val.length <= 100 || 'Please use maximum 3 characters']"
                                    class="q-mt-lg" />
                            </template>

                        </FormCompt>
                    </q-card-section>
                </q-card>
            </div>
        </q-page-container>
    </q-layout>
</template>



<script>
import MenuCompt from '@/components/MenuCompt.vue';
import FormCompt from '@/components/FormComt.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { Notify } from 'quasar';
export default {
    components: { MenuCompt, FormCompt },

    setup() {

        const nome_Produto = ref('');
        const valorProduto = ref('');
        const fabricacao = ref('');
        const Validade = ref('');
        const qtdEstoque = ref('');
        const description = ref('');
        const categoria = ref('');
        const options = ref([]);


        // listar categoria
        async function getCategoria() {
            try {
                axios.get('http://localhost:3333/ListCategoria').then((response) => {
                    const data = response.data.categoria;
                    for (let i = 0; i < data.length; i++) {
                        options.value.push({ value: data[i].id, label: data[i].nomeCategoria });
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        // ================================================================================================


        //função para enviar dados para o banco de dados ===============================================================
        async function PostApi() {
            if (!nome_Produto.value || !valorProduto.value || !Validade.value || !qtdEstoque.value || !categoria.value) {

                Notify.create({
                    message: 'Não é possivel fazer o cadastro, pois todos os campos são obrigatórios',
                    color: 'red',
                    position: 'center'
                })

            } else {
                axios.post('http://localhost:3333/ProductsRegister', {
                    nome: nome_Produto.value,
                    descricao: description.value,
                    preco: valorProduto.value,
                    Qtd_estoque: qtdEstoque.value,
                    IdCategoria: categoria.value.value,
                    Validade: new Date(Validade.value),
                    fabricacao: new Date(fabricacao.value)
                }).then((response) => {
                        console.log(response.data)
                        Notify.create({
                            message: 'Cadastro feito com sucesso',
                            color: 'green',
                            position: 'top',
                        })
                    }).catch((error) => {
                        Notify.create({
                            message: 'Não é possivel fazer o cadastro, pois todos os campos são obrigatórios',
                            color: 'red',
                            position: 'center'
                        })
                        console.log(`houve um erro na solicitação ao backend do tipo ${error}`);
                    })
            }

            nome_Produto.value = '';
            valorProduto.value = '';
            description.value = '';
            Validade.value = '';
            fabricacao.value = '';
            qtdEstoque.value = '';
            categoria.value = '';
            

        }

        // ==============================================================================================================


        // cancelar cadastro do produto ===============================================================
        async function Abort() {
            nome_Produto.value = ''
            valorProduto.value = ''
            Validade.value = ''
            description.value = ''

            Notify.create({
                message: 'Cadastro cancelado',
                color: 'green',
                position: 'top'
            })

        }

        onMounted(() => {
            getCategoria();
        })


        return {
            nome_Produto,
            valorProduto,
            fabricacao,
            Validade,
            description,
            PostApi,
            Abort,
            options,
            categoria,
            qtdEstoque
        }
    }
}


/**
 
if (this.nome != '' && this.cpf != "" && this.email != "" && this.senha != "") {
        Axios.post("http://localhost:3000/infos",{
          nome: this.nome,
          cpf: this.cpf,
          email: this.email,
          senha: this.password,
        }).then((responsta) => {
          console.log("Cadastro realizado com sucesso", responsta.data)
        });

        this.$router.push('/DataPage')

        this.nome = '',
          this.Sobrenome = '',
          this.cpf = null,
          this.email = '',
          this.password = ''

      } else {
        alert("insira os dados para que possamos prosseguir com o seu cadastro")
      }
    }

 */

</script>
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
                            input4="ativo" input5="ativo">
                            <template #Input2>
                                <q-input dense standout="bg-primary" hint="Valor do Produto" type="number"
                                    class="q-mt-lg" v-model="valorProduto" />
                            </template>
                            <template #Input3>
                                <q-input dense standout="bg-primary" type="date" hint="Data de Fabricação"
                                    class="q-mt-lg" v-model="Validade"/>
                                <q-input dense standout="bg-primary" type="date" hint="Data de Validade" class="q-mt-lg" />
                            </template>
                            <template #Input4>
                                <q-select dense standout="bg-primary text-white" v-model="categorias" :options="options"
                                    hint="Categoria do produto" class="q-mt-lg"/>
                            </template>

                            <template #Input5>
                                <q-input dense standout="bg-primary text-white" type="textarea" hint="descricao"
                                    v-model="description"
                                    :rules="[val => val.length <= 100 || 'Please use maximum 3 characters']"
                                    class="q-mt-lg"/>
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
        const Validade = ref('');
        const description = ref('');
        const categorias = ref('');
        const options = ref([]);



        // listar categoria
        async function getCategoria() {
            try {
                axios.get('http://localhost:3333/ListCategoria').then((response) => {
                    const data = response.data.categoria;
                    for (let i = 0; i < data.length; i++) {
                        options.value.push(data[i].nomeCategoria)
                    }

                    console.log(data);
                })
            } catch (error) {
                console.log(error)
            }
        }
        // ================================================================================================


        //função para enviar dados para o banco de dados ===============================================================
        async function PostApi() {

            if (nome_Produto.value != "" && valorProduto.value != "" && Validade.value != "" && description.value != "") {
                Notify.create({
                    message: 'Cadastro feito com sucesso',
                    color: 'green',
                    position: 'top'
                })

            } else if(nome_Produto.value == "" && valorProduto.value == "" && Validade.value == "" && description.value == ""){

                Notify.create({
                    message: 'Cadastro não realizado, por favor insira algo dentro dos inputs',
                    color: 'red',
                    position: 'top'
                })

            }

            nome_Produto.value = ''
            valorProduto.value = ''
            Validade.value = ''
            description.value = ''

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
            Validade,
            description,
            PostApi,
            Abort,
            options,
            categorias
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
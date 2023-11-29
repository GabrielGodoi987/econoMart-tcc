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
                        <FormCompt input1="nome do Produto" input2="ativo" input3="ativo" input4="ativo" input5="ativo"
                            @cadastrar="createProduct()" @cancel="cancel()" enctype="multipart/form-data">
                            <template #Input1>
                                <input type="file" name="Image" @change="NewFile" />

                                <q-input dense standout="bg-primary" v-model="productname" hint="nome do produto"
                                    class="q-mt-lg" />
                            </template>
                            <template #Input2>
                                <q-input dense standout="bg-primary" hint="Valor do Produto" type="number" class="q-mt-lg"
                                    v-model="price" />
                                <q-input dense standout="bg-primary" hint="Quandidade em estoqe" class="q-mt-lg"
                                    type="number" v-model="stock" />
                            </template>
                            <template #Input3>
                                <q-input dense standout="bg-primary" type="date" v-model="Validade" hint="Data de Validade"
                                    class="q-mt-lg" />
                            </template>
                            <template #Input4>
                                <q-select dense standout="bg-primary text-white" v-model="id_category" :options="options"
                                    hint="Categoria do produto" class="q-mt-lg" />
                                <div class="text-caption text-blue" style="cursor: pointer;"
                                    @click="categoryModal = !categoryModal">A caegoria não existe?</div>
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

            <q-dialog v-model="categoryModal">
                <q-card>
                    <q-card-section class="bg-primary text-white">
                        <div class="text-h4">nova categoria</div>
                    </q-card-section>
                    <q-card-section>
                        <q-form class="q-gutter-y-md">
                            <div class="text-body1">Digite o nome da nova categoria</div>
                            <q-input standout="bg-primary text-white" v-model="CategoryName" />
                            <div class="justify-center">
                                <q-btn @click="newCategory()" label="Cadastrar" color="secondary" />
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </q-dialog>
        </q-page-container>
    </q-layout>
</template>



<script>
import MenuCompt from '@/components/MenuCompt.vue';
import FormCompt from '@/components/FormComt.vue';
import { ref, onMounted, watch } from 'vue'
import { Notify } from 'quasar';
import axios from 'axios';
export default {
    components: { MenuCompt, FormCompt },

    methods: {

    },

    setup() {

        const productname = ref('');
        const description = ref('');
        const price = ref('');
        const Validade = ref('');
        const stock = ref('');
        const id_category = ref(null);
        const options = ref([]);

        // listar categoria
        async function getCategoria() {
            try {
                axios.get(`http://localhost:3333/listCategory`).then((response) => {
                    const data = response.data.category;
                    for (let i = 0; i < data.length; i++) {
                        options.value.push({ value: data[i].id, label: data[i].CategoryName });
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        // ================================================================================================
        let formdata = new FormData();
        let file = null;
        function NewFile(event) {
            file= event.target.files[0];
            formdata.append('Image', file);
        }

          // requisição para criar produtos
          async function createProduct() {
            formdata.append('productname', productname.value);
            formdata.append('description', description.value);
            formdata.append('price', price.value);
            formdata.append('stock', stock.value);
            formdata.append('id_category', id_category.value.value);
            formdata.append('validade', Validade.value);

            axios.post("http://localhost:3333/createProduct", formdata,
                {
                    Headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            ).then((res) => {
                const data = res.data;
                productname.value = '';
                price.value = '';
                stock.value = '';
                Validade.value = '';
                description.value = '';
                options.value = '';
                Notify.create({
                    message: "Produto cadastrado com sucesso",
                    color: 'green'
                })
                console.log(data);
            }).catch((erro) => {
                console.log(erro);
            })
        }

        // cancelar cadastro do produto ===============================================================
        async function cancel() {
            productname.value = ''
            price.value = ''
            stock.value = '';
            Validade.value = '';
            description.value = '';
            id_category.value = '';
            options.value = '';
            Image.value = null;


            Notify.create({
                message: 'Cadastro cancelado',
                color: 'negative',
                position: 'top'
            })

        }

        const categoryModal = ref(false);
        const CategoryName = ref();
        function newCategory() {
            axios.post("http://localhost:3333/createCat", {
                CategoryName: CategoryName.value
            }).then((res) => {
                const data = res.data;
                Notify.create({
                    message: 'Nova categoria cadastrada',
                    color: 'positive',
                    position: 'top'
                })
                categoryModal.value = false;
                CategoryName.value = '';
                console.log(data);
            }).catch((erro) => {
                console.error(erro)
            })
        }

        onMounted(() => {
            getCategoria();
        })
        
        watch(options, () => {
            getCategoria();
        })

        return {
            //campos que enviarão os dados para o backend que irá tratar esses dados em mandar para o banco de dados
            productname,
            description,
            stock,
            price,
            Validade,
            id_category,

            //cancelar o envio do formulário
            cancel,
            // criando o novo produto -> nesta função tem as requisilções e dados necessários para fazer o upload de imagens
            createProduct,

            // usado para listar as categorias
            options,

            // criando upload de imagens
            NewFile,

            // criando nova categoria
            categoryModal,
            newCategory,
            CategoryName
        }
    }
}
</script>
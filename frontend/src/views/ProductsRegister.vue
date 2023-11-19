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
                            @cadastrar="createProduct()" @cancel="cancel()">
                            <template #Input1>
                                <q-file dense standout="bg-secondary" label="Imagem do produto"
                                    style="max-width: 200px; margin: 0 auto;" v-model="Image">
                                    <template v-slot:prepend>
                                        <q-icon name="attach_file" />
                                    </template>
                                </q-file>

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
import { ref, onMounted } from 'vue'
import { Notify } from 'quasar';
import axios from 'axios';
export default {
    components: { MenuCompt, FormCompt },

    setup() {

        const Image = ref('');
        const productname = ref('');
        const description = ref('');
        const price = ref('');
        const Validade = ref('');
        const stock = ref('');
        const id_category = ref('');
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

        // requisição para criar produtos
        async function createProduct() {
            axios.post("http://localhost:3333/createProduct", {
                productname: productname.value,
                description: description.value,
                price: price.value,
                stock: stock.value,
                id_category: id_category.value.value,
                Validade: Validade.value,
            }).then((res) => {
                const data = res.data;
                productname.value = ''
                price.value = ''
                stock.value = '';
                Validade.value = ''
                description.value = ''
                options.value = ''
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
            Validade.value = ''
            description.value = ''
            options.value = ''

            Notify.create({
                message: 'Cadastro cancelado',
                color: 'negative',
                position: 'top'
            })

        }

        onMounted(() => {
            getCategoria();
        })


        return {
            productname,
            description,
            stock,
            price,
            Validade,
            id_category,
            Image,
            cancel,
            createProduct,
            options,
        }
    }
}
</script>
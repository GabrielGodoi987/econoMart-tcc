<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <!-- tabela onde serão implementados vindos do back-end -->
        <q-page-container class="q-pa-md row justify-center">
            <div class="col-sm-10 q-mt-xl">
                <q-select outlined v-model="category" :options="catoptions" label="Busque a categoria desejada" />

                <q-table class="my-sticky-virtscroll-table" title="Todos os Produtos" :columns="TableConfig.columns"
                    :rows="rows">
                    <template v-slot:top-right>
                    </template>
                    <template #body-cell-edit="props">
                        <q-td>
                            <q-btn rounded color="primary" icon="edit" @click="opnenModal(props.row)" />
                            <q-btn rounded color="secondary" icon="delete" @click="deleteProduct(props.row)" />
                        </q-td>
                    </template>
                </q-table>
            </div>
        </q-page-container>

        <q-page-container>
            <q-dialog v-model="openEdit">
                <q-card>
                    <FormComt :title="content.name" @cadastrar="editProduct(content.id)" @cancel="openEdit = false">
                        <template #Input1>
                            <q-input dense standout="bg-primary" hint="nome do produto" v-model="content.productname"
                                class="q-mt-lg" />
                        </template>

                        <template #Input2>
                            <q-input dense standout="bg-primary" v-model="content.price" hint="Valor do Produto"
                                type="number" class="q-mt-lg" />
                            <q-input dense standout="bg-primary" hint="Quandidade em estoqe" class="q-mt-lg" type="number"
                                v-model="content.stock" />
                        </template>

                        <template #Input3>
                            <q-input dense standout="bg-primary" type="textarea" hint="descricao do produto"
                                v-model="content.description" class="q-mt-lg" />
                        </template>

                    </FormComt>
                </q-card>
            </q-dialog>
        </q-page-container>
    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import FormComt from '@/components/FormComt.vue';
import * as TableConfig from "./ProductsConfig/TableConfig.js";
import * as crud from "./ProductsConfig/CrudOperations";
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Notify } from 'quasar';

export default {

    components: { MenuCompt, FormComt },
    setup() {
        const rows = ref([]);

        //listar todos os produtos independente de suas categorias
        // function ListAllProducts() {
        //     axios.get('http://localhost:3333/listAll').then((res) => {
        //         const data = res.data.products;
        //         rows.value = data;
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        // }


        const content = ref()
        const openEdit = ref(false);
        function opnenModal(props) {
            content.value = props;
            console.log(content.value);
            openEdit.value = !openEdit.value

            console.log(content.value.productname)
        }


        //edita os produtos de acordo com seus respectivos id's
        async function editProduct(id) {
            const data = {
                productname: content.value.productname,
                description: content.value.description,
                stock: content.value.stock,
                price: content.value.price
            }
            try {
                const update = crud.updateElement(id, data);
                openEdit.value = false
                Notify.create({
                    message: `produto atualizado com sucesso`,
                    color: 'green',
                })
                console.log(update);
            } catch (error) {
                Notify.create({
                    message: 'ocorreu um erro e o produto não foi cadastrado',
                    color: 'red'
                })
            }

        }


        //rota para deletar os produtos tanto do front como do backe end de maneira rápida
        async function deleteProduct(props) {
            const deleteProduct = crud.DeleteElement(props.id);
            const FrontDelete = rows.value.findIndex((element) => element.id == props.id);
            console.log(deleteProduct);
            console.log(FrontDelete)
            Notify.create({
                message: `produto deletado com sucesso`,
                color: 'green',
            })
            if (FrontDelete >= 0) {
                rows.value.splice(FrontDelete, 1)
            }
            console.log(props)
        }


        const catoptions = ref([])
        const category = ref(null);

        async function getByCategory() {
            await axios.get(`http://localhost:3333/listCategory`, {
            }).then((res) => {
                const cat = res.data.category;
                for (let i = 0; i < cat.length; i++) {
                    catoptions.value.push({ value: cat[i].id, label: cat[i].CategoryName });
                }
            });
        }
        async function ListByCat() {
            try {
                const response = await axios.get(`http://localhost:3333/ListByCat/${category.value.value}/product`);
                const data = response.data.data;
                rows.value = data;
                console.log(rows.value);
                console.log(category.value)
            } catch (error) {
                console.log(error.message);
            }
        }

        onMounted(() => {
            ListByCat();
            getByCategory();
            ListByCat();
        });
        return {
            TableConfig,
            rows,
            content,
            opnenModal,
            deleteProduct,
            openEdit,
            editProduct,
            category,
            catoptions
        };
    },
};


</script>

<style lang="scss">
@import '../styles/Styles.scss';
</style>
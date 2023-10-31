<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <!-- tabela onde serão implementados vindos do back-end -->
        <q-page-container class="q-pa-md row justify-center">
            <div class="col-sm-10 q-mt-xl">
                <q-table class="my-sticky-virtscroll-table" title="Todos os Produtos" :columns="TableConfig.columns"
                    :rows="rows">
                    <template v-slot:top-right>
                        <q-select filled v-model="category" :options="allcategorys" multiple emit-value map-options>
                            <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                                <q-item v-bind="itemProps">
                                    <q-item-section>
                                        <q-item-label v-html="opt.label" />
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
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
                    <FormComt :title="content.name" @cadastrar="updateProduct(content)" @abort="openEdit = false">
                        <template #Input1>
                            <q-input dense standout="bg-primary" hint="nome do produto" v-model="content.nome"
                                class="q-mt-lg" />
                        </template>

                        <template #Input2>
                            <q-input dense standout="bg-primary" v-model="content.preco" hint="Valor do Produto"
                                type="number" class="q-mt-lg" />
                            <q-input dense standout="bg-primary" hint="Quandidade em estoqe" class="q-mt-lg" type="number"
                                v-model="content.Qtd_estoque" />
                        </template>

                        <template #Input3>
                            <q-input dense standout="bg-primary" type="textarea" hint="descricao do produto"
                                v-model="content.descricao" class="q-mt-lg" />
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

        function ListAllProducts() {
            axios.get('http://localhost:3333/listAll').then((res) => {
                const data = res.data.products;
                rows.value = data;
            }).catch((error) => {
                return error
            });
        }

        onMounted(() => {
            ListAllProducts();
            getCategory();
        })




        const content = ref()
        const openEdit = ref(false);
        function opnenModal(props) {
            content.value = props;
            console.log(content.value);
            openEdit.value = !openEdit.value
        }

        async function editProduct(id) {
            const data = {
                productname: content.value.productname,
                description: content.value.description,
                stock: content.value.stock,
                price: content.value.price
            }
            try {
                const update = crud.updateElement(id, data);
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
        let category = ref([]);
        let options = ref([]);
        async function getCategory() {
            axios.get(`http://localhost:3333/ListByCat/${category.value.value}/product`).then((res) => {
                const data = res.data.data;
                console.log(data);
            }).catch((err) => {
                console.log(err)
            })

        }

        return {
            // ... restante do seu retorno ...
            TableConfig,
            rows,
            content,
            opnenModal,
            deleteProduct,
            openEdit,
            editProduct,
            category,
            options
        };
    },
};


</script>

<style lang="scss">
@import '../styles/Styles.scss';
</style>
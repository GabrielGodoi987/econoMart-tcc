<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <!-- tabela onde serão implementados vindos do back-end -->
        <q-page-container class="q-pa-md row justify-center">
            <div class="col-sm-10 q-mt-xl">
                <q-table class="my-sticky-virtscroll-table" title="Todos os Produtos" :columns="TableConfig.columns"
                    :rows="rows">
                    <template #top-right>
                        <q-input dense standout="bg-secondary" icon="search">
                            <template #append>
                                <q-icon name="search" color="white" />
                            </template>
                        </q-input>
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
                    <FormComt :title="content.name" @cadastrar="updateProduct(content.id)" @abort="openEdit = false">
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
import * as listProducts from "./ProductsConfig/ListProducts";
import * as crud from "./ProductsConfig/CrudOperations";
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { Notify } from 'quasar';

export default {

    components: { MenuCompt, FormComt },
    setup() {
        const rows = ref([]);
        onMounted(async () => {
            try {
                rows.value = await listProducts.getApi();
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        });




        const content = ref()
        const openEdit = ref(false);
        function opnenModal(props) {
            content.value = props;
            console.log(content.value);
            openEdit.value = !openEdit.value
        }

        async function updateProduct(props) {
            const data = {
                nome: props.nome,
                descricao: props.descricao,
                preco: props.preco,
                Qtd_estoque: props.Qtd_estoque,
            }

            //    return crud.updateElement(props.id, data);
            axios.post(`http://localhost:3333/AllProducts/${props.id}/edit`, data).then((response) => {
                console.log(response.data)
                openEdit.value = false;
                Notify.create({
                    message: "Salvo com sucesso",
                    color: 'positive'
                })
            }).catch((error) => {
                console.log(error);
            })
        }

        async function deleteProduct(props) {
            const FrontDelete = rows.value.findIndex((element) => element.id == props.id);
            if (FrontDelete >= 0) {
                rows.value.splice(FrontDelete, 1)
            }
            console.log(props.id)
            return crud.DeleteElement(props.id);
        }



        return {
            // ... restante do seu retorno ...
            TableConfig,
            rows,
            content,
            opnenModal,
            deleteProduct,
            updateProduct,
            openEdit
        };
    },
};


</script>

<style lang="scss">
@import '../styles/Styles.scss';
</style>
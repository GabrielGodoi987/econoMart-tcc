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
                            <q-btn rounded color="primary" icon="edit" @click="upDate(props.row)" />
                            <q-btn rounded color="secondary" icon="delete" />
                        </q-td>
                    </template>
                </q-table>
            </div>
        </q-page-container>

        <q-page-container>
            <q-dialog v-model="openEdit">
                <q-card>
                    <FormComt :title="content.nome">
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
import axios from 'axios';
import { ref, onMounted } from 'vue'

export default {
    components: { MenuCompt, FormComt },
    setup() {
        const rows = ref([]);

        onMounted(() => {
            getApi();
        })
        async function getApi() {
            await axios.get('http://localhost:3333/AllProducts')
                .then(res => {
                    let dados = res.data.AllProducts;
                    return rows.value = dados;
                }).catch(error => {
                    console.error('Erro ao buscar dados:', error);
                });

        }




        // PARTE DE UPDATE E DELETE DA TABELA, ABAIXO ESTARÃO AS FUNÇÕES QUE EXCLUIRÃO E EDITARÃO OS PRODUTOS
        const openEdit = ref(false);
        let content = ref()

        function upDate(props) {
            content.value = props
            console.log(content.value.id)
            openEdit.value = true
        }

        function Delete(props) {
            content.value = props
            openEdit.value = true
            // axios.delete(`http://localhost:3333/AllProducts/${content.value.id}/delete`).then((response) => {
            //     let res = response.data;
            //     console.log(res)
            // }).catch((error) => {
            //     console.error(error)
            // })
        }





        return {
            //abaixo estão as chamadas do backend para listarmos os produtos e seus configs
            TableConfig,
            rows,
            filter: ref(''),

            //funções e vAriáveis de DELETE E UPDATE
            upDate,
            Delete,
            //VARIÁVEIS
            content,
            openEdit
        }
    },
}

</script>

<style lang="scss">
@import '../styles/Styles.scss';
</style>
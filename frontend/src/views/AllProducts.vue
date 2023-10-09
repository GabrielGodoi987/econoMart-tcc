<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <!-- tabela onde serão implementados vindos do back-end -->
        <q-page-container class="q-pa-md row justify-center">
            <div class="col-sm-10">
                <q-table title="Todos os Produtos" :columns="TableConfig.columns" :rows="rows">
                    <template #top-right>
                        <q-input dense standout="bg-secondary" icon="search">
                            <template #append>
                                <q-icon name="search" color="white" />
                            </template>
                        </q-input>
                    </template>

                    <template #body-cell-edit="props">
                        <q-td>
                            <q-btn rounded color="primary" icon="edit" @click="upDate(props.row.id)" />
                            <q-btn rounded color="secondary" icon="delete" />
                        </q-td>
                    </template>
                </q-table>
            </div>

            <q-dialog v-model="openEdit">
                <q-card>
                    <q-card-section class="bg-primary">
                        <div class="text-h2">{{ content }}</div>
                    </q-card-section>
                    <FormComt>
                        <template #Input1>
                            <q-input dense standout="bg-primary" hint="nome do produto" v-model="content.nome"
                                class="q-mt-lg" />
                        </template>

                        <template #Input2>
                            <q-input dense standout="bg-primary" hint="nome do produto" v-model="content.descricao"
                                class="q-mt-lg" />
                        </template>

                        <template #Input3>
                        </template>

                        <template #Input4>
                        </template>
                        <template #Input5>
                        </template>

                    </FormComt>
                </q-card>
            </q-dialog>
        </q-page-container>
    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
// import TableCompt from "@/components/TableCompt.vue";
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
            console.log(content.value);
            openEdit.value = true
        }





        return {
            //abaixo estão as chamadas do backend para listarmos os produtos e seus configs
            TableConfig,
            rows,
            filter: ref(''),

            //funções e vAriáveis de DELETE E UPDATE
            upDate,
            //VARIÁVEIS
            content,
            openEdit
        }
    },
}

</script>
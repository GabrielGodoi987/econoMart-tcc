<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <!-- tabela onde serão implementados vindos do back-end -->
        <q-page-container class="q-pa-md row justify-center">
            <div class="col-sm-10">
                <TableCompt title="Todos os Produtos" :columns="TableConfig.columns" v-model:rows="rows" row-key="nome" v-model:filter="filtter">
                    <template #top-right>
                        <q-input dense standout="bg-secondary" icon="search">
                            <template #append>
                                <q-icon name="search" color="white" />
                            </template>
                        </q-input>
                    </template>
                </TableCompt>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import TableCompt from "@/components/TableCompt.vue";
import * as TableConfig from "./ProductsConfig/TableConfig.js";
import axios from 'axios';
import { ref, onMounted } from 'vue'

export default {
    components: { MenuCompt, TableCompt },
    setup() {
        const rows = ref([]);

        const filtter = ref('')

        onMounted(() => {
            console.log(getApi());
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


        return {
            TableConfig,
            rows,
            filtter
        }
    },
}

</script>
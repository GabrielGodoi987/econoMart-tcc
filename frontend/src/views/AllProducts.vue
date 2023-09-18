<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <!-- aqui será alguma funcionalidade que precisa ser pensada para que possamos implementar -->
        <q-page-container class="row justify-around">
            <q-card class="col-md-4">
                <Line :data="Products.data" :options="Products.options"></Line>
            </q-card>
            <q-card class="col-md4">

            </q-card>
        </q-page-container>

        <!-- tabela onde serão implementados vindos do back-end -->
        <q-page-container class="q-pa-md row justify-center q-mt-xl">
            <div class="col-sm-10">
                <TableCompt title="Todos os Produtos" :columns="TableConfig.columns">
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
import * as TableConfig from './AllProductsConfig/TableConfig';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'vue-chartjs'
import * as Products from "./AllProductsConfig/Products";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    components: { MenuCompt, TableCompt, Line },

    setup() {
        return {
            TableConfig,
            Products
        }
    }
}

</script>
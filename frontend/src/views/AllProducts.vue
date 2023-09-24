<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <!-- tabela onde serão implementados vindos do back-end -->
        <q-page-container class="q-pa-md row justify-center">
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
import * as TableConfig from "./ProductsConfig/TableConfig.js";
export default {
    components: { MenuCompt, TableCompt },

    setup() {
        return {
            TableConfig,
        }
    }
}

</script>
<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />
       
        <!-- aqui será alguma funcionalidade que precisa ser pensada para que possamos implementar -->
       <q-page-container class="q-pa-md row justify-around text-white text-weight-bold">
        <q-card class="col-md-3 text-center bg-primary">
            <q-card-section>
                <div class="text-h5">Mais Vendidos</div>
            </q-card-section>
            <q-card-section>
                <div class="text-subtitle">Laticinios R$ 500,00</div>
            </q-card-section>
        </q-card>
        <q-card class="col-md-3 text-center bg-secondary">
            <q-card-section>
                <div class="text-h5">Fornecedores</div>
            </q-card-section>
        </q-card>
        <q-card class="col-md-3 text-center bg-primary">
            <q-card-section>
                <div class="text-h5"></div>
            </q-card-section>
        </q-card>
       </q-page-container>

       <!-- tabela onde serão implementados vindos do back-end -->
        <q-page-container class="q-pa-md row justify-center q-mt-xl">
            <div class="col-sm-10">
                <TableCompt title="Todos os Produtos" :columns="TableConfig.columns">
                    <template #top-right>
                        <q-input dense standout="bg-secondary" icon="search"> 
                            <template #append>
                                <q-icon name="search" color="white"/>
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
import * as TableConfig from '@/TableConfig'


export default {
    components: { MenuCompt, TableCompt },

    setup() {
        return {
            TableConfig
        }
    }
}

</script>
<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container>
            <q-dialog v-model="modal">
                <!-- para usar o input desejado que esteja no component precisamos necessariamente colocarmos a propriedade dele abaixo
              mesmo que estejamos colocando dentro de template, ele precisará disso para estar ativo -->

                <FormComt title="Cadastro de Vendedores" Upload="Foto do funcionário"
                    input1="Nome Completo do Vendedor" input2="Email" input3="Telefone" input4="Funcao" input5="salario">
                    <template #Input4>
                        <!-- Conteúdo personalizado para o slot Input4 -->
                        <q-select dense standout="bg-primary" v-model="model" :options="options" hint="Função"
                            class="q-mt-lg" />
                    </template>

                    <template #Input5>
                        <q-input dense standout="bg-primary" hint="salário" type="number" class="q-mt-lg" />
                    </template>
                </FormComt>
            </q-dialog>
        </q-page-container>

        <q-page-container class="q-pa-md row justify-center">
            <div class="col-sm-10">
                <TableCompt title="Funcionário" grid :columns="TableConfig.columns" :rows="rows" Upload="imagem do produto"
                    v-model:row="rows">
                    <template #top-right>
                        <div class="row justify-between">
                            <div class="col-md-4">
                                <q-btn flat color="white" icon="add" label="Novo" @click="openModal" />
                            </div>
                            <div class="col-md-8">
                                <q-input dense standout="bg-secondary" icon="search">
                                    <template #append>
                                        <q-icon name="search" color="white" />
                                    </template>
                                </q-input>
                            </div>
                        </div>
                    </template>

                    <template #image>
                        teste
                    </template>
                </TableCompt>
            </div>



        </q-page-container>
    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import FormComt from '@/components/FormComt.vue';
import TableCompt from '@/components/TableCompt.vue'
// import axios from 'axios';
import * as TableConfig from './EmployesConfig/TableConfig'
import { ref } from 'vue'

export default {
    components: { MenuCompt, FormComt, TableCompt },

    setup() {

        const rows = ref([]);

        // async function getEmployes() {
        //     axios.get().then((response) => {

        //     }).catch((error) => {

        //     })
        // }


        const modal = ref(false)
        const openModal = () => {
            modal.value = !modal.value
        }

        const options = [
            'estoquista',
            'vendedor',
            'operador de caixa'
        ]
        return {
            options,
            modal,
            openModal,
            TableConfig,
            rows
        }
    }
}

</script>
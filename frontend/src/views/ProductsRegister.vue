<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container class="q-pa-md row justify-center">
            <div class="col-md-6 q-gutter-y-xl">
                <q-card>
                    <q-card-section class="bg-primary text-white text-weight-bold shadow-3">
                        <div class="text-h3 text-center">Cadastro de Produtos</div>
                    </q-card-section>
                    <q-card-section>
                        <q-form class="q-pa-lg">
                            <q-file dense standout="bg-secondary" label="Upload de Imagens"
                                style="max-width: 200px; margin: 0 auto;">
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                            </q-file>

                            <q-input dense standout="bg-primary" v-model="nome_Produto" hint="Nome do Produto"
                                class="q-mt-lg" />

                            <q-input dense standout="bg-primary" v-model="valorProduto" hint="Valor do Produto"
                                class="q-mt-lg" />

                            <q-select :options="$$$options" v-model="$$$options" dense standout="bg-primary"
                                hint="Categoria" class="q-mt-lg" />

                            <q-input dense standout="bg-primary" v-model="Validade" type="date" hint="Validade"
                                class="q-mt-lg" />

                            <q-input standout="bg-primary" v-model="description" type="textarea" />

                            <div class="q-mt-xl q-gutter-x-xl">
                                <q-btn rounded label="Cadastrar" color="primary" @click="PostApi()" />
                                <q-btn rounded label="Cancelar" color="secondary" @click="Abort()" />
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
        </q-page-container>
    </q-layout>
</template>



<script>
import MenuCompt from '@/components/MenuCompt.vue';
// import axios from 'axios';
import { ref } from 'vue'
export default {
    components: { MenuCompt },

    setup() {

        const nome_Produto = ref('');
        const valorProduto = ref('');
        const Validade = ref('');
        const description = ref('');



        async function PostApi() {
            alert('teste')

            nome_Produto.value = ''
            valorProduto.value = ''
            Validade.value = ''
            description.value = ''
        }


        async function Abort() {
            nome_Produto.value = ''
            valorProduto.value = ''
            Validade.value = ''
            description.value = ''
        }

        return {
            nome_Produto,
            valorProduto,
            Validade,
            description,
            PostApi,
            Abort
        }
    }
}

</script>
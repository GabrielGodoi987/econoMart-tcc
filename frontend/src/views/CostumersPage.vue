<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container>
            <q-table grid class="my-sticky-virtscroll-table" title="Todos os Clientes" :columns="columns" :rows="rows">
                <template v-slot:item="props">
                    <div class="q-pa-md">
                        <q-card bordered flat style="width: 250px;">
                            <q-card-section>
                                <q-img :src="props.row.imagen.nome" />
                            </q-card-section>
                            <q-list dense>
                                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                                    <q-item-section>
                                        <q-item-label>{{ col.label }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-item-label caption>{{ col.value }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                            <q-separator />
                            <q-card-section>
                                <q-card-actions vertical>
                                    <q-btn color="primary" icon="edit" />
                                    <q-btn color="secondary" icon="delete" />
                                </q-card-actions>
                            </q-card-section>
                        </q-card>
                    </div>
                </template>
            </q-table>
        </q-page-container>
    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import * as columns from "./SellersConfig/sellerTable";
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
    components: { MenuCompt },
    setup() {
        const rows = ref();

        async function getCostumers() {
            axios.get('http://localhost:3333/listAllClients').then((res) => {
                const data = res.data.data
                rows.value = data;
                console.log(rows.value)
            }).catch((err) => {
                console.log(err)
            })
        }

        async function DeleteCustomer(){

        }

        async function UpdateCustomer(){

        }

        onMounted(() => {
            getCostumers();
        })

        return {
            columns: columns.columns,
            rows,
            DeleteCustomer,
            UpdateCustomer
        }
    }
}

</script>

<style lang="scss"></style>
<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container>
            <q-table grid class="my-sticky-virtscroll-table" title="Todos os Clientes" :columns="columns" :rows="rows">
                <template v-slot:item="props">
                    <div class="q-pa-md">
                        <q-card bordered flat>
                            <q-card-section>
                                <q-img :src="props.row.imagen.nome" style="width: 250px; height: 250px;"/>
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
                                    <q-btn color="secondary" icon="delete" @click="DeleteCustomer(props.row.id)"/>
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

        async function DeleteCustomer(id) {
            const DeleteCust = rows.value.findIndex((element) => element.id == id);
            console.log(DeleteCust);
            console.log(id)
            await axios.post(`http://localhost:3333/delete/${id}/Client`).then((res) => {
                const data = res.data.msg;
                rows.value.splice(DeleteCust, 1);
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        }

        onMounted(() => {
            getCostumers();
        })

        return {
            columns: columns.columns,
            rows,
            DeleteCustomer
        }
    }
}

</script>

<style lang="scss"></style>
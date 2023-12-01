<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container>
            <q-table grid class="my-sticky-virtscroll-table" title="Todos os Clientes" :columns="columns" :rows="rows">
                <template v-slot:item="props">
                    <div class="q-pa-md">
                        <q-card bordered flat>
                            <q-card-section>
                                <q-img :src="props.row.imagen.nome" style="width: 250px; height: 250px;" />
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
                                    <q-btn color="primary" icon="edit" @click="openEditmodal(props.row)" />
                                    <q-btn color="secondary" icon="delete" @click="DeleteCustomer(props.row.id)" />
                                </q-card-actions>
                            </q-card-section>
                        </q-card>
                    </div>
                </template>
            </q-table>


            <q-dialog v-model="openEdit">
                <q-card v-model="content" class="q-gutter-y-md">
                    <q-card-section class="q-gutter-y-md">
                        <q-input standout="bg-primary text-white" v-model="content.custname" />
                        <q-input standout="bg-primary text-white" v-model="content.email" />
                        <q-input standout="bg-primary text-white" v-model="content.cpf" />
                    </q-card-section>
                    <q-card-section>
                        <q-btn rounded color="primary" label="Salvar" @click="Update(content.id)" />
                    </q-card-section>
                </q-card>
            </q-dialog>
        </q-page-container>
    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import * as columns from "./SellersConfig/sellerTable";
import { onMounted, ref } from 'vue';
import { Notify } from 'quasar';
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
            console.log(id);
            await axios.post(`http://localhost:3333/delete/${id}/Client`).then((res) => {
                const data = res.data.msg;
                rows.value.splice(DeleteCust, 1);
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        }

        const openEdit = ref(false);
        const content = ref();

        function openEditmodal(props) {
            openEdit.value = !openEdit.value;
            content.value = props;
            console.log(content.value)
        }


        async function Update(id) {
            console.log(id)
            axios.post(`http://localhost:3333/edit/${id}/Client`, {
                custname: content.value.custname,
                email: content.value.email,
                cpf: content.value.cpf
            }).then((res) => {
                const data = res.data;
                console.log(data);
                Notify.create({
                    message: `Dados do cliente ${content.value.custname} alterado com sucesso!`,
                    color: 'positive',
                    position: 'top-right'
                })

                openEdit.value = false;

            }).catch((err) => {
                console.log(err);
                Notify.create({
                    message: `${err}`,
                    color: 'negative',
                    position: 'bottom-left'
                })
            });
        }

        onMounted(() => {
            getCostumers();
        })

        return {
            columns: columns.columns,
            rows,
            DeleteCustomer,
            openEdit,
            openEditmodal,
            Update,
            content
        }
    }
}

</script>

<style lang="scss"></style>
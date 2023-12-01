<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container>
            <q-table grid :columns="ComprasConfig.columns" :rows="rows" class="my-sticky-virtscroll-table">
                <template v-slot:item="props">
                    <q-card>
                        <q-card-section>
                            <q-img :src="props.row.customer.imagen.imagem_nome"/>
                        </q-card-section>
                        <q-separator/>
                        <q-card-section>
                            <q-list dense>
                                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                                    <q-item-section>
                                        <q-item-label>{{ col.label }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-item-label class="text-subtitle text-weight-bolder">{{ col.value }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </template>
            </q-table>
        </q-page-container>
    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import * as ComprasConfig from "./TodasComprasConfig/TableCompras";
import axios from 'axios';
import { onMounted, ref } from 'vue';
export default {
    components: { MenuCompt },

    setup() {

        const rows = ref([])

        async function getSalles() {
            axios.get('http://localhost:3333/allVendas').then((res) => {
                const venda = res.data.purchases;
                rows.value = venda
                console.log(rows.value);
            }).catch(() => {

            })
        }

        onMounted(() => {
            getSalles();

        })
        return {
            ComprasConfig,
            rows
        }
    }
}
</script>


<style lang="scss">
@import '../styles/Styles.scss';
</style>
<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container>
            <q-table>
                <template v-slot:item="props">
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
                </template>
            </q-table>
        </q-page-container>
    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import * as ComprasConfig from "@/views/TodasComprasconfig/TableCompras"
import axios from 'axios';
export default {
    components: { MenuCompt },

    setup() {

        async function getSalles() {
            axios.get('http://localhost:3333/allVendas').then(() => {

            }).catch(() => {

            })
        }

        return {
            getSalles,
            ComprasConfig
        }
    }
}
</script>
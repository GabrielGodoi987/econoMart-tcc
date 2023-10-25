<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container>
            <q-table grid class="my-sticky-virtscroll-table" title="Todos os vendedores" :columns="columns" :rows="rows">
                <template #body-cell="props">
                    <q-td :props="props">
                       teste:  {{ props.row.foto }}
                    </q-td>
                </template>
            </q-table>
        </q-page-container>
    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import * as columns from "./SellersConfig/sellerTable";

export default {
    components: { MenuCompt },
    setup() {
        const rows = [
            {
                sellername: 'João Silva',
                email: 'joao.silvaEemail.com',
                password: 'password123',
                foto: 'https://avaazdo.s3.amazonaws.com/147541710957f11415b045e8.71418656bluezao_600x314.jpeg'
            },
            {
                sellername: 'Maria Oliveira',
                email: 'maria.oliveira@email.com',
                password: 'senha456',
                foto: 'https://avaazdo.s3.amazonaws.com/147541710957f11415b045e8.71418656bluezao_600x314.jpeg'
            }
        ];
        return {
            columns: columns.columns,
            rows
        }
    }
}

</script>

<style lang="scss">
@import '../styles/Styles.scss';
</style>
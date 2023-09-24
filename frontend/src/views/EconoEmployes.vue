<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container>
            <FormComt />
        </q-page-container>

    </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import FormComt from '@/components/FormComt.vue';

export default {
    components: { MenuCompt, FormComt },

    setup() {
        return {
        }
    }
}

</script>
<template>
    <q-header elevated class="bg-white text-primary">
        <q-toolbar>
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

            <q-toolbar-title>
                <q-avatar>
                </q-avatar>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated class="bg-primary">
        <q-card square class="bg-secondary text-center shadow-8">
            <div class="text-h4" id="econoText">EconoMart</div>
            <div class="text-h4 text-white font-weight-bold">
                <q-icon name="account_circle" />
            </div>
        </q-card>

        <q-tabs vertical class="text-subtitle1 q-mt-xl text-white text-bold q-pa-md">
            <q-route-tab>Funcionários</q-route-tab>
            <q-route-tab>Cadastro de Produtos</q-route-tab>
            <q-route-tab>Todos os Produtos</q-route-tab>
            <slot name="bacTohome"></slot>
        </q-tabs>
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>
</template>
<style lang="scss">
#econoText {
    color: #FFF;
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50);
    font-size: 36px;
    font-weight: bold;
    -webkit-text-stroke: 1px black;
    line-height: normal;
}
</style>
  
<script>
import { ref } from 'vue'

export default {
    setup() {
        const leftDrawerOpen = ref(false)

        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
        }
    }
}
</script>
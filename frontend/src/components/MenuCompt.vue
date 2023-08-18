<template>
    <q-header elevated class="bg-white text-primary">
        <q-toolbar>
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

            <q-toolbar-title>
                <q-avatar>
                </q-avatar>
            </q-toolbar-title>
            <q-avatar>
                <q-img :src="user.src"/>
            </q-avatar>
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
            <q-route-tab to="/">Dashboard</q-route-tab>
            <q-route-tab to="/employes">Funcionários</q-route-tab>
            <q-route-tab to="/productsRegister">Cadastro de Produtos</q-route-tab>
            <q-route-tab to="/allProducts">Todos os Produtos</q-route-tab>
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
    // props: {
    //     user: {
    //         type: Object,
    //         required: true
    //     }
    // },
    setup() {
        const leftDrawerOpen = ref(false);

        const user = {
            src: "https://scontent-gru1-2.xx.fbcdn.net/v/t39.30808-6/215435856_280213210565546_8786231922568570652_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8631f5&_nc_ohc=7g6B0dAINJsAX9eQKXz&_nc_ht=scontent-gru1-2.xx&oh=00_AfBSS1ToCVpVSWJOncLbVRcy7NRa_9uw67NtWLnX4Axt4w&oe=64E3F427",
            name: "bluezão"
        };


        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value
            },
            // props
            user
        }
    }
}
</script>
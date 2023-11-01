<template>
    <q-header class="bg-primary text-white">
        <q-toolbar>

            <q-toolbar-title>
                <q-avatar>
                    <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                </q-avatar>
            </q-toolbar-title>


            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        </q-toolbar>

    </q-header>

    <q-drawer show-if-above v-model="righttDrawerOpen" side="left" bordered class="bg-primary">
        <div class="absolute-top bg-secondary" style="height: 100px">
            <div class="absolute-center bg-transparent text-center">
                <div id="econoText">Economart</div>
            </div>
        </div>
        <!-- drawer content -->
        <q-scroll-area class="fit">
            <q-list style="margin: 150px 30px;">
                <q-item clickable v-ripple v-for="(i, index) in menu" :key="index">
                    <q-item-section avatar>
                        <q-icon :name="i.icon" color="white" />
                    </q-item-section>
                    <q-item-section>
                        <q-tabs vertical>
                            <q-route-tab :to="i.route" class="text-subtitle1 text-white">{{ i.name }}</q-route-tab>
                        </q-tabs>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-drawer show-above v-model="leftDrawerOpen" side="right" bordered>
        <!-- drawer content -->
        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
                <q-avatar size="56px" class="q-mb-sm">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <div class="text-weight-bold">{{ user.username }}</div>
                <div>{{ user.email }}</div>
            </div>
        </q-img>
    </q-drawer>
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
import { ref, toRefs, onMounted } from 'vue'
import { userStore } from "@/store"
export default {
    setup() {
        const righttDrawerOpen = true;
        const leftDrawerOpen = ref(false);
        const { user } = toRefs(userStore());

        onMounted(() => {
            user.value;
        })



        const menu = [
            {
                name: 'Dashboard',
                icon: 'fa-solid fa-chart-simple',
                route: '/dashboard'
            },
            {
                name: 'Clientes',
                icon: 'fa-solid fa-user',
                route: '/Costumers'
            },
            {
                name: 'Caixa Eletrônico',
                icon: 'fa-solid fa-cash-register',
                route: '/Caixa'
            },
            {
                name: 'Novos Produtos',
                icon: 'fa-solid fa-folder',
                route: '/productsRegister'
            },
            {
                name: 'Produtos',
                icon: 'fa-solid fa-bag-shopping',
                route: '/allProducts'
            }
        ]

        return {
            righttDrawerOpen,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value
            },
            menu,
            user
        }
    }
}
</script>
<template>
    <q-layout view="lHh lpR lFf">
        <q-page-container>
            <q-header class="text-black bg-white shadow-4">
                <q-toolbar class="text-center">
                    <q-toolbar-title>
                        Economart
                    </q-toolbar-title>
                </q-toolbar>
            </q-header>
        </q-page-container>
        <q-page-container class="row justify-around">
            <div class="col-md-5 text-center q-mt-md">
                <q-img src="../assets/LoginImage.png" />
            </div>
            <div class="col-md-4 text-center q-mt-md">
                <q-card style="margin-top: 8rem;">
                    <q-card-section>
                        <div class="bg-primary text-white" style="height: 50px;">
                            <div class="text-h4 text-center">Login</div>
                        </div>
                        <q-form>
                            <q-input dense standout="bg-primary" hint="email do Usuário" class="q-mt-xl q-mb-xl"
                                v-model="email" />

                            <q-input dense standout="bg-primary" hint="Senha do Usuário" class="q-mt-xl q-mb-md"
                                v-model="password" />

                            <q-btn rounded color="primary" label="Entrar" class="q-mt-xl q-mb-xl" @click="LoginUser()" />
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
import { ref } from 'vue';
import { userStore } from '@/store'
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

export default {
    setup() {
        const email = ref('Gabrielgodoi@admin.economart')
        const password = ref('445566')
        const auth = userStore();
        const router = useRouter();

        async function LoginUser() {
            try{
                auth.login(email.value, password.value);
                router.push({path: '/Costumers'})
            }catch(err){
               Notify.create({
                message: err.message,
                color: 'red'
               })
            }
        }

        return {
            LoginUser,
            email,
            password
        }
    }
}
</script>

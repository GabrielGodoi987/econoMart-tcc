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
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { ref } from 'vue';
import { useCounterStore } from "../store";
export default {
    setup() {
        const router = useRouter();
        const email = ref('Gabrielgodoi@admin.economart')
        const password = ref('445566')

        async function LoginUser() {
            axios.post('http://localhost:3333/login', {
                email: email.value,
                password: password.value
            }).then((res) => {
                const token = res.data.token;
                const data = res.data.data

                const authStore = useCounterStore();

                authStore.setToken(token);
                authStore.setUserLevel(data);
                router.push({ path: '/dashboard' })
                Notify.create({
                    type: 'positive',
                    message: 'usuário encontrado com sucesso',
                    color: 'green',
                    timeout: 1000
                })
                console.log(data)
            }).catch((erro) => {
                console.log(erro);
            })
        }

        return {
            LoginUser,
            email,
            password
        }
    }
}
</script>

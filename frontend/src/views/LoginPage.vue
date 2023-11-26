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
                        <div class="text-white" style="height: 80px;">
                            <div class="text-h4 text-center bg-primary">Login</div>
                        </div>
                        <q-form>
                            <q-input dense standout="bg-primary" hint="email do Usuário" class="q-mt-xl q-mb-xl"
                                v-model="email" />

                            <q-input dense standout="bg-primary" type="password" hint="Senha do Usuário" class="q-mt-xl q-mb-md"
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
import axios from 'axios';

export default {
    setup() {
        const email = ref('gabrielgodoi');
        const password = ref('445566');
        const { login } = userStore();
        const router = useRouter();

        async function LoginUser() {
            axios.post('http://localhost:3333/login', {
                email: email.value,
                password: password.value
            }).then((res) => {
                const data = res.data.data;
                Notify.create({
                    type: 'positive',
                    message: 'usuário encontrado com sucesso',
                    color: 'green',
                    timeout: 1000
                })
                router.push({ path: '/Caixa' })
                const user = login(data);
                console.log(user)
            }).catch((err) => {
                Notify.create({
                    type: 'negative',
                    message: "Usuário não encontrado" + err,
                    color: 'red',
                    timeout: 2500
                })
            });
        }

        return {
            LoginUser,
            email,
            password
        }
    }
}
</script>


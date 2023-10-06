<template>
    <q-layout view="lHh lpR lFf">

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
                            <q-input dense standout="bg-primary" v-model="nome_Produto" hint="ID do Usuário"
                                class="q-mt-xl q-mb-xl" />

                            <q-input dense standout="bg-primary" v-model="nome_Produto" hint="Senha do Usuário"
                                class="q-mt-xl q-mb-md" />

                            <q-btn rounded color="primary" label="Entrar" class="q-mt-xl q-mb-xl" />
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>

export default{
    setup(){
        
    }
}
</script>

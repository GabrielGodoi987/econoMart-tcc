<template>
    <q-layout view="lHh lpR lFf">
        <MenuCompt />

        <q-page-container class="q-pa-md row justify-center">
            <div class="col-md-6 q-gutter-y-xl">
                <q-card>
                    <q-card-section class="bg-primary text-white text-weight-bold shadow-3">
                        <div class="text-h3 text-center">Cadastro de Produtos</div>
                    </q-card-section>
                    <q-card-section>
                        <q-form class="q-pa-lg">

                            <div class="file-input-container">
                                <label class="file-label" for="file-input">
                                    <i class="fas fa-upload"></i> <!-- Ícone de upload da Font Awesome -->
                                    Selecionar Arquivo
                                </label>
                                <input id="file-input" class="file-input" type="file">
                            </div>

                            <q-input dense standout="bg-primary" hint="Nome do Produto" class="q-mt-lg" />

                            <q-input dense standout="bg-primary" hint="Valor do Produto" class="q-mt-lg" />

                            <q-input dense standout="bg-primary" hint="Categoria" class="q-mt-lg" />

                            <q-input dense standout="bg-primary" type="date" hint="Validade" class="q-mt-lg" />

                            <q-input standout="bg-primary" type="textarea" />

                            <div class="q-mt-xl q-gutter-x-xl">
                                <q-btn rounded label="Cadastrar" color="primary" />
                                <q-btn rounded label="Cancelar" color="secondary" />
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
        </q-page-container>
    </q-layout>
</template>

<style lang="scss">
.file-input-container {
    position: relative;
    display: inline-block;
    overflow: hidden;
}

.file-input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.file-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 50px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
}

.file-label i {
    margin-right: 5px;
}
</style>

<script>
import MenuCompt from '@/components/MenuCompt.vue';

export default {
    components: { MenuCompt },

    setup() {
        return {
        }
    }
}

</script>
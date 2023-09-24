<template>
    <div class="q-pa-md row justify-center">
        <div class="col-md-6 q-gutter-y-xl">
            <q-card>
                <q-card-section class="bg-primary text-white text-weight-bold shadow-3">
                    <div class="text-h3 text-center">Cadastro de Produtos</div>
                </q-card-section>
                <q-card-section>
                    <q-form class="q-pa-lg">
                        <q-file dense standout="bg-secondary" label="Upload de Imagens"
                            style="max-width: 200px; margin: 0 auto;">
                            <template v-slot:prepend>
                                <q-icon name="attach_file" />
                            </template>
                        </q-file>

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
    </div>
</template>

<script>

export default {
    setup() {

    }
}

</script>
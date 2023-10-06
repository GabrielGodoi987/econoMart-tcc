<template>
    <div :class="props.classes">
        <q-card>
            <q-card-section class="bg-primary text-white text-weight-bold shadow-3">
                <div class="text-h3 text-center">{{ props.title }}</div>
            </q-card-section>
            <q-card-section>
                <q-form class="q-pa-lg">
                    <slot name="UploadInput" v-if="props.Upload">
                        <q-file dense standout="bg-secondary" :label="props.Upload"
                            style="max-width: 200px; margin: 0 auto;">
                            <template v-slot:prepend>
                                <q-icon name="attach_file" />
                            </template>
                        </q-file>
                    </slot>

                    <slot name="Input1">
                    </slot>

                    <slot name="Input2">
                    </slot>

                    <slot name="Input3">
                    </slot>

                    <slot name="Input4">
                    </slot>
                    <slot name="Input5">
                    </slot>

                    <div class="row justify-around q-mt-xl">
                        <slot name="buttons">
                            <q-btn rounded color="secondary" label="Cadastrar" @click="$emit('cadastrar')" />
                            <q-btn rounded color="primary" label="Cancelar" @click="$emit('abort')" />
                        </slot>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>
  
<script>
export default {
    props: {
        Upload: String
    },
    methods: {
        cadastrar() {
            this.$event('cadastrar');
        },

        abort() {
            this.$event('abort')
        }
    },
    setup(props) {

        return {
            props,
        }
    }
};
</script>
  
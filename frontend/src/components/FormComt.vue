<template>
    <div :class="props.classes">
        <q-card>
            <q-card-section class="bg-primary text-white text-weight-bold shadow-3">
                <div class="text-h3 text-center">{{ props.title }}</div>
            </q-card-section>
            <q-card-section>
                <q-form class="q-pa-lg">
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
                            <q-btn rounded color="primary" label="Cancelar" @click="$emit('cancel')" />
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
        Upload: String,
        title: String
    },
    methods: {
        cadastrar() {
            this.$event('cadastrar');
        },

        abort() {
            this.$event('cancel')
        }
    },
    setup(props) {

        return {
            props,
        }
    }
};
</script>
  
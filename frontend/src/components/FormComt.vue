<template>
    <div :class="props.classes">
        <q-card>
            <q-card-section class="bg-primary text-white text-weight-bold shadow-3">
                <div class="text-h3 text-center">{{ props.title }}</div>
            </q-card-section>
            <q-card-section>
                <q-form class="q-pa-lg">
                    <slot name="UploadInput">
                        <q-file dense standout="bg-secondary" :label="props.Upload"
                            style="max-width: 200px; margin: 0 auto;">
                            <template v-slot:prepend>
                                <q-icon name="attach_file" />
                            </template>
                        </q-file>
                    </slot>

                    <slot name="Input1" v-if="props.input1">
                        <q-input dense standout="bg-primary" :hint="props.input1" class="q-mt-lg" />
                    </slot>

                    <slot name="Input2" v-if="props.input2">
                        <q-input dense standout="bg-primary" :hint="props.input2" class="q-mt-lg" />
                    </slot>

                    <slot name="Input3" v-if="props.input3">
                        <q-input dense standout="bg-primary" :hint="props.input3" class="q-mt-lg" />
                    </slot>

                    <slot name="Input4" v-if="props.input4">
                        <q-input dense standout="bg-primary" :hint="props.input4" class="q-mt-lg" />
                    </slot>
                    <slot name="Input5" v-if="props.input5">
                        <q-input standout="bg-primary" :hint="props.input5" />
                    </slot>

                    <div class="row justify-around q-mt-xl">
                        <q-btn rounded label="Cadastrar" color="primary" />
                        <q-btn rounded label="Cancelar" color="secondary" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>
  
<script>
export default {
    props: {
        classes: String,
        title: String,
        Upload: String,
        input1: String,
        input2: String,
        input3: String,
        input4: String,
        input5: String,
    },
    setup(props) {
        return {
            props
        }
    }
};
</script>
  
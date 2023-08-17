<template>
  <q-layout view="lHh lpR lFf">
    <MenuCompt />
    <q-page-container class="q-pa-md row q-gutter-x-md">

      <q-card class="q-pa-md col-md-6 q-ml-xl">
        <q-card-section>
          <div class="text-h6">Bem vindo de volta Gabriel</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle">Tenha um bom trabalho ! não se esqueça de checar as suas tarefas do dia, e fazer as
            suas anotações
            necessárias
          </div>
        </q-card-section>
        <q-btn squared outline color="secondary" label="ver tarefas" />
      </q-card>

      <div class="col-md-4 justify-center">
        <Pie :data="ChartProductsConfig.data" :options="ChartProductsConfig.options" />
      </div>
    </q-page-container>


  </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import * as ChartProductsConfig from "../ChartProductsConfig";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  components: { MenuCompt, Pie },

  setup() {

    return {
      ChartProductsConfig
    }
  }
}
</script>

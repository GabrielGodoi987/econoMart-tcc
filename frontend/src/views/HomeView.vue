<template>
  <q-layout view="lHh lpR lFf">
    <MenuCompt />
    <q-page-container class="row q-ml-xl justify-evenly">

      <q-card class="col-sm-5 q-pa-md">
        <q-card-section>
          <div class="text-h6">Bem vindo de volta Gabriel</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle">Tenha um bom trabalho ! não se esqueça de checar as suas tarefas do dia, e fazer as
            suas anotações
            necessárias
          </div>
        </q-card-section>
        <q-card-section>
          <q-btn squared outline color="secondary" label="ver tarefas" />
        </q-card-section>
      </q-card>

      <q-card class="col-sm-5">
        <q-card-section>
          <div class="text-h6">Estoque De Produtos por categoria</div>
        </q-card-section>
        <q-card-section>
          <Pie :data="ChartProductsConfig.data" :options="ChartProductsConfig.options" />
        </q-card-section>
      </q-card>

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

<template>
  <q-layout view="lHh lpR lFf">
    <MenuCompt />
    <q-page-container class="row justify-around">
      <q-card class="q-mt-xl col-md-3" v-for="(i, index) in cards" :key="index">
        <q-card-section class="row q-ml-lg">
          <q-btn :icon="i.icon" color="primary"/>
          <div class="text-h6 q-ml-md q-mt-sm"> {{ i.name }}</div>
        </q-card-section>
        <q-card-section class="bg-primary text-center text-white">
          <div class="text-subtitle1">R$ {{ i.data }}</div>
        </q-card-section>
      </q-card>
    </q-page-container>


    <q-page-container>
      <div class="row justify-around">
        <q-card>
          <q-card-section>
             <Pie :data="PieConfig.data" :options="PieConfig.options"/>
          </q-card-section>
          <q-card-section>
            <!-- <Pie/> -->
          </q-card-section>
        </q-card>
        <!-- Vendas de totos os meses, para controle, virá todos os dados de todos os produtos aqui -->
        <q-card class="col-md-7">
          <q-card-section>
            <div class="text-h3">Vendas</div>
          </q-card-section>
          <q-card-section>
            <Line :options="LineConfig.options" :data="LineConfig.data" />
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuCompt from '@/components/MenuCompt.vue';
import * as LineConfig from "./DashboardConfig/SalesConfig";
import * as PieConfig from "./DashboardConfig/MostSellsconfig";
import { Line } from 'vue-chartjs';
import { Pie } from 'vue-chartjs';

export default {
  components: { MenuCompt, Line, Pie },

  setup() {

    const cards = [
      {
        name: 'Vendas Totais',
        icon: 'show_chart',
        data: '200'
      },
      {
        name: 'Despesas',
        icon: 'paid',
        data: '20,00'
      }
    ]


    return {
      LineConfig,
      cards,
      PieConfig
    }
  }
}
</script>

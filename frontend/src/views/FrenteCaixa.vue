<template>
  <q-layout view="lHh lpR lFf">
    <q-header class="shadow-3 text-center">
      <q-toolbar inset class="q-gutter-sm">
        <q-breadcrumbs class="bg-primary" v-for="(i, index) in menu" :key="index">
          <q-breadcrumbs-el :icon="i.icon" :to="i.route" :label="i.name" />
        </q-breadcrumbs>
      </q-toolbar>
    </q-header>


    <q-page-container class="q-mt-xl">
      <div class="row justify-around items-center" style="height: 100%;">
        <!-- ================================================================== -->
        <!-- Parte caixa eletrônico -->
        <div class="col-md-4">
          <div class="row justify-around">
            <!-- primeiro input, para buscar e selecionar os Clientes, para que seja contabilizado a compra do mesmo -->
            <div class="col-md-10">
              <!-- botão q-select com dialog-->
              <q-select dense filled use-input label="Cliente" v-model="user" :options="LisUser" @filter="filterFn"
                behavior="dialog" class="q-mt-md">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-md-1">
              <q-btn square icon="add" class="q-mt-md" />
            </div>
          </div>
          <!-- buscando produtos no banco de dados, caso não conseguir ver no painel ao lado vamos poder ver aqui -->
          <!-- primeiro input, para buscar e selecionar os Clientes, para que seja contabilizado a compra do mesmo -->
          <!-- botão q-select com dialog-->
          <q-select dense filled :options="options" class="q-mt-md" />
          <!-- ------------------------------ -->
          <q-table class="q-mt-xl" :columns="CartConfig.columns" :rows="cart">

          </q-table>

          <div class="row q-mt-xl justify-around">
            <div class="col-md-4">
              <q-input dense standout="bg-primary" label="teste" />
            </div>
            <div class="col-md-4">
              <q-input dense standout="bg-primary" label="teste" />
            </div>
          </div>

          <div class="row justify-around q-mt-xl">
            <div class="col-md-5">
              <q-btn square label="Pagar" color="primary" style="width: 100%;" />
            </div>
            <div class="col-md-5">
              <q-btn square label="cancelar" color="secondary" style="width: 100%;" />
            </div>
          </div>
        </div>

        <!-- Fim Primeira div ============================================================== -->

        <q-separator vertical color="dark" />

        <!-- começo da div 2 ============================================================ -->
        <div class="col-md-6 text-center">
          <div class="row justify-around q-mb-xl">
            <div class="col-md-5">
              <q-select dense filled use-input label="Produto"  behavior="dialog" />
            </div>
            <div class="col-md-5">
              <q-select dense filled use-input label="Categoria" 
                behavior="dialog" />
            </div>
          </div>
          <q-table grid class="q-mt-xl">

          </q-table>
        </div>
        <!-- fim da segunda div ======================================================================== -->
      </div>
    </q-page-container>


    <q-page-container>
      <!-- aqui está o drawer que faremos para adicionar os novos clientes caso não existam -->
      <q-drawer show-above v-model="drawerCliente" side="right" overlay :width="800">
        <!-- drawer content -->
        <q-form>
          <q-input dense standout="bg-primary" label="Nome do cliente" />

          <div class="row justify-around">
            <div class="col-md-5">
              <q-btn dense filled color="primary" label="cadastrar" />
            </div>
            <div class="col-md-5">
              <q-btn dense filled color="secondary" label="cadastrar" @click="drawerCliente = false" />
            </div>
          </div>
        </q-form>
      </q-drawer>
    </q-page-container>
  </q-layout>
</template>

<script>
import * as CartConfig from './CaixaConfig/CartTableConfig';
// import { ref, watchEffect } from 'vue';
export default {
  setup() {


    // variáveis necessárias para as opreções do caixa

    /*const user = ref('') //onde será enviado o cliente selecionado
    let LisUser = ref([]); //onde estarão os clientes listados e com valo/id
    let cart = ref([])*/

    const menu = [
      {
        name: 'Dashboard',
        icon: 'fa-solid fa-chart-simple',
        route: '/dashboard'
      },
      {
        name: 'Novos Produtos',
        icon: 'fa-solid fa-folder',
        route: '/productsRegister'
      },
      {
        name: 'Produtos',
        icon: 'fa-solid fa-bag-shopping',
        route: '/allProducts'
      }
    ]



    return {
      CartConfig,
      menu,
    }
  }
}
</script>

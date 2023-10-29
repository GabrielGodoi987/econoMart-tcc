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
              <q-select filled use-input input-debounce="0" label="Clientes" v-model="client" :options="options"
                style="width: 250px" behavior="dialog">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Nenhum Cliente encontrado
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-md-1">
              <q-btn square icon="add" class="q-mt-md" />
            </div>
          </div>
          <!-- ------------------------------ -->
          <!-- lista o carrinho do cliente -->
          <q-table class="q-mt-xl" :columns="CartConfig.columns" :rows="rows">
          </q-table>
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

        <!-- aqui vamos listar os produtos e colocar ações para os mesmos -->
        <div class="col-md-6">
          <div class="row justify-around q-mb-xl">
          </div>
          <q-table grid :columns="products.columns" :rows="listProd">
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:item="props">
              <div class="q-pa-md">
              <q-card bordered flat>
                <q-card-section>
                  <div class="row justify-around">
                    <div class="col-md-5">
                      <q-input standout filled label="quantidade" type="number" />
                    </div>
                    <div class="col-md-4">
                      <q-btn rounded color="primary" icon="add" />
                    </div>
                  </div>
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
              </div>
            </template>
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
import axios from 'axios';
import * as CartConfig from './CaixaConfig/CartTableConfig';
import * as products from './CaixaConfig/productsConfig';
// import { watchEffect } from 'vue';
import { onMounted, ref, watch } from 'vue';
export default {
  setup() {


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


    const options = ref([])
    const client = ref('');
    const rows = ref([])

    async function getCustomer() {
      await axios.get(`http://localhost:3333/listAllClients`).then((res) => {
        const user = res.data.data;
        for (let i = 0; i < user.length; i++) {
          options.value.push(user[i].id);
        }
        console.log(client.value);
      });
    }


    async function getProduct(id) {
      try {
        const response = await axios.get(`http://localhost:3333/getCart/${id}/customer`);
        const data = response.data.data;
        rows.value = data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    const listProd = ref([])
    function getAllProducts() {
      axios.get('http://localhost:3333/listAll').then((res) => {
        const products = res.data.products;
        listProd.value = products
        console.log(products);
      })
    }

    onMounted(() => {
      getCustomer();
      getAllProducts();
    });

    watch(client, (newvalue) => {
      newvalue = client.value
      getProduct(newvalue);
    })


    return {
      CartConfig,
      products,
      menu,
      options,
      client,
      rows,
      listProd
    }
  }
}
</script>

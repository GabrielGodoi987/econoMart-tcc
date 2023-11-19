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
            <!-- botão para adicionar clientes -->
            <div class="col-md-1">
              <q-btn square icon="add" class="q-mt-md" @click="opnDrawer()" />
            </div>
          </div>
          <!-- ------------------------------ -->
          <!-- lista o carrinho do cliente -->
          <q-table class="q-mt-xl" :columns="CartConfig.columns" :rows="rows">
          </q-table>
          <div class="row justify-around q-mt-xl">
            <div class="col-md-5">
              <q-btn square label="Confirmar" color="primary" style="width: 100%;" />
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
                  <q-img :src="img" style="height: 250px;"/>
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
                  <q-separator />
                  <q-card-section>
                    <div class="row justify-around">
                      <div class="col-md-5">
                        <q-input standout filled label="quantidade" type="number" v-model="quantity" />
                      </div>
                      <div class="col-md-4">
                        <q-btn rounded color="primary" icon="add" @click="addTocart(props.row.id)" />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
        <!-- fim da segunda div ======================================================================== -->
      </div>
    </q-page-container>

    <q-page-container>
      <q-dialog v-model="compraModal">
        <q-card>
          <q-card-section classs="bg-secondary">
            <div class="text-h6">Confirmar Compra</div>
          </q-card-section>
          <q-card-section>
          </q-card-section>
          <q-card-actions>
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>


    <q-page-container>
      <!-- aqui está o drawer que faremos para adicionar os novos clientes caso não existam -->
      <q-drawer show-above v-model="drawerCliente" side="right" overlay :width="800">
        <!-- drawer content -->
        <q-form>
          <q-input dense standout="bg-primary" label="Nome do cliente" class="q-mt-md" v-model="custname" />
          <q-input dense standout="bg-primary" label="Email" class="q-mt-md" v-model="email" />
          <q-input dense standout="bg-primary" label="CPF" class="q-mt-md" v-model="cpf" />

          <div class="row justify-around q-mt-md">
            <div class="col-md-5 text-center">
              <q-btn dense filled color="primary" label="cadastrar" @click="createClient()" />
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
import { onMounted, ref, watch } from 'vue';
export default {
  setup() {
    const drawerCliente = ref(false);


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

    function opnDrawer() {
      drawerCliente.value = !drawerCliente.value;
    }


    const options = ref([])
    const client = ref('');
    const quantity = ref();
    const rows = ref([]);

    const custname = ref();
    const email = ref();
    const cpf = ref();
    async function createClient() {
      axios.post('http://localhost:3333/createClient', {
        custname: custname.value,
        email: email.value,
        cpf: cpf.value
      }).then((res) => {
        const data = res.data;
        custname.value = '';
        email.value = '';
        cpf.value = '';
        console.log(data);
      }).catch((err) => {
        console.log(err)
      })
    }


    async function getCustomer() {
      await axios.get(`http://localhost:3333/listAllClients`, {
      }).then((res) => {
        const user = res.data.data;
        for (let i = 0; i < user.length; i++) {
          options.value.push({ value: user[i].id, label: user[i].custname });
        }
      });
    }


    async function getProduct() {
      try {
        const response = await axios.get(`http://localhost:3333/getCart/${client.value.value}/customer`);
        const data = response.data.data;
        rows.value = data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    //listar todos os produtos
    const listProd = ref([]);
    const img = ref([]);
    function getAllProducts() {
      axios.get('http://localhost:3333/listAll').then((res) => {
        const products = res.data.products;
        const image = res.data.products;
        for(let i = 0; i < image.length; i++){
          img.value = image[i].imagen.nome;
        }
        listProd.value = products
        console.log(products)
      })
    }

    //adicionar ao carrinho
    async function addTocart(id) {
      await axios.post('http://localhost:3333/createCart', {
        id_product: id,
        id_customer: client.value.value,
        quantity: quantity.value
      }).then((res) => {
        const response = res.data.data
        quantity.value = ''
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }


    //montar components
    onMounted(() => {
      getCustomer();
      // setInterval(() => {
      getAllProducts();
      // }, 1500);
    });

    //assistir um component para todos os valores novos que ele tiver
    watch(client, (newvalue) => {
      newvalue = client.value
      if (newvalue == undefined) {
        // clearInterval(interval);
      } else {
        // Inicie um novo intervalo
        // var interval = setInterval(() => {
        getProduct(newvalue);
        // }, 1500);
      }
    })


    return {
      CartConfig,
      products,
      menu,
      options,
      client,
      rows,
      listProd,
      addTocart,
      quantity,
      drawerCliente,
      opnDrawer,
      createClient,
      custname,
      email,
      cpf,
      img
    }
  }
}
</script>

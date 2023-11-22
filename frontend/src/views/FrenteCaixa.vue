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
              <q-btn square icon="add" class="q-mt-md" @click="drawerCliente = !drawerCliente" />
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
            <template v-slot:item="props">
              <div class="q-pa-md">
                <q-card bordered flat>
                  <q-img :src="props.row.imagen.nome" height="200px" />
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
      <q-dialog show-above v-model="drawerCliente" side="right" overlay :width="800">
        <!-- drawer content -->
        <q-card>
          <q-card-section class="bg-primary text-center text-white">
            <div class="text-h5">Cadastre um novo Cliente</div>
          </q-card-section>
          <q-card-section class="justify-center q-mt-lg">
            <q-form>
              <input name="Image" type="file" @change="NewFile" />
              <q-input dense standout="bg-primary" label="Nome do cliente" class="q-mt-md" v-model="custname" />
              <q-input dense standout="bg-primary" label="Email" class="q-mt-md" v-model="email" />
              <q-input dense standout="bg-primary" label="CPF" class="q-mt-md" v-model="cpf" />

              <div class="row justify-around q-mt-md">
                <div class="col-md-5 text-center">
                  <q-btn dense filled color="primary" label="cadastrar" @click="createClient()" />
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import * as CartConfig from './CaixaConfig/CartTableConfig';
import * as products from './CaixaConfig/productsConfig';
import { onMounted, ref, watch } from 'vue';
import { Notify } from 'quasar';
export default {
  setup() {
    const drawerCliente = ref(false);

    const menu = [
      {
        name: 'Novos Produtos',
        icon: 'fa-solid fa-folder',
        route: '/productsRegister'
      },
      {
        name: 'Produtos',
        icon: 'fa-solid fa-bag-shopping',
        route: '/allProducts'
      },
      {
        name: 'Clientes',
        icon: 'fa-solid fa-user',
        route: '/Costumers'
      }
    ]
    const options = ref([])
    const client = ref('');
    const quantity = ref();
    const rows = ref([]);


    const custname = ref('');
    const email = ref('');
    const cpf = ref('');


    //função complementar para fazer upload de imagens e cadastrar um cliente novo
    const formdata = new FormData();
    const userImage = ref('');
    function NewFile(event) {
      let file = event.target.files[0];
      userImage.value = file;
      formdata.append('Image', userImage.value);
      console.log(userImage.value);
    }
    // requisição para criar cliente e fazer upload de images com a função acima
    async function createClient() {
      formdata.append('custname', custname.value);
      formdata.append('email', email.value);
      formdata.append('cpf', cpf.value);

      axios.post('http://localhost:3333/createClient', formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((res) => {
        const data = res.data;
        Notify.create({
          message: 'Usuário criado com sucesso',
          color: 'positive',
          position: 'top'
        });
        drawerCliente.value = false;
        custname.value = '';
        email.value = '';
        cpf.value = '';
        userImage.value = '';
        console.log(data);
      }).catch((err) => {
        Notify.create({
          message: err.message,
          color: 'negative',
          position: 'bottom'
        })
        console.log(err);
      })
    }

    //Lista todos os cliente e coloca dentro de um q-select para serem buscados em uma requisição get pelo seu id
    async function getCustomer() {
      await axios.get(`http://localhost:3333/listAllClients`, {
      }).then((res) => {
        const user = res.data.data;
        for (let i = 0; i < user.length; i++) {
          options.value.push({ value: user[i].id, label: user[i].custname });
        }
      });
    }

    //seleciona os produtos de acordo com o id do cliente
    async function getProduct() {
      try {
        const response = await axios.get(`http://localhost:3333/getCart/${client.value.value}/customer`);
        const data = response.data.data;
        rows.value = data;
        console.log(rows.value);
        console.log()
      } catch (error) {
        console.log(error);
      }
    }

    //listar todos os produtos e coloca ao lado para serem adicionados
    const listProd = ref([]);
    const img = ref([]);
    function getAllProducts() {
      axios.get('http://localhost:3333/listAll').then((res) => {
        const Products = res.data.products;
        listProd.value = Products
        console.log(Products)
      }).catch((err) => {
        console.log(err)
      })
    }

    //adicionar ao carrinho do cliente de acordo com o seu id
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
      getAllProducts();
    });

    //assistir um component para todos os valores novos que ele tiver
    watch(client, (newvalue) => {
      newvalue = client.value
      if (newvalue == undefined) {
        clearInterval(interval);
      } else {
        // Inicie um novo intervalo
        var interval = setInterval(() => {
          getProduct(newvalue);
        }, 1000);
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
      createClient,
      custname,
      email,
      cpf,
      img,
      NewFile
    }
  }
}
</script>

<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="home-card" elevation="8">
            <!-- Logo e Título -->
            <div class="text-center pt-6">
              <img src="@/assets/logo.png" alt="Logo do Site" height="80">
              <h1 class="text-h4 font-weight-bold green-darken-2--text mt-2">TreeAnalytics</h1>
            </div>

            <v-card-text>
              <!-- Botão para incluir uma nova espécie -->
              <v-btn color="green-darken-2" block class="mb-4" @click="goToIncluirEspecie">
                Incluir Espécie
              </v-btn>

              <div class="list_especies">
                <!-- Lista de espécies cadastradas -->
                <div v-for="(especie, index) in especies" :key="index" class="especie-item">
                  <div class="d-flex justify-space-between align-center">
                    <span>{{ especie.nome_cientifico }}</span>
                    <div>
                      <v-btn icon @click="goToEditarEspecie(especie.id)">
                        <img src="@/assets/icons/editar.svg" alt="Editar espécie" height="20">
                      </v-btn>
                      <v-btn icon @click="excluirEspecie(especie.id)" class="ml-2">
                        <img src="@/assets/icons/delete.svg" alt="Editar espécie" height="20">
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-footer app>
        <v-spacer></v-spacer>
        <div>
          Nome: {{ user.nome }} | Email: {{ user.email }}
        </div>
        <button class="button_loggout" @click="loggout()">Sair</button>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.store';
import endpoints from '@/controllers/Endpoints.controller';
import router from '@/router';

const userStore = useUserStore()
let user = ref(false)
setTimeout(async () => {
  user.value = await userStore.getUserData()
}, 100)

let especies = ref([])

setTimeout(async () => {
  especies.value = await endpoints.getEspecies();
}, 100)

const goToIncluirEspecie = () => {
  // Redireciona para a tela de inclusão de espécie
  router.push('/cadastraEspecie')
}

const goToEditarEspecie = (id) => {
  // Redireciona para a tela de edição da espécie
  this.$router.push(`/editar-especie/${id}`)
}

const excluirEspecie = async (id) => { 
  await endpoints.excluirEspecie(id);
  especies.value = await endpoints.getEspecies();
}

const loggout = () => {
  userStore.logout()
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, var(--tertiary-color) 100%);
}

.home-card {
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 24px;
}
.especie-item {
  background: #d9d9d947;
  margin: 10px 0;
  padding: 10px;
  border-radius: 15px;
}
.especie-item:hover {
  filter: brightness(0.9);
  cursor: pointer;
}
.button_loggout {
  background: var(--tertiary-color);
  margin: 0px 10px 0;
  padding: 5px 15px;
  border-radius: 15px !important;
  transition: all 0.3s;
}
.button_loggout:hover {
  filter: brightness(0.8);
}
.list_especies {
  max-height: 400px;
  overflow: auto;
}
</style>

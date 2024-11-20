<template>
    <v-app>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="home-card" elevation="8">
              <!-- Logo, Nome da Empresa e Botão de Voltar -->
              <div class="d-flex align-center justify-space-between pt-4 pl-4 pr-4">
                <div class="d-flex align-center">
                  <img src="@/assets/logo.png" alt="Logo do Site" height="40">
                  <h1 class="text-h5 font-weight-bold green-darken-2--text ml-2">TreeAnalytics</h1>
                </div>
                <v-btn icon @click="goBack">
                    <img src="@/assets/icons/voltar.svg" alt="Editar espécie" height="25">
                </v-btn>
              </div>
  
              <v-card-text>
                <v-form @submit.prevent="handleSubmit">
                  <!-- Campo para o nome da espécie -->
                  <v-text-field
                    v-model="especie.nome_cientifico"
                    label="Nome da Espécie"
                    variant="outlined"
                    prepend-inner-icon="mdi-leaf"
                    required
                  ></v-text-field>
  
                  <!-- Campo para a descrição da espécie -->
                  <v-textarea
                    v-model="especie.descricao"
                    label="Descrição da Espécie"
                    variant="outlined"
                    prepend-inner-icon="mdi-text"
                    required
                  ></v-textarea>
  
                  <!-- Botão para salvar -->
                  <v-btn type="submit" color="green-darken-2" block class="mt-4">
                    Salvar Espécie
                  </v-btn>
                </v-form>
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
  
  const especie = ref({
    nome_cientifico: '',
    descricao: ''
  })
  
  const handleSubmit = async () => {
    try {
      let res = await endpoints.cadastrarEspecie(especie.value)
      if(res){
          router.push('/home')
      }
    } catch (error) {
      console.error("Erro ao cadastrar espécie:", error)
    }
  }
  
  const goBack = () => {
    // Redireciona para a página anterior
    router.back()
  }
  
  const loggout = () => {
    userStore.logout()
    router.push('/login')
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
  </style>
  
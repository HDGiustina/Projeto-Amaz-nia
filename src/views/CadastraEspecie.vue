<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="home-card" elevation="8">
            <!-- Logo, Nome da Empresa e Botão de Voltar -->
            <div
              class="d-flex align-center justify-space-between pt-4 pl-4 pr-4"
            >
              <div class="d-flex align-center">
                <img src="@/assets/logo.png" alt="Logo do Site" height="40" />
                <h1 class="text-h5 font-weight-bold green-darken-2--text ml-2">
                  TreeAnalytics
                </h1>
              </div>
              <v-btn icon @click="goBack">
                <img src="@/assets/icons/voltar.svg" alt="Voltar" height="25" />
              </v-btn>
            </div>

            <v-card-text>
              <v-form @submit.prevent="handleSubmit" class="form_cadEspecie">
                <!-- Campo para o nome da espécie -->
                <v-text-field
                  v-model="especie.nome_cientifico"
                  :rules="[(v) => !!v || 'Nome da Espécie é obrigatório']"
                  label="Nome da Espécie"
                  variant="outlined"
                  prepend-inner-icon="mdi-leaf"
                  required
                ></v-text-field>

                <!-- Campo para a descrição da espécie -->
                <v-textarea
                  v-model="especie.descricao"
                  :rules="[(v) => !!v || 'Descrição da Espécie é obrigatória']"
                  label="Descrição da Espécie"
                  variant="outlined"
                  prepend-inner-icon="mdi-text"
                  required
                ></v-textarea>

                <!-- Campo para a imagem da espécie -->
                <v-file-input
                  v-model="especie.imagem"
                  :rules="[
                    (v) => !!v || 'Imagem é obrigatória',
                    validateImageSize,
                  ]"
                  label="Imagem da Espécie"
                  variant="outlined"
                  prepend-inner-icon="mdi-image"
                  prepend-icon="mdi-camera"
                  accept="image/*"
                  required
                  @change="convertImageToBase64"
                ></v-file-input>

                <!-- Pré-visualização da imagem -->
                <div v-if="especie.imagemBase64" class="image-preview">
                  <img
                    :src="especie.imagemBase64"
                    alt="Pré-visualização da imagem"
                  />
                </div>

                <!-- Botão para salvar -->
                <v-btn type="submit" color="green-darken-2" block class="mt-4">
                  Salvar Espécie
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="3000"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import endpoints from "@/controllers/Endpoints.controller";
import router from "@/router";

const userStore = useUserStore();
let user = ref(false);
setTimeout(async () => {
  user.value = await userStore.getUserData();
}, 100);

const especie = ref({
  nome_cientifico: "",
  descricao: "",
  imagem: null,
  imagemBase64: "",
});

const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

const validateImageSize = (v) => {
  if (!v) return "Imagem é obrigatória";
  if (v[0].size > 2000000) return `A imagem deve ser menor que 2MB`;
  return true;
};

const convertImageToBase64 = (event) => {
  const file = event.target.files[0];
  if (file && file.size < 2000000) {
    const reader = new FileReader();
    reader.onloadend = () => {
      especie.value.imagemBase64 = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    especie.value.imagemBase64 = false;
  }
};

const handleSubmit = async () => {
  if (
    especie.value.nome_cientifico &&
    especie.value.descricao &&
    especie.value.imagemBase64
  ) {
    try {
      let res = await endpoints.cadastrarEspecie({
        nome_cientifico: especie.value.nome_cientifico,
        descricao: especie.value.descricao,
        imagem: especie.value.imagemBase64,
      });
      if (res) {
        snackbar.value.text = "Espécie cadastrada com sucesso!";
        snackbar.value.color = "success";
        snackbar.value.show = true;
        setTimeout(() => {
          router.push(`/home`);
        }, 1000);
      }
    } catch (error) {
      snackbar.value.text = "Erro ao cadastrar espécie";
      snackbar.value.color = "error";
      snackbar.value.show = true;
      console.error("Erro ao cadastrar espécie:", error);
    }
  } else {
    snackbar.value.text = "Complete todos os campos corretamente!";
    snackbar.value.color = "warning";
    snackbar.value.show = true;
    console.error("Todos os campos são obrigatórios.");
  }
};

const goBack = () => {
  // Redireciona para a página anterior
  router.back();
};

const loggout = () => {
  userStore.logout();
  router.push("/login");
};
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

.form_cadEspecie .v-text-field {
  margin: 0 0 15px;
}

.image-preview {
  margin-top: 10px;
  text-align: center;
}
.image-preview img {
  max-width: 100%;
  max-height: 200px;
  height: auto;
  border-radius: 8px;
}
</style>

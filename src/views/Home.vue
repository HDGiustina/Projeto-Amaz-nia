<template>
  <v-app>
    <v-app-bar app color="green-darken-2" dark elevation="4">
      <v-toolbar-title class="text-h5 font-weight-bold d-flex align-center">
        <v-icon icon="mdi-tree" class="mr-2"></v-icon>
        TreeAnalytics
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{
          isDarkTheme ? "mdi-weather-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="green-lighten-1">
              <span class="text-white">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="mb-2">
            <v-list-item-title>{{ user.nome }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon icon="mdi-logout" class="mr-2"></v-icon>
              Sair
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="fill-height">
      <v-container fluid class="fill-height">
        <v-row no-gutters align="stretch" justify="center" class="fill-height">
          <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
            class="fill-height d-flex flex-column"
          >
            <v-card class="flex-grow-1 ma-4 rounded-lg" elevation="8">
              <v-card-title
                class="text-h4 font-weight-bold pb-0 pt-6 text-center green-darken-2--text"
              >
                Espécies Cadastradas
              </v-card-title>

              <v-card-text>
                <v-btn
                  color="green-darken-2"
                  block
                  class="mb-6 mt-4"
                  @click="goToIncluirEspecie"
                  prepend-icon="mdi-plus"
                  elevation="2"
                  rounded
                >
                  Incluir Nova Espécie
                </v-btn>

                <v-slide-y-transition group>
                  <div>
                    <template v-if="loadingEspecies">
                      <v-list class="especies-list rounded-lg" elevation="2">
                        <v-list-item
                          v-for="index in 5"
                          :key="'skeleton-' + index"
                          class="mb-2 rounded"
                        >
                          <template v-slot:prepend>
                            <v-skeleton-loader
                              type="avatar"
                              class="mr-3"
                            ></v-skeleton-loader>
                          </template>
                          <v-skeleton-loader
                            type="text"
                            class="flex-grow-1"
                          ></v-skeleton-loader>
                        </v-list-item>
                      </v-list>
                    </template>
                    <v-list
                      v-else-if="especies && especies.length"
                      class="especies-list rounded-lg"
                      elevation="2"
                    >
                      <v-list-item
                        v-for="especie in especies"
                        :key="especie.id"
                        :title="especie.nome_cientifico"
                        class="mb-2 rounded"
                      >
                        <template v-slot:prepend>
                          <v-avatar size="48" class="mr-3">
                            <v-img
                              :src="especie.imagem"
                              :alt="especie.nome_cientifico"
                              cover
                            ></v-img>
                          </v-avatar>
                        </template>

                        <template v-slot:append>
                          <v-btn
                            icon="mdi-pencil"
                            variant="text"
                            color="green-darken-1"
                            @click="goToEditarEspecie(especie.id)"
                          ></v-btn>
                          <v-btn
                            icon="mdi-delete"
                            variant="text"
                            color="red-darken-1"
                            @click="confirmarExclusao(especie)"
                          ></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                    <v-sheet
                      v-else
                      class="d-flex align-center justify-center fill-height rounded-lg pa-6"
                      color="grey-lighten-4"
                    >
                      <div class="text-center">
                        <v-icon
                          icon="mdi-tree-outline"
                          size="64"
                          color="green-lighten-2"
                        ></v-icon>
                        <div class="text-h5 mt-4 green-darken-2--text">
                          Nenhuma espécie cadastrada
                        </div>
                        <div class="text-body-1 mt-2">
                          Comece adicionando uma nova espécie!
                        </div>
                        <v-btn
                          color="green-darken-2"
                          class="mt-4"
                          prepend-icon="mdi-plus"
                          @click="goToIncluirEspecie"
                        >
                          Adicionar Espécie
                        </v-btn>
                      </div>
                    </v-sheet>
                  </div>
                </v-slide-y-transition>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialogExclusao" max-width="400">
      <v-card class="rounded-lg pa-2">
        <v-card-title class="text-h5">Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir a espécie "{{
            especieParaExcluir?.nome_cientifico
          }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="dialogExclusao = false"
            >Cancelar</v-btn
          >
          <v-btn color="red-darken-1" variant="text" @click="excluirEspecie"
            >Excluir</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      rounded="pill"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar.show = false"
          >Fechar</v-btn
        >
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useTheme } from "vuetify";
import endpoints from "@/controllers/Endpoints.controller";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const theme = useTheme();

const user = ref({});
const especies = ref([]);
const loadingEspecies = ref(true);
const dialogExclusao = ref(false);
const especieParaExcluir = ref(null);
const drawer = ref(false);
const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

const isDarkTheme = computed(() => theme.global.current.value.dark);

const userInitials = computed(() => {
  if (user.value.nome) {
    return user.value.nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }
  return "";
});

onMounted(async () => {
  user.value = await userStore.getUserData();
  await carregarEspecies();
});

const carregarEspecies = async () => {
  try {
    loadingEspecies.value = true;
    let res = await endpoints.getEspecies();
    if(res){
      especies.value = res
    }
  } catch (error) {
    console.error("Erro ao carregar espécies:", error);
    showSnackbar("Erro ao carregar espécies", "error");
  } finally {
    loadingEspecies.value = false;
  }
};

const goToIncluirEspecie = () => {
  router.push("/cadastraEspecie");
};

const goToEditarEspecie = (id) => {
  router.push(`/editarEspecie/${id}`);
};

const confirmarExclusao = (especie) => {
  especieParaExcluir.value = especie;
  dialogExclusao.value = true;
};

const excluirEspecie = async () => {
  try {
    await endpoints.excluirEspecie(especieParaExcluir.value.id);
    await carregarEspecies();
    dialogExclusao.value = false;
    showSnackbar("Espécie excluída com sucesso", "success");
  } catch (error) {
    console.error("Erro ao excluir espécie:", error);
    showSnackbar("Erro ao excluir espécie", "error");
  }
};

const logout = () => {
  userStore.logout();
  router.push("/login");
};

const showSnackbar = (text, color) => {
  snackbar.value = { show: true, text, color };
};

const toggleTheme = () => {
  theme.global.name.value = isDarkTheme.value ? "light" : "dark";
};
</script>

<style scoped>
/* .fill-height {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--v-theme-surface) 0%,
    var(--v-theme-secondary) 100%
  );
} */

.especies-list {
  max-height: calc(100vh);
  overflow-y: auto;
}
</style>

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
              <v-list >
                <v-list-item
                  v-for="(item, index) in menuItems"
                  :key="index"
                  :to="item.route"
                  class="list_item"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-footer app>
        <v-spacer></v-spacer>
        <div>
          Nome: {{ user.name }} | Email: {{ user.email }}
        </div>
        <button>Sair</button>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/user.store';

export default defineComponent({
  name: 'Home',
  setup() {
    const userStore = useUserStore()
    const user = userStore.user

    const menuItems = [
      { title: 'Cadastro de Árvore', route: '/cadastro' },
      { title: 'Lista de Árvores', route: '/lista' }
    ]

    return {
      user,
      menuItems
    }
  }
})
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #8ce49247 100%);
}

.home-card {
  border-radius: 16px;
  backdrop-filter: blur(10px);
  padding: 24px;
}
.list_item {
  background: var(--tertiary-color);
  margin: 10px 0 0 ;
  border-radius: 15px !important;
}
</style>

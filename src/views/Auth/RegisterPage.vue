<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="register-card" elevation="8">
          <!-- Logo and Title Section -->
          <div class="text-center pt-6">
            <v-icon icon="mdi-tree" color="green-darken-2" size="64"></v-icon>
            <h1 class="text-h4 font-weight-bold green-darken-2--text mt-2">TreeAnalytics</h1>
            <p class="text-subtitle-1 text-medium-emphasis">Crie sua conta no portal de análise arbórea</p>
          </div>

          <v-card-text>
            <v-form @submit.prevent="handleRegister" ref="form">
              <!-- Name Field -->
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Nome completo"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                class="mb-2"
                required
              ></v-text-field>

              <!-- Email Field -->
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                class="mb-2"
                required
              ></v-text-field>

              <!-- Password Field -->
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                label="Senha"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                required
                @click:append-inner="showPassword = !showPassword"
              ></v-text-field>

              <!-- Confirm Password Field -->
              <v-text-field
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showConfirmPassword ? 'text' : 'password'"
                label="Confirmar senha"
                prepend-inner-icon="mdi-lock-check"
                variant="outlined"
                required
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
              ></v-text-field>

              <!-- Register Button -->
              <v-btn
                type="submit"
                color="green-darken-2"
                size="large"
                block
                :loading="loading"
                elevation="2"
                class="mt-5"
              >
                Registrar
                <v-icon icon="mdi-account-plus" end></v-icon>
              </v-btn>
            </v-form>
          </v-card-text>

          <!-- Login Link -->
          <v-card-text class="text-center pt-2">
            Já tem uma conta?
            <v-btn
              variant="text"
              color="green-darken-2"
              class="ml-1"
              @click="goToLogin"
            >
              Entrar
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import endpoints from '@/controllers/Endpoints.controller';

const router = useRouter();

// Form refs and reactive variables
const form = ref(null);
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);

// Validation rules
const nameRules = [
  v => !!v || 'Nome é obrigatório',
  v => v.length >= 2 || 'Nome deve ter no mínimo 2 caracteres'
];

const emailRules = [
  v => !!v || 'Email é obrigatório',
  v => /.+@.+\..+/.test(v) || 'Email precisa ser válido'
];

const passwordRules = [
  v => !!v || 'Senha é obrigatória',
  v => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres'
];

const confirmPasswordRules = [
  v => !!v || 'Confirmar senha é obrigatório',
  v => v === password.value || 'As senhas não coincidem'
];

// Snackbar state
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
});

// Register handler
const handleRegister = async () => {
  const { valid } = await form.value.validate();
  
  if (!valid) return;
  
  loading.value = true;
  
  try {
    // Simulated API call
    let res = await endpoints.register({
      nome: name.value,
      email: email.value,
      senha: password.value
    });

    console.log(res);
    if (res) {
      snackbar.text = 'Registro realizado com sucesso!';
      snackbar.color = 'success';
      snackbar.show = true;
      setTimeout(() => router.push('/login'), 1500);
    } else {
      snackbar.text = 'Erro ao realizar registro. Tente novamente.';
      snackbar.color = 'error';
      snackbar.show = true;
    }
  } catch (error) {
    snackbar.text = 'Erro ao realizar registro. Tente novamente.';
    snackbar.color = 'error';
    snackbar.show = true;
  } finally {
    loading.value = false;
  }
};

// Navigation handler
const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.register-card {
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

/* Add responsive padding */
@media (max-width: 600px) {
  .v-card-text {
    padding: 16px;
  }
}

@media (min-width: 601px) {
  .v-card-text {
    padding: 24px;
  }
}
</style>
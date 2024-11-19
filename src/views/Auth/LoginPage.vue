<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="login-card" elevation="8">
          <!-- Logo and Title Section -->
          <div class="text-center pt-6">
            <v-icon icon="mdi-tree" color="green-darken-2" size="64"></v-icon>
            <h1 class="text-h4 font-weight-bold green-darken-2--text mt-2">TreeAnalytics</h1>
            <p class="text-subtitle-1 text-medium-emphasis">Bem-vindo ao seu portal de análise arbórea</p>
          </div>

          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="form">
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

              <!-- Remember Me & Forgot Password -->
              <div class="d-flex justify-space-between align-center mb-6">
                <v-checkbox
                  v-model="rememberMe"
                  label="Lembrar-me"
                  color="green-darken-2"
                  hide-details
                ></v-checkbox>
                <v-btn
                  variant="text"
                  color="green-darken-2"
                  class="text-caption"
                  @click="forgotPassword"
                >
                  Esqueceu a senha?
                </v-btn>
              </div>

              <!-- Login Button -->
              <v-btn
                type="submit"
                color="green-darken-2"
                size="large"
                block
                :loading="loading"
                elevation="2"
              >
                Entrar
                <v-icon icon="mdi-login" end></v-icon>
              </v-btn>

              <!-- Divider -->
              <div class="my-4 text-center">
                <v-divider class="my-3">
                  <span class="text-medium-emphasis">ou</span>
                </v-divider>
              </div>
            </v-form>
          </v-card-text>

          <!-- Register Link -->
          <v-card-text class="text-center pt-2">
            Não tem uma conta?
            <v-btn
              variant="text"
              color="green-darken-2"
              class="ml-1"
              @click="goToRegister"
            >
              Registre-se
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

// Form refs and reactive variables
const form = ref(null);
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const loading = ref(false);

// Validation rules
const emailRules = [
  v => !!v || 'Email é obrigatório',
  v => /.+@.+\..+/.test(v) || 'Email precisa ser válido'
];

const passwordRules = [
  v => !!v || 'Senha é obrigatória',
  v => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres'
];

// Snackbar state
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
});

// Login handler
const handleLogin = async () => {
  const { valid } = await form.value.validate();
  
  if (!valid) return;
  
  loading.value = true;
  
  try {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add your actual login logic here
    console.log('Login attempt:', {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value
    });
    
    snackbar.text = 'Login realizado com sucesso!';
    snackbar.color = 'success';
    snackbar.show = true;
  } catch (error) {
    snackbar.text = 'Erro ao realizar login. Tente novamente.';
    snackbar.color = 'error';
    snackbar.show = true;
  } finally {
    loading.value = false;
  }
};

// Social login handler
const socialLogin = (provider) => {
  console.log(`Login with ${provider}`);
  // Implement social login logic
};

// Navigation handlers
const goToRegister = () => {
  console.log('Navigate to register page');
  // Implement navigation logic
};

const forgotPassword = () => {
  console.log('Navigate to forgot password page');
  // Implement forgot password logic
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.login-card {
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
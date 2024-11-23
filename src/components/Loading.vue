<template>
  <div v-if="loading" class="loading-card">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped>
.loading-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  border-top-color: var(--dark-color);
  animation: spin 1s ease-in-out infinite;
  margin: 60px 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

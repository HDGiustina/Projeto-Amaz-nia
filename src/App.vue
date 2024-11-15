<script setup>

</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter {
  opacity: 0.2;
}

.fade-enter-active{
  animation: fadeInOut 1s;
}

.fade-leave-to {
  opacity: 0.2;
}
@keyframes fadeInOut {
  0% {
    opacity: 0.2;
  } 
  100% {
    opacity: 1;
  }
}
</style>

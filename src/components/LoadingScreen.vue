<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  loading: boolean;
}>();

const emit = defineEmits(['loaded']);

const progress = ref(0);
const intervalId = ref<number | null>(null);

onMounted(() => {
  if (props.loading) {
    startLoading();
  }
});

const startLoading = () => {
  intervalId.value = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.floor(Math.random() * 10) + 1;
      if (progress.value > 100) progress.value = 100;
    } else {
      if (intervalId.value) {
        clearInterval(intervalId.value);
        setTimeout(() => {
          emit('loaded');
        }, 500);
      }
    }
  }, 200) as unknown as number;
};
</script>

<template>
  <div 
    v-if="loading" 
    class="fixed inset-0 bg-crypto-darker z-50 flex flex-col items-center justify-center"
  >
    <div class="w-full max-w-md px-4">
      <div class="flex flex-col items-center space-y-6">
        <div class="loading-icon">
          <div class="w-24 h-24 border-8 border-crypto-blue border-t-crypto-purple rounded-full animate-spin"></div>
        </div>
        
        <h1 class="text-3xl font-bold mb-4 ">CryptoChain</h1>
        
        <div class="w-full bg-crypto-dark rounded-full h-4 mb-6">
          <div 
            class="h-4 rounded-full bg-gradient-to-r from-crypto-blue to-crypto-purple transition-all duration-300" 
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        
        <p class="text-crypto-gray text-lg">
          {{ progress === 100 ? 'Blockchain Ready!' : 'Initializing Blockchain...' }}
        </p>
        
        <div class="loading-particles">
          <div 
            v-for="i in 20" 
            :key="i"
            class="particle absolute w-2 h-2 rounded-full"
            :class="`particle-${i}`"
            :style="{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              backgroundColor: i % 2 === 0 ? '#00BFFF' : '#8A2BE2',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 8 + 4}s`
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.particle {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-50px) translateX(20px);
  }
  50% {
    transform: translateY(-15px) translateX(-20px);
  }
  75% {
    transform: translateY(-35px) translateX(30px);
  }
}
</style>
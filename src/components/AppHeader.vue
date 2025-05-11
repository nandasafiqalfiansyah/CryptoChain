<script setup lang="ts">
import { ref } from 'vue';

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-10 backdrop-blur-lg bg-crypto-darker/80 border-b border-crypto-blue/20">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-blue-purple-gradient flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold bg-transparent text-white">CryptoChain</h1>
        </div>
        
        <div class="hidden md:flex items-center space-x-6">
          <a href="#" class="text-white hover:text-crypto-blue transition-colors">Home</a>
          <a href="#blocks" class="text-white hover:text-crypto-blue transition-colors">Blocks</a>
          <a href="#about" class="text-white hover:text-crypto-blue transition-colors">About</a>
          <a href="https://github.com/nandasafiqalfiansyah/web-blockhain" target="_blank" class="text-white hover:text-crypto-blue transition-colors">
            GitHub
          </a>
        </div>
        
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-white focus:outline-none">
            <svg v-if="!showMenu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div v-if="showMenu" class="md:hidden mt-4 py-4 border-t border-crypto-blue/20 animate-fadeIn">
        <div class="flex flex-col space-y-4">
          <a href="#" class="text-white hover:text-crypto-blue transition-colors">Home</a>
          <a href="#blocks" class="text-white hover:text-crypto-blue transition-colors">Blocks</a>
          <a href="#about" class="text-white hover:text-crypto-blue transition-colors">About</a>
          <a href="https://github.com/yourusername/crypto-blockchain-generator" target="_blank" class="text-white hover:text-crypto-blue transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
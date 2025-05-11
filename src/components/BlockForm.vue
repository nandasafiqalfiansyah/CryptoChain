<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['addBlock']);
const blockData = ref('');
const isLoading = ref(false);

const addBlock = () => {
  if (blockData.value.trim() === '') return;
  
  isLoading.value = true;
  
  // Simulate mining time
  setTimeout(() => {
    emit('addBlock', blockData.value);
    blockData.value = '';
    isLoading.value = false;
  }, 1000);
};
</script>

<template>
  <div class="glass-card p-6 mb-8">
    <h2 class="text-2xl font-bold mb-6 bg-transparent text-white">Add New Block</h2>
    
    <div class="mb-4">
      <label for="blockData" class="block text-sm font-medium text-crypto-gray mb-2">
        Block Data
      </label>
      <textarea
        id="blockData"
        v-model="blockData"
        rows="3"
        class="w-full bg-crypto-darker border border-crypto-blue/20 rounded-lg p-3 text-white focus:ring-2 focus:ring-crypto-blue/50 focus:border-transparent"
        placeholder="Enter data for your new block..."
      ></textarea>
    </div>
    
    <button
      @click="addBlock"
      :disabled="blockData.trim() === '' || isLoading"
      class="w-full bg-blue-purple-gradient text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      <span v-if="isLoading" class="mr-2">
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
      <span>{{ isLoading ? 'Mining Block...' : 'Mine New Block' }}</span>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['addBlock', 'clearAllBlocks']);
const blockData = ref('');
const isLoading = ref(false);
const isClearing = ref(false);

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

const clearAllBlocks = () => {
  if (!confirm('Are you sure you want to reset the blockchain? All blocks except Genesis will be deleted.')) {
    return;
  }
  
  isClearing.value = true;
  emit('clearAllBlocks');
  isClearing.value = false;
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
      class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

  <div class="glass-card p-6 mb-8">
    <h2 class="text-2xl font-bold mb-6 bg-transparent text-white">Danger Zone</h2>
    <button
      @click="clearAllBlocks"
      :disabled="isClearing"
      class="w-full bg-gradient-to-r from-red-500 via-red-600 to-rose-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-red-500/20"
    >
      <span v-if="isClearing" class="mr-2">
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
      <span v-else class="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </span>
      <span>{{ isClearing ? 'Resetting...' : 'Reset Blockchain' }}</span>
    </button>
    <p class="mt-3 text-sm text-crypto-gray">
      Warning: This will permanently delete all blocks and reset to genesis block.
    </p>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(56, 182, 255, 0.2);
}

.bg-crypto-darker {
  background-color: #0f172a;
}

.text-crypto-gray {
  color: #94a3b8;
}

.border-crypto-blue\/20 {
  border-color: rgba(30, 64, 175, 0.2);
}

.focus\:ring-crypto-blue\/50:focus {
  --tw-ring-color: rgba(30, 64, 175, 0.5);
}
</style>
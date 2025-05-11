<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Block } from '../utils/Blockchain';

const props = defineProps<{
  block: Block;
  isLast: boolean;
}>();

const expanded = ref(false);

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const blockClass = computed(() => {
  return {
    'border-crypto-green': props.block.index === 0,
    'border-crypto-blue': props.block.index !== 0 && !props.isLast,
    'border-crypto-purple': props.isLast && props.block.index !== 0,
  };
});

const headerClass = computed(() => {
  if (props.block.index === 0) return 'bg-crypto-green/20';
  if (props.isLast) return 'bg-crypto-purple/20';
  return 'bg-crypto-blue/20';
});

const truncateHash = (hash: string) => {
  if (!hash) return '';
  if (hash.length <= 15) return hash;
  return `${hash.substring(0, 10)}...${hash.substring(hash.length - 5)}`;
};
</script>

<template>
  <div 
    class="block-card mb-8 border-l-4 transform transition-all duration-500 hover:scale-102"
    :class="blockClass"
  >
    <div 
      class="flex justify-between items-center p-3 rounded-t-lg cursor-pointer"
      :class="headerClass"
      @click="toggleExpand"
    >
      <div class="flex items-center">
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold"
          :class="[
            props.block.index === 0 ? 'bg-crypto-green text-black' : 
            props.isLast ? 'bg-crypto-purple text-white' : 'bg-crypto-blue text-white'
          ]"
        >
          {{ block.index }}
        </div>
        <h3 class="text-xl font-semibold bg-transparent">
          {{ block.index === 0 ? 'Genesis Block' : `Block #${block.index}` }}
        </h3>
      </div>
      <div class="flex items-center">
        <span class="text-xs text-crypto-gray mr-2">{{ block.getFormattedDate() }}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-5 h-5 transform transition-transform duration-300"
          :class="{ 'rotate-180': expanded }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
    
    <div 
      class="p-4 overflow-hidden transition-all duration-500 ease-in-out"
      :class="{ 'max-h-0 p-0': !expanded, 'max-h-96': expanded }"
    >
      <div v-if="expanded" class="pt-2 space-y-4 animate-fadeIn">
        <div>
          <label class="block text-crypto-gray text-sm mb-1">Data:</label>
          <div class="p-3 bg-crypto-darker rounded-md font-medium text-white">
            {{ block.data }}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-crypto-gray text-sm mb-1">Nonce:</label>
            <div class="p-2 bg-crypto-darker rounded-md font-mono">
              {{ block.nonce }}
            </div>
          </div>
          
          <div>
            <label class="block text-crypto-gray text-sm mb-1">Timestamp:</label>
            <div class="p-2 bg-crypto-darker rounded-md font-mono">
              {{ block.timestamp }}
            </div>
          </div>
        </div>
        
        <div>
          <label class="block text-crypto-gray text-sm mb-1">Previous Hash:</label>
          <div 
            class="p-2 bg-crypto-darker rounded-md hash-text overflow-x-auto"
            :title="block.previousHash"
          >
            {{ block.index === 0 ? '0' : block.previousHash }}
          </div>
        </div>
        
        <div>
          <label class="block text-crypto-gray text-sm mb-1">Hash:</label>
          <div 
            class="p-2 bg-crypto-darker rounded-md hash-text text-crypto-blue overflow-x-auto"
            :title="block.hash"
          >
            {{ block.hash }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Visual connection line to next block -->
    <div v-if="!isLast" class="w-0.5 h-8 bg-gradient-to-b from-crypto-blue to-transparent mx-auto"></div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.scale-102:hover {
  transform: s
  
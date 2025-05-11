<script setup lang="ts">
import { computed } from 'vue';
import type { Blockchain } from '../utils/Blockchain';

const props = defineProps<{
  blockchain: Blockchain;
}>();

const blockCount = computed(() => props.blockchain.chain.length);
const isValid = computed(() => props.blockchain.isChainValid());
const latestBlock = computed(() => props.blockchain.getLatestBlock());
const difficulty = computed(() => props.blockchain.difficulty);
</script>

<template>
  <div class="glass-card p-6 mb-8">
    <h2 class="text-2xl font-bold mb-6 bg-transparent text-white">Blockchain Stats</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="stat-card bg-crypto-dark p-4 rounded-lg border border-crypto-blue/30">
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-full bg-blue-purple-gradient flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
          </div>
          <div>
            <div class="text-sm text-crypto-gray">Total Blocks</div>
            <div class="text-2xl font-bold">{{ blockCount }}</div>
          </div>
        </div>
      </div>
      
      <div class="stat-card bg-crypto-dark p-4 rounded-lg border border-crypto-blue/30">
        <div class="flex items-center">
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center mr-4"
            :class="isValid ? 'bg-crypto-green' : 'bg-crypto-red'"
          >
            <svg v-if="isValid" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div class="text-sm text-crypto-gray">Chain Validity</div>
            <div 
              class="text-2xl font-bold"
              :class="isValid ? 'text-crypto-green' : 'text-crypto-red'"
            >
              {{ isValid ? 'Valid' : 'Invalid' }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="stat-card bg-crypto-dark p-4 rounded-lg border border-crypto-blue/30">
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-full bg-crypto-purple flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <div>
            <div class="text-sm text-crypto-gray">Mining Difficulty</div>
            <div class="text-2xl font-bold">{{ difficulty }}</div>
          </div>
        </div>
      </div>
      
      <div class="stat-card bg-crypto-dark p-4 rounded-lg border border-crypto-blue/30">
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-full bg-crypto-blue flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div class="text-sm text-crypto-gray">Latest Block</div>
            <div class="text-lg font-bold truncate">#{{ latestBlock.index }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
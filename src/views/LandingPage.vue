<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import AppHeader from '../components/AppHeader.vue';
import BlockchainStats from '../components/BlockchainStats.vue';
import BlockForm from '../components/BlockForm.vue';
import BlockCard from '../components/BlockCard.vue';
import Blockchain from '../utils/Blockchain';

const loading = ref(true);
const blockchain = ref(new Blockchain());

const handleLoaded = () => {
  loading.value = false;
};

const addBlock = (data: string) => {
  blockchain.value.addBlock(data);
};

const handleClearAllBlocks = () => {
  if (!confirm('Are you sure you want to clear all blocks? This will reset the blockchain to genesis block.')) {
   return;
  }
  blockchain.value.clearAllBlocks();
};
onMounted(() => {
  // Simulate loading time
  setTimeout(() => {
    if (loading.value) {
      loading.value = false;
    }
  }, 3000);
});
</script>

<template>
  <div>
    <!-- Loading Screen -->
    <LoadingScreen :loading="loading" @loaded="handleLoaded" />
    
    <!-- Main Content (only visible when loaded) -->
    <div v-if="!loading" class="min-h-screen bg-crypto-darker">
      <AppHeader />
      
      <!-- Hero Section -->
      <section class="pt-24 pb-16 px-4">
        <div class="container mx-auto">
          <div class="glass-card overflow-hidden relative">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="p-8 md:p-12">
                <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-transparent text-white">
                  Blockchain <span class="text-crypto-blue">Generator</span>
                </h1>
                
                <p class="text-lg text-crypto-gray mb-8">
                  Experience the power of blockchain technology with our interactive generator. 
                  Create, mine, and validate your own blocks in a secure and transparent chain.
                </p>
                
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="https://tiny-heliotrope-85a25d.netlify.app/"
                    class="btn btn-primary px-6 py-3"
                    target="_blank"
                  >
                    Get Started V2
                  </a>
                  
                  <a 
                    href="#about"
                    class="btn border border-crypto-blue/50 text-white hover:bg-crypto-blue/20 px-6 py-3"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              
              <div class="relative hidden lg:block">
                <div class="hero-image absolute inset-0 flex items-center justify-center overflow-hidden">
                  <!-- Animated blockchain graphic -->
                  <div class="blockchain-graphic relative">
                    <div class="flex flex-col items-center">
                      <div 
                        v-for="i in 3" 
                        :key="i"
                        class="w-32 h-32 mb-8 relative"
                      >
                        <div 
                          class="absolute inset-0 rounded-xl border-2 border-crypto-blue/70 flex items-center justify-center bg-crypto-dark/80 shadow-neon-blue"
                          :class="i === 1 ? 'animate-pulse-slow' : ''"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="i === 1 ? '#00BFFF' : (i === 2 ? '#8A2BE2' : '#00FA9A')" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
                          </svg>
                        </div>
                        <!-- Connection line -->
                        <div 
                          v-if="i < 3" 
                          class="w-0.5 h-8 bg-gradient-to-b from-crypto-blue to-crypto-purple absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
              <div class="absolute inset-0 bg-gradient-to-br from-crypto-blue/10 to-crypto-purple/20 backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Main Content Section -->
      <section id="blocks" class="py-16 px-4">
        <div class="container mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">Blockchain Explorer</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1">
              <BlockchainStats :blockchain="blockchain" />
              <BlockForm @add-block="addBlock" @clearAllBlocks="handleClearAllBlocks" />
            </div>
            <div class="lg:col-span-2">
              <div class="glass-card p-6">
                <h3 class="text-2xl font-bold mb-6 bg-transparent text-white">Block Explorer</h3>
                
                <div class="space-y-2">
                  <BlockCard 
                    v-for="(block, index) in blockchain.chain" 
                    :key="block.hash"
                    :block="block"
                    :is-last="index === blockchain.chain.length - 1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- About Section -->
      <section id="about" class="py-16 px-4 bg-crypto-dark">
        <div class="container mx-auto">
          <h2 class="text-3xl font-bold mb-8 text-center">About Blockchain Technology</h2>
          
          <div class="glass-card p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-2xl font-bold mb-4 bg-transparent text-white">What is Blockchain?</h3>
                <p class="text-crypto-gray mb-4">
                  Blockchain is a distributed database or ledger shared among computer network nodes. 
                  It stores information electronically in digital format, maintaining a secure and 
                  decentralized record of transactions.
                </p>
                <p class="text-crypto-gray mb-4">
                  The innovation of blockchain is that it guarantees the fidelity and security of 
                  data records and generates trust without the need for a trusted third party.
                </p>
                
                <h3 class="text-2xl font-bold mt-8 mb-4 bg-transparent text-white">Key Features</h3>
                <ul class="space-y-2 text-crypto-gray">
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-crypto-blue mr-2 mt-0.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Decentralized structure</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-crypto-blue mr-2 mt-0.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Immutable and transparent ledger</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-crypto-blue mr-2 mt-0.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Enhanced security through cryptography</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-crypto-blue mr-2 mt-0.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Consensus mechanisms for validation</span>
                  </li>
                  <li class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-crypto-blue mr-2 mt-0.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Smart contract functionality</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 class="text-2xl font-bold mb-4 bg-transparent text-white">How Blockchain Works</h3>
                
                <div class="mb-8">
                  <div class="relative p-4 mb-4 border-l-4 border-crypto-blue bg-crypto-darker rounded-r-lg">
                    <h4 class="text-lg font-medium text-crypto-blue mb-2">1. Block Creation</h4>
                    <p class="text-crypto-gray">
                      Transactions are bundled into a block. Each block contains a timestamp, 
                      transaction data, and a reference to the previous block.
                    </p>
                  </div>
                  
                  <div class="relative p-4 mb-4 border-l-4 border-crypto-purple bg-crypto-darker rounded-r-lg">
                    <h4 class="text-lg font-medium text-crypto-purple mb-2">2. Verification</h4>
                    <p class="text-crypto-gray">
                      The network validates the transaction using consensus algorithms like Proof of Work 
                      or Proof of Stake.
                    </p>
                  </div>
                  
                  <div class="relative p-4 mb-4 border-l-4 border-crypto-green bg-crypto-darker rounded-r-lg">
                    <h4 class="text-lg font-medium text-crypto-green mb-2">3. Chain Addition</h4>
                    <p class="text-crypto-gray">
                      Once verified, the block is added to the chain, creating a permanent and 
                      unalterable record.
                    </p>
                  </div>
                  
                  <div class="relative p-4 border-l-4 border-crypto-yellow bg-crypto-darker rounded-r-lg">
                    <h4 class="text-lg font-medium text-crypto-yellow mb-2">4. Distribution</h4>
                    <p class="text-crypto-gray">
                      The updated blockchain is distributed across all nodes in the network, 
                      ensuring everyone has the same copy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Footer -->
      <footer class="py-8 px-4 border-t border-crypto-blue/20">
        <div class="container mx-auto">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-blue-purple-gradient flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>
                <h2 class="text-xl font-bold bg-transparent text-white">CryptoChain</h2>
              </div>
            </div>
            
            <div class="text-crypto-gray text-sm">
              &copy; {{ new Date().getFullYear() }}(21533401) Nanda Safiq Alfiansyah. All rights reserved.
            </div>
            
            <div class="flex space-x-4 mt-4 md:mt-0">
              <a href="#" class="text-crypto-gray hover:text-crypto-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
              <a href="#" class="text-crypto-gray hover:text-crypto-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a href="#" class="text-crypto-gray hover:text-crypto-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.54 12.54c-.14.16-.38.18-.56.04l-2.29-1.73-2.3 1.73c-.18.14-.42.12-.56-.04-.14-.16-.12-.42.04-.56l2.3-1.73-2.3-1.73c-.16-.14-.18-.38-.04-.56.14-.16.38-.18.56-.04l2.3 1.73 2.29-1.73c.18-.14.42-.12.56.04.14.16.12.42-.04.56L9.54 10l2.3 1.73c.16.14.18.42.04.56z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}

.blockchain-graphic {
  transform: translateY(0px);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>

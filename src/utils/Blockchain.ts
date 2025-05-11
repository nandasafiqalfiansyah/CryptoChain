import SHA256 from 'crypto-js/sha256';

export class Block {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(
    index: number,
    timestamp: number,
    data: string,
    previousHash = ''
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      this.data +
      this.nonce
    ).toString();
  }

  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join('0');
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }

  getFormattedDate(): string {
    return new Date(this.timestamp).toLocaleString();
  }

  // Metode untuk mengkonversi Block ke object biasa (serialisasi)
  toObject(): any {
    return {
      index: this.index,
      timestamp: this.timestamp,
      data: this.data,
      previousHash: this.previousHash,
      hash: this.hash,
      nonce: this.nonce
    };
  }

  // Metode statis untuk membuat Block dari object (deserialisasi)
  static fromObject(obj: any): Block {
    const block = new Block(obj.index, obj.timestamp, obj.data, obj.previousHash);
    block.hash = obj.hash;
    block.nonce = obj.nonce;
    return block;
  }
}

export class Blockchain {
  chain: Block[];
  difficulty: number;
  storageKey: string;

  constructor(storageKey = 'blockchain') {
    this.storageKey = storageKey;
    this.difficulty = 2;
    const loaded = this.loadFromStorage();
    this.chain = loaded ? loaded : [this.createGenesisBlock()];
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), 'Genesis Block', '0');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: string): Block {
    const index = this.chain.length;
    const timestamp = Date.now();
    const previousHash = this.getLatestBlock().hash;
    const newBlock = new Block(index, timestamp, data, previousHash);
    
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    
    // Simpan ke local storage setiap kali menambahkan block baru
    this.saveToStorage();
    
    return newBlock;
  }



  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Validate hash
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Validate chain link
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  // Metode untuk menyimpan blockchain ke local storage
  saveToStorage(): void {
    const chainData = this.chain.map(block => block.toObject());
    localStorage.setItem(this.storageKey, JSON.stringify({
      chain: chainData,
      difficulty: this.difficulty
    }));
  }

  // Metode untuk memuat blockchain dari local storage
  loadFromStorage(): Block[] | null {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return null;

    try {
      const parsed = JSON.parse(data);
      this.difficulty = parsed.difficulty || 2;
      return parsed.chain.map((blockData: any) => Block.fromObject(blockData));
    } catch (e) {
      console.error('Failed to parse blockchain from storage', e);
      return null;
    }
  }

  // Metode untuk menghapus blockchain dari local storage
  clearAllBlocks(): void {

    alert('Blockchain cleared!');
    localStorage.removeItem(this.storageKey);
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }
}

export default Blockchain;
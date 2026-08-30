import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// Must stay byte-for-byte identical to src/lib/hash.ts -- this runs in
// Node at build time, that one runs in the browser at runtime, and they
// have to produce the same hash for the same input.
function cyrb53(str: string, seed = 0): string {
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  const combined = 4294967296 * (2097151 & h2) + (h1 >>> 0)
  return combined.toString(16)
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const passphrase = env.GATE_PASSPHRASE

  if (!passphrase) {
    throw new Error(
      'GATE_PASSPHRASE is not set. Copy .env.example to .env and fill it ' +
        'in -- see README.md.'
    )
  }

  const normalized = passphrase.trim().toLowerCase()
  const gateHash = cyrb53(normalized)

  return {
    base: '/still-just-a-turtle/',
    plugins: [react(), tailwindcss()],
    define: {
      __GATE_HASH__: JSON.stringify(gateHash),
    },
  }
})

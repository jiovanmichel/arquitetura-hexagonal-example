import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        // opções de configuração aqui
        globals: true,
        environment: 'node'
    }
})

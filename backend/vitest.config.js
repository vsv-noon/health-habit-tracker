import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['**/*.test.ts'],
    setupFiles: ['src/__tests__/loadEnv.ts'],
    exclude: [...configDefaults.exclude],
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude, // Keep Vitest's default exclusions (like node_modules, dist)
      ],
      // enabled: true,
    },
  },
});

export default {
  ai: {
    maxTokens: 4000,
    model: 'cursor-code',
    provider: 'cursor',
    temperature: 0.1
  },
  eslint: {
    project: './tsconfig.lint.json'
  },
  vitest: {
    environment: 'jsdom',
    maxWorkers: 1
  },
  outputPath: 'lib',
  targetEnvironment: 'node',
  useTypescript: true
};

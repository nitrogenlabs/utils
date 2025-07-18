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
  jest: {
    maxWorkers: 1,
    testEnvironment: 'jsdom',
    workerIdleMemoryLimit: '512MB'
  },
  outputPath: 'lib',
  targetEnvironment: 'node',
  useTypescript: true
};
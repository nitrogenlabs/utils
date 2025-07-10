module.exports = {
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
    testEnvironment: 'jsdom',
    maxWorkers: 1,
    workerIdleMemoryLimit: '512MB'
  },
  outputPath: 'lib',
  targetEnvironment: 'node',
  useTypescript: true
};
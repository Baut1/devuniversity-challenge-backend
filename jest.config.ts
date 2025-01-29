module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFiles: ['dotenv/config'], // Carga las variables de entorno automáticamente
  };
  
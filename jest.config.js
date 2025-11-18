module.exports = {
  // Указываем, какие файлы Jest должен искать
  roots: ['<rootDir>/test'],
  // Преобразуем файлы .ts и .tsx с помощью ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // Расширения файлов, которые Jest обрабатывает
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  // Окружение для тестов
  testEnvironment: 'node',
};
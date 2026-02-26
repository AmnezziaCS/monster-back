// Jest setup for CI environment
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/monster_test';

// Mock console.log in test environment to reduce noise
if (process.env.NODE_ENV === 'test') {
  console.log = jest.fn();
}
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // Read the monsters data from JSON file
  const dataPath = path.join(__dirname, '..', 'data', 'monsters.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const monsterData = JSON.parse(rawData);

  // Clear existing data
  console.log('🗑️  Clearing existing monsters...');
  await prisma.monster.deleteMany({});

  // Seed monsters
  console.log('📦 Inserting monsters...');
  for (const monster of monsterData.products) {
    await prisma.monster.create({
      data: {
        id: monster.id,
        name: monster.name,
        type: monster.type,
        description: monster.description,
        price: monster.price,
        imageUrl: monster.imageUrl,
      },
    });
  }

  console.log(
    `✅ Seeded ${monsterData.products.length} monsters successfully!`,
  );
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

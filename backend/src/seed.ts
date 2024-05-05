import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

  /* Shelters */
  const lansing = await prisma.shelter.upsert({
    where: { id: 1},
    update: {},
    create: {
      id: 1,
      name: "Lansing Animal Shelter",
      email: "lansingAnimalShelter@gmail.com",
      phone: "999-999-9999"
    }
  })
  
  /* Animals */
  const benny = await prisma.animalPost.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Benny',
      species: 'Cat',
      breed: 'Domestic Short Hair',
      color: 'Orange',
      shelterId: 1
    }
  })
  const sammy = await prisma.animalPost.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Sammy',
      species: 'Cat',
      breed: 'Domestic Long Hair',
      color: 'Tan',
      shelterId: 1
    }
  })
  const bobby = await prisma.animalPost.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Bobby',
      species: 'Cat',
      breed: 'Maine Coon',
      color: 'Gray',
      shelterId: 1
    }
  })
  console.log({ benny, sammy, bobby })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
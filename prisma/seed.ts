import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const defaultEmail = 'admin@domain.com'
  const passwordHash = await bcrypt.hash('defaultpass', 10)

  const admin = await prisma.user.upsert({
    where: { email: defaultEmail },
    update: {},
    create: {
      name: 'Admin User',
      email: defaultEmail,
      password: passwordHash,
      role: 'SUPERADMIN',
      activatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

<<<<<<< HEAD
  console.log('✅ Seeded superadmin user:', admin.email)
=======
  console.log('✅ Seeded admin user:', admin.email)
>>>>>>> 878fad46d4dc5c1a370761482912bac1b6dea32b
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

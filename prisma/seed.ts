import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('defaultpass', 10)

  // Create main superadmin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@domain.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@domain.com',
      password: passwordHash,
      role: 'SUPERADMIN',
      activatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  // Create teacher user
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@domain.com' },
    update: {},
    create: {
      name: 'Teacher User',
      email: 'teacher@domain.com',
      password: passwordHash,
      role: 'TEACHER',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  // Create student user
  const student = await prisma.user.upsert({
    where: { email: 'student@domain.com' },
    update: {},
    create: {
      name: 'Student User',
      email: 'student@domain.com',
      password: passwordHash,
      role: 'STUDENT',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  console.log('✅ Seeded superadmin user:', admin.email)
  console.log('✅ Seeded teacher user:', teacher.email)
  console.log('✅ Seeded student user:', student.email)
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

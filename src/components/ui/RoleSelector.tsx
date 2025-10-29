import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export default async function RoleSelector() {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <select>
      <option value="role">Admin</option>
    </select>
  )
}

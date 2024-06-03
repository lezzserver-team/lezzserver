import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const cookie = cookies().get('token')
  const token = cookie?.value

  if (token) {
    const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +'/user', {
      credentials: 'include',
      headers: {
        'Authorization': "Bearer " + token
      }
    })

    if (resp.status === 200) {
      redirect('/dashboard')
    } else {
      redirect('/login')
    }
  }

  redirect('/login')
}

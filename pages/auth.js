import {
    useSession, signIn, signOut
  } from 'next-auth/client'
  
  export default function Page() {
    const [ session, loading ] = useSession()
    if(session) {
      return <>
        Signed in as {session.user.email || session.user.name} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    }
    return <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  }
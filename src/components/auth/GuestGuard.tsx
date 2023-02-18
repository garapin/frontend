// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
// import { useAuth } from 'src/hooks/useAuth'
import useFirebaseAuth from 'src/hooks/useFirebaseAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useFirebaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (!auth.loading && auth.authUser !== null) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route, auth])

  if (auth.loading || (!auth.loading && auth.authUser !== null)) {
    console.log('auth loading: ', auth.loading, 'auth user: ', auth.authUser)

    return fallback
  }

  return <>{children}</>
}

export default GuestGuard

// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
// import { useAuth } from 'src/hooks/useAuth'
import useFirebaseAuth from 'src/hooks/useFirebaseAuth'
import { toast } from 'react-toastify'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
  adminGuard: boolean
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback, adminGuard } = props
  const auth = useFirebaseAuth()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (!auth.loading && auth.authUser === null) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/login')
        }
      } else if (!auth.loading && (!auth.authUser?.email?.endsWith('@garap.in') || !auth.authUser?.emailVerified) && adminGuard === true) {
        if (auth.authUser?.email?.endsWith('@garap.in')) {
          auth.authUser?.sendEmailVerification();
          toast.info('Dear garapin admin: Please check your @garap.in email for verification link and then try again.');
        }
        // redirect to home
        router.replace('/');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, auth, auth.loading, auth.authUser]
  )

  if (auth.loading || auth.authUser === null || (adminGuard && (!auth.authUser?.email?.endsWith('@garap.in') || !auth.authUser?.emailVerified))) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard

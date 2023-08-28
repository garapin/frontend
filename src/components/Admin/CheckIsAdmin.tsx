import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import React, { ReactNode } from 'react'

export default function IsAdmin({children}: {children:JSX.Element | ReactNode}) {
    const auth = useFirebaseAuth();
  return (
    (auth.authUser?.uid !== undefined && auth.authUser?.email?.endsWith("@garap.in") && auth.authUser?.emailVerified) ? children : <></>
  )
}

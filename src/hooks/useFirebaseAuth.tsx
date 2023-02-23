import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Firebase, { getFirestore } from 'src/configs/firebase'

// interface UserType {
//   email: string
//   uid: string | number | null
// }

// const formatAuthUser = (user: Firebase.User) => {
//  user.
// }

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<null | Firebase.User>(null)
  const [loading, setLoading] = useState(true)
  const firestore = getFirestore();
  let callback = null;
  let unsubscribe:null|Function = null;

  const authStateChanged = async (authState: Firebase.User|null) => {
    if (unsubscribe !== null) unsubscribe();
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
    } else {
      setLoading(true)
      // const formattedUser = formatAuthUser(authState)
      const formattedUser = authState
      setAuthUser(formattedUser)
      setLoading(false)

      unsubscribe = firestore.doc(`usersData/${formattedUser.uid}`).onSnapshot((doc) => {
        if (doc.exists) {
          console.log("User data from update snapshot:", doc.data());
          authState.getIdToken(true);
        }
      })
    }
  }

  const resetUser = () => {
    setAuthUser(null)
    setLoading(false)
    toast.success("Berhasil logout. Sampai jumpa lagi!");
  }

  const signInWithEmailAndPassword = (email: string, password: string) =>
    Firebase.auth().signInWithEmailAndPassword(email, password)

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    Firebase.auth().createUserWithEmailAndPassword(email, password)

  const resetPassword = (email: string) => Firebase.auth().sendPasswordResetEmail(email)

  const updateUser = (profile: {
    displayName?: string | null;
    photoURL?: string | null;
  }) => Firebase.auth().currentUser?.updateProfile(profile);

  const signOut = () => Firebase.auth().signOut().then(resetUser)

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged)

    return () => unsubscribe()
  }, [])

  return {
    loading,
    signOut,
    authUser,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    resetPassword
  }
}

export default useFirebaseAuth

import { getFirestore } from "@/configs/firebase";
import { setCategories, setLoading } from "@/store/modules/appDefaults";
import { Category } from "@/types/category";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const FirestoreLoader = () => {
    const firestore = getFirestore();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setLoading());
      const unsubscribe = firestore.collection('categories').onSnapshot((snapshot) => {
        const categories:Category[] = snapshot.docs.map((doc) => ({
          ...doc.data() as Category,
          id: doc.id,
        }));
        dispatch(setCategories(categories));
      });
      
      return () => unsubscribe();
    }, [])
    return (<></>);
}

export default FirestoreLoader;
import { getFirestore } from "@/configs/firebase";
import { Product } from "@/types/product";
import Firebase from "@/configs/firebase";

/* Default Variables (used in all functions)
 * This is the default variables used in all functions
*/
const db = getFirestore();
export const pageSize = 20;

/* Return Type Definition
 * This is the return type of the function
*/
type ProductListDB = {
    data: Product[];
    lastProductQuery: Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData> | undefined;
}

/* Functions
 * This is all the functions to get data from database.
*/
export const getSingleProductFromDB = async (docId: string):Promise<Product|undefined> => {
    const data = await db.collection('products')
        .doc(docId)
        .get();
    return (data.exists && data.get('active') === true && data.get('deleted') === false) ? {...data.data() as Product, id: data.id} : undefined;
}

export const getAllProductsFromDB = async (): Promise<ProductListDB> => {
    const response = await db.collection('products')
        .where('active', '==', true)
        .where('deleted', '==', false)
        .where('channel', '==', 'printing')
        // .where('__name__', '>=', '')
        // .orderBy('__name__')
        .limit(pageSize).get();
    const data: Product[] = response.docs.map(doc => {
        return {
            ...doc.data() as Product,
            id: doc.id,
        }
    });
    return {data, lastProductQuery: response.docs[response.docs.length - 1]};
}

export const getAllProductsNextFromDB = async (lastProductQuery: Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData> | undefined): Promise<ProductListDB> => {
    const response = await db.collection('products')
        .where('active', '==', true)
        .where('deleted', '==', false)
        .where('channel', '==', 'printing')
        // .where('__name__', '>=', '')
        // .orderBy('__name__')
        .startAfter(lastProductQuery)
        .limit(pageSize).get();
    const data: Product[] = response.docs.map(doc => {
        return {
            ...doc.data() as Product,
            id: doc.id,
        }
    });
    return {data, lastProductQuery: response.docs[response.docs.length - 1]};
}
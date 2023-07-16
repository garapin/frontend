import { getFirestore } from "@/configs/firebase";
import { Product, Template } from "@/types/product";
import Firebase from "@/configs/firebase";
import { Category } from "@/types/category";
import { toast } from "react-toastify";

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
  lastProductQuery:
    | Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>
    | undefined;
};

/* Functions
 * This is all the functions to get data from database.
 */
export const getSingleProductFromDB = async (
  slug: string
): Promise<Product | undefined> => {
  const data = await db
    .collection("products")
    .where("slug", "==", slug)
    .where("active", "==", true)
    .where("deleted", "==", false)
    .limit(1)
    .get();
  return !data.empty
    ? { ...(data.docs[0].data() as Product), id: data.docs[0].id }
    : undefined;
};

export const getProductCartFromDB = async (userId: any): Promise<any> => {
  const response = await db
    .collection("product_carts")
    .where("status", "==", "cart")
    .where("userId", "==", userId)
    .get();

  const data = response.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return data;
};

export const updateProductCartFromDBById = async (
  id: string,
  data: any
): Promise<any> => {
 await db.collection("product_carts").doc(id).update(data);

 const response = await db
    .collection("product_carts").doc(id).get();
  return response.data();
};

export const getAllProductsFromDB = async (): Promise<ProductListDB> => {
  const response = await db
    .collection("products")
    .where("active", "==", true)
    .where("deleted", "==", false)
    .where("channel", "==", "printing")
    // .where('__name__', '>=', '')
    // .orderBy('__name__')
    .limit(pageSize)
    .get();
  const data: Product[] = response.docs.map((doc) => {
    return {
      ...(doc.data() as Product),
      id: doc.id,
    };
  });
  return { data, lastProductQuery: response.docs[response.docs.length - 1] };
};

export const getAllCategoriesFromDB = async (): Promise<any> => {
  const response = await db.collection("categories").get();

  const data: Category[] = response.docs.map((doc) => {
    return {
      ...(doc.data() as Category),
      id: doc.id,
    };
  });
  return data;
};

export const getAllProductsFromDBBasedOnCategories = async (
  categoryId: string
): Promise<ProductListDB> => {
  const response = await db
    .collection("products")
    .where("active", "==", true)
    .where("deleted", "==", false)
    .where("channel", "==", "printing")
    .where("category", "==", categoryId)
    // .where('__name__', '>=', '')
    // .orderBy('__name__')
    .limit(pageSize)
    .get();
  const data: Product[] = response.docs.map((doc) => {
    return {
      ...(doc.data() as Product),
      id: doc.id,
    };
  });
  return { data, lastProductQuery: response.docs[response.docs.length - 1] };
};

export const getAllProductsNextFromDB = async (
  lastProductQuery:
    | Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>
    | undefined
): Promise<ProductListDB> => {
  const response = await db
    .collection("products")
    .where("active", "==", true)
    .where("deleted", "==", false)
    .where("channel", "==", "printing")
    // .where('__name__', '>=', '')
    // .orderBy('__name__')
    .startAfter(lastProductQuery)
    .limit(pageSize)
    .get();
  const data: Product[] = response.docs.map((doc) => {
    return {
      ...(doc.data() as Product),
      id: doc.id,
    };
  });
  return { data, lastProductQuery: response.docs[response.docs.length - 1] };
};

export const getProductTemplateFromDB = async (
  templateId: string
): Promise<Template | undefined> => {
  const templateRef = db.collection("templates").doc(templateId);
  const template = await templateRef.get();
  if (template.exists) {
    return template.data() as Template;
  }
  return undefined;
};

export const storeRequestInquiryToDB = async (
  data: any
): Promise<
  Firebase.firestore.DocumentReference<Firebase.firestore.DocumentData>
> => {
  return await db.collection("product_inquiries").add(data);
};

export const getStoreInquiryToDB = async (): Promise<any> => {
  const response = await db.collection("product_inquiries").get();

  const data = response.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  data.sort((a: any, b: any) => {
    const createdAtA = a.createdAt;
    const createdAtB = b.createdAt;

    // Bandingkan nilai 'seconds' terlebih dahulu
    if (createdAtA.seconds !== createdAtB.seconds) {
      return createdAtB.seconds - createdAtA.seconds;
    }

    // Jika nilai 'seconds' sama, bandingkan nilai 'nanoseconds'
    return createdAtB.nanoseconds - createdAtA.nanoseconds;
  });

  return data;
};

export const getDetailQuotationFromDB = async (id: string): Promise<any> => {
  const response = await db
    .collection("quotations")
    .where("inquiryFormId", "==", id)
    .get();

  const data = response.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return data;
};

export const addToCart = async (
  data: any
): Promise<
  Firebase.firestore.DocumentReference<Firebase.firestore.DocumentData>
> => {
  return await db.collection("product_carts").add(data);
};

export const deleteItemCart = async (id: any, uid: any) => {
  const cartCollection = db.collection("product_carts").doc(id);
  const cart = await cartCollection.get();
  if (cart.exists) {
    const cartData = cart.data();
    if (cartData?.userId === uid) {
      await cartCollection.delete();
      toast.success("Item has been deleted");
    }
  }
};

export const getProductInvoicesFromDB = async (
  userId: string
): Promise<any> => {
  const response = await db
    .collection("product_invoices")
    .where("userId", "==", userId)
    .get();

  const data = response.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return data;
};

export const getQuotationFromDB = async (): Promise<any> => {
  const response = await db.collection("quotations").get();

  const data = response.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return data;
};

export const getShippingCompanyFromDB = async (): Promise<any> => {
  const response = await db
    .collection("master/courier/available_couriers")
    .get();

  const data = response.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return data;
};

export const getPaymentStatusFromDB = async (id: string): Promise<any> => {
  const response = await db.collection("product_invoices").doc(id).get();
  return response.data();
};

import { getFirestore } from "@/configs/firebase";
import { RootState } from "@/store";
import { Product } from "@/types/product";
import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import Firebase from '../../../configs/firebase'

const defaultState: {
    products: Product[];
    singleProduct?: Product;
    allProductsLoaded: boolean,
    lastProductQuery?: Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>
    isProductLoading: boolean;
    isFetchingNext: boolean;
    errors?: string;
} = {
    products: [],
    allProductsLoaded: false,
    singleProduct: undefined,
    isProductLoading: false,
    isFetchingNext: false,
    errors: undefined,
}

const pageSize = 20;


const productsSlice = createSlice({
    name: 'products',
    initialState: defaultState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.isProductLoading = false;
        },
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload;
            state.isProductLoading = false;
        },
        setProductLoading: (state) => {
            state.isProductLoading = true;
        },
        setError: (state, action) => {
            state.errors = action.payload;
            state.isProductLoading = false;
        },
        setLastProductQuery: (state, action) => {
            state.lastProductQuery = action.payload;
        },
        setAllProductsLoaded: (state, action) => {
            state.allProductsLoaded = action.payload;
        },
        setIsFetchingNext: (state, action) => {
            state.isFetchingNext = action.payload;
        }

    },
    extraReducers: (builder) => {
    }
})

export const getAllProducts = ():ThunkAction<void, RootState, unknown, any> => {
    return async (dispatch) => {
        try {
            const firestore = getFirestore();
            dispatch(setAllProductsLoaded(false));
            dispatch(setProductLoading());
            const response = await firestore.collection('products')
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
            dispatch(setProducts(data));

            if(response.docs.length < pageSize) {
                console.log('All products loaded');
                dispatch(setLastProductQuery(undefined));
                dispatch(setAllProductsLoaded(true));
            } else {
                dispatch(setLastProductQuery(response.docs[response.docs.length - 1]));
            }
        } catch (error) {
            console.log(error);
            dispatch(setError((error as any).message));
        }
    }
}

export const getAllProductNext = (): ThunkAction<void, RootState, unknown, any> => {
    return async (dispatch, getState) => {
        const {lastProductQuery, products} = getState().products;
        try {
            dispatch(setIsFetchingNext(true));
            dispatch(setAllProductsLoaded(false));
            const firestore = getFirestore();
            const response = await firestore.collection('products')
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
            dispatch(setIsFetchingNext(false));
            dispatch(setProducts([...products, ...data]));
            if(response.docs.length < pageSize) {
                console.log('All products loaded');
                dispatch(setLastProductQuery(undefined));
                dispatch(setAllProductsLoaded(true));
            } else {
                dispatch(setLastProductQuery(response.docs[response.docs.length - 1]));
            }
        } catch (error) {
            console.log(error);
            dispatch(setError((error as any).message));
        }
    }
}


export const {setProducts, setProductLoading, setSingleProduct, setError, setLastProductQuery, setAllProductsLoaded, setIsFetchingNext} = productsSlice.actions;

export default productsSlice.reducer;
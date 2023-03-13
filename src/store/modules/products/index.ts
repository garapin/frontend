import { getFirestore } from "@/configs/firebase";
import { getAllProductsFromDB, getAllProductsNextFromDB, getProductTemplateFromDB, getSingleProductFromDB, pageSize } from "@/db";
import { RootState } from "@/store";
import { Product, Template } from "@/types/product";
import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import Firebase from '../../../configs/firebase'

const defaultState: {
    products: Product[];
    singleProduct?: Product;
    allProductsLoaded: boolean,
    lastProductQuery?: Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>
    isProductLoading: boolean;
    isTemplateLoading: boolean;
    isFetchingNext: boolean;
    errors?: string;
    productTemplate?: Template;
} = {
    products: [],
    allProductsLoaded: false,
    singleProduct: undefined,
    isProductLoading: false,
    isTemplateLoading: false,
    isFetchingNext: false,
    errors: undefined,
    productTemplate: undefined,
}



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
            state.isTemplateLoading = false;
        },
        setLastProductQuery: (state, action) => {
            state.lastProductQuery = action.payload;
        },
        setAllProductsLoaded: (state, action) => {
            state.allProductsLoaded = action.payload;
        },
        setIsFetchingNext: (state, action) => {
            state.isFetchingNext = action.payload;
        },
        setTemplateLoading: (state) => {
            state.isTemplateLoading = true;
        },
        setProductTemplate: (state, action) => {
            state.productTemplate = action.payload;
            state.errors = undefined;
            state.isTemplateLoading = false;
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
            const data = await getAllProductsFromDB();
            dispatch(setProducts(data.data));

            if(data.data.length < pageSize) {
                console.log('All products loaded');
                dispatch(setLastProductQuery(undefined));
                dispatch(setAllProductsLoaded(true));
            } else {
                dispatch(setLastProductQuery(data.lastProductQuery));
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
            const data = await getAllProductsNextFromDB(lastProductQuery);            
            dispatch(setIsFetchingNext(false));
            dispatch(setProducts([...products, ...data.data]));
            if(data.data.length < pageSize) {
                console.log('All products loaded');
                dispatch(setLastProductQuery(undefined));
                dispatch(setAllProductsLoaded(true));
            } else {
                dispatch(setLastProductQuery(data.lastProductQuery));
            }
        } catch (error) {
            console.log(error);
            dispatch(setError((error as any).message));
        }
    }
}

export const getSingleProduct = (slug: string): ThunkAction<void, RootState, unknown, any> => {
    return async (dispatch) => {
        try {
            console.log('slug from dispatch:', slug);
            dispatch(setProductLoading());
            const data = await getSingleProductFromDB(slug);
            dispatch(setSingleProduct(data));
        } catch (error) {
            console.log(error);
            dispatch(setError((error as any).message));
        }
    }
}

export const getProductTemplate = (templateId: string): ThunkAction<void, RootState, unknown, any> => {
    return async (dispatch) => {
        try {
            dispatch(setTemplateLoading());
            const templateData = await getProductTemplateFromDB(templateId);
            if (templateData!== undefined) {
                dispatch(setProductTemplate(templateData));
            } else {
                dispatch(setError('Template not found'));
            }
        } catch (error) {  
            console.log(error);
            dispatch(setError((error as any).message));
        }
    }
}


export const {
    setProducts, 
    setProductLoading, 
    setSingleProduct, 
    setError, 
    setLastProductQuery, 
    setAllProductsLoaded, 
    setIsFetchingNext, 
    setTemplateLoading, 
    setProductTemplate} = productsSlice.actions;

export default productsSlice.reducer;
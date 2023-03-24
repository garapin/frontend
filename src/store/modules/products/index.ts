import { getFirestore } from "@/configs/firebase";
import {
    getAllProductsFromDB,
    getAllProductsFromDBBasedOnCategories,
    getAllProductsNextFromDB,
    getProductTemplateFromDB,
    getSingleProductFromDB,
    pageSize
} from "@/db";
import { RootState } from "@/store";
import { Product, Template } from "@/types/product";
import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import Firebase from '../../../configs/firebase'
import axios from 'axios';

const defaultState: {
    products: Product[];
    productCategories: [];
    singleProduct?: Product;
    allProductsLoaded: boolean,
    lastProductQuery?: Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>
    isProductLoading: boolean;
    isTemplateLoading: boolean;
    isFetchingNext: boolean;
    errors?: string;
    productTemplate?: Template;
    scrollId?: string;
    searchHit?: number;
} = {
    products: [],
    productCategories: [],
    allProductsLoaded: false,
    singleProduct: undefined,
    isProductLoading: false,
    isTemplateLoading: false,
    isFetchingNext: false,
    errors: undefined,
    productTemplate: undefined,
    scrollId: undefined,
    searchHit: 0
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
        },
        setScrollId: (state, action) => {
            state.scrollId = action.payload
        },
        setSearchHits: (state, action) => {
            state.searchHit = action.payload
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

export const getAllProductsBasedOnCategories = (categoryId: string):ThunkAction<void, RootState, unknown, any> => {
    return async (dispatch) => {
        try {
            const firestore = getFirestore();
            dispatch(setAllProductsLoaded(false));
            dispatch(setProductLoading());
            const data = await getAllProductsFromDBBasedOnCategories(categoryId);
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

export const getSearchProduct = (productName: string):ThunkAction<void, RootState, unknown, any> => {
    return async (dispatch) => {
        try {
            const requestBody = {
                query: productName,
            };
            dispatch(setAllProductsLoaded(false));
            dispatch(setProductLoading());
            const data = await axios.post('https://asia-southeast2-garapin-f35ef.cloudfunctions.net/products/search', requestBody);
            dispatch(setProducts(data.data.result));
            dispatch(setSearchHits(data.data.hits));
            console.log("data.data");
            console.log(data.data);

            if(data.data.result.length < 25) {
                console.log('All products loaded');
                dispatch(setScrollId(undefined));
                dispatch(setAllProductsLoaded(true));
            } else {
                dispatch(setScrollId(data.data.scrollId));
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

export const getNextSearchProduct = (): ThunkAction<void, RootState, unknown, any> => {
    return async (dispatch, getState) => {
        const {scrollId, products} = getState().products;
        try {
            const requestBody = {
                scrollId: scrollId,
            };
            dispatch(setIsFetchingNext(true));
            dispatch(setAllProductsLoaded(false));
            const data = await axios.post('https://asia-southeast2-garapin-f35ef.cloudfunctions.net/products/scroll', requestBody);
            dispatch(setIsFetchingNext(false));
            dispatch(setProducts([...products, ...data.data.result]));

            if(data.data.result.length < 25) {
                console.log('All products loaded');
                dispatch(setScrollId(undefined));
                dispatch(setAllProductsLoaded(true));
            } else {
                dispatch(setScrollId(data.data.scrollId));
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
    setProductTemplate,
    setScrollId,
    setSearchHits
} = productsSlice.actions;

export default productsSlice.reducer;
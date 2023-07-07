import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState, AppThunk } from "@/store";
import {
  getAllProductsFromDB,
  getAllProductsFromDBBasedOnCategories,
  getAllProductsNextFromDB,
  getProductTemplateFromDB,
  getSingleProductFromDB,
  getAllCategoriesFromDB,
  getStoreInquiryToDB,
  pageSize,
  getProductCartFromDB,
  getDetailQuotationFromDB,
  getProductInvoicesFromDB,
  getQuotationFromDB,
  getShippingCompanyFromDB,
  getPaymentStatusFromDB,
} from "@/db";
import axios from "axios";
import { Product, Template } from "@/types/product";
import Firebase from "@/configs/firebase";
import API from "@/configs/api";
import { uuid } from "uuidv4";
import { toast } from "react-toastify";

const defaultState: {
  products: Product[];
  productCategories: [];
  singleProduct?: any;
  allProductsLoaded: boolean;
  lastProductQuery?: Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>;
  isProductLoading: boolean;
  isTemplateLoading: boolean;
  isFetchingNext: boolean;
  errors?: string;
  productTemplate?: any;
  scrollId?: Object;
  searchHit?: number;
  name: any;
  productCart: any;
  category: any;
  history: any;
  calculateTemplatePrice: any;
  calculationLoading: boolean | null;
  detailQuotation: any;
  quotationStatus: string;
  productInvoices: string[];
  shippingCompanies: string[];
  paymentStatus: any;
} = {
  products: [],
  productCategories: [],
  allProductsLoaded: false,
  singleProduct: [],
  productCart: [],
  isProductLoading: false,
  isTemplateLoading: false,
  isFetchingNext: false,
  errors: "",
  productTemplate: null,
  scrollId: {},
  searchHit: 0,
  name: null,
  category: [],
  history: [],
  calculateTemplatePrice: null,
  calculationLoading: null,
  detailQuotation: null,
  quotationStatus: "",
  productInvoices: [],
  shippingCompanies: [],
  paymentStatus: null
};

export const ProductSlice = createSlice({
  name: "product",

  initialState: defaultState,

  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setDetailQuotation: (state, action) => {
      state.detailQuotation = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.isProductLoading = false;
    },
    setSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
      state.isProductLoading = false;
    },
    setProductCart: (state, action) => {
      state.productCart = action.payload;
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
    setCalculateTemplatePrice: (state, action) => {
      state.calculateTemplatePrice = action.payload;
      state.isTemplateLoading = false;
    },
    setQuotationStatus: (state, action) => {
      state.quotationStatus = action.payload;
    },
    setScrollId: (state, action) => {
      state.scrollId = action.payload;
    },
    setSearchHits: (state, action) => {
      state.searchHit = action.payload;
    },
    setCalculateLoading: (state, action) => {
      state.calculationLoading = action.payload;
    },
    setProductInvoices: (state, action) => {
      state.productInvoices = action.payload;
    },
    setShippingCompany: (state, action) => {
      state.shippingCompanies = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.products = action.payload.product.products;
      state.singleProduct = action.payload.product.singleProduct;
      state.productCart = action.payload.product.productCart;
      state.errors = action.payload.product.errors;
      state.lastProductQuery = action.payload.product.lastProductQuery;
      state.allProductsLoaded = action.payload.product.allProductsLoaded;
      state.isFetchingNext = action.payload.product.isFetchingNext;
      state.productTemplate = action.payload.product.productTemplate;
      state.scrollId = action.payload.product.scrollId;
      state.searchHit = action.payload.product.searchHit;
      state.category = action.payload.product.category;
      state.history = action.payload.product.history;
    },
  },
});

export const {
  setProducts,
  setProductLoading,
  setSingleProduct,
  setProductCart,
  setError,
  setLastProductQuery,
  setAllProductsLoaded,
  setIsFetchingNext,
  setTemplateLoading,
  setProductTemplate,
  setScrollId,
  setSearchHits,
  setCategory,
  setHistory,
  setCalculateTemplatePrice,
  setCalculateLoading,
  setDetailQuotation,
  setQuotationStatus,
  setProductInvoices,
  setShippingCompany,
  setPaymentStatus
} = ProductSlice.actions;

export const selectProduct = (state: AppState) => state.product;

export const getAllCategories = (): AppThunk => async (dispatch) => {
  try {
    const data = await getAllCategoriesFromDB();
    dispatch(setCategory(data));
  } catch (error) {
    console.log(error);
    dispatch(setError((error as any).message));
  }
};

export const getAllHistory = (): AppThunk => async (dispatch) => {
  try {
    const data = await getStoreInquiryToDB();
    dispatch(setHistory(data));
  } catch (error) {
    console.log(error);
    dispatch(setError((error as any).message));
  }
};

export const getDetailQuotation =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const data = await getDetailQuotationFromDB(id);
      dispatch(setDetailQuotation(data));
    } catch (error) {
      console.log(error);
      dispatch(setError((error as any).message));
    }
  };

export const getAllProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setAllProductsLoaded(false));
    dispatch(setProductLoading());
    const data = await getAllProductsFromDB();
    dispatch(setProducts(JSON.parse(JSON.stringify(data.data))));

    if (data.data.length < pageSize) {
      console.log("All products loaded");
      dispatch(setLastProductQuery(null));
      dispatch(setAllProductsLoaded(true));
    } else {
      dispatch(
        setLastProductQuery(JSON.parse(JSON.stringify(data.lastProductQuery)))
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(setError((error as any).message));
  }
};

export const getAllProductsBasedOnCategories = (
  categoryId: string
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAllProductsLoaded(false));
      dispatch(setProductLoading());
      const data = await getAllProductsFromDBBasedOnCategories(categoryId);
      dispatch(setProducts(data.data));

      if (data.data.length < pageSize) {
        console.log("All products loaded");
        dispatch(setLastProductQuery(undefined));
        dispatch(setAllProductsLoaded(true));
      } else {
        dispatch(setLastProductQuery(data.lastProductQuery));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError((error as any).message));
    }
  };
};

export const getSearchProduct = (productName: string): AppThunk => {
  return async (dispatch) => {
    try {
      const requestBody = {
        query: productName,
      };
      dispatch(setAllProductsLoaded(false));
      dispatch(setProductLoading());
      const data = await axios.post(
        "https://asia-southeast2-garapin-f35ef.cloudfunctions.net/products/search",
        requestBody
      );
      dispatch(setProducts(data.data.result.map((item: any) => item._source)));
      dispatch(setSearchHits(data.data.hits));

      if (data.data.result.length < 25) {
        console.log("All products loaded");
        dispatch(setScrollId(undefined));
        dispatch(setAllProductsLoaded(true));
      } else {
        dispatch(setScrollId(data.data.scrollId));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError((error as any).message));
    }
  };
};

export const getAllProductNext = (): AppThunk => {
  return async (dispatch, getState) => {
    const { lastProductQuery, products } = getState().product;
    try {
      dispatch(setIsFetchingNext(true));
      dispatch(setAllProductsLoaded(false));
      const data = await getAllProductsNextFromDB(lastProductQuery);
      dispatch(setIsFetchingNext(false));
      dispatch(setProducts([...products, ...data.data]));
      if (data.data.length < pageSize) {
        console.log("All products loaded");
        dispatch(setLastProductQuery(undefined));
        dispatch(setAllProductsLoaded(true));
      } else {
        dispatch(setLastProductQuery(data.lastProductQuery));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError((error as any).message));
    }
  };
};

export const getNextSearchProduct = (): AppThunk => {
  return async (dispatch, getState) => {
    const { scrollId, products } = getState().product;
    try {
      const requestBody = {
        scrollId: scrollId,
      };
      dispatch(setIsFetchingNext(true));
      dispatch(setAllProductsLoaded(false));
      const data = await axios.post(
        "https://asia-southeast2-garapin-f35ef.cloudfunctions.net/products/scroll",
        requestBody
      );
      dispatch(setIsFetchingNext(false));
      dispatch(
        setProducts([
          ...products,
          ...data.data.result.map((item: any) => item._source),
        ])
      );

      if (data.data.result.length < 25) {
        dispatch(setScrollId(undefined));
        dispatch(setAllProductsLoaded(true));
      } else {
        dispatch(setScrollId(data.data.scrollId));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError((error as any).message));
    }
  };
};

export const getSingleProduct = (slug: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setProductLoading());
      const data = await getSingleProductFromDB(slug);
      dispatch(setSingleProduct(data));
    } catch (error) {
      console.log(error);
      dispatch(setError((error as any).message));
    }
  };
};

export const getProductCart = (userId: any): AppThunk => {
  return async (dispatch) => {
    try {
      const data = await getProductCartFromDB(userId);
      // filter data, when delete is true, and calculationId is unique to prevent data duplicate
      const filteredData = data.filter(
        (item: any, index: number, self: any) =>
          index ===
          self.findIndex(
            (t: any) => t.calculationId === item.calculationId && !item.delete
          )
      );
      dispatch(setProductCart(filteredData));
    } catch (error) {
      dispatch(setError((error as any).message));
    }
  };
};

export const getProductTemplate = (templateId: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setTemplateLoading());
      const templateData: any = await getProductTemplateFromDB(templateId);
      if (templateData !== undefined) {
        dispatch(setProductTemplate(templateData));
      } else {
        dispatch(setError("Template not found"));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError((error as any).message));
    }
  };
};
export const getProductTemplatePrice = (data: any): AppThunk => {
  return async (dispatch) => {
    const { product, selectedOptions, quantity, dimension } = data;
    let payload: any = {
      idempotencyKey: uuid(),
      productId: product.id,
      templateId: product.templateId,
      dimension: dimension,
      quantity: quantity,
      selectedOptions: {},
    };

    Object.keys(selectedOptions).forEach((key) => {
      payload.selectedOptions[key] = {
        variant: {
          id: selectedOptions[key].variant.id,
        },
        selectedOption: {
          value: selectedOptions[key].selectedOption.value,
        },
      };
      if (selectedOptions[key].variant.hasQtyFields) {
        payload.selectedOptions[key].quantity =
          selectedOptions[key].variant.qty;
      }
    });

    try {
      dispatch(setCalculateLoading(true));
      const templatePrice = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/calculate/templatePricing`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token") as string) ||
              "",
          },
        }
      );
      if (templatePrice !== undefined) {
        dispatch(setCalculateTemplatePrice(templatePrice.data));
      } else {
        dispatch(setError("Template not found"));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError((error as any).message));
    } finally {
      dispatch(setCalculateLoading(false));
    }
  };
};

export const handleRejectAcceptQuotation = (
  status: "reject" | "accept",
  quotationId: string,
  reason?: string
): AppThunk => {
  return async (dispatch) => {
    let url = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/products/quotation/accept`;
    let payload: any = {
      quotationId,
    };

    if (status === "reject") {
      payload.reason = reason;
      url = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/products/quotation/reject`;
    }

    try {
      dispatch(setCalculateLoading(true));
      dispatch(setQuotationStatus("loading"));
      const quotationStatus = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string) ||
            "",
        },
      });
      if (quotationStatus.data.success) {
        dispatch(
          setQuotationStatus(
            quotationStatus.data.success ? "success" : "failed"
          )
        );
        toast.success(`Quotation successfully ${status}ed`);
      } else {
        toast.error(quotationStatus.data.message);
      }
    } catch (error: any) {
      const {
        data: { message },
      } = error.response;
      toast.error(message);
    } finally {
      dispatch(setCalculateLoading(false));
      dispatch(getAllHistory());
    }
  };
};

export const handleOpenQuotation = (quotationId: string): AppThunk => {
  return async (dispatch) => {
    let url = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/products/quotation/setToOpen`;
    let payload: any = {
      quotationId,
    };

    try {
      dispatch(setCalculateLoading(true));
      dispatch(setQuotationStatus("loading"));
      const quotationStatus = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string) ||
            "",
        },
      });
      if (quotationStatus.data.success) {
        dispatch(
          setQuotationStatus(
            quotationStatus.data.success ? "success" : "failed"
          )
        );
        toast.success('Quotation status has been set to "Open"');
      } else {
        toast.error(quotationStatus.data.message);
      }
    } catch (error: any) {
      const {
        data: { message },
      } = error.response;
      toast.error(message);
    } finally {
      dispatch(setCalculateLoading(false));
      dispatch(getAllHistory());
    }
  };
};

export const getProductInvoices = (userId: string): AppThunk => async (dispatch) => {
  try {
    const data = await getProductInvoicesFromDB(userId);
    if(data) {
      console.log('invoices', data)
      dispatch(setProductInvoices(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getShippingCompany = (): AppThunk => async (dispatch) => {
  try {
    const data = await getShippingCompanyFromDB();
    if(data) {
      dispatch(setShippingCompany(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentStatus = (paymentId: string): AppThunk => async (dispatch) => {
  try {
    const data = await getPaymentStatusFromDB(paymentId);
    if(data) {
      dispatch(setPaymentStatus(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export default ProductSlice.reducer;
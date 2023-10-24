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
  getAllProductsListFromDB,
} from "@/db";
import axios from "axios";
import { Product, Template } from "@/types/product";
import Firebase, { getAuth } from "@/configs/firebase";
import { toast } from "react-toastify";
import { Invoices } from "@/types/admin";

const defaultState: {
  products: Product[];
  productCategories: [];
  singleProduct?: any;
  templatePrice: any;
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
  productInvoices: Invoices[];
  shippingCompanies: string[];
  paymentStatus: any;
  calculateProductPricing: any;
} = {
  products: [],
  productCategories: [],
  allProductsLoaded: false,
  singleProduct: [],
  templatePrice: null,
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
  paymentStatus: null,
  calculateProductPricing: null,
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
    setSingleProductPrice: (state, action) => {
      state.singleProduct.productPrice = action.payload;
    },
    setSingleProductTemplatePrice: (state, action) => {
      state.templatePrice = action.payload;
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
    setCalculateProductPricing: (state, action) => {
      state.calculateProductPricing = action.payload;
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
  setSingleProductPrice,
  setSingleProductTemplatePrice,
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
  setPaymentStatus,
  setCalculateProductPricing,
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

export const getAllHistory =
  (email: string): AppThunk =>
  async (dispatch) => {
    try {
      let data = await getStoreInquiryToDB();
      data = data.filter((item: any) => item.email === email);
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
      let data = await getDetailQuotationFromDB(id);
      data = data.filter((item: any) => item.status !== "DRAFT");
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

export const getSearchProduct = (filter: {
  query: string;
  category: string[];
  minPrice: number;
  maxPrice: number;
  valueRange: number[];
}): AppThunk => {
  return async (dispatch) => {
    try {
      let requestBody: any = {};
      if (filter.query) {
        requestBody["query"] = filter.query;
      }
      if (filter.category.length > 0) {
        requestBody["category"] = filter.category;
      }
      if (filter.minPrice) {
        requestBody["minPrice"] = filter.minPrice;
      }
      if (filter.maxPrice) {
        requestBody["maxPrice"] = filter.maxPrice;
      }
      dispatch(setAllProductsLoaded(false));
      dispatch(setProductLoading());
      const data = await axios.post(
        "https://asia-southeast2-garapin-f35ef.cloudfunctions.net/products/search",
        requestBody
      );
      // dispatch(setProducts(data.data.result.map((item: any) => item._source)));
      dispatch(setProducts(data.data.result));
      dispatch(setSearchHits(data.data.hits));

      if (data.data.result.length < 25) {
        console.log("All products loaded");
        dispatch(setScrollId(undefined));
        dispatch(setAllProductsLoaded(true));
      } else {
        dispatch(setScrollId(data.data.scrollId));
      }
      return data.data.result;
    } catch (error) {
      console.log(error);
      dispatch(setError((error as any).message));
    }
  };
};

export const getAllProductNext = (category: string): AppThunk => {
  return async (dispatch, getState) => {
    const { lastProductQuery, products } = getState().product;
    try {
      dispatch(setIsFetchingNext(true));
      dispatch(setAllProductsLoaded(false));
      const data = await getAllProductsNextFromDB(lastProductQuery, category);
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
export const getAllProductList = (): AppThunk => {
  return async (dispatch, getState) => {
    const { lastProductQuery, products } = getState().product;
    try {
      dispatch(setIsFetchingNext(true));
      dispatch(setAllProductsLoaded(false));
      const data = await getAllProductsListFromDB(lastProductQuery);
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
          ...data.data.result,
          // ...data.data.result.map((item: any) => item._source),
        ])
      );

      if (data.data.result.length < 25) {
        dispatch(setScrollId(undefined));
        dispatch(setAllProductsLoaded(true));
      } else {
        dispatch(setScrollId(data.data.scrollId));
      }

      return data.data.result;
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
      const data: any = await getSingleProductFromDB(slug);
      dispatch(
        setSingleProduct({
          ...data,
          productPrice: data.maxPrice,
        })
      );
      dispatch(getProductTemplate(data.templateId!));
      // dispatch(getCalculateProductPricing(data.moq, data.id));
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
    const { product, selectedOptions, quantity, dimension, idempotencyKey } =
      data;
    let payload: any = {
      idempotencyKey: idempotencyKey,
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
        selectedOption: Array.isArray(selectedOptions[key].selectedOption)
          ? selectedOptions[key].selectedOption
          : [selectedOptions[key].selectedOption],
      };
      if (selectedOptions[key].variant.hasQtyFields) {
        payload.selectedOptions[key].quantity =
          selectedOptions[key].variant.qty;
      }

      let dimensions = [
        "hasOwnDimensionW",
        "hasOwnDimensionH",
        "hasOwnDimensionL",
      ];
      if (
        dimensions.some((dimension) => selectedOptions[key].variant[dimension])
      ) {
        payload.selectedOptions[key].ownDimension = {};

        if (selectedOptions[key].variant.hasOwnDimensionW) {
          payload.selectedOptions[key].ownDimension.width =
            selectedOptions[key].variant.ownWidth;
        }

        if (selectedOptions[key].variant.hasOwnDimensionH) {
          payload.selectedOptions[key].ownDimension.height =
            selectedOptions[key].variant.ownHeight;
        }

        if (selectedOptions[key].variant.hasOwnDimensionL) {
          payload.selectedOptions[key].ownDimension.length =
            selectedOptions[key].variant.ownLength;
        }
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
        toast.error("Failed to calculate template price");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response.data.message || "Failed to calculate template price"
      );
    } finally {
      dispatch(setCalculateLoading(false));
    }
  };
};

export const getProductTemplatePriceCart = (data: any): AppThunk => {
  return async (dispatch) => {
    const { product, selectedOptions, quantity, dimension, idempotencyKey } =
      data;

    let payload: any = {
      idempotencyKey: idempotencyKey,
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
        selectedOption: Array.isArray(selectedOptions[key].selectedOption)
          ? selectedOptions[key].selectedOption
          : [selectedOptions[key].selectedOption],
      };
      if (selectedOptions[key].variant.hasQtyFields) {
        payload.selectedOptions[key].quantity =
          selectedOptions[key].variant.qty;
      }

      let dimensions = [
        "hasOwnDimensionW",
        "hasOwnDimensionH",
        "hasOwnDimensionL",
      ];
      if (
        dimensions.some((dimension) => selectedOptions[key].variant[dimension])
      ) {
        payload.selectedOptions[key].ownDimension = {};

        if (selectedOptions[key].variant.hasOwnDimensionW) {
          payload.selectedOptions[key].ownDimension.width =
            selectedOptions[key].variant.ownWidth;
        }

        if (selectedOptions[key].variant.hasOwnDimensionH) {
          payload.selectedOptions[key].ownDimension.height =
            selectedOptions[key].variant.ownHeight;
        }

        if (selectedOptions[key].variant.hasOwnDimensionL) {
          payload.selectedOptions[key].ownDimension.length =
            selectedOptions[key].variant.ownLength;
        }
      }
    });

    try {
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
        return templatePrice.data;
      } else {
        toast.error("Failed to calculate template price");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response.data.message || "Failed to calculate template price"
      );
    }
  };
};

export const handleRejectAcceptQuotation = (
  status: "reject" | "accept",
  quotationId: string,
  email: string,
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
      dispatch(getAllHistory(email));
    }
  };
};

export const handleOpenQuotation = (
  quotationId: string,
  email: string
): AppThunk => {
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
      dispatch(getAllHistory(email));
    }
  };
};

export const getProductInvoices =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      const data = await getProductInvoicesFromDB(userId);
      if (data) {
        dispatch(setProductInvoices(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getShippingCompany = (): AppThunk => async (dispatch) => {
  try {
    const data = await getShippingCompanyFromDB();
    if (data) {
      dispatch(setShippingCompany(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentStatus =
  (paymentId: string): AppThunk =>
  async (dispatch) => {
    try {
      const data = await getPaymentStatusFromDB(paymentId);
      if (data) {
        dispatch(setPaymentStatus(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getCalculateProductPricing = (
  quantity: any,
  productId: string,
  templatePricingIdempotencyKey: string
): AppThunk => {
  return async (dispatch) => {
    if (typeof quantity !== "number") {
      quantity = parseInt(quantity.replace(/[^0-9]/g, ""));
    }
    let payload: any = {
      idempotencyKey: templatePricingIdempotencyKey,
      productId: productId,
      quantity: quantity,
    };

    try {
      dispatch(setCalculateLoading(true));
      const productPricing = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/calculate/productPricing`,
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
      if (productPricing !== undefined) {
        dispatch(setSingleProductPrice(productPricing?.data?.unitPrice));
        dispatch(setSingleProductTemplatePrice(productPricing?.data));
        return productPricing.data;
      } else {
        toast.error("Failed to calculate product price");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response.data.message || "Failed to calculate product price"
      );
    } finally {
      dispatch(setCalculateLoading(false));
    }
  };
};

export const getRecalculateCartRTB = (
  quantity: any,
  productId: string,
  idempotencyKey: string
): AppThunk => {
  return async (dispatch) => {
    if (typeof quantity !== "number") {
      quantity = parseInt(quantity.replace(/[^0-9]/g, ""));
    }
    let payload: any = {
      idempotencyKey: idempotencyKey,
      productId: productId,
      quantity: quantity,
    };

    try {
      dispatch(setCalculateLoading(true));
      const calculation = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/calculate/productPricing`,
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
      if (calculation !== undefined) {
        return calculation.data;
      } else {
        toast.error("Failed to calculate product price");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response.data.message || "Failed to calculate product price"
      );
    } finally {
      dispatch(setCalculateLoading(false));
    }
  };
};

export const getShippingData = async (payload: any) => {
  try {
    const token = await getAuth()?.currentUser?.getIdToken();
    const shipping = await axios.post(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/webShipping/pricing`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return shipping.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message || "Failed to calculate shipping");
  }
};

export default ProductSlice.reducer;

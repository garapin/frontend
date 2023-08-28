import api from "@/configs/api";
import { getAdminProductInvoicesFromDB } from "@/db";
import { AppState, AppThunk } from "@/store";
import { Invoices } from "@/types/admin";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const initialState: {
  invoices: Invoices[];
  invoice: Invoices;
  invoiceModalOpen: boolean;
  invoiceLoadingStatus:  'LOADING' | 'SUCCESS' | 'ERROR';
  singleInvoiceStatus: 'LOADING' | 'SUCCESS' | 'ERROR';
  processingInvoiceId: string[];
} = {
  invoices: [],
  invoice: {} as Invoices,
  invoiceModalOpen: false,
  invoiceLoadingStatus: 'LOADING',
  singleInvoiceStatus: 'LOADING',
  processingInvoiceId: [],
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setInvoiceLoadingStatus: (state, action) => {
      state.invoiceLoadingStatus = action.payload;
    },
    setInvoices: (state, action) => {
      state.invoices = action.payload;
      state.invoiceLoadingStatus = 'SUCCESS';
    },
    setInvoice: (state, action) => {
      state.invoice = action.payload;
      state.singleInvoiceStatus = 'SUCCESS';
    },
    setInvoiceModalOpen: (state, action) => {
      state.invoiceModalOpen = action.payload;
    },
    addProcessingInvoiceId: (state, action) => {
      const copyArray = [...state.processingInvoiceId];
      copyArray.push(action.payload);
      state.processingInvoiceId = copyArray;

    },
    removeProcessingInvoiceId: (state, action) => {
      const copyArray = state.processingInvoiceId.filter(id => id !== action.payload);
      state.processingInvoiceId = copyArray;
    }
  },
});

export const { setInvoiceLoadingStatus, setInvoices, addProcessingInvoiceId, removeProcessingInvoiceId, setInvoice, setInvoiceModalOpen } = adminSlice.actions;

export const selectAdmin = (state: AppState) => state.admin;


export const fetchInvoices = ():AppThunk => async (dispatch) => {
  dispatch(setInvoiceLoadingStatus('LOADING'));
  const data = await getAdminProductInvoicesFromDB();
  dispatch(setInvoices(data));
}

export const processOrder = (orderId: string, invoiceNumber: string):AppThunk => async (dispatch, getState) => {
  getState().admin.processingInvoiceId.find(id => id === orderId) !== undefined ? null : dispatch(addProcessingInvoiceId(orderId));
  try {
    const data = await api.processOrder({invoiceId: orderId});
    toast.success(`Berhasil mengubah status ${invoiceNumber} menjadi "Diproses".`);
    dispatch(fetchInvoices());
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Error saat mengubah status ${invoiceNumber}: ${error.response?.data.message}`);
    } else {
      toast.error(`Error saat mengubah status ${invoiceNumber}: ${error}`);
    }
  }
  
  dispatch(removeProcessingInvoiceId(orderId));
}

export const shipOrder = (orderId: string, invoiceNumber: string):AppThunk => async (dispatch, getState) => {
  getState().admin.processingInvoiceId.find(id => id === orderId) !== undefined ? null : dispatch(addProcessingInvoiceId(orderId));
  try {
    const data = await api.shipOrder({invoiceId: orderId});
    toast.success(`Berhasil mengubah status ${invoiceNumber} menjadi "Dikirim".`);
    dispatch(fetchInvoices());
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(`Error saat mengubah status ${invoiceNumber}: ${error.response?.data.message}`);
    } else {
      toast.error(`Error saat mengubah status ${invoiceNumber}: ${error}`);
    }
  }
  dispatch(removeProcessingInvoiceId(orderId));
}

export default adminSlice.reducer;
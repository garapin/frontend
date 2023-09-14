import { Typography, Grid } from "@mui/material";
import React from "react";
import { getAllHistory, getProductInvoices } from "@/store/modules/products";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import ModalInquiry from "./ModalInquiry";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import OrderDetailModal from "./Admin/OrderDetailModal";
import { setInvoice, setInvoiceModalOpen } from "@/store/modules/admin";
import { invoiceStatus } from "@/const/status";
import TransactionCard from "./TransactionCard";

export default function TransactionList({ currentTab }: any) {
  const [modalInquiry, setModalInquiry] = React.useState<any>({
    open: false,
    data: {},
  });
  const { authUser }: any = useFirebaseAuth();
  const dispatch = useAppDispatch();

  const handleOpen = (data: any) => {
    if (currentTab === "cp") {
      setModalInquiry({
        open: true,
        data: data,
      });
    } else {
      dispatch(setInvoice(data));
      dispatch(setInvoiceModalOpen(true));
    }
  };
  const { history, productInvoices } = useAppSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(getAllHistory(authUser?.email));
    dispatch(getProductInvoices(authUser?.uid));
  }, [authUser, dispatch]);

  let dataHistory = [];

  if (currentTab === "cp") {
    const cpData = history?.filter(
      (val: any) => val?.product?.category === "03"
    );
    dataHistory = cpData;
  }

  if (currentTab === "rtb" || currentTab === "dp") {
    const newData = productInvoices;
    dataHistory = newData;
  }

  return (
    <>
      {dataHistory?.length === 0 ? (
        <Typography
          variant="h6"
          fontWeight={400}
          marginBottom="10px"
          className="text-center"
        >
          No transaction yet.
        </Typography>
      ) : (
        <Grid
          container
          spacing={{
            xs: 2,
            md: 3,
          }}
        >
          {dataHistory?.map(
            (
              val: {
                product: {
                  category: any;
                  img: (string | undefined)[];
                  productName: string;
                  maxPrice: number;
                };
                products?: [
                  {
                    product: {
                      category: any;
                      img: (string | undefined)[];
                      productName: string;
                      maxPrice: number;
                    };
                    qty: number;
                    totalPrice: number;
                    unitPrice: number;
                  }
                ];
                status: string;
                quantity: number;
                orderDescription: string;
                totalPrice?: number;
                paymentLink?: string;
                id: string;
                createdAt: FirebaseDate;
                paymentExpiredAt: FirebaseDate;
              },
              i: number
            ) => {
              const milliseconds =
                val.createdAt?.seconds * 1000 +
                Math.floor(val.createdAt?.nanoseconds / 1000000);
              const dateHistory = new Date(milliseconds);

              let expiredDate: Date | undefined = undefined;
              if (val.paymentExpiredAt) {
                const millisecondsExpired =
                  val.paymentExpiredAt?.seconds * 1000 +
                  Math.floor(val.paymentExpiredAt?.nanoseconds / 1000000);
                expiredDate = new Date(millisecondsExpired);
              }
              return (
                <TransactionCard
                  key={val.id}
                  val={val}
                  currentTab={currentTab}
                  dateHistory={dateHistory}
                  invoiceStatus={invoiceStatus}
                  handleOpen={handleOpen}
                />
              );
            }
          )}

          {currentTab != "cp" && <OrderDetailModal />}

          {currentTab == "cp" && modalInquiry.open && (
            <ModalInquiry modal={modalInquiry} setModal={setModalInquiry} />
          )}
        </Grid>
      )}
    </>
  );
}

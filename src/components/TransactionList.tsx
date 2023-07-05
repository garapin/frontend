import {
  Typography,
  Chip,
} from "@mui/material";
import React from "react";
import { rupiah } from "@/tools/rupiah";
import { Box } from "@mui/system";
import { getAllHistory, getProductInvoices } from "@/store/modules/products";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import ModalInquiry from "./ModalInquiry";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";

export default function TransactionList({ currentTab }: any) {
  const title = (category: any) => {
    if (category === "03") {
      return "Custom Packaging";
    } else if (category === "02") {
      return "Digital Packaging";
    } else {
      return "Ready To Buy";
    }
  };

  const [modalInquiry, setModalInquiry] = React.useState<any>({
    open: false,
    data: {},
  });
  const { authUser }: any = useFirebaseAuth();
  const handleOpen = (data: any) => {
    setModalInquiry({
      open: true,
      data: data,
    });
  };
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(getAllHistory());
  }, [authUser, dispatch]);

  let dataHistory = [];

  if (currentTab === "cp") {
    const cpData = history?.filter(
      (val: any) => val?.product?.category === "03"
    );
    dataHistory = cpData;
  }

  if (currentTab === "rtb") {
    const cpData = history?.filter(
      (val: any) => val?.product?.category === "01"
    );
    dataHistory = cpData;
  }

  if (currentTab === "dp") {
    const cpData = history?.filter(
      (val: any) => val?.product?.category === "02"
    );
    dataHistory = cpData;
  }

  return (
    <Box style={{ border: "1px solid black" }} className="p-6 rounded-xl">
      {dataHistory?.map(
        (
          val: {
            product: {
              category: any;
              img: (string | undefined)[];
              productName: string;
              maxPrice: number;
            };
            status: string;
            quantity: number;
            orderDescription: string;
            createdAt: { seconds: number; nanoseconds: number };
          },
          i: number
        ) => {
          const milliseconds =
            val.createdAt?.seconds * 1000 +
            Math.floor(val.createdAt?.nanoseconds / 1000000);
          const dateHistory = new Date(milliseconds);
          return (
            <Box className={`${i < dataHistory.length - 1 && "mb-5"}`} key={i}>
              <Box
                style={{ border: "1px solid gray" }}
                className="w-full rounded-lg p-6 drop-shadow-2xl shadow-md"
              >
                <Box id="header" className="flex items-center">
                  <Typography fontWeight={600} marginRight="20px">
                    {title(val?.product?.category)}
                  </Typography>
                  <Typography marginRight="20px">
                    {dateHistory.toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>

                  {val?.status && (
                    <Chip
                      label={val?.status}
                      color="success"
                      className="capitalize"
                    />
                  )}
                </Box>
                <Box className="flex items-center justify-between">
                  <Box>
                    <Box className="flex items-center">
                      <img
                        className="w-24 h-24 mr-4 object-contain"
                        src={val?.product?.img?.[0]}
                        alt="img_prod"
                      />
                      <Typography variant="h6" fontWeight={600}>
                        {val?.product?.productName}
                      </Typography>
                    </Box>
                    {currentTab === "cp" ? (
                      <>
                        <Typography>{val.quantity} items</Typography>
                        <Typography marginTop="10px" width="60%">
                          {val?.orderDescription}
                        </Typography>
                      </>
                    ) : null}
                  </Box>
                  {currentTab !== "cp" ? (
                    <>
                      <Box>
                        <Typography>Total Harga</Typography>
                        <Typography>
                          {rupiah(val.quantity * val?.product?.maxPrice)}
                        </Typography>
                      </Box>
                    </>
                  ) : null}
                </Box>
                <Box className="flex justify-end mt-5 mb-3">
                  <button
                    onClick={() => handleOpen(val)}
                    className="border-none outline-none bg-transparent text-[#bb86fc] cursor-pointer"
                  >
                    See Transaction Detail
                  </button>
                </Box>
              </Box>
            </Box>
          );
        }
      )}

      {modalInquiry.open && (
        <ModalInquiry modal={modalInquiry} setModal={setModalInquiry} />
      )}
    </Box>
  );
}

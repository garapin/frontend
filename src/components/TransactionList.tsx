import {
  Typography,
  Chip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { rupiah } from "@/tools/rupiah";
import { Box } from "@mui/system";
import { getAllHistory, getProductInvoices } from "@/store/modules/products";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import ModalInquiry from "./ModalInquiry";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { formatDateTime, numberFormat } from "@/tools/utils";
import OrderDetailModal from "./Admin/OrderDetailModal";
import { setInvoice, setInvoiceModalOpen } from "@/store/modules/admin";
import { invoiceStatus, invoiceStatusColor } from "@/const/status";
import Link from "next/link";
import Firebase from "@/configs/firebase";
import { toDate } from "@/tools/firebaseDate";

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

  // get first category in product invoice cart
  const getFirstCategory = (data: any) => {
    const newData = data?.products?.[0]?.product?.category;
    return newData;
  };

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
    }
    else {
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
    // const cpData = history?.filter(
    //   (val: any) => val?.product?.category === "01"
    // );
    const newData = productInvoices
    dataHistory = newData;
  }

  // if (currentTab === "dp") {
  //   const cpData = history?.filter(
  //     (val: any) => val?.product?.category === "02"
  //   );
  //   dataHistory = cpData;
  // }

  return (
    <>
      {dataHistory?.length === 0 ? (
        <Typography variant="h6" fontWeight={400} marginBottom="10px" className="text-center">
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
                val.createdAt ?.seconds * 1000 +
                Math.floor(val.createdAt ?.nanoseconds / 1000000);
              const dateHistory = new Date(milliseconds);

              let expiredDate: Date | undefined = undefined;
              if (val.paymentExpiredAt) {
                const millisecondsExpired =
                  val.paymentExpiredAt?.seconds * 1000 +
                  Math.floor(val.paymentExpiredAt?.nanoseconds / 1000000);
                expiredDate = new Date(millisecondsExpired);
              }
              return (
                <Grid item md={12} key={val.id}>
                  <Card variant="outlined">
                    <CardActionArea onClick={()=>handleOpen(val)}>
                      <CardContent>
                        <Box id="header" className="flex flex-grow items-center mb-2 sm:justify-between md:justify-normal">
                          <Box className="md:flex flex-grow">

                          <Typography fontWeight={600} marginRight="20px">

                            {title(val?.product?.category??getFirstCategory(val))}
                          </Typography>
                          <Typography marginRight="20px">
                            {dateHistory.toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </Typography>
                          </Box>


                          {val?.status && (
                            <Chip
                              label={invoiceStatus.find( v => v.status === val?.status)?.label}
                              color={invoiceStatusColor(val?.status)}
                              className="capitalize"
                            />
                          )}
                        </Box>
                        <Box className="md:flex justify-between items-center">
                          <Box className="flex items-center gap-2">
                            <img
                              src={val?.product?.img?.[0]??val?.products?.[0]?.product?.img?.[0]}
                              alt="img_prod"
                              className="w-40 rounded-md"
                            />
                            <Box>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {val?.product?.productName??val?.products?.[0]?.product?.productName}
                              </Typography>
                              {/* {currentTab === "cp" || current ? ( */}
                                <>
                                  <Typography>{numberFormat(val.quantity??val.products?.reduce((val, data) => val + Number(data.qty), 0))} item(s) {currentTab !== 'cp' && (<><br />{val.products?.length} product(s)</>)}</Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {val?.orderDescription}
                                  </Typography>
                                </>
                              {/* ) : null} */}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              borderLeft: {md: "1px solid #e0e0e0", sm:0},
                              paddingLeft: {md: "20px", sm:0},
                            }}
                          >
                            {currentTab !== "cp" ? (
                              <>
                                <Box className="flex md:block gap-2 items-baseline mt-5 md:mt-0">
                                  <Typography>Total Harga</Typography>
                                  <Typography
                                    variant='h5'
                                    className="font-bold text-[1.1rem] md:text-xl"
                                  >
                                    {rupiah(
                                      (val.quantity ? (val.quantity * val?.product?.maxPrice) : val.totalPrice) ?? 0
                                    )}
                                  </Typography>
                                </Box>
                              </>
                            ) : null}
                          </Box>
                        </Box>
                        <Grid container sx={{mt:3}}>
                          <Grid item xs={12} md={8}>
                            {val.status === "checkout" && (
                              <>
                                <Typography variant="body2">
                                  Selesaikan pembayaran sebelum
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className="font-bold"
                                >
                                  {formatDateTime(toDate(val.paymentExpiredAt))}
                                </Typography>
                              </>
                            )}
                          </Grid>
                          <Grid item xs={12} md={4} className="flex w-full justify-end" gap={2}>
                            { val.status === "checkout" && currentTab !== "cp" && val.paymentLink && (
                              <Link href={val.paymentLink}>
                                <Button
                                  size="medium"
                                  variant="contained"
                                  color="primary"
                                  className="py-2"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Bayar Sekarang
                                </Button>
                              </Link>
                            )}
                            <Button
                              size="medium"
                              variant="text"
                              color="primary"
                              className="py-2"
                              onClick={() => handleOpen(val)}
                            >
                              See Transaction Detail
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            }
          )}

          {currentTab != "cp" && (
            <OrderDetailModal />
          )}

          {currentTab == "cp" && modalInquiry.open && (
            <ModalInquiry modal={modalInquiry} setModal={setModalInquiry} />
          )}
        </Grid>
      )}
    </>
  );
}

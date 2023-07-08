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
            <Grid item md={12}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Box id="header" className="flex items-center mb-2">
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
                    <Box className="flex justify-between items-center">
                      <Box className="flex items-center gap-2">
                        <img
                          src={val?.product?.img?.[0]}
                          alt="img_prod"
                          className="w-40 rounded-md"
                        />
                        <Box>
                          <Typography gutterBottom variant="h5" component="div">
                            {val?.product?.productName}
                          </Typography>
                          {currentTab === "cp" ? (
                            <>
                              <Typography>{val.quantity} items</Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {val?.orderDescription}
                              </Typography>
                            </>
                          ) : null}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          borderLeft: "1px solid #e0e0e0",
                          paddingLeft: "20px",
                        }}
                      >
                        {currentTab !== "cp" ? (
                          <>
                            <Box>
                              <Typography>Total Harga</Typography>
                              <Typography variant="h5" className="font-bold">
                                {rupiah(val.quantity * val?.product?.maxPrice)}
                              </Typography>
                            </Box>
                          </>
                        ) : null}
                      </Box>
                    </Box>
                    <div className="flex w-full justify-end">
                      <Button
                        size="medium"
                        color="primary"
                        className="py-2"
                        onClick={() => handleOpen(val)}
                      >
                        See Transaction Detail
                      </Button>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        }
      )}

      {modalInquiry.open && (
        <ModalInquiry modal={modalInquiry} setModal={setModalInquiry} />
      )}
    </Grid>
  );
}

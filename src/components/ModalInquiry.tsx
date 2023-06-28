import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CardHorizontal from "./CardHorizontal";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAllHistory,
  getDetailQuotation,
  handleOpenQuotation,
  handleRejectAcceptQuotation,
} from "@/store/modules/products";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { rupiah } from "@/tools/rupiah";

const ModalInquiry = ({ modal, setModal }: any) => {
  const { open, data } = modal;
  const { calculationLoading, quotationStatus } = useAppSelector(
    (state) => state.product
  );
  const handleClose = () => {
    setModal({ open: false, data: null });
  };
  const [confirmReject, setConfirmReject] = React.useState({
    open: false,
    reason: "",
  });
  const dispatch = useAppDispatch();
  //   useEffect(() => {
  //     dispatch(getDetailQuotation(data?.id));
  //   }, [dispatch]);

  const handleShowConfirm = () => {
    setConfirmReject({
      ...confirmReject,
      open: true,
    });
  };

  const handleConfirmReject = async () => {
    await dispatch(
      handleRejectAcceptQuotation("reject", data?.id, confirmReject.reason)
    );
    setConfirmReject({
      open: false,
      reason: "",
    });
    setModal({ open: false, data: null });
  };

  const handleAccept = async () => {
    await dispatch(handleRejectAcceptQuotation("accept", data?.id));
    // await dispatch(handleRejectAcceptQuotation("accept", 'Z8jIxb60yaeyUagzYcRO'));
    setModal({ open: false, data: null });
  };

  return (
    <>
      <Dialog
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        scroll={"paper"}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h5"
              marginBottom="10px"
              fontWeight={600}
              component="h2"
            >
              Custom Packaging Inquiry
            </Typography>
            <Box style={{ cursor: "pointer" }} onClick={() => handleClose()}>
              <CloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            id="transition-modal-description"
            fontWeight={600}
            marginBottom="10px"
            sx={{ mt: 2 }}
            className="text-xl uppercase"
          >
            Inquiry Details
          </Typography>
          <CardHorizontal
            imageUrl={data?.product?.img?.[0]}
            productName={data?.product?.productName}
            price={
              rupiah(data?.product?.minPrice) +
              "-" +
              rupiah(data?.product?.maxPrice)
            }
            location="Jakarta"
            slug={data?.product?.slug}
          />
          <Box className="mt-4">
            <Grid container className="mb-2">
              <Grid item md={4}>
                <Typography variant="body1" className="font-semibold">
                  Quantity
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Typography variant="body1">{data?.quantity}</Typography>
              </Grid>
            </Grid>
            <Grid container className="mb-2">
              <Grid item md={4}>
                <Typography variant="body1" className="font-semibold">
                  Attached File
                </Typography>
              </Grid>
              <Grid item md={8}>
                <Typography variant="body1">
                  {data?.files.map((val: any, i: number) => (
                    <a href={val.url} target="_blank" className="line-clamp-1">
                      {i + 1}. <span className="text-blue-500">{val.url}</span>
                    </a>
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "10px" }} className="mb-6">
            <Typography variant="body1" className="font-semibold mb-2">
              Product Customization:
            </Typography>
            <Grid container spacing={2}>
              {data &&
                Object?.keys(data?.selectedOptions).map((key: any, i) => {
                  const selected: any =
                    data?.selectedOptions[`${key as number}`];
                  return (
                    <Grid item md={6} key={i}>
                      <Box className="shadow-md p-4 rounded-md">
                        <Typography className="font-semibold">{key}</Typography>
                        <Typography>{selected.variant.description}</Typography>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          {selected.selectedOption.imgSrc && (
                            <img
                              src={selected.selectedOption.imgSrc}
                              alt={key}
                              className="w-14 h-14 rounded-sm mr-2"
                            />
                          )}
                          <Typography>
                            {selected.selectedOption.value}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>

          <Divider />
          <Typography
            id="transition-modal-description"
            fontWeight={600}
            marginBottom="10px"
            sx={{ mt: 2 }}
            className="text-xl uppercase"
          >
            Checkout Details
          </Typography>
          <Box className="mb-6">
            <Grid
              container
              spacing={{
                xs: 2,
                md: 4,
              }}
              className="mb-4"
            >
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Nama"
                  disabled
                  value={data.contactName}
                  name={"firstName"}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={{
                xs: 2,
                md: 4,
              }}
              className="mb-4"
            >
              <Grid item md={12}>
                <TextField
                  fullWidth
                  label="Alamat"
                  disabled
                  value={data.address?.completeAddress}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Kode POS"
                  disabled
                  value={data.address?.postalCode}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={{
                xs: 2,
                md: 4,
              }}
              className="mb-4"
            >
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="No. HP/WA"
                  disabled
                  value={data.phoneNumber}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  disabled
                  value={data.email}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={{
                xs: 2,
                md: 4,
              }}
              className="mb-4"
            >
              <Grid item md={12}>
                <TextField
                  fullWidth
                  label="Catatan"
                  disabled
                  multiline
                  rows={4}
                  value={data.orderDescription}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        {data.status === "open" && (
          <DialogActions className="p-4">
            <Grid container>
              <Grid item md={6}></Grid>
              <Grid item md={6}>
                <Grid
                  container
                  spacing={{
                    xs: 2,
                  }}
                >
                  <Grid item md={6}>
                    <Button
                      onClick={handleShowConfirm}
                      variant="contained"
                      className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer`}
                      type="submit"
                      color="error"
                      disabled={Boolean(calculationLoading)}
                    >
                      Reject{" "}
                      {calculationLoading && (
                        <CircularProgress
                          size={18}
                          sx={{
                            marginLeft: "0.5rem",
                          }}
                          color="inherit"
                        />
                      )}
                    </Button>
                  </Grid>
                  <Grid item md={6}>
                    <Button
                      onClick={handleAccept}
                      className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-none w-full cursor-pointer`}
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={Boolean(calculationLoading)}
                    >
                      Accept{" "}
                      {calculationLoading && (
                        <CircularProgress
                          size={18}
                          sx={{
                            marginLeft: "0.5rem",
                          }}
                          color="inherit"
                        />
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogActions>
        )}
      </Dialog>
      <Dialog
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={confirmReject.open}
        onClose={() =>
          setConfirmReject({
            open: false,
            reason: "",
          })
        }
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        scroll={"paper"}
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h5"
              marginBottom="10px"
              fontWeight={600}
              component="h2"
            >
              Confirm Rejection
            </Typography>
            <Box
              style={{ cursor: "pointer" }}
              onClick={() =>
                setConfirmReject({
                  open: false,
                  reason: "",
                })
              }
            >
              <CloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Alasan"
            multiline
            rows={4}
            value={confirmReject.reason}
            onChange={(e) =>
              setConfirmReject({
                ...confirmReject,
                reason: e.target.value,
              })
            }
            error={!confirmReject.reason}
            helperText={
              !confirmReject.reason && "Isi alasan reject terlebih dahulu"
            }
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Grid container>
            <Grid item md={6}></Grid>
            <Grid item md={6} className="flex justify-end">
              <Button
                onClick={handleConfirmReject}
                className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-none w-full cursor-pointer`}
                type="submit"
                variant="contained"
                color="error"
                disabled={!confirmReject.reason || Boolean(calculationLoading)}
              >
                CONFIRM{" "}
                {calculationLoading && (
                  <CircularProgress
                    size={18}
                    sx={{
                      marginLeft: "0.5rem",
                    }}
                    color="inherit"
                  />
                )}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalInquiry;

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CardHorizontal from "./CardHorizontal";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAllHistory,
  getDetailQuotation,
  getShippingCompany,
  handleOpenQuotation,
  handleRejectAcceptQuotation,
} from "@/store/modules/products";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { getProductPrice, rupiah } from "@/tools/rupiah";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import {
  capitalizeString,
  getCategoryLabel,
  numberFormat,
} from "@/tools/utils";
import { Product } from "@/types/product";
import { Close } from "@mui/icons-material";
import CardVertical from "./CardVertical";
import { imagePlaceholder } from "./ProductList/ProductList";

const ModalInquiry = ({ modal, setModal }: any) => {
  const { open, data } = modal;
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { authUser }: any = useFirebaseAuth();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const {
    calculationLoading,
    quotationStatus,
    detailQuotation,
    shippingCompanies,
  } = useAppSelector((state) => state.product);

  const handleClose = () => {
    setModal({ open: false, data: null });
  };
  const [confirmReject, setConfirmReject] = React.useState({
    open: false,
    id: "",
    reason: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDetailQuotation(data.id));
    // dispatch(getDetailQuotation("jDOvSmRgmBCZAhyl9R6Y"));
    dispatch(getShippingCompany());
  }, [dispatch]);

  const handleShowConfirm = (id: string) => {
    setConfirmReject({
      ...confirmReject,
      id: id,
      open: true,
    });
  };

  const handleConfirmReject = async () => {
    await dispatch(
      handleRejectAcceptQuotation(
        "reject",
        confirmReject.id,
        authUser?.email,
        confirmReject.reason
      )
    );
    setConfirmReject({
      open: false,
      reason: "",
      id: "",
    });
    setModal({ open: false, data: null });
  };

  const handleAccept = async (id: string) => {
    await dispatch(handleRejectAcceptQuotation("accept", id, authUser?.email));
    // await dispatch(handleOpenQuotation(id, authUser?.email));
    setModal({ open: false, data: null });
  };

  const BadgeStatus = ({ status }: any) => {
    switch (status) {
      case "REJECTED":
        return (
          <Chip
            label="REJECTED"
            sx={{
              backgroundColor: "#E70011",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "ACCEPTED":
        return (
          <Chip
            label="ACCEPTED"
            sx={{
              backgroundColor: "#316F00",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "OPEN":
        return (
          <Chip
            label="NEW QUOTATION"
            sx={{
              backgroundColor: "#0056BA",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "INVOICE_SAMPLE_ISSUED":
        return (
          <Chip
            label="SAMPLE INVOICE ISSUED"
            sx={{
              backgroundColor: "#DFA40A",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "INVOICE_DP_ISSUED":
        return (
          <Chip
            label="DP INVOICE ISSUED"
            sx={{
              backgroundColor: "#DFA40A",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "INVOICE_FP_ISSUED":
        return (
          <Chip
            label="FULL PAYMENT INVOICE ISSUED"
            sx={{
              backgroundColor: "#DFA40A",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "PAID_DP":
        return (
          <Chip
            label="DP PAID"
            sx={{
              backgroundColor: "#316F00",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "PROCESSED":
        return (
          <Chip
            label="PROCESSED"
            sx={{
              backgroundColor: "#316F00",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "PAID_FP":
        return (
          <Chip
            label="FULLY PAID"
            sx={{
              backgroundColor: "#316F00",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "SHIPPED":
        return (
          <Chip
            label="SHIPPING"
            sx={{
              backgroundColor: "#316F00",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "DELIVERED":
        return (
          <Chip
            label="DELIVERED"
            sx={{
              backgroundColor: "#316F00",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      default:
        return (
          <Chip
            label={status}
            sx={{
              backgroundColor: "#cecdc1",
              color: "#000",
              fontWeight: 600,
            }}
          />
        );
    }
  };

  const formattedNotes = (notes: string) => {
    return notes.replace(/(?:\r\n|\r|\n)/g, "<br />");
  };

  const getCourierByCode = (courierCode: string | any) => {
    const courier: any = shippingCompanies.find(
      (val: any) => val.code === courierCode
    );
    return courier;
  };

  const InfoList = ({ title, value }: any) => {
    return (
      <Box className="space-y-2">
        <Typography className="font-normal text-slate-500">{title}</Typography>
        <Typography className="font-normal break-words">{value}</Typography>
      </Box>
    );
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
        maxWidth="lg"
        // remove margin modal
        PaperProps={{
          sx: {
            m: 0,
            p: 0,
            borderRadius: "0px",
          },
        }}
        fullWidth
      >
        <DialogContent className="bg-slate-50 space-y-6 p-4">
          <Box className="bg-white rounded-xl p-4 space-y-6">
            <Box display="flex" alignItems="center" gap={2}>
              <h2 className="text-[32px] font-semibold">Inquiry Details</h2>
              <IconButton className="ml-auto" onClick={() => handleClose()}>
                <Close />
              </IconButton>
            </Box>
            <Box>
              <div className="flex items-start gap-2">
                <div className="w-full bg-slate-50 p-4 rounded-lg space-y-1 md:flex md:items-center md:gap-4 md:space-y-0 md:max-w-3xl">
                  <img
                    style={{ borderRadius: "20%" }}
                    className="rounded-lg object-cover w-full aspect-video md:w-44 md:h-44"
                    src={data?.product?.img?.[0] || imagePlaceholder}
                    alt="image"
                  />
                  <div className="space-y-1">
                    <Typography
                      className="max-w-[12rem] text-[#713F97] pt-2 font-semibold"
                      fontSize={14}
                      fontWeight={400}
                    >
                      {getCategoryLabel(data?.productCategoryId)}
                    </Typography>
                    <Typography
                      fontSize={17}
                      fontWeight={400}
                      color="text.primary"
                      className="font-semibold"
                    >
                      {data?.product?.productName}
                    </Typography>
                    <Typography
                      fontSize={15}
                      className="font-normal text-slate-500"
                    >
                      SKU: {data?.product?.sku}
                    </Typography>
                  </div>
                </div>
              </div>
            </Box>
            <Box className="space-y-4">
              <InfoList title="Quantity" value={numberFormat(data?.quantity)} />
              <Divider />
              <InfoList
                title="Attached File"
                value={data?.files?.map((val: any, i: number) => (
                  <a
                    href={val.url}
                    target="_blank"
                    className="break-words line-clamp-3"
                  >
                    <span className="text-blue-500">{val.url}</span>
                  </a>
                ))}
              />
              <Divider />
            </Box>
            <Box>
              <Typography
                variant="body1"
                className="font-semibold mb-2 text-slate-600"
              >
                Product Customization:
              </Typography>
              <Grid
                container
                spacing={{
                  xs: 2,
                  md: 3,
                }}
                alignItems="stretch"
                className="space-y-4 md:space-y-0"
              >
                {data &&
                  Object?.keys(data?.selectedOptions).map((key: any, i) => {
                    const selected: any =
                      data?.selectedOptions[`${key as number}`];
                    const keyName = key
                      .split("-")
                      .map(
                        (val: any) => val.charAt(0).toUpperCase() + val.slice(1)
                      )
                      .join(" ");

                    let selectedOptionName;

                    if (!Array.isArray(selected.selectedOption)) {
                      selectedOptionName = selected.selectedOption.name;
                    } else {
                      selectedOptionName = selected.selectedOption
                        .map((val: any) => val.name)
                        .join(", ");
                    }
                    return (
                      <Grid item md={6} lg={4} key={i} className="w-full">
                        <Box className="h-full rounded-md shadow-sm p-4 bg-slate-50">
                          <Typography className="font-semibold">
                            {keyName}
                          </Typography>
                          <Typography>
                            {selected.variant.description}
                          </Typography>
                          <Box
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {selected.selectedOption.imgSrc && (
                              <img
                                src={selected.selectedOption.imgSrc}
                                alt={key}
                                className="w-14 h-14 rounded-sm mr-2"
                              />
                            )}
                            <Typography>
                              Selected:{" "}
                              <span
                                style={{
                                  fontWeight: 600,
                                }}
                              >
                                {selectedOptionName}
                              </span>
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
          </Box>

          {detailQuotation?.length > 0 && (
            <>
              <Typography
                id="transition-modal-description"
                fontWeight={600}
                marginBottom="10px"
                sx={{ mt: 3 }}
                className="text-[28px] font-semibold"
              >
                QUOTATIONS
              </Typography>
              <Box>
                {detailQuotation.map((quotation: any, i: number) => (
                  <Accordion
                    expanded={expanded === quotation.id}
                    onChange={handleChange(quotation.id)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: "50%", flexShrink: 0 }}>
                        Quotation #{detailQuotation.length - i}{" "}
                        <BadgeStatus status={quotation.status} />
                      </Typography>
                      <div className="flex flex-1 justify-between items-center">
                        <Typography sx={{ color: "text.secondary" }}>
                          {quotation.noQuotation}
                        </Typography>
                        {quotation.quotationLink && (
                          <Button
                            variant="outlined"
                            href={quotation.quotationLink}
                            target="_blank"
                          >
                            DOWNLOAD PDF
                          </Button>
                        )}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell className="font-bold uppercase text-gray-500">
                                SKU
                              </TableCell>
                              <TableCell className="font-bold uppercase text-gray-500">
                                Item Name
                              </TableCell>
                              <TableCell className="font-bold uppercase text-gray-500">
                                Specification
                              </TableCell>
                              <TableCell
                                className="font-bold uppercase text-gray-500"
                                align="right"
                              >
                                Qty
                              </TableCell>
                              <TableCell className="font-bold uppercase text-gray-500">
                                UOM
                              </TableCell>
                              <TableCell
                                className="font-bold uppercase text-gray-500"
                                align="right"
                              >
                                Price/Unit
                              </TableCell>
                              <TableCell
                                className="font-bold uppercase text-gray-500"
                                align="right"
                              >
                                Total
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {quotation.items?.map(
                              (
                                val: {
                                  sku: string;
                                  productName: string;
                                  quantity: number;
                                  unitPrice: number;
                                  subtotal: number;
                                  uom: string;
                                  productDescription: string;
                                },
                                i: number
                              ) => (
                                <TableRow
                                  key={i}
                                  className="border-none bg-slate-50"
                                >
                                  <TableCell
                                    className="border-none"
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography>{val.sku}</Typography>
                                  </TableCell>
                                  <TableCell className="border-none">
                                    {val.productName}
                                  </TableCell>
                                  <TableCell className="border-none">
                                    {val.productDescription}
                                  </TableCell>
                                  <TableCell
                                    className="border-none"
                                    align="right"
                                  >
                                    {val.quantity}
                                  </TableCell>
                                  <TableCell className="border-none">
                                    {val.uom}
                                  </TableCell>
                                  <TableCell
                                    className="border-none"
                                    align="right"
                                  >
                                    {rupiah(val.unitPrice)}
                                  </TableCell>
                                  <TableCell
                                    className="border-none"
                                    align="right"
                                  >
                                    {rupiah(val.subtotal)}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                            <TableRow>
                              <TableCell
                                className="border-none "
                                scope="row"
                                colSpan={7}
                              >
                                <Grid container>
                                  <Grid item xs={6}>
                                    <Typography>
                                      Subtotal ({quotation.items?.length} Items)
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className="float-right">
                                      {rupiah(
                                        quotation.items.reduce(
                                          (a: any, b: any) => a + b.subtotal,
                                          0
                                        )
                                      )}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid item xs={6}>
                                    <Typography>Shipping Cost</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className="float-right">
                                      {rupiah(quotation.shipping.cost)}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    md={12}
                                    className="flex items-center"
                                  >
                                    {getCourierByCode(
                                      quotation.shipping.courier
                                    )?.img && (
                                      <img
                                        src={
                                          getCourierByCode(
                                            quotation.shipping.courier
                                          )?.img
                                        }
                                        alt="kurir"
                                        className="w-10 max-h-7 mr-1"
                                      />
                                    )}
                                    <Typography className="break-words">
                                      {`${capitalizeString(
                                        quotation.shipping.courier
                                      )}-${capitalizeString(
                                        quotation.shipping.service
                                      )}`}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                {quotation.vat.enabled && (
                                  <Grid container>
                                    <Grid item xs={6}>
                                      <Typography>PPN (11%)</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography className="float-right">
                                        {rupiah(quotation.vat.cost)}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                )}
                                <Grid container>
                                  <Grid item xs={6}>
                                    <Typography className="font-bold">
                                      Total
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography className="float-right font-bold">
                                      {rupiah(
                                        quotation.items.reduce(
                                          (a: any, b: any) => a + b.subtotal,
                                          0
                                        ) +
                                          quotation.shipping.cost +
                                          quotation.vat.cost
                                      )}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Box className="mt-4">
                        <Box className="mb-4">
                          <Typography variant="body1">Remarks</Typography>
                          <Typography
                            variant="body1"
                            className="max-w-xl text-slate-500"
                          >
                            {quotation.remarks}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">Notes</Typography>
                          <Typography
                            variant="body1"
                            className="max-w-xl text-slate-500"
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: formattedNotes(quotation.notes),
                              }}
                            />
                          </Typography>
                        </Box>
                      </Box>
                      {quotation?.statusREJECTEDReason && (
                        <Box className="mt-4 border border-solid border-slate-400 rounded-md p-4">
                          <Typography
                            variant="body1"
                            className="max-w-xl text-slate-500"
                          >
                            {" "}
                            Decline Reason: {quotation.statusREJECTEDReason}
                          </Typography>
                        </Box>
                      )}
                      <Box></Box>
                      {quotation.status === "OPEN" && (
                        <DialogActions className="p-4 mt-4 border border-solid border-slate-300 rounded-md">
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
                                    onClick={() =>
                                      handleShowConfirm(quotation.id)
                                    }
                                    variant="outlined"
                                    className={`text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer`}
                                    type="submit"
                                    color="primary"
                                    disabled={Boolean(calculationLoading)}
                                  >
                                    DECLINE QUOTATION{" "}
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
                                    onClick={() => handleAccept(quotation.id)}
                                    className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-none w-full cursor-pointer`}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={Boolean(calculationLoading)}
                                  >
                                    ACCEPT QUOTATION{" "}
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
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={confirmReject.open}
        onClose={() =>
          setConfirmReject({
            open: false,
            reason: "",
            id: "",
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
                  id: "",
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

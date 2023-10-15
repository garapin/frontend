import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AddressPicker from "@/components/AddressPicker";
import { useFormik } from "formik";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useRouter } from "next/router";
import { rupiah } from "@/tools/rupiah";
import { i18n, useTranslation } from "next-i18next";
import API from "@/configs/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { getShippingCompany } from "@/store/modules/products";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { getCategoryLabel } from "@/tools/utils";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function CheckoutPage() {
  const auth = useFirebaseAuth();
  const router = useRouter();
  const myData: any = localStorage.getItem("checkout_data");
  const [checkoutData, setCheckoutData] = useState<any>(JSON.parse(myData));
  const dispatch = useAppDispatch();
  const priceItem = checkoutData
    .map((val: { totalPrice: number }) => val.totalPrice)
    ?.reduce((acc: any, curr: any) => acc + curr);
  const totalWeight = checkoutData
    .map((val: { weight: { totalWeight: number } }) => val.weight?.totalWeight)
    ?.reduce((acc: any, curr: any) => acc + curr);

  const [shipment, setShipment] = useState([]);
  const { shippingCompanies } = useAppSelector((state) => state.product);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [addressMap, setAddressMap] = useState<any>({
    postalCode: "",
    completeAddress: "",
    latLong: { lat: "", lng: "" },
  });
  const [cardDetail, setCardDetail] = useState<any>({
    open: false,
    data: {},
  });
  const [ship, setShip] = React.useState({
    courier_name: "",
    courier_service_name: "",
    courier_code: "",
    courier_service_code: "",
    type: "",
    price: 0,
    duration: "",
    insurance_fee: 0,
  });
  const [shipPrice, setShipPrice] = useState(0);
  const [dataPaymnet, setDataPayment] = useState(0);

  useEffect(() => {
    dispatch(getShippingCompany());
  }, []);

  const courierShipment = ship?.courier_name + " " + ship?.courier_service_name;

  const handleChange = (event: any) => {
    setShip(event.target.value);
    setShipPrice(event.target.value?.price + event.target.value?.insurance_fee);
  };

  const refundedId = checkoutData.map((val: any) => val.id);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: auth.authUser?.displayName ?? "",
      phoneNumber: auth.authUser?.phoneNumber ?? "",
      city: "",
      zipCode: "",
      country: "Indonesia",
      addressNote: "",
      notes: "",
      shippingCompany: null,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Contact Name is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      city: Yup.string().required("City is required"),
      zipCode: Yup.string().required("Zip Code is required"),
      country: Yup.string().required("Country is required"),
      addressNote: Yup.string().optional(),
      notes: Yup.string().optional(),
      shippingCompany: Yup.string().required("Shipping Company is required"),
    }),
    onSubmit: async (values) => {
      try {
        setBusy(true);
        const dataPay = {
          cartIds: refundedId,
          shippingDetails: {
            fullName: `${values.fullName}`,
            address: addressMap.completeAddress,
            phoneNumber: values.phoneNumber,
            latLong: {
              lat: addressMap.latLong?.lat,
              lng: addressMap.latLong?.lng,
            },
            postalCode: values.zipCode,
            addressNote: values.addressNote,
            totalWeight: totalWeight,
            notes: values.notes,
          },
          shippingMethod: {
            courierCode: ship?.courier_code,
            courierName: ship?.courier_name,
            serviceCode: ship?.courier_service_code,
            serviceName: ship?.courier_service_name,
            type: ship?.type,
            duration: ship?.duration,
            price: ship.price,
            insuranceFee: ship?.insurance_fee,
          },
        };

        API.paymentApi(dataPay)
          .then((response) => {
            setDataPayment(response.data);
            toast.success(
              "Pesanan berhasil dibuat, mengarahkan ke halaman pembayaran..."
            );
            setTimeout(() => {
              window.open(`${response?.data?.paymentLink}`, "_self");
            }, 1000);
            setBusy(false);
          })
          .catch((error) => {
            console.error(error);
            setBusy(false);
          });
      } catch (e: any) {
        console.error(e);
        toast.error(e.message);
        setBusy(false);
      }
    },
  });

  const handleGetShippingCompanyService = (courierCode: string | any) => {
    const payload = {
      weight: totalWeight,
      destination_postal: formik.values.zipCode,
      destination_lat: addressMap.latLong?.lat,
      destination_long: addressMap.latLong?.lng,
      totalPrice: priceItem,
      courier_code: courierCode,
    };

    setShippingLoading(true);
    API.getShipping(payload)
      .then((response) => {
        setShipment(response.data);
      })
      .catch((error) => {
        toast.error(
          "Pengiriman menggunakan kurir ini tidak tersedia, mohon pilih kurir lainnya"
        );
        setShipment([]);
      })
      .finally(() => {
        setShippingLoading(false);
      });
  };

  const getCourierByCode = (courierCode: string | any) => {
    const courier: any = shippingCompanies.find(
      (val: any) => val.code === courierCode
    );
    return courier;
  };

  return (
    <div className="bg-slate-50 md:py-4">
      <Box className="max-w-screen-2xl mx-auto p-4 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Box className="bg-white rounded-xl py-8">
            <Container maxWidth="xl" className="px-4 md:px-8 space-y-4">
              <Typography
                fontSize={32}
                color="text.primary"
                className="pb-2 font-semibold"
              >
                Order Saya
              </Typography>

              {checkoutData?.map((val: any) => (
                <Box>
                  <div className="flex items-start gap-2">
                    <div className="w-full bg-slate-50 p-4 rounded-lg space-y-2">
                      <div
                        className="
                          md:flex md:items-center md:gap-4"
                      >
                        <img
                          style={{ borderRadius: "20%" }}
                          className="rounded-lg object-cover w-full aspect-video md:w-44 md:h-44"
                          src={val?.product?.img?.[0] || imagePlaceholder}
                          alt="image"
                        />
                        <div className="md:flex md:items-center md:gap-4 md:justify-between w-full">
                          <div className="space-y-2 md:w-full">
                            <Typography
                              className="max-w-[12rem] text-[#713F97] pt-2 font-semibold"
                              fontSize={14}
                              fontWeight={400}
                            >
                              {getCategoryLabel(val?.productCategoryId)}
                            </Typography>
                            <Typography
                              fontSize={17}
                              fontWeight={400}
                              color="text.primary"
                              className="font-semibold"
                            >
                              {val?.product?.productName}
                            </Typography>
                            <Typography className="text-sm text-slate-600">
                              {rupiah(val.totalPrice)}
                            </Typography>
                            <Box className="space-y-4 md:hidden">
                              {val?.productCategoryId == 2 && (
                                <>
                                  <Button
                                    variant="contained"
                                    className="capitalize"
                                    fullWidth
                                    onClick={() => {
                                      if (val.id == cardDetail?.data?.id) {
                                        setCardDetail({
                                          open: false,
                                          data: {},
                                        });
                                      } else {
                                        setCardDetail({
                                          open: true,
                                          data: val,
                                        });
                                      }
                                    }}
                                  >
                                    Detail
                                  </Button>
                                </>
                              )}
                              {val?.productCategoryId == 2 &&
                                cardDetail?.open &&
                                cardDetail?.data?.id == val?.id &&
                                Object?.keys(val?.selectedOptions).map(
                                  (key: any, i) => {
                                    const selected: any =
                                      val?.selectedOptions[`${key as number}`];
                                    const keyName = key
                                      .split("-")
                                      .map(
                                        (val: any) =>
                                          val.charAt(0).toUpperCase() +
                                          val.slice(1)
                                      )
                                      .join(" ");

                                    let selectedOptionName;

                                    if (
                                      !Array.isArray(selected.selectedOption)
                                    ) {
                                      selectedOptionName =
                                        selected.selectedOption.name;
                                    } else {
                                      selectedOptionName =
                                        selected.selectedOption
                                          .map((val: any) => val.name)
                                          .join(", ");
                                    }
                                    return (
                                      <Fade in={cardDetail.open} timeout={500}>
                                        <Grid
                                          item
                                          md={6}
                                          key={i}
                                          className="w-full"
                                        >
                                          <Typography className="font-medium text-slate-600 text-sm">
                                            {keyName}
                                          </Typography>
                                          <Box
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Typography className="font-medium text-[#713F97] text-sm">
                                              {selectedOptionName}
                                            </Typography>
                                          </Box>
                                        </Grid>
                                      </Fade>
                                    );
                                  }
                                )}
                            </Box>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        {val?.productCategoryId == 2 && (
                          <>
                            <div className="flex items-center justify-end">
                              <Button
                                className="capitalize"
                                onClick={() => {
                                  if (val.id == cardDetail?.data?.id) {
                                    setCardDetail({
                                      open: false,
                                      data: {},
                                    });
                                  } else {
                                    setCardDetail({
                                      open: true,
                                      data: val,
                                    });
                                  }
                                }}
                                endIcon={
                                  cardDetail?.open ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )
                                }
                              >
                                Detail
                              </Button>
                            </div>
                            <Divider />
                          </>
                        )}
                        <div className="hidden md:block mt-4">
                          {val?.productCategoryId == 2 &&
                            cardDetail?.open &&
                            cardDetail?.data?.id == val?.id &&
                            Object?.keys(val?.selectedOptions).map(
                              (key: any, i) => {
                                const selected: any =
                                  val?.selectedOptions[`${key as number}`];
                                const keyName = key
                                  .split("-")
                                  .map(
                                    (val: any) =>
                                      val.charAt(0).toUpperCase() + val.slice(1)
                                  )
                                  .join(" ");

                                let selectedOptionName;

                                if (!Array.isArray(selected.selectedOption)) {
                                  selectedOptionName =
                                    selected.selectedOption.name;
                                } else {
                                  selectedOptionName = selected.selectedOption
                                    .map((val: any) => val.name)
                                    .join(", ");
                                }
                                return (
                                  <Fade in={cardDetail.open} timeout={500}>
                                    <Grid
                                      item
                                      md={6}
                                      key={i}
                                      className="w-full"
                                    >
                                      <Typography className="font-medium text-slate-600 text-sm">
                                        {keyName}
                                      </Typography>
                                      <Box
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography className="font-medium text-[#713F97] text-sm">
                                          {selectedOptionName}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </Fade>
                                );
                              }
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              ))}
            </Container>
          </Box>

          <Box className="bg-white rounded-xl py-8">
            <form>
              <Container maxWidth="xl" className="px-4 lg:px-8 space-y-4">
                <Typography
                  fontSize={32}
                  color="text.primary"
                  className="pb-2 font-semibold"
                >
                  Address Detail
                </Typography>

                <div className="space-y-2">
                  <Typography className="text-base font-medium text-slate-600">
                    Nama Lengkap
                  </Typography>
                  <TextField
                    fullWidth
                    // label="Nama Lengkap"
                    placeholder="Masukkan Nama Lengkap Anda"
                    error={
                      formik.touched.fullName && Boolean(formik.errors.fullName)
                    }
                    helperText={
                      Boolean(formik.touched.fullName) && formik.errors.fullName
                    }
                    value={formik.values.fullName}
                    name={"fullName"}
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Typography className="text-base font-medium text-slate-600">
                    Nomor Handphone
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Masukan Nomor Hp atau Wa"
                    value={formik.values.phoneNumber}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      Boolean(formik.errors) && formik.errors.phoneNumber
                    }
                    name={"phoneNumber"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Typography className="text-base font-medium text-slate-600">
                    Alamat Pembeli
                  </Typography>
                  <AddressPicker
                    label={"Alamat Pembeli"}
                    onLocationSelect={(place) => {
                      const postalCode = place.address_components?.find(
                        (component: any) => {
                          return component.types.includes("postal_code");
                        }
                      )?.long_name;
                      const completeAddress = place.formatted_address;
                      const geometry = place?.geometry?.location;
                      let latLong = { lat: "", lng: "" };
                      if (geometry != undefined) {
                        latLong = {
                          lat: geometry.lat().toString(),
                          lng: geometry.lng().toString(),
                        };
                      }
                      const objAddress = {
                        completeAddress,
                        postalCode,
                        latLong,
                      };

                      const city = place.address_components?.find(
                        (component: any) => {
                          return component.types.includes(
                            "administrative_area_level_1"
                          );
                        }
                      )?.long_name;
                      const country = place.address_components?.find(
                        (component: any) => {
                          return component.types.includes("country");
                        }
                      )?.long_name;

                      formik.setFieldValue("city", city, true);
                      formik.setFieldValue("country", country);
                      formik.setFieldValue("zipCode", postalCode, true);
                      setTimeout(() => formik.setFieldTouched("city", true));
                      setTimeout(() => formik.setFieldTouched("zipCode", true));

                      setAddressMap(objAddress);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Typography className="text-base font-medium text-slate-600">
                    Keterangan Alamat
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Masukan Keterangan Alamat"
                    error={
                      formik.touched.addressNote &&
                      Boolean(formik.errors.addressNote)
                    }
                    helperText={
                      Boolean(formik.touched.addressNote) &&
                      formik.errors.addressNote
                    }
                    value={formik.values.addressNote}
                    name={"addressNote"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="lg:flex lg:items-center lg:gap-4 w-full space-y-4 lg:space-y-0">
                  <div className="space-y-2 lg:flex-1">
                    <Typography className="text-base font-medium text-slate-600">
                      Kota
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Masukan Kota Anda"
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={
                        Boolean(formik.touched.city) && formik.errors.city
                      }
                      value={formik.values.city}
                      name={"city"}
                      required
                      InputLabelProps={{ shrink: Boolean(formik.values.city) }}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="space-y-2 lg:flex-1">
                    <Typography className="text-base font-medium text-slate-600">
                      Kode POS
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Masukan Kode Pos Kota Anda"
                      error={
                        formik.touched.zipCode && Boolean(formik.errors.zipCode)
                      }
                      helperText={
                        Boolean(formik.touched.zipCode) && formik.errors.zipCode
                      }
                      value={formik.values.zipCode}
                      name={"zipCode"}
                      required
                      InputLabelProps={{
                        shrink: Boolean(formik.values.zipCode),
                      }}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Typography className="text-base font-medium text-slate-600">
                    Negara
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Masukan Negara Anda"
                    disabled
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                    helperText={
                      Boolean(formik.touched.country) && formik.errors.country
                    }
                    value={formik.values.country}
                    name={"country"}
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Typography className="text-base font-medium text-slate-600">
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Masukan Alamat Email Anda"
                    name="email"
                    value={auth.authUser?.email}
                    disabled
                    InputLabelProps={{ shrink: Boolean(auth.authUser?.email) }}
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
                {addressMap.completeAddress.length > 0 && (
                  <div className="space-y-2">
                    <Typography className="text-base font-medium text-slate-600">
                      Ekspedisi Pengiriman
                    </Typography>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.shippingCompany}
                      fullWidth
                      placeholder="Pilih Ekspedisi"
                      onChange={(e) => {
                        formik.setFieldValue("shippingCompany", e.target.value);
                        handleGetShippingCompanyService(e.target.value);
                      }}
                    >
                      {shippingCompanies?.map((shipping: any, i: any) => (
                        <MenuItem value={shipping.code} key={i}>
                          <Box className="flex items-center">
                            <img
                              src={
                                shipping.img ||
                                "https://www.eggsnsoldiers.com/media/catalog/product/placeholder/default/EnS-product-coming-soon.jpg"
                              }
                              alt={shipping.code}
                              className="w-10 mr-2 max-h-8"
                            />
                            <Box sx={{ fontWeight: 600 }}>{shipping.name}</Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}

                {addressMap.completeAddress.length > 0 &&
                  formik.values.shippingCompany && (
                    <div className="space-y-2">
                      <Typography className="text-base font-medium text-slate-600">
                        Paket Pengiriman
                      </Typography>
                      {formik.values.shippingCompany && (
                        <FormControl fullWidth className="relative">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={shippingLoading ? "" : ship}
                            disabled={shippingLoading}
                            fullWidth
                            placeholder="Pilih Paket"
                            onChange={handleChange}
                          >
                            {shipment?.map((val: any, i: any) => (
                              <MenuItem value={val} key={i}>
                                <Box className="flex justify-between">
                                  <Box sx={{ fontWeight: 600, marginRight: 6 }}>
                                    {`${val.courier_name} ${val.courier_service_name}`}
                                  </Box>
                                  <Box className="pl-2">
                                    {`${rupiah(val?.price)} (${
                                      val?.shipment_duration_range
                                    } ${val?.shipment_duration_unit})`}
                                  </Box>
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                          {shippingLoading && (
                            <CircularProgress
                              color="inherit"
                              size="24px"
                              className="absolute top-4 right-8"
                            />
                          )}
                        </FormControl>
                      )}
                    </div>
                  )}

                <div className="space-y-2">
                  <Typography className="text-base font-medium text-slate-600">
                    Catatan
                  </Typography>
                  <TextField
                    fullWidth
                    name="notes"
                    placeholder="Letakkan paket di depan pintu"
                    error={formik.touched.notes && Boolean(formik.errors.notes)}
                    helperText={
                      Boolean(formik.touched.notes) && formik.errors.notes
                    }
                    multiline
                    rows={4}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </div>
              </Container>
            </form>
          </Box>
        </div>
        <Box className="lg:col-span-4">
          <Box className="bg-white rounded-xl py-8">
            <Container maxWidth="xl" className="px-4 lg:px-6 space-y-4">
              <Typography
                fontSize={32}
                color="text.primary"
                className="pb-2 font-semibold"
              >
                Order Summary
              </Typography>

              <Box className="flex items-center justify-between">
                <Typography className="font-semibold text-lg text-slate-600">
                  Order
                </Typography>
                <Typography className="font-semibold text-lg">
                  {rupiah(priceItem)}
                </Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography className="font-semibold text-lg text-slate-600">
                  Delivery
                </Typography>
                <Typography className="flex items-center">
                  {getCourierByCode(ship.courier_code)?.img && (
                    <img
                      src={getCourierByCode(ship.courier_code)?.img}
                      alt="kurir"
                      className="w-10 max-h-7 mr-1"
                    />
                  )}
                  {courierShipment}
                </Typography>
              </Box>

              <Box className="flex items-center justify-between">
                <Typography className="font-semibold text-lg text-slate-600">
                  Tax
                </Typography>
                <Typography className="font-semibold text-lg">
                  {rupiah(priceItem * 0.11)}
                </Typography>
              </Box>
              {ship && (
                <>
                  <Box className="flex items-center justify-end">
                    <Typography className="font-semibold text-lg">
                      {rupiah(ship.price)}
                    </Typography>
                  </Box>

                  <Box className="flex items-center justify-between">
                    <Typography className="font-semibold text-lg text-slate-600">
                      Insurance
                    </Typography>
                    <Typography className="font-semibold text-lg">
                      {rupiah(ship.insurance_fee)}
                    </Typography>
                  </Box>
                </>
              )}
              <Box className="flex items-center justify-between">
                <Typography className="font-semibold text-lg text-slate-600">
                  Tax
                </Typography>
                <Typography className="font-semibold text-lg">
                  {rupiah(priceItem * 0.11)}
                </Typography>
              </Box>
              <Divider className="my-3" />
              <Box className="flex items-center justify-between">
                <Typography className="font-semibold text-lg">
                  Sub Total
                </Typography>
                <Typography className="float-right font-semibold text-lg">
                  {rupiah(priceItem + shipPrice + priceItem * 0.11)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={formik.submitForm}
                type="submit"
                className="py-3 capitalize"
                disabled={busy || !formik.isValid}
              >
                {busy ? (
                  <span className="flex items-center gap-1">
                    <CircularProgress color="inherit" size={20} />
                    Memproses pesanan
                  </span>
                ) : (
                  "Lanjut Pembayaran"
                )}
              </Button>
            </Container>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

CheckoutPage.guestGuard = false;
CheckoutPage.authGuard = true;

export default CheckoutPage;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["products", "common"])),
    },
  };
};

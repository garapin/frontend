import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
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

interface addressMap {
  postalCode?: string;
  completeAddress: string;
  latLong?: { lat: string; lng: string };
}

function CheckoutPage() {
  const auth = useFirebaseAuth();
  const router = useRouter();
  const myData: any = localStorage.getItem("checkout_data");
  const checkoutData = JSON.parse(myData);
  const dispatch = useAppDispatch();
  const priceItem = checkoutData
    .map((val: { totalPrice: number }) => val.totalPrice)
    ?.reduce((acc: any, curr: any) => acc + curr);
  const [shipment, setShipment] = useState([]);
  const { shippingCompanies } = useAppSelector((state) => state.product);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [addressMap, setAddressMap] = useState<any>({
    postalCode: "",
    completeAddress: "",
    latLong: { lat: "", lng: "" },
  });
  const [ship, setShip] = React.useState({
    courier_name: "",
    courier_service_name: "",
    courier_code: "",
    courier_service_code: "",
    type: "",
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
      firstName: auth.authUser?.displayName?.split(" ")[0] ?? "",
      lastName: auth.authUser?.displayName?.split(" ")[1] ?? "",
      phoneNumber: auth.authUser?.phoneNumber ?? "",
      email: auth.authUser?.email ?? "",
      city: "",
      zipCode: "",
      country: "Indonesia",
      addressNote: "",
      notes: "",
      shippingCompany: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Contact Name is required"),
      lastName: Yup.string().required("Contact Name is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      email: Yup.string().required("Email is required"),
      city: Yup.string().required("City is required"),
      zipCode: Yup.string().required("Zip Code is required"),
      country: Yup.string().required("Country is required"),
      addressNote: Yup.string().optional(),
      notes: Yup.string().optional(),
      shippingCompany: Yup.object().required("Shipping Company is required"),
    }),
    onSubmit: async (values) => {
      try {
        const dataPay = {
          cartIds: refundedId,
          shippingDetails: {
            fullName: `${values.firstName} ${values.lastName}`,
            address: addressMap.completeAddress,
            phoneNumber: values.phoneNumber,
            latLong: {
              lat: addressMap.latLong?.lat,
              lng: addressMap.latLong?.lng,
            },
            postalCode: values.zipCode,
            addressNote: values.addressNote,
            totalWeight: 2500,
            notes: values.notes,
          },
          shippingMethod: {
            courierCode: ship?.courier_code,
            courierName: ship?.courier_name,
            serviceCode: ship?.courier_service_code,
            serviceName: ship?.courier_service_name,
            type: ship?.type,
            duration: ship?.duration,
            price: priceItem + shipPrice,
            insuranceFee: ship?.insurance_fee,
          },
        };

        API.paymentApi(dataPay)
          .then((response) => {
            setDataPayment(response.data);
            window.open(`${response?.data?.paymentLink}`, "_self");
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e: any) {
        console.error(e);
        toast.error(e.message);
      }
    },
  });

  const handleGetShippingCompanyService = (courierCode: string | any) => {
    const payload = {
      weight: 2500,
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
        console.error(error);
      })
      .finally(() => {
        setShippingLoading(false);
      });
  };

  return (
    <Grid
      container
      className="mx-auto md:max-w-[90vw]"
      spacing={{
        xs: 2,
        md: 4,
      }}
    >
      <Grid item md={8} className="w-full mx-auto mt-24 mb-10 rounded-lg">
        <Box className="shadow-xl mt-4 p-6">
          <Typography className="text-4xl font-bold mb-6">
            Address Detail
          </Typography>
          <Typography className="text-2xl font-bold mb-6">
            Delivery Detail
          </Typography>
          <form>
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
                  label="Nama Depan"
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    Boolean(formik.touched.firstName) && formik.errors.firstName
                  }
                  value={formik.values.firstName}
                  name={"firstName"}
                  required
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Nama Belakang"
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={
                    Boolean(formik.touched.lastName) && formik.errors.lastName
                  }
                  value={formik.values.lastName}
                  name={"lastName"}
                  required
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Grid container className="mb-4 pr-2">
              <Grid item md={10}>
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
                  label="Kota"
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
              </Grid>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  label="Kode POS"
                  error={
                    formik.touched.zipCode && Boolean(formik.errors.zipCode)
                  }
                  helperText={
                    Boolean(formik.touched.zipCode) && formik.errors.zipCode
                  }
                  value={formik.values.zipCode}
                  name={"zipCode"}
                  required
                  InputLabelProps={{ shrink: Boolean(formik.values.zipCode) }}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
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
                  label="Negara"
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
                  label="Keterangan Alamat"
                  placeholder="A green fence house has a big tree in front of it"
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
                  label="Nomor HP/WA"
                  placeholder="081234567890"
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
                  label="Email"
                  name="email"
                  placeholder="emailanda@nama-perusahaan.co.id"
                  required
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={
                    Boolean(formik.touched.email) && formik.errors.email
                  }
                  // valhandleBuyue={formik.values.email} name={'email'}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            {addressMap.completeAddress.length > 0 && (
              <Grid
                container
                spacing={{
                  xs: 2,
                  md: 3,
                }}
                className="mb-4"
              >
                <Grid item md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Shipping Company
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formik.values.shippingCompany}
                      label="Shipping Company"
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
                  </FormControl>
                </Grid>
                {formik.values.shippingCompany && (
                  <Grid item md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Delivery
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ship}
                        disabled={shippingLoading}
                        label="Delivery"
                        onChange={handleChange}
                      >
                        {shipment?.map((val: any, i: any) => (
                          <MenuItem value={val} key={i}>
                            <Box className="flex justify-between">
                              <Box sx={{ fontWeight: 600, marginRight: 6 }}>
                                  {`${val.courier_name} ${val.courier_service_name}`}
                              </Box>
                              <Box className="pl-2">
                                  {
                                    `${rupiah(val?.price)} (${val?.shipment_duration_range} ${val?.shipment_duration_unit})`
                                  }
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
            )}

            <Grid
              container
              spacing={{
                xs: 2,
                md: 4,
              }}
              className="mb-4"
            >
              <Grid item md={10}>
                <TextField
                  fullWidth
                  label="Catatan"
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
              </Grid>
            </Grid>
            <Box>
              <Typography className="text-2xl font-bold">
                Billing Address
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked disabled />}
                  label="Alamat pengiriman sama dengan alamat penagihan"
                />
              </FormGroup>
            </Box>
          </form>
          <Grid container className="mt-4">
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
                    onClick={() => router.push("/cart")}
                    variant="outlined"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className={`text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer`}
                    type="submit"
                  >
                    Kembali
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button
                    onClick={formik.submitForm}
                    disabled={formik.isSubmitting || !formik.isValid}
                    className={`hover:bg-[#bb86fc] bg-[#713F97] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-none w-full cursor-pointer`}
                    type="submit"
                  >
                    Lanjutkan Pembayaran
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid
        item
        md={4}
        className="w-full mx-auto mt-24 mb-10 p-6 rounded-lg flex flex-col justify-between"
      >
        <Box>
          <Typography className="text-2xl font-bold mb-6">
            Order Summary
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold uppercase text-gray-500">
                    Product
                  </TableCell>
                  <TableCell
                    className="font-bold uppercase text-gray-500"
                    align="right"
                  >
                    Qty
                  </TableCell>
                  <TableCell
                    className="font-bold uppercase text-gray-500"
                    align="right"
                  >
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {checkoutData?.map(
                  (
                    val: {
                      product: {
                        img: (string | undefined)[];
                        productName: string;
                        channel: string;
                        sku: string;
                      };
                      qty: number;
                      unitPrice: number;
                      totalPrice: number;
                    },
                    i: number
                  ) => (
                    <TableRow key={i} className="border-none bg-slate-50">
                      <TableCell
                        className={
                          i !== checkoutData.length - 1 ? "border-none" : ""
                        }
                        component="th"
                        scope="row"
                      >
                        <Box className="flex items-center">
                          <img
                            width={70}
                            className="object-contain mr-3 rounded-md"
                            height={70}
                            src={val?.product?.img?.[0]}
                            alt=""
                          />
                          <Box>
                            <Typography className="font-bold line-clamp-1">
                              {val?.product?.productName}
                            </Typography>
                            <Typography>
                              Channel: {val.product?.channel}
                            </Typography>
                            <Typography>SKU: {val.product?.sku}x</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        className={
                          i !== checkoutData.length - 1 ? "border-none" : ""
                        }
                        align="right"
                      >
                        {val.qty}
                      </TableCell>
                      <TableCell
                        className={
                          i !== checkoutData.length - 1 ? "border-none" : ""
                        }
                        align="right"
                      >
                        {rupiah(val.totalPrice)}
                      </TableCell>
                    </TableRow>
                  )
                )}
                <TableRow>
                  <TableCell
                    className="border-none font-bold"
                    component="th"
                    scope="row"
                    colSpan={2}
                  >
                    <Typography className="font-bold">
                      Subtotal ({checkoutData?.length} Items)
                    </Typography>
                  </TableCell>
                  <TableCell className="border-none font-bold" align="right">
                    {rupiah(priceItem)}
                  </TableCell>
                </TableRow>
                {ship ? (
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={2}>
                      <Box className="flex justify-between mb-2">
                        <Typography className="font-bold">
                          Delivery With
                        </Typography>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <Typography className="font-bold flex items-center">
                          <LocalShippingOutlinedIcon className="mr-3" />
                          {courierShipment}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right" className="font-bold">
                      {rupiah(shipPrice)}
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableRow>
                  <TableCell
                    className="border-none font-bold"
                    component="th"
                    scope="row"
                    colSpan={2}
                  >
                    <Typography className="font-bold">TOTAL</Typography>
                  </TableCell>
                  <TableCell className="border-none font-bold" align="right">
                    {rupiah(priceItem + shipPrice)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
}

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

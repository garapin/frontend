import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  const priceItem = checkoutData
    .map((val: { unitPrice: number; qty: number }) => val.unitPrice * val?.qty)
    ?.reduce((acc: any, curr: any) => acc + curr);
  const [shipment, setShipment] = useState([]);

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
    const data = {
      weight: 1000,
      width: 10,
      height: 5,
      length: 5,
      destination_postal: "50241",
      destination_lat: addressMap.latLong?.lat,
      destination_long: addressMap.latLong?.lng,
      totalPrice: priceItem,
    };

    API.getShipping(data)
      .then((response) => {
        setShipment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [addressMap, priceItem]);

  const courierShipment = ship?.courier_name + " " + ship?.courier_service_name;

  const handleChange = (event: any) => {
    setShip(event.target.value);
    setShipPrice(event.target.value?.price + event.target.value?.insurance_fee);
  };

  const refundedId = checkoutData.map((val: any) => val.id);

  const formik = useFormik({
    initialValues: {
      contactName: auth.authUser?.displayName ?? "",
      phoneNumber: auth.authUser?.phoneNumber ?? "",
      email: auth.authUser?.email ?? "",
    },
    validationSchema: Yup.object({
      contactName: Yup.string().required("Contact Name is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      email: Yup.string().required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values, "test");
        const dataPay = {
          cartIds: refundedId,
          shippingDetails: {
            fullName: values.contactName,
            address: addressMap.completeAddress,
            phoneNumber: values.phoneNumber,
            latLong: {
              lat: addressMap.latLong?.lat,
              lng: addressMap.latLong?.lng,
            },
            postalCode: "50241",
            addressNote: "Please leave at door",
            totalWeight: 2500,
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
            console.log(response.data, "testrr");
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

  return (
    <Container className="flex">
      <Box className="max-w-3xl w-full mx-auto mt-24 mb-10 p-6 bg-white rounded-lg shadow-xl">
        <Typography className="text-2xl font-bold mb-6">
          Payment Detail
        </Typography>
        <form>
          <Box className="mb-4">
            <TextField
              fullWidth
              label="Nama Pembeli"
              error={
                formik.touched.contactName && Boolean(formik.errors.contactName)
              }
              helperText={
                Boolean(formik.touched.contactName) && formik.errors.contactName
              }
              value={formik.values.contactName}
              name={"contactName"}
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Box>
          <Box className="mb-4">
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

                setAddressMap(objAddress);
              }}
            />
          </Box>
          <Box className="mb-4">
            <TextField
              fullWidth
              label="Nomor HP/WA"
              placeholder="081234567890"
              value={formik.values.phoneNumber}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={Boolean(formik.errors) && formik.errors.phoneNumber}
              name={"phoneNumber"}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Box>
          <Box className="mb-4">
            <TextField
              fullWidth
              label="Email"
              placeholder="emailanda@nama-perusahaan.co.id"
              required
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={Boolean(formik.touched.email) && formik.errors.email}
              // valhandleBuyue={formik.values.email} name={'email'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Box>
          <Box>
            {addressMap.completeAddress.length > 0 ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Delivery</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ship}
                  label="Delivery"
                  onChange={handleChange}
                >
                  {shipment?.map((val: any, i: any) => (
                    <MenuItem value={val} key={i}>
                      <Box className="flex justify-between">
                        <Box sx={{ fontWeight: 600 }}>
                          {val?.courier_name + " " + val?.courier_service_name}
                        </Box>
                        <Box>
                          {rupiah(val?.price) +
                            " " +
                            "(" +
                            val?.shipment_duration_range +
                            " " +
                            val?.shipment_duration_unit +
                            ")"}
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </Box>
        </form>
      </Box>
      <Box className="max-w-md w-full mx-auto mt-24 mb-10 p-6 bg-white rounded-lg shadow-xl flex flex-col justify-between">
        <Box>
          <Typography className="text-2xl font-bold mb-6">
            Order Summary
          </Typography>
          {checkoutData?.map(
            (val: {
              product: {
                img: (string | undefined)[];
                productName: string;
              };
              qty: number;
              unitPrice: number;
            }) => {
              return (
                <>
                  <Box className="mt-2 p-1 flex items-center justify-between">
                    <Box className="flex items-center">
                      <img
                        width={70}
                        style={{ borderRadius: "20%" }}
                        className="rounded-lg object-contain mr-3"
                        height={70}
                        src={val?.product?.img?.[0]}
                        alt=""
                      />
                      <Box>
                        <Typography>
                          {" "}
                          <span className="font-bold">
                            {" "}
                            {val?.product?.productName}{" "}
                          </span>
                        </Typography>
                        <Typography>Quantity: {val.qty}x</Typography>
                      </Box>
                    </Box>
                    <Typography className=" flex justify-end">
                      {rupiah(val.unitPrice * val.qty)}
                    </Typography>
                  </Box>
                </>
              );
            }
          )}
          {ship ? (
            <>
              <Box className="mt-2 p-1">
                <hr />
              </Box>
              <Box className="mt-2 p-1">
                <Box className="flex justify-between mb-4">
                  <Typography>Delivery With </Typography>
                </Box>
                <Box className="flex justify-between items-center">
                  <Typography className="font-bold flex items-center">
                    {" "}
                    <LocalShippingOutlinedIcon className="mr-3" />{" "}
                    {courierShipment}{" "}
                  </Typography>
                  <Typography>{rupiah(shipPrice)}</Typography>
                </Box>
              </Box>
            </>
          ) : null}

          <Box className="mt-2 p-1">
            <hr />
          </Box>
          <Box className="mt-2 p-1 flex justify-between">
            <Typography className="font-bold">Order Total</Typography>
            <Typography className="font-bold">
              {rupiah(priceItem + shipPrice)}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            onClick={formik.submitForm}
            disabled={formik.isSubmitting || !formik.isValid}
            className="hover:bg-[#bb86fc] bg-[#713F97] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-none w-full cursor-pointer"
            type="submit"
          >
            Bayar
          </Button>
        </Box>
      </Box>
    </Container>
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

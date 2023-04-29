import { Box, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import AddressPicker from "@/components/AddressPicker";
import { useFormik } from "formik";
import * as yup from "yup";
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useRouter } from 'next/router';
import { rupiah } from '@/tools/rupiah';
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface addressMap {
  postalCode?: string,
  completeAddress: string,
  latLong?: { lat: string, long: string }
}

function CheckoutPage() {
  const auth = useFirebaseAuth();
  const router = useRouter();
  const myData = localStorage.getItem('checkout_data');
  const checkoutData = JSON.parse(myData);
  const priceItem = checkoutData.map(val => val.unitPrice * val?.qty)?.reduce((acc, curr) => acc + curr)

  console.log(auth.authUser?.email, 'testhu');

  const formik = useFormik({
    initialValues: {
      orderDescription: '',
      quantity: '',
      contactName: auth.authUser?.displayName ?? '',
      phoneNumber: auth.authUser?.phoneNumber ?? '',
      email: auth.authUser?.email ?? '',
    },
    validationSchema: yup.object({
      orderDescription: yup.string().required("Order Description is required"),
      // quantity: yup.lazy((val) => singleProduct !== undefined && singleProduct.moq !== undefined ? yup.number().required("Quantity is required").min(singleProduct.moq, `Minimum order is ${singleProduct.moq}`) : yup.number().required("Quantity is required")),
      contactName: yup.string().required("Contact Name is required"),
      phoneNumber: yup.string().required("Phone Number is required"),
      email: yup.string().required("Email is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // try {
      //     const fileData = await handleFileUpload();
      //     const dataBody = {
      //         ...values,
      //         address: addressMap,
      //         product: singleProduct,
      //         template: productTemplate,
      //         selectedOptions: variantSelectorValue,
      //         files: [fileData],
      //         createdAt: new Date()
      //     };
      //     await storeRequestInquiryToDB(dataBody);
      //     toast.success("Permintaan Anda Berhasil Dikirimkan");
      //     handleClose()
      // } catch (e: any) {
      //     console.error(e)
      //     toast.error(e.message);
      // }
    },
  });

  const [addressMap, setAddressMap] = useState<addressMap>({ postalCode: '', completeAddress: '', latLong: { lat: '', long: '' } });
  const [ship, setShip] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setShip(event.target.value as string);
  };

  return (
    <Container className='flex'>
      <Box className="max-w-3xl w-full mx-auto mt-24 mb-10 p-6 bg-white rounded-lg shadow-xl">
        <Typography className="text-2xl font-bold mb-6">Payment Detail</Typography>
        <form>
          <Box className="mb-4">
            <TextField fullWidth label='Nama Pembeli'
              error={formik.touched.contactName && Boolean(formik.errors.contactName)}
              helperText={Boolean(formik.touched.contactName) && formik.errors.contactName}
              value={formik.values.contactName}
              name={'contactName'}
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange} />
          </Box>
          <Box className="mb-4">
            <AddressPicker label={"Alamat Pembeli"} onLocationSelect={(place) => {
              console.log(place)
              const postalCode = place.address_components?.find((component: any) => {
                return component.types.includes("postal_code")
              })?.long_name
              const completeAddress = place.formatted_address
              const geometry = place?.geometry?.location
              let latLong = undefined
              if (geometry != undefined) {
                latLong = { lat: geometry.lat(), lng: geometry.lng() }
              }
              const objAddress = {
                completeAddress,
                postalCode,
                latLong
              }

              setAddressMap(objAddress);
            }} />
          </Box>
          <Box className="mb-4">
            <TextField fullWidth label="Nomor HP/WA" placeholder='081234567890' value={formik.values.phoneNumber}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={Boolean(formik.errors) && formik.errors.phoneNumber}
              name={'phoneNumber'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange} />
          </Box>
          <Box className="mb-4">
            <TextField fullWidth label="Email" placeholder='emailanda@nama-perusahaan.co.id'
              required
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={Boolean(formik.touched.email) && formik.errors.email}
              value={formik.values.email} name={'email'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange} />
          </Box>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Delivery</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ship}
                label="Delivery"
                onChange={handleChange}
              >
                <MenuItem value={10}>JNE</MenuItem>
                <MenuItem value={20}>J&T</MenuItem>
                <MenuItem value={30}>SiCepat</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </form>
      </Box>
      <Box className="max-w-md w-full mx-auto mt-24 mb-10 p-6 bg-white rounded-lg shadow-xl flex flex-col justify-between">
        <Box>
          <Typography className="text-2xl font-bold mb-6">Order Summary</Typography>
          {checkoutData?.map(val => {
            return (
              <>
                <Box className="mt-2 p-1 flex items-center justify-between">
                  <Box className="flex items-center">
                    <img width={70} style={{ borderRadius: '20%' }} className="rounded-lg object-contain mr-3" height={70} src={val?.product?.img?.[0]} alt="" />
                    <Box>
                      <Typography> <span className='font-bold'> {val?.product?.productName} </span></Typography>
                      <Typography>Quantity: {val.qty}x</Typography>
                    </Box>
                  </Box>
                  <Typography className=' flex justify-end'>{rupiah(val.unitPrice * val.qty)}</Typography>
                </Box></>
            )
          })}
          <Box className="mt-2 p-1">
            <hr />
          </Box>
          <Box className="mt-2 p-1">
            <Box className="flex justify-between mb-4">
              <Typography>Delivery With </Typography>
            </Box>
            <Box className="flex justify-between items-center">
              <Typography className='font-bold flex items-center'> <LocalShippingOutlinedIcon className='mr-3' /> JNE Sameday </Typography>
              <Typography>Rp.14.000</Typography>
            </Box>
          </Box>
          <Box className="mt-2 p-1">
            <hr />
          </Box>
          <Box className="mt-2 p-1 flex justify-between">
            <Typography className='font-bold'>Order Total</Typography>
            <Typography className='font-bold'>{rupiah(priceItem + 14000)}</Typography>
          </Box>
        </Box>
        <Box>
          <button onClick={() => router.push('/payment-complete')} className="hover:bg-[#bb86fc] bg-[#713F97] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-none w-full cursor-pointer" type="submit">
            Bayar
          </button>
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
      ...(await serverSideTranslations(locale, ['products', 'common']))
    }
  }
};
import { LinkIconSVG } from "@/assets/icons/link-icon";
import { SearchIconSVG } from "@/assets/icons/search-icon";
import { WithdrawIconSVG } from "@/assets/icons/withdraw-icon";
import GASSAppBar from "@/components/GASSAppBar";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";

const AffiliateWithdraw = () => {
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      bankNo: 0,
      withdrawAmount: 0,
      paymentMethod: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("FullName is required"),
      bankNo: Yup.number().required("Bank Number is required"),
      withdrawAmount: Yup.number().required("Withdraw Amount is required"),
      paymentMethod: Yup.string().required("Payment Method is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const paymentMethods = [
    {
      id: 1,
      name: "Bank Rakyat Indonesia",
      image: "/assets/affiliate/bri.svg",
    },
    {
      id: 2,
      name: "Dana",
      image: "/assets/affiliate/dana.svg",
    },
    {
      id: 3,
      name: "Bank Central Asia",
      image: "/assets/affiliate/bca.svg",
    },
    {
      id: 4,
      name: "Gopay",
      image: "/assets/affiliate/gopay.svg",
    },
    {
      id: 5,
      name: "OVO",
      image: "/assets/affiliate/ovo.svg",
    },
    {
      id: 6,
      name: "Paypal",
      image: "/assets/affiliate/paypal.svg",
    },
    {
      id: 7,
      name: "Visa",
      image: "/assets/affiliate/visa.svg",
    },
  ];

  return (
    <div className="bg-slate-50">
      <GASSAppBar />
      <form onSubmit={formik.handleSubmit}>
        <div className="max-w-screen-2xl mx-auto py-8 space-y-8">
          <div>
            <h2 className="font-medium text-[32px] mb-2">Withdraw</h2>
            <p className="text-slate-500">
              Ambil penghasilanmu sekarang juga dengan memasukan data pribadi
              dan admin akan mengirimkannya ke Bank Kesayangan anda
            </p>
          </div>
          <div className="p-8 bg-white rounded-md space-y-4">
            <div className="space-y-2">
              <p className="text-slate-500 mb-2">Saldo Affiliate</p>
              <h2 className="font-medium text-[32px]">Rp.500.000</h2>
            </div>
            <div className="space-y-4">
              <h2 className="font-medium text-xl">Data Pribadi</h2>
              <Box className="w-full">
                <p className="font-medium text-base text-slate-600 font-sans pb-2">
                  Nama Lengkap
                </p>
                <TextField
                  fullWidth
                  placeholder="Masukan Nama Lengkap Anda"
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={
                    Boolean(formik.touched.fullName) && formik.errors.fullName
                  }
                  value={formik.values.fullName}
                  name={"fullName"}
                  InputProps={{
                    className: "rounded-lg",
                  }}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box className="w-full">
                <p className="font-medium text-base text-slate-600 font-sans pb-2">
                  Nomor Rekening
                </p>
                <TextField
                  fullWidth
                  placeholder="Masukan Nomor Rekening Anda"
                  error={formik.touched.bankNo && Boolean(formik.errors.bankNo)}
                  helperText={
                    Boolean(formik.touched.bankNo) && formik.errors.bankNo
                  }
                  value={formik.values.bankNo}
                  name={"bankNo"}
                  InputProps={{
                    className: "rounded-lg",
                  }}
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Box>
              <Box className="w-full">
                <p className="font-medium text-base text-slate-600 font-sans pb-2">
                  Jumlah Penarikan
                </p>
                <TextField
                  fullWidth
                  placeholder="Masukan Jumlah Penarikan Anda"
                  error={
                    formik.touched.withdrawAmount &&
                    Boolean(formik.errors.withdrawAmount)
                  }
                  helperText={
                    Boolean(formik.touched.withdrawAmount) &&
                    formik.errors.withdrawAmount
                  }
                  value={formik.values.withdrawAmount}
                  name={"withdrawAmount"}
                  InputProps={{
                    className: "rounded-lg",
                  }}
                  type="number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Box>
            </div>
            <div className="space-y-4">
              <h2 className="font-medium text-xl">Metode Pembayaran</h2>
              <FormControl>
                <RadioGroup
                  defaultValue="bri"
                  name="paymentMethod"
                  onChange={formik.handleChange}
                >
                  {paymentMethods.map((paymentMethod) => (
                    <FormControlLabel
                      value={paymentMethod.name}
                      control={
                        <Radio
                          checked={
                            formik.values.paymentMethod === paymentMethod.name
                          }
                        />
                      }
                      className="mb-2"
                      label={
                        <div>
                          <div className="flex items-center gap-2">
                            <img
                              src={paymentMethod.image}
                              alt={paymentMethod.name}
                              className="w-8 h-8"
                            />
                            <span className="text-slate-600">
                              {paymentMethod.name}
                            </span>
                          </div>
                        </div>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              {formik.touched.paymentMethod &&
                Boolean(formik.errors.paymentMethod) && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.paymentMethod}
                  </p>
                )}
            </div>

            <Button
              variant="contained"
              fullWidth
              className="py-4 flex items-center gap-4"
              type="submit"
            >
              <WithdrawIconSVG />
              <p>Withdraw</p>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

AffiliateWithdraw.showAppBar = false;
AffiliateWithdraw.showFooter = false;

export default AffiliateWithdraw;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

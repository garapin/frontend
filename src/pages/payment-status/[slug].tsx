import {
  Box,
  Button,
  Container,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { getPaymentStatus } from "@/store/modules/products";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import CancelIcon from "@mui/icons-material/Cancel";
import HeadsetIcon from "@mui/icons-material/Headset";

function PaymentComplete() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { paymentStatus } = useAppSelector((state) => state.product);

  // http://localhost:3000/payment-status/005b203793884eccb94ca2c9620e8ae0 : pending
  // http://localhost:3000/payment-status/275a93ebc6a04a45878d53c796c56326 : paid

  useEffect(() => {
    dispatch(getPaymentStatus(router.query.slug as string));
  }, []);

  const PaymentStatusComp = ({ status }: any) => {
    if (status === "PAID") {
      return (
        <div
          className={`space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4`}
        >
          <div className="text-center md:col-span-6">
            <img
              src="/assets/thankyou.png"
              alt="success"
              className="w-1/2 mx-auto md:w-3/4"
            />
          </div>
          <div className="space-y-4 md:col-span-6 md:py-14">
            <Typography
              variant="h4"
              className="text-2xl font-semibold text-center md:text-left"
            >
              Terimakasih Telah Berbelanja
            </Typography>
            <Typography className="text-gray-600 text-base leading-6">
              Terima kasih telah memilih Garapin sebagai pilihan Anda untuk
              memenuhi kebutuhan packaging. Kami sangat menghargai kepercayaan
              Anda dan berharap produk-produk kami dapat memberikan manfaat dan
              kepuasan dalam penggunaannya. Kami akan terus berkomitmen untuk
              memberikan layanan terbaik dan kualitas produk yang terbaik bagi
              pelanggan setia seperti Anda. Sampai jumpa di pembelian
              selanjutnya di website Garapin!
            </Typography>
            <Button
              variant="contained"
              className="capitalize text-lg py-4"
              fullWidth
              onClick={() => router.push("/product-list")}
            >
              Lihat Produk Lainnya
            </Button>
            <Button
              variant="outlined"
              className="capitalize text-lg py-4"
              fullWidth
              onClick={() => router.push("/")}
            >
              Kembali Ke Beranda
            </Button>
          </div>
        </div>
      );
    } else if (status === "PENDING") {
      return (
        <div>
          <DoDisturbOnIcon className="text-[120px] text-amber-500" />
          <Typography
            variant="h4"
            color="#713F97"
            fontWeight="bold"
            className="pt-4"
          >
            Payment Pending!
          </Typography>
          <Typography fontWeight="500" className="text-gray-600 text-lg">
            We're processing your payment, you can check again in a few minutes
          </Typography>
        </div>
      );
    } else {
      return (
        <div className={`space-y-4`}>
          <div className="text-center">
            <img
              src="/assets/failed.png"
              alt="success"
              className="w-1/2 mx-auto"
            />
          </div>
          <Typography
            variant="h4"
            className="text-2xl font-semibold text-center max-w-sm"
          >
            Terjadi Kesalahan Pada Pembayaran
          </Typography>
          <Typography className="text-gray-600 text-base leading-6">
            Anda dapat melakukan pemesanan ulang namun jika masih tidak bisa,
            anda dapat menghubungi tim kami agar kami dapat membantu anda
          </Typography>
          <Button
            variant="contained"
            className="capitalize text-lg py-4"
            fullWidth
            startIcon={<HeadsetIcon />}
          >
            Hubungi Tim Support
          </Button>
        </div>
      );
    }
  };

  return (
    <Container className="max-w-screen-2xl mx-auto py-6 md:h-[60vh] md:flex md:items-center">
      <Box>
        {!paymentStatus ? (
          <Box className="w-full mx-auto">
            <Skeleton
              variant="rectangular"
              width={200}
              height={160}
              className="mb-10 mx-auto md:w-full"
            />
            <Skeleton
              variant="rectangular"
              className="max-w-xl mx-auto h-10 mb-2"
            />
            <Skeleton
              variant="rectangular"
              className="max-w-xl mx-auto h-10 mb-2"
            />
            <Skeleton
              variant="rectangular"
              className="max-w-xl mx-auto h-8 mb-10"
            />
            <Skeleton variant="rectangular" className="w-full h-12 mx-auto" />
          </Box>
        ) : (
          <Box className="flex justify-center flex-col items-center">
            <PaymentStatusComp status={paymentStatus?.paymentStatus} />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default PaymentComplete;

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

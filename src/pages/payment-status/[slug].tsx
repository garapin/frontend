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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function PaymentComplete() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { paymentStatus } = useAppSelector((state) => state.product);

  // http://localhost:3000/payment-status/005b203793884eccb94ca2c9620e8ae0 : pending
  // http://localhost:3000/payment-status/275a93ebc6a04a45878d53c796c56326 : paid

  useEffect(() => {
    dispatch(getPaymentStatus(router.query.slug as string));
  }, []);

  const PaymentStatusComp = ({ status, className }: any) => {
    if (status === "PAID") {
      return (
        <div className={className}>
          <CheckCircleIcon className="text-[120px] text-green-500" />
          <Typography
            variant="h4"
            color="#713F97"
            fontWeight="bold"
            className="pt-4"
          >
            Payment Successful!
          </Typography>
          <Typography fontWeight="500" className="text-gray-600 text-lg">
            Payment received succesfully! We will process your order shortly
          </Typography>
        </div>
      );
    } else if (status === "PENDING") {
      return (
        <div className={className}>
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
        <div className={className}>
          <CancelIcon className="text-[120px] text-red-500" />
          <Typography
            variant="h4"
            color="#713F97"
            fontWeight="bold"
            className="pt-4"
          >
            Payment Failed!
          </Typography>
          <Typography fontWeight="500" className="text-gray-600 text-lg">
            Sorry, we failed to process your payment. Please contact us for
            further support
          </Typography>
        </div>
      );
    }
  };

  return (
    <Container className="h-[80vh] w-screen flex items-center justify-center">
      <Box className="max-w-3xl w-full flex justify-center flex-col mx-auto p-6 bg-white rounded-lg shadow-xl items-center">
        {!paymentStatus ? (
          <Box className="w-full mx-auto">
            <Skeleton
              variant="circular"
              width={120}
              height={120}
              className="mb-10 mx-auto"
            />
            <Skeleton
              variant="rectangular"
              className="max-w-xl mx-auto h-10 mb-4"
            />
            <Skeleton
              variant="rectangular"
              className="max-w-xl mx-auto h-8 mb-10"
            />
            <Skeleton variant="rectangular" className="w-60 h-12 mx-auto" />
          </Box>
        ) : (
          <Box className="flex justify-center flex-col items-center">
            <PaymentStatusComp
              status={paymentStatus?.paymentStatus}
              className="mb-6 text-center"
            />
            <Button onClick={() => router.push("/")}>Back to home</Button>
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

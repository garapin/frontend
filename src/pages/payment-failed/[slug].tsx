import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CancelIcon from "@mui/icons-material/Cancel";

function PaymentComplete() {
  const router = useRouter();

  return (
    <Container className="h-[80vh] w-screen flex items-center justify-center">
      <Box className="max-w-3xl w-full flex justify-center flex-col mx-auto p-6 bg-white rounded-lg shadow-xl items-center">
        <CancelIcon className="text-[120px] text-red-500" />
        <Typography
          variant="h4"
          color="#713F97"
          fontWeight="bold"
          className="pt-4"
        >
          Payment Failed!
        </Typography>
        <Typography fontWeight="500" className="text-gray-600 text-lg mb-6">
          Sorry, your payment has failed. Please recreate your order or contact
          us for support.
        </Typography>
        <Button onClick={() => router.push("/")}>Back to home</Button>
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

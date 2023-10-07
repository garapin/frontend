import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CancelIcon from "@mui/icons-material/Cancel";
import HeadsetIcon from "@mui/icons-material/Headset";

function PaymentComplete() {
  const router = useRouter();

  return (
    <Container className="max-w-md md:max-w-2xl mx-auto py-16 md:h-[80vh] md:flex md:items-center md:justify-center">
      <Box>
        <Box className="flex justify-center flex-col items-center">
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
              className="text-2xl font-semibold text-center max-w-sm md:max-w-none"
            >
              Terjadi Kesalahan Pada Pembayaran
            </Typography>
            <Typography className="text-gray-600 text-base leading-6">
              Anda dapat melakukan pemesanan ulang namun jika masih tidak bisa,
              anda dapat menghubungi tim kami agar kami dapat membantu anda
            </Typography>
            <div className="lg:max-w-md md:mx-auto">
              <Button
                variant="contained"
                className="capitalize text-lg py-4"
                fullWidth
                startIcon={<HeadsetIcon />}
              >
                Hubungi Tim Support
              </Button>
            </div>
          </div>
        </Box>
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

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function PaymentComplete() {
  const router = useRouter();

  return (
    <Container>
      <Box className="max-w-3xl w-full flex justify-center flex-col mx-auto mt-24 mb-10 p-6 bg-white rounded-lg shadow-xl items-center">
        <img src="/success_tick.png" className='text-center' width={100} alt="Startup 4 Industries Logo" />
        <Typography variant="h4" color="#713F97" fontWeight="bold" className="pt-4">Payment Successful!</Typography>
        <Typography fontWeight="bold" className="text-gray-500 pb-10">Transaction Number: {router.query.slug}</Typography>
        <Button onClick={() => router.push('/')}>Back to home</Button>
      </Box>
    </Container>
  );
}

export default PaymentComplete;

export const getServerSideProps = async ({locale}: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
      await i18n?.reloadResources();
  }
  return {
      props: {
          ...(await serverSideTranslations(locale, ['products', 'common']))
      }
  }
};
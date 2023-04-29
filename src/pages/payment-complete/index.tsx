import { Box, Container, TextField, Typography } from '@mui/material';
import React from 'react';

function PaymentComplete() {

  return (
    <Container>
      <Box className="max-w-3xl w-full flex justify-center flex-col mx-auto mt-24 mb-10 p-6 bg-white rounded-lg shadow-xl items-center">
        <img src="/success_tick.png" className='text-center' width={100} alt="Startup 4 Industries Logo" />
        <Typography variant="h4" color="#713F97" fontWeight="bold" className="pt-4">Payment Successful!</Typography>
        <Typography fontWeight="bold" className="text-gray-500 pb-10">Transaction Number: 11298716728</Typography>
        <hr />
      </Box>
    </Container>
  );
}

export default PaymentComplete;

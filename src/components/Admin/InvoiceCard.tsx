import React from 'react'
import { Invoices } from '@/types/admin'
import { rupiah } from "@/tools/rupiah";
import { Box, Button, Card, CardContent, Chip, CircularProgress, Grid, Typography } from "@mui/material";
import { invoiceStatus, invoiceStatusColor } from '@/const/status';
import { styled } from '@mui/material/styles';
import { AccessTime } from '@mui/icons-material';
import { useConfirm } from '@/hooks/useConfirm';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import { processOrder, setInvoice, setInvoiceModalOpen, shipOrder } from '@/store/modules/admin';


const DetailText = styled(Typography)(({theme}) => ({
    fontSize: '14px',
    color: theme.palette.text.secondary
}));

const HeaderText = styled(Typography)(({theme}) => ({
    fontSize: '15px',
    color: theme.palette.text.primary
}));

const ChipStatus = styled(Chip)(({theme}) => ({
    fontSize: '12px',
}));

export default function InvoiceCard({invoice}: {invoice: Invoices}) {
    const [getConfirmation, ConfirmDialog] = useConfirm();
    const dispatch = useAppDispatch();
    const {processingInvoiceId} = useAppSelector(state => state.admin);

    const isProcessing = () => processingInvoiceId?.includes(invoice.id) ?? false;

    const openDetail = () => {
        dispatch(setInvoice(invoice));
        dispatch(setInvoiceModalOpen(true));
    }

    const renderPrimaryAction = (invoice: Invoices) => {
        switch (invoice.status) {
            case 'paid':
                return <Button variant='contained' color='primary'
                disabled={isProcessing()}
                    onClick={ async () => {
                        const result = await getConfirmation('Proses Pesanan', `Apakah anda yakin ingin memproses pesanan ${invoice.shippingDetails.fullName} (Invoice ${invoice.invoiceNumber})?`)
                        if(result) dispatch(processOrder(invoice.id, invoice.invoiceNumber))
                    }}
                >Proses Pesanan {isProcessing() && <CircularProgress size={14} sx={{ml:2}}/>}</Button>
            case 'processed':
                return <Button variant='contained' color='info'
                disabled={isProcessing()}
                    onClick={ async () => {
                        const result = await getConfirmation('Kirim Pesanan', `Apakah anda yakin ingin mengirim pesanan ${invoice.shippingDetails.fullName} (Invoice ${invoice.invoiceNumber})? \n\n Kurir akan diberitahu dan segera melakukan pick-up pesanan. Pastikan order sudah siap kirim.`);
                        if (result) dispatch(shipOrder(invoice.id, invoice.invoiceNumber))
                    }}
                >Kirim Pesanan {isProcessing() && <CircularProgress size={14} sx={{ml:2}}/>}</Button>
            default:
                return <></>
        }
    }

  return (
    <Card variant='outlined' key={invoice.id} sx={{mb:3}}>
        <Card variant='outlined'>
            <Box display='flex' justifyContent='space-between' alignItems='center' p={2} px={3}>
                <Box display='flex' gap={2} alignItems='center'>
                    <HeaderText variant='h6'>{invoice.invoiceNumber}</HeaderText>
                    <Box display='flex' alignItems='center'>
                    <AccessTime fontSize='small' sx={{fontSize: '14px', color: (theme) => theme.palette.text.secondary, mr: 1}}/>
                    <DetailText variant='body1'>{invoice.createdAt.toLocaleString()}</DetailText>

                    </Box>
                </Box>
                <ChipStatus variant="filled" color={invoiceStatusColor(invoice.status)} 
                label={invoiceStatus.find(el => el.status == invoice.status)?.label??(invoice.status??invoice.paymentStatus)?.toUpperCase()} />
            </Box>
        </Card>
        <CardContent>
            
        <Grid container>
            <Grid item md={6}>
                <Box display='flex' flexDirection='column' p={2}>
                    {invoice.products.map((product, index) => (<>
                            <DetailText variant='body1' fontWeight={600}>{product.product.productName}</DetailText>
                            <DetailText variant='body1'>{product.qty} x {rupiah(product.unitPrice)}</DetailText>
                            </>
                    ))}
                </Box>
            </Grid>
            <Grid item md={4}>
                <Box p={2}>
                    <DetailText variant='body1' fontWeight='bold'>Alamat Pengiriman:</DetailText>
                    <DetailText variant='body1' fontWeight='bold'>{invoice.shippingDetails.fullName}</DetailText>
                    <DetailText variant='body1'>{invoice.shippingDetails.address}</DetailText>
                    <DetailText variant='body1'>Kode Pos {invoice.shippingDetails.postalCode}</DetailText>
                    <DetailText variant='body1'>Phone: {invoice.shippingDetails.phoneNumber}</DetailText>
                </Box>
            </Grid>
            <Grid item md={2}>
                <Box p={2}>
                    <DetailText variant='body1' fontWeight='bold'>Kurir:</DetailText>
                    <DetailText variant='body1'>{invoice.shippingMethod.courierName} - {invoice.shippingMethod.serviceName}</DetailText>
                </Box>
            </Grid>
        </Grid>
        <Card variant="outlined" sx={{backgroundColor: '#f5f5f5'}}>
            <Box display='flex' justifyContent='space-between' alignItems='center' p={2}>
                <DetailText variant='body1'>Total</DetailText>
                <DetailText variant='body1' fontWeight='bold'>{rupiah(invoice.totalPrice)}</DetailText>
            </Box>
        </Card>
        </CardContent>
        <Card variant='outlined'>
            <Box display='flex' justifyContent='space-between' alignItems='center' p={2} pl={3}>
                <Box>
                    <DetailText variant='body1' className='cursor-pointer' color='purple' onClick={openDetail}>Lihat detail pesanan</DetailText>
                </Box>
                <Box>
                    {renderPrimaryAction(invoice)}
                </Box>
            </Box>
        </Card>
        <ConfirmDialog />
    </Card>
  )
}

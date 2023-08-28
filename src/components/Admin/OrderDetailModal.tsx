/* eslint-disable @next/next/no-img-element */
import { invoiceStatus, invoiceStatusColor } from '@/const/status';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';
import { setInvoice, setInvoiceModalOpen } from '@/store/modules/admin';
import { getAllCategories, getShippingCompany } from '@/store/modules/products';
import { rupiah } from '@/tools/rupiah';
import { formatDateTime } from '@/tools/utils';
import { Close } from '@mui/icons-material';
import { Chip, Dialog, DialogContent, DialogTitle, Grid, TableCell, Table, TableRow, Typography, tableCellClasses, TableContainer, Paper, TableHead, TableBody, Box, Divider, Button, IconButton } from '@mui/material'
import React from 'react'

export default function OrderDetailModal() {
    const {invoice, invoiceModalOpen} = useAppSelector(state => state.admin);
    const {shippingCompanies, category} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setInvoiceModalOpen(false));
        dispatch(setInvoice({}));
    }

    const getCourierByCode = (courierCode: string | any) => {
        shippingCompanies.length === 0 && dispatch(getShippingCompany());
        const courier: any = shippingCompanies.find(
          (val: any) => val.code === courierCode
        );
        return courier;
      };

    const getCategoryById = (id: string | any) => {
        category.length === 0 && dispatch(getAllCategories());
        return category.find((val: any) => val.id === id)
    }

    const priceItem = invoice.products?.map((val: { totalPrice: number }) => val.totalPrice)
    ?.reduce((acc: any, curr: any) => acc + curr);
  return (
    <Dialog fullWidth maxWidth='lg'
        open={invoiceModalOpen}
        onClose={() => handleClose()}
        >
        <DialogTitle>
            <Box display='flex' alignItems='center' gap={2}>
                Detail Order
                <IconButton className='ml-auto' onClick={() => handleClose()}><Close /></IconButton>
            </Box>
                </DialogTitle>
        <DialogContent>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Table size='small' sx={{
                        [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                        }
                    }}>
                        <TableRow>
                            <TableCell>
                                Invoice Number
                            </TableCell>
                            <TableCell>
                                {invoice.invoiceNumber}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Order Date</TableCell>
                            <TableCell>{formatDateTime(invoice.createdAt)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Payment Date</TableCell>
                            <TableCell>{formatDateTime(invoice.paidAt)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell><Chip color={invoiceStatusColor(invoice.status)} 
                                label={invoiceStatus.find(data => data.status === invoice.status)?.label}
                                />
                            </TableCell>
                        </TableRow>

                    </Table>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Table size='small' sx={{
                        [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                        }
                    }}>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>{invoice.shippingDetails?.fullName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Phone</TableCell>
                            <TableCell>{invoice.shippingDetails?.phoneNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>{invoice.shippingDetails?.address}<br />{invoice.shippingDetails?.addressNote}</TableCell>
                        </TableRow>
                    </Table>
                </Grid>
                <Grid item xs={12}>
                    <Typography className="text-xl font-bold mt-6" variant='body2'>
                        Order Summary
                    </Typography>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell className="font-bold uppercase text-gray-500">
                                Product
                            </TableCell>
                            <TableCell
                                className="font-bold uppercase text-gray-500"
                                align="right"
                            >
                                Qty
                            </TableCell>
                            <TableCell
                                className="font-bold uppercase text-gray-500"
                                align="right"
                            >
                                Category
                            </TableCell>
                            <TableCell
                                className="font-bold uppercase text-gray-500"
                                align="right"
                            >
                                Price
                            </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoice.products?.map(
                            (
                                val: {
                                product: {
                                    img: (string | undefined)[];
                                    productName: string;
                                    channel: string;
                                    sku: string;
                                    category: string;
                                };
                                qty: string|number;
                                unitPrice: number;
                                totalPrice: number;
                                },
                                i: number
                            ) => (
                                <TableRow key={i} className="border-none bg-slate-50">
                                <TableCell
                                    className={
                                    i !== invoice.products?.length - 1 ? "border-none" : ""
                                    }
                                    component="th"
                                    scope="row"
                                >
                                    <Box className="flex items-center">
                                    <img
                                        width={70}
                                        className="object-contain mr-3 rounded-md"
                                        height={70}
                                        src={val?.product?.img?.[0]}
                                        alt=""
                                    />
                                    <Box>
                                        <Typography className="font-bold line-clamp-1">
                                        {val?.product?.productName}
                                        </Typography>
                                        <Typography>SKU: {val.product?.sku}</Typography>
                                    </Box>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    className={
                                    i !== invoice.products?.length - 1 ? "border-none" : ""
                                    }
                                    align="right"
                                >
                                    {val.qty}
                                </TableCell>
                                <TableCell
                                    className={
                                    i !== invoice.products?.length - 1 ? "border-none" : ""
                                    }
                                    align="right"
                                >
                                    {getCategoryById(val.product.category)?.name}
                                </TableCell>
                                <TableCell
                                    className={
                                    i !== invoice.products?.length - 1 ? "border-none" : ""
                                    }
                                    align="right"
                                >
                                    {rupiah(val.totalPrice)}
                                </TableCell>
                                </TableRow>
                            )
                            )}
                            <TableRow>
                            <TableCell className="border-none " scope="row" colSpan={7}>
                                <Grid container>
                                <Grid item md={6}>
                                    <Typography>
                                    Subtotal ({invoice.products?.length} Items)
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography className="float-right">
                                    {rupiah(priceItem)}
                                    </Typography>
                                </Grid>
                                </Grid>
                                {invoice.shippingMethod && (
                                <>
                                    <Grid container>
                                    <Grid item md={6}>
                                        <Typography>Shipping Cost</Typography>
                                        <Typography className="flex items-center">
                                        {getCourierByCode(invoice.shippingMethod.courierCode)?.img && (
                                            <img
                                            src={getCourierByCode(invoice.shippingMethod.courierCode)?.img}
                                            alt="kurir"
                                            className="w-10 max-h-7 mr-1"
                                            />
                                        )}
                                        {invoice.shippingMethod.courierName} - {invoice.shippingMethod.serviceName}&nbsp; ({invoice.shippingDetails?.totalWeight} grams)
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography className="float-right">
                                        {rupiah(invoice.shippingMethod.price)}
                                        </Typography>
                                    </Grid>
                                    </Grid>
                                    <Grid container>
                                    <Grid item md={6}>
                                        <Typography>Insurance</Typography>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Typography className="float-right">
                                        {rupiah(invoice.shippingMethod.insuranceFee)}
                                        </Typography>
                                    </Grid>
                                    </Grid>
                                </>
                                )}
                                <Grid container>
                                <Grid item md={6}>
                                    <Typography>VAT (11%)</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography className="float-right">
                                    {rupiah(priceItem * 0.11)}
                                    </Typography>
                                </Grid>
                                </Grid>
                                <Divider className="my-3" />
                                <Grid container>
                                <Grid item md={6}>
                                    <Typography className="font-bold">Total</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography className="float-right font-bold">
                                    {rupiah(priceItem + (invoice.shippingMethod?.price??0) + (invoice.shippingMethod?.insuranceFee??0) + priceItem * 0.11)}
                                    </Typography>
                                </Grid>
                                </Grid>
                            </TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </Grid>
            </Grid>
        </DialogContent>

    </Dialog>
  )
}

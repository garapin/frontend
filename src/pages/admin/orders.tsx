import CheckAdmin from "@/components/Admin/CheckAdmin";
import InvoiceCard from "@/components/Admin/InvoiceCard";
import Header from "@/components/Admin/Layouts/Header";
import OrderDetailModal from "@/components/Admin/OrderDetailModal";
import { invoiceStatus, invoiceStatusColor } from "@/const/status";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { fetchInvoices, selectAdmin } from "@/store/modules/admin";
import { Invoices } from "@/types/admin";
import { Box, Card, CardContent, Chip, CircularProgress, Grid, ListItem, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const Orders = () => {
    const {invoices, invoiceLoadingStatus} = useAppSelector(state => state.admin);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchInvoices());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const dataPaid = invoices.filter((obj) => obj.paymentStatus=='PAID');
        console.log(JSON.stringify(dataPaid));
    }, [invoices]);

    const countStatus = useMemo(() => (array:Invoices[], status: string) => array.filter(inv => inv.status == status).length, [])

    const [selectedStatus, setselectedStatus] = useState('all')

    return (
        <>
            <Header title='Orders' subtitle='Manage orders for Ready to Buy and Digital Packaging here' />
            <Card sx={{mb:3, p: 2}} variant="outlined">
                <Box display='flex' gap={2}>
                {invoiceStatus.map((data) => {
                    return (
                    <Chip key={data.status}
                    color={selectedStatus == data.status ? invoiceStatusColor(data.status) : 'default'}
                    variant={selectedStatus == data.status ? 'filled' : 'outlined'}
                    label={`${data.label} (${data.status == 'all' ? invoices.length : countStatus(invoices, data.status)})`}
                    onClick={() => setselectedStatus(data.status)}
                    />
                );
                })}

                </Box>
            </Card>
            {invoiceLoadingStatus === 'LOADING' ? <Box display='flex' justifyContent='center' alignItems='center'><CircularProgress /></Box> : (
                    invoiceLoadingStatus === 'SUCCESS' ? (
                        (selectedStatus == 'all' ? invoices : invoices.filter(el => el.status === selectedStatus)).map((invoice, index) => (
                            <InvoiceCard key={index} invoice={invoice} />
                        ))) : (
                        <Typography>Failed to load data</Typography>
                    )
                )}
            
            <OrderDetailModal />
            
        </>
    );
}

Orders.authGuard = true;
Orders.adminGuard = true;

export default Orders;
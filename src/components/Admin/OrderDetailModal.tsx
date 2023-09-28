/* eslint-disable @next/next/no-img-element */
import { AddressIconSVG } from "@/assets/icons/address-icon";
import { InvoiceIconSVG } from "@/assets/icons/invoice-icon";
import { OrderDateIconSVG } from "@/assets/icons/order-date-icon";
import { PhoneIconSVG } from "@/assets/icons/phone-icon";
import { StatusIconSVG } from "@/assets/icons/status-icon";
import { invoiceStatus, invoiceStatusColor } from "@/const/status";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import { setInvoice, setInvoiceModalOpen } from "@/store/modules/admin";
import { getShippingCompany } from "@/store/modules/products";
import { toDate } from "@/tools/firebaseDate";
import { rupiah } from "@/tools/rupiah";
import { formatDateTime, getCategoryLabel } from "@/tools/utils";
import { Close } from "@mui/icons-material";
import {
  Chip,
  Dialog,
  DialogContent,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import { imagePlaceholder } from "../ProductList/ProductList";

export default function OrderDetailModal() {
  const { invoice, invoiceModalOpen } = useAppSelector((state) => state.admin);
  const { shippingCompanies, category } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setInvoiceModalOpen(false));
    dispatch(setInvoice({}));
  };

  const getCourierByCode = (courierCode: string | any) => {
    shippingCompanies.length === 0 && dispatch(getShippingCompany());
    const courier: any = shippingCompanies.find(
      (val: any) => val.code === courierCode
    );
    return courier;
  };

  const priceItem = invoice.products
    ?.map((val: { totalPrice: number }) => val.totalPrice)
    ?.reduce((acc: any, curr: any) => acc + curr);

  const InfoList = ({ title, value, icon }: any) => {
    return (
      <Box className="space-y-2">
        <div className="flex items-center gap-2">
          {icon}
          <Typography className="font-normal text-slate-500">
            {title}
          </Typography>
        </div>
        <Typography className="font-normal break-words">{value}</Typography>
      </Box>
    );
  };

  return (
    <Dialog
      fullWidth
      className="max-w-lg mx-auto"
      open={invoiceModalOpen}
      onClose={() => handleClose()}
    >
      <DialogContent className="bg-slate-50 space-y-6 p-4">
        <Box className="bg-white rounded-xl p-4">
          <Box display="flex" alignItems="center" gap={2} className="mb-4">
            <h2 className="text-[32px] font-semibold">Detail Order</h2>
            <IconButton className="ml-auto" onClick={() => handleClose()}>
              <Close />
            </IconButton>
          </Box>
          <Box className="space-y-4">
            <InfoList
              title="Invoice Number"
              value={invoice.invoiceNumber}
              icon={<InvoiceIconSVG />}
            />
            <Divider />
            <InfoList
              title="Order Date"
              value={formatDateTime(toDate(invoice.createdAt))}
              icon={<OrderDateIconSVG />}
            />
            <Divider />
            <InfoList
              title="Status"
              value={
                <Chip
                  color={invoiceStatusColor(invoice.status)}
                  label={
                    invoiceStatus.find((data) => data.status === invoice.status)
                      ?.label
                  }
                />
              }
              icon={<StatusIconSVG />}
            />
            <Divider />
            <InfoList
              title="Customer"
              value={invoice.shippingDetails?.fullName}
              icon={<StatusIconSVG />}
            />
            <Divider />
            {invoice.paidAt && (
              <>
                <InfoList
                  title="Payment Date"
                  value={formatDateTime(toDate(invoice.paidAt))}
                  icon={<OrderDateIconSVG />}
                />
                <Divider />
              </>
            )}
            {invoice.processedAt && (
              <>
                <InfoList
                  title="Payment Date"
                  value={formatDateTime(toDate(invoice.processedAt))}
                  icon={<OrderDateIconSVG />}
                />
                <Divider />
              </>
            )}
            {invoice.status === "shipped" &&
              invoice.shippedAt &&
              invoice.shippingOrderData.courier.waybill_id && (
                <>
                  <InfoList
                    title="Waybill/Resi ID"
                    value={invoice.shippingOrderData.courier.waybill_id}
                    icon={<InvoiceIconSVG />}
                  />
                  <Divider />
                </>
              )}

            <InfoList
              title="Phone"
              value={invoice.shippingDetails?.phoneNumber}
              icon={<PhoneIconSVG />}
            />
            <InfoList
              title="Address"
              value={
                <div>
                  {invoice.shippingDetails?.address}
                  <br />
                  {invoice.shippingDetails?.addressNote}
                </div>
              }
              icon={<AddressIconSVG />}
            />
          </Box>
        </Box>
        <Box className="bg-white rounded-xl p-6">
          <Box className="space-y-4">
            <h2 className="text-[32px] font-semibold">Order Saya</h2>
            <Box className="space-y-4">
              {invoice.products?.map((val: any) => (
                <Box>
                  <div className="flex items-start gap-2">
                    <div className="w-full bg-slate-50 p-4 rounded-lg space-y-1">
                      <img
                        style={{ borderRadius: "20%" }}
                        className="rounded-lg object-cover w-full aspect-video"
                        src={val?.product?.img?.[0] || imagePlaceholder}
                        alt="image"
                      />
                      <Typography
                        className="max-w-[12rem] text-[#713F97] pt-2 font-semibold"
                        fontSize={14}
                        fontWeight={400}
                      >
                        {getCategoryLabel(val?.productCategoryId)}
                      </Typography>
                      <Typography
                        fontSize={17}
                        fontWeight={400}
                        color="text.primary"
                        className="font-semibold"
                      >
                        {val?.product?.productName}
                      </Typography>
                      <Typography
                        fontSize={15}
                        className="font-normal text-slate-500"
                      >
                        SKU: {val.product?.sku}
                      </Typography>
                      <div className="flex items-center gap-2">
                        <Typography className="text-sm text-slate-600">
                          {rupiah(val.totalPrice)}
                        </Typography>
                        <p>|</p>
                        <Typography className="text-sm text-slate-600">
                          {val.qty} Pcs
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="bg-white rounded-xl p-6">
          <Box className="space-y-4">
            <h2 className="text-[32px] font-semibold">Order Summary</h2>

            <Box className="flex items-center justify-between">
              <Typography className="font-semibold text-lg text-slate-600">
                Subtotal ({invoice.products?.length} Items)
              </Typography>
              <Typography className="font-medium text-lg">
                {rupiah(priceItem)}
              </Typography>
            </Box>
            {invoice.shippingMethod && (
              <>
                <Box className="flex items-center gap-4 justify-between">
                  <Box>
                    <Typography className="font-semibold text-lg text-slate-600">
                      Delivery
                    </Typography>
                    <Typography className="flex items-center">
                      {getCourierByCode(invoice.shippingMethod.courierCode)
                        ?.img && (
                        <img
                          src={
                            getCourierByCode(invoice.shippingMethod.courierCode)
                              ?.img
                          }
                          alt="kurir"
                          className="w-10 max-h-7 mr-1"
                        />
                      )}
                      {invoice.shippingMethod.courierName} -{" "}
                      {invoice.shippingMethod.serviceName}&nbsp; (
                      {invoice.shippingDetails?.totalWeight} grams)
                    </Typography>
                  </Box>
                  <Typography className="font-medium text-lg">
                    {rupiah(invoice.shippingMethod.price)}
                  </Typography>
                </Box>
                <Box className="flex items-center gap-4 justify-between">
                  <Typography className="font-semibold text-lg text-slate-600">
                    Insurance
                  </Typography>

                  <Typography className="font-medium text-lg">
                    {rupiah(invoice.shippingMethod.insuranceFee)}
                  </Typography>
                </Box>
              </>
            )}
            <Box className="flex items-center gap-4 justify-between">
              <Typography className="font-semibold text-lg text-slate-600">
                Tax (11%)
              </Typography>

              <Typography className="font-medium text-lg">
                {rupiah(priceItem * 0.11)}
              </Typography>
            </Box>
            <Divider />
            <Box className="flex items-center gap-4 justify-between">
              <Typography className="font-semibold text-lg">
                Sub Total
              </Typography>

              <Typography className="font-medium text-lg">
                {rupiah(
                  priceItem +
                    (invoice.shippingMethod?.price ?? 0) +
                    (invoice.shippingMethod?.insuranceFee ?? 0) +
                    priceItem * 0.11
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

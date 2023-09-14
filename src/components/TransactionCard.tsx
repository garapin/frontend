import { invoiceStatusColor } from "@/const/status";
import { toDate } from "@/tools/firebaseDate";
import { rupiah } from "@/tools/rupiah";
import { formatDateTime, getCategoryLabel, numberFormat } from "@/tools/utils";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const TransactionCard = ({
  val,
  currentTab,
  dateHistory,
  invoiceStatus,
  handleOpen,
}: any) => {
  const [openDetail, setOpenDetail] = React.useState(false);
  return (
    <Grid item md={12} onClick={() => handleOpen(val)} className="w-full">
      <Box className="space-y-4 bg-slate-50 p-4 rounded-lg">
        <img
          src={val?.product?.img?.[0] ?? val?.products?.[0]?.product?.img?.[0]}
          alt="img_prod"
          className="w-full aspect-video object-cover rounded-md"
        />
        <Typography
          variant="body1"
          color="purple"
          className="text-sm font-semibold"
        >
          {getCategoryLabel(val?.product?.category)}
        </Typography>
        <Typography variant="h6" className="text-lg line-clamp-1">
          {val?.product?.productName ??
            val?.products?.[0]?.product?.productName}
        </Typography>
        <div className="flex items-center gap-2 text-slate-700 font-light">
          {currentTab !== "cp" ? (
            <>
              <Typography variant="h5" className="font-bold text-sm">
                {rupiah(
                  (val.quantity
                    ? val.quantity * val?.product?.maxPrice
                    : val.totalPrice) ?? 0
                )}
              </Typography>
              <p className="font-semibold border-slate-600 text-sm">|</p>
            </>
          ) : null}
          <Typography className="font-bold text-sm">
            {numberFormat(
              val.quantity ??
                val.products?.reduce(
                  (val: any, data: any) => val + Number(data.qty),
                  0
                )
            )}{" "}
            Pcs
          </Typography>
        </div>
        <Typography className="font-bold text-sm text-slate-600">
          {dateHistory.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
        {val?.status && (
          <Chip
            label={
              invoiceStatus.find((v: any) => v.status === val?.status)?.label
            }
            color={invoiceStatusColor(val?.status)}
            className="capitalize"
          />
        )}
        <div>
          {val.status === "checkout" &&
            currentTab !== "cp" &&
            val.paymentLink && (
              <Link href={val.paymentLink}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className="py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  Bayar Sekarang
                </Button>
              </Link>
            )}

          {val.status === "checkout" && (
            <>
              <Typography variant="body2">
                Selesaikan pembayaran sebelum
              </Typography>
              <Typography variant="body2" className="font-bold">
                {formatDateTime(toDate(val.paymentExpiredAt))}
              </Typography>
            </>
          )}
        </div>
        <Box>
          <div className="flex items-center justify-end">
            <Button
              className="capitalize"
              variant="text"
              color="inherit"
              //   endIcon={openDetail ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() => handleOpen(val)}
            >
              Detail
            </Button>
          </div>
        </Box>
      </Box>
    </Grid>
  );
};

export default TransactionCard;

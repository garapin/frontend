import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, Chip, Modal, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { Star } from "@mui/icons-material";
import { LinkIconSVG } from "@/assets/icons/link-icon";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CardAffiliate({
  imageUrl,
  productName,
  price,
  slug,
  category,
  reviews = 4,
  isWhiteBg = false,
}: {
  imageUrl: string;
  productName: string;
  price: string;
  slug: string;
  maxWidth?: string;
  category?: string;
  reviews?: number;
  isWhiteBg?: boolean;
}) {
  const [showRating, setShowRating] = React.useState(false);
  const [openLink, setOpenLink] = React.useState(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };
  const auth: any = useFirebaseAuth();

  const generatedLink = (slug: string) => {
    return `https://heipack.com/product-detail/${slug}?utm_source=affiliate&utm_medium=link&utm_campaign=affiliate&uid=${auth.authUser?.uid}`;
  };

  return (
    <Box className={`${isWhiteBg ? "bg-white" : "bg-slate-50"} p-4 rounded-lg`}>
      <div className="relative mb-2">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full aspect-square rounded-lg"
        />
        <Chip
          color="primary"
          size="small"
          label="Komisi 30%"
          className="absolute top-2 left-2"
        />
      </div>
      <div className="space-y-2">
        <Typography
          variant="body1"
          color="purple"
          className="text-sm font-semibold"
        >
          {category}
        </Typography>
        <Typography variant="h6" className="text-lg line-clamp-2 min-h-[56px]">
          {productName}
        </Typography>
        {showRating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">{reviews}</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                fontSize="small"
                className={`${
                  i + 1 <= reviews ? "text-yellow-500" : "text-slate-500"
                }`}
              />
            ))}
          </div>
        )}
        <Typography color="purple" sx={{ fontSize: 13 }}>
          {price}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="capitalize"
          onClick={() => {
            setOpenLink(true);
          }}
        >
          Promosikan
        </Button>
      </div>

      <Modal
        open={openLink}
        onClose={() => setOpenLink(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-2/3 space-y-4">
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-md">
            <img
              style={{ borderRadius: "20%" }}
              className="rounded-lg object-cover w-full aspect-video md:w-44 md:h-44"
              src={imageUrl}
              alt="image"
            />
            <div className="space-y-2">
              <Typography
                className="max-w-[12rem] text-[#713F97] pt-2 font-semibold"
                fontSize={14}
                fontWeight={400}
              >
                {category}
              </Typography>
              <Typography
                fontSize={17}
                fontWeight={400}
                color="text.primary"
                className="font-semibold"
              >
                {productName}
              </Typography>
              <Typography className="text-sm text-slate-600">
                {price}
              </Typography>
            </div>
          </div>
          <div className="pt-2">
            <p className="font-medium text-2xl mb-2">
              Share Linknya & Dapatkan Uangnya
            </p>
            <p className="text-slate-500">
              Dengan share link kamu bisa mendapatkan uang dengan jutaan rupiah.
            </p>
          </div>
          <div className="flex items-center">
            <TextField
              fullWidth
              disabled
              value={generatedLink(slug)}
              InputProps={{
                endAdornment: (
                  <CopyToClipboard text={generatedLink(slug)}>
                    <Button variant="contained" className="py-4 px-4">
                      <LinkIconSVG className="w-6 h-6 text-black" />
                    </Button>
                  </CopyToClipboard>
                ),
                style: {
                  paddingRight: "0px",
                },
              }}
            />
          </div>
          <Button
            variant="contained"
            fullWidth
            className="py-3 capitalize"
            onClick={() => {
              setOpenLink(false);
            }}
          >
            Selesai
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

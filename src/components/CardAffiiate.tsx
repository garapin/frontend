import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { Star } from "@mui/icons-material";

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
  const router = useRouter();
  const [showRating, setShowRating] = React.useState(false);
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
          onClick={() => {}}
        >
          Promosikan
        </Button>
      </div>
    </Box>
  );
}

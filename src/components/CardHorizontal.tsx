import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

export default function CardHorizontal({
  imageUrl,
  productName,
  price,
  location,
  slug,
  clickable = true,
}: {
  imageUrl: string;
  productName: string;
  price: string;
  location: string;
  slug: string;
  clickable?: boolean;
}) {
  const router = useRouter();

  return (
    <Card
      className="flex flex-row"
      sx={{ maxWidth: 400 }}
      onClick={() => {
        if (clickable) {
          router.push("/product-detail/" + slug);
        }
      }}
    >
      <CardActionArea>
        <Box className="">
          <CardMedia
            component="img"
            image={imageUrl}
            alt="Card Image"
            sx={{
              width: '100%',
              height: 190,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <CardContent>
            <Box className="justify-around">
              <Typography variant="h6">{productName}</Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: 12 }}
                className="pb-3"
              >
                {price}
              </Typography>
              <Box className="flex" style={{ alignItems: "center", display: 'flex' }}>
                <LocationOnIcon className="mr-1" sx={{ width: 9 }} />
                <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                  {location}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}

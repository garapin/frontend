import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import {useRouter} from 'next/router';

export default function CardVertical({
                                         imageUrl,
                                         productName,
                                         price,
                                         location,
                                         slug,
                                         clickable = true
                                     }: { imageUrl: string, productName: string, price: string, location: string, slug: string, clickable?: boolean }) {

    const router = useRouter();

    return (
        <Card sx={{maxWidth: 190, height: '100%'}} onClick={() => {
            router.push('/product-detail');
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt="Card Image"
                    sx={{width: 190, height: 190, objectFit: "cover", objectPosition: "center"}}
                />
                <CardContent>
                    <Typography variant="h6">
                        {productName}
                    </Typography>
                    <Typography color="text.secondary" sx={{fontSize: 12}} className="pb-3">
                        {price}
                    </Typography>
                    <Box className="flex flex-row" style={{alignItems: "center"}}>
                        <LocationOnIcon className="mr-1" sx={{width: 9}}/>
                        <Typography color="text.secondary" sx={{fontSize: 12}}>
                            {location}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
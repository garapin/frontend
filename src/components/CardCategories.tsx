import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import {useRouter} from 'next/router';

export default function CardCategories({
                                           imageUrl,
                                           categoryName,
                                           description,
                                           slug
                                       }: { imageUrl: string, categoryName: string, description: string, slug: string }) {

    const router = useRouter();

    return (
        <Card sx={{maxWidth: 190, height: '100%'}} onClick={() => {
            router.push(`/product-category${slug !== undefined ? `?search=${slug}` : ''}`);
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt="Card Image"
                    sx={{width: 150, height: 150, objectFit: "cover", objectPosition: "center"}}
                />
                <Box className="flex flex-col justify-between">
                    <CardContent>
                        <Typography variant="h5">
                            <b>{categoryName}</b>
                        </Typography>
                        <Typography color="text.secondary" sx={{fontSize: 12}} className="pb-3">
                            {description}
                        </Typography>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
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
            router.push(`/product-category/${slug}`);
        }}>
            <CardActionArea>
                <Box sx={{height: '100%'}}>
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt="Card Image"
                        sx={{width: 190, height: 190, objectFit: "cover", objectPosition: "center"}}
                    />
                    <CardContent>
                        <Typography variant="h5">
                            <b>{categoryName}</b>
                        </Typography>
                        <Typography color="text.secondary" sx={{fontSize: 14}}>
                            {description}
                        </Typography>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    );
}
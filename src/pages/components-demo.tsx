import CardHorizontal from "@/components/CardHorizontal";
import CardVertical from "@/components/CardVertical";
import GarapinAppBar from "@/components/GarapinAppBar";
import GarapinFooter from "@/components/GarapinFooter";
import ImageCarousel, { CarouselImageSet } from "@/components/ImageCarousel";
import ListDetail from "@/components/ListDetail";
import GarapinVariantSelector from "@/components/GarapinVariantSelector";
import { Container, List, ListItem, Paper, Typography, Link as MuiLink, TextField, Button, Theme, createStyles } from "@mui/material";
import { Box } from "@mui/system"
import NextLink from "next/link";
import { useState } from "react";
import GarapinProductCustomizer from "@/components/GarapinProductCustomizer";
import { Template, TemplateInput } from "@/types/product";


const ComponentsDemo = () => {

    const imageSet: CarouselImageSet[] = [
        {
            srcUrl: 'https://images.pexels.com/photos/13258585/pexels-photo-13258585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            srcUrl: 'https://images.pexels.com/photos/14005688/pexels-photo-14005688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    ];
    const [selectedVariant, setSelectedVariant] = useState('');

    const corrugatedBoxOptions = [
        {
            name: 'Shipping Box',
            imgSrc: 'https://ph-prod.imgix.net/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg',
            value: 'shipping-box',
            price: 8000
        },
        {
            name: 'Mailer Box',
            imgSrc: 'https://cf.shopee.co.id/file/3d856acdb1e975165881e4ab47d2d36a',
            value: 'mailer-box',
            price: 3000
        },
        {
            name: 'Handle Box',
            imgSrc: 'https://cdn.shopify.com/s/files/1/1516/1182/products/CakeBoxwithHandle1Cropped3.png?v=1592811934',
            value: 'handle-box',
            price: 6500
        },
        {
            name: 'Top-Bottom Box',
            imgSrc: 'https://pacmart.in/wp-content/uploads/2020/08/p3.png',
            value: 'top-bottom-box',
            price: 7000
        },
        {
            name: 'Sliding Box',
            imgSrc: 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/6/28/cfe13c8b-d7a9-44ed-ac3a-83a18bafbd5f.jpg',
            value: 'sliding-box',
            price: 8000
        },

    ];

    const variants = [
        {
            name: 'Packaging Material',
            id: 'packaging-material',
            description: "Packaging material can be like this",
            options: [
                {
                    name: 'Corrugated Box',
                    imgSrc: 'https://picsum.photos/60',
                    value: 'corrugated-box',
                    price: 5000
                },
                {
                    name: 'Hard Box',
                    imgSrc: 'https://picsum.photos/60?random=1',
                    value: 'hard-box',
                    price: 7000
                },
                {
                    name: 'Thin Paper',
                    imgSrc: 'https://picsum.photos/60?random=2',
                    value: 'thin-paper',
                    price: 3000
                },
                {
                    name: 'Not sure',
                    imgSrc: 'https://picsum.photos/60?random=3',
                    value: 'not-sure',
                    price: 0
                }
            ]
        },
        {
            name: 'Corrugated Box Options',
            id: 'corrugated-box-options',
            description: "Box options can be like this",
            options: corrugatedBoxOptions
        }
    ];
    
    const template:Template = {
        active: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        variants: variants
    }

    const [variantSelectorValue, setVariantSelectorValue] = useState<TemplateInput>({});

    return (
        <Box 
        className='align-middle justify-center p-5'
        sx={{
            bgcolor: 'background.paper',
            pt: 3,
            pb: 2,
        }}>
            <Box className="py-5">
                <GarapinAppBar />
            </Box>
            <Box className="py-5">
                <GarapinAppBar searchVariant/>
            </Box>
            <CardHorizontal imageUrl="https://images.pexels.com/photos/13258585/pexels-photo-13258585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" productName="Product name" price="Rp.1.000-100.000" location="Jakarta"/>
            <Box className="py-5">
            {/* <CardVertical imageUrl="https://images.pexels.com/photos/13258585/pexels-photo-13258585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" productName="Product name" price="Rp.1.000-100.000" location="Jakarta"/> */}
            </Box>

            <Box className="py-5">
                <GarapinVariantSelector options={corrugatedBoxOptions} value={selectedVariant} handleChange={setSelectedVariant} />
                <GarapinProductCustomizer template={template} value={variantSelectorValue} handleChange={(variant, selected) => { if (selected !== undefined) {setVariantSelectorValue({...variantSelectorValue, [variant.id]: {variant, selectedOption: selected}})}}} options={{alignVariantOptions: 'left'}}/>
            </Box>
            {/* <GarapinFooter /> */}

        {/* <Paper elevation={5} className='flex-shrink'>
            <Container>
                <Typography variant="h5" className='pb-5 pt-3'>Components Example</Typography>
                <Typography variant="h6">Image Carousel</Typography>
                <Box className='max-w-lg'
                >
                    <ImageCarousel dataSource={imageSet} width={1000}/>
                </Box>

                <Typography variant="h6">List Detail Text</Typography>
                <Box className="pb-5">
                    <List>
                        <ListItem>
                            <ListDetail heading="Kategori">Furnitur</ListDetail>
                        </ListItem>
                        <ListItem>
                            <ListDetail heading="Subkategori">Perabot Rumah Tangga</ListDetail>
                        </ListItem>
                        <ListItem>
                            <ListDetail heading="With link"><NextLink href="/"><MuiLink>Beranda</MuiLink></NextLink></ListDetail>
                        </ListItem>
                        <ListItem>
                            <ListDetail heading="Long Text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum condimentum aliquam. Praesent sodales dapibus ipsum, a mattis ex lacinia non. Sed massa dui, suscipit non facilisis ac, vestibulum sit amet lectus. Fusce interdum, erat eget blandit bibendum, orci lacus luctus mi, vitae fermentum lorem ipsum in massa. Curabitur ornare eget justo eget venenatis. Praesent neque lectus, faucibus hendrerit elit non, fringilla pretium libero. Sed sit amet elementum elit, nec lacinia turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor quam id purus dapibus ornare. Nam euismod, justo nec rhoncus dapibus, orci erat lobortis ante, pulvinar auctor dolor dolor nec felis. Maecenas a sagittis libero.</ListDetail>
                        </ListItem>
                    </List>
                </Box>
            </Container>
        </Paper> */}
        </Box>
    );
}

export default ComponentsDemo;
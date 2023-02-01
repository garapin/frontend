import ImageCarousel, { CarouselImageSet } from "@/components/ImageCarousel";
import ListDetail from "@/components/ListDetail";
import { Container, List, ListItem, Paper, Typography, Link as MuiLink } from "@mui/material";
import { Box } from "@mui/system"
import NextLink from "next/link";

const ComponentsDemo = () => {

    const imageSet: CarouselImageSet[] = [
        {
            srcUrl: 'https://images.pexels.com/photos/13258585/pexels-photo-13258585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            srcUrl: 'https://images.pexels.com/photos/14005688/pexels-photo-14005688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    ];
    return (
        <Box 
        className='h-screen align-middle justify-center p-5'
        sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
        }}>
        <Paper elevation={5} className='flex-shrink'>
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
        </Paper>
        </Box>
    );
}

export default ComponentsDemo;
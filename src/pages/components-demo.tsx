import ImageCarousel, { CarouselImageSet } from "@/components/ImageCarousel";
import { Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system"

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
                <Typography variant="h5">Components Example</Typography>
                <Box 
                width={'500px'}
                >
                    <ImageCarousel dataSource={imageSet} width={1000}/>
                </Box>
            </Container>
        </Paper>
        </Box>
    );
}

export default ComponentsDemo;
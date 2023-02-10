import GarapinAppBar from "@/components/GarapinAppBar";
import ImageCarousel, { CarouselImageSet } from "@/components/ImageCarousel";
import { Box, Button, Paper, TextField, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme:Theme) => ({
    loginUi: {
        height: 'calc(100vh - 64px)',
        minHeight: 'calc(100vh - 64px)',
    },
    carousel: {
        height: 'calc(100vh - 85px)',
        maxHeight: 'calc(100vh - 85px)',
    }
}));
const LoginPage = () => {
     const classes = useStyles();
     const imageSet: CarouselImageSet[] = [
        {
            srcUrl: 'https://images.pexels.com/photos/13258585/pexels-photo-13258585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            srcUrl: 'https://images.pexels.com/photos/14005688/pexels-photo-14005688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    ];
    return (
        <Box className='h-screen'>
            <Paper>
            <GarapinAppBar searchVariant/>
            <Box className={`${classes.loginUi} flex flex-row flex-grow`}>
                <Box className='
                md:w-2/3 bg-gray-200 p-3'>
                    <ImageCarousel className={classes.carousel}
                     dataSource={imageSet} 
                     maxWidth={2000} 
                     withThumbnail={false} 
                     rsProps={{autoplay: true, autoplaySpeed: 5000, infinite: true}} 
                     useMagnifier={false}
                     rimProps={{className: classes.carousel}}/>
                </Box>
                <Box className='w-1/3 bg-gray-100'>
                    <Box className='flex flex-col justify-center h-full'>
                        <Box className='flex flex-col justify-center items-center'>
                            <Typography variant="h5">Login</Typography>
                            <Typography variant="subtitle1">Masuk ke akun Anda</Typography>
                        </Box>
                        <Box className='flex flex-col justify-center items-center'>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Email" variant="outlined"  fullWidth/>
                            </Box>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Password" variant="outlined" fullWidth/>
                            </Box>
                            <Box className='w-1/2 py-2'>
                                <Button variant="contained" fullWidth>Login</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            </Paper>
        </Box>
    )
}

export default LoginPage;
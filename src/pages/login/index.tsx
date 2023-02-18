import GarapinAppBar from "@/components/GarapinAppBar";
import ImageCarousel, { CarouselImageSet } from "@/components/ImageCarousel";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { Box, Button, CircularProgress, Paper, TextField, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import Link from "next/link";

const useStyles = makeStyles((theme:Theme) => ({
    loginUi: {
        height: 'calc(100vh - 64px)',
        minHeight: 'calc(100vh - 64px)',
        // height: '100vh',
        // minHeight: '100vh',
    },
    carousel: {
        height: 'calc(100vh - 85px)',
        maxHeight: 'calc(100vh - 85px)',
        // height: 'calc(100vh - 20px)',
        // maxHeight: 'calc(100vh - 20px)',
    }
}));

const LoginPage = () => {
    const classes = useStyles();
    const auth = useFirebaseAuth();
     const imageSet: CarouselImageSet[] = [
        {
            srcUrl: 'https://images.pexels.com/photos/13258585/pexels-photo-13258585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            srcUrl: 'https://images.pexels.com/photos/14005688/pexels-photo-14005688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    ];

    // make use of formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                await auth.signInWithEmailAndPassword(values.email, values.password);
            } catch (error:any) {
                console.log("there's an error: ", error);
                formik.setErrors({email: error.message});
            }
        },
    });

    return (
        <Box className={classes.loginUi}>
            <Paper>
            <GarapinAppBar searchVariant/>
            <Box className={`${classes.loginUi} flex flex-row flex-grow`} style={{marginTop:'64px'}}>
                <Box className='sm:w-0 md:w-2/3  bg-gray-200 p-3'>
                    <ImageCarousel className={classes.carousel}
                     dataSource={imageSet} 
                     maxWidth={2000} 
                     withThumbnail={false} 
                     rsProps={{autoplay: true, autoplaySpeed: 5000, infinite: true}} 
                     useMagnifier={false}
                     rimProps={{className: classes.carousel}}/>
                </Box>
                <Box className='sm:w-full lg:w-1/3 bg-gray-100'>
                    <Box className='flex flex-col justify-center h-full'>
                        <Box className='flex flex-col justify-center items-center' sx={{pb:4}}>
                            <Typography variant="h5">Login</Typography>
                            <Typography variant="subtitle1">Masuk ke akun Anda</Typography>
                        </Box>
                            <form onSubmit={formik.handleSubmit}>
                        <Box className='flex flex-col justify-center items-center'>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Email" 
                                    variant="outlined" name="email" fullWidth onChange={formik.handleChange} value={formik.values.email}
                                    error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email}
                                    />
                            </Box>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Password" type="password" name="password" 
                                variant="outlined" fullWidth onChange={formik.handleChange} value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password}
                                />
                            </Box>
                            <Box className='w-1/2 py-2'>
                                <Button variant="contained" fullWidth color="garapinColor" style={{
                                                          backgroundColor: '#713F97',
                                                          color: '#ffffff'
                                                      }} type="submit" disabled={formik.isSubmitting}>Login {formik.isSubmitting && <CircularProgress color="secondary" sx={{pl: 2}}/>}</Button>
                            </Box>
                        </Box>
                            </form>
                        <Box>
                            <Typography variant="subtitle1" className='text-center' sx={{pt:4}}>Belum punya akun? <Link href="/register">Daftar</Link></Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            </Paper>
        </Box>
    )
}

LoginPage.authGuard = false;
LoginPage.guestGuard = true;

export default LoginPage;
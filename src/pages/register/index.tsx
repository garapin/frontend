import GarapinAppBar from "@/components/GarapinAppBar";
import ImageCarousel, { CarouselImageSet } from "@/components/ImageCarousel";
import { getFirestore } from "@/configs/firebase";
// import { firestore } from "@/configs/firebase";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, TextField, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from 'yup';

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
    const firestore = getFirestore();

     const imageSet: CarouselImageSet[] = [
        {
            srcUrl: 'https://images.pexels.com/photos/13258585/pexels-photo-13258585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
            srcUrl: 'https://images.pexels.com/photos/14005688/pexels-photo-14005688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    ];

    const baseDataFormik = {
        namaLengkap: '',
        email: '',
        password: '',
        konfirmasiPassword: '',
        nomorHp: '',
        namaPerusahaan: '',
        liniBisnis: '',
        liniBisnisOtherVal: '',
    };

    const liniBisnis = [
        "Food & Beverages",
        "Fashion",
        "Health & Beauty",
        "Furniture, Home, Living",
        "Travel & Leisure",
        "Entertainment",
        "Education",
        "Automotive",
        "Technology",
        "Lainnya",
    ]

    // make use of formik
    const formik = useFormik({
        initialValues: baseDataFormik,
        validationSchema: Yup.object({
            namaLengkap: Yup.string()
                .required('Nama lengkap harus diisi'),
            email: Yup.string()
                .email('Alamat email tidak valid')
                .required('Alamat email harus diisi'),
            password: Yup.string()
                .required('Password harus diisi')
                .min(8, 'Password minimal 8 karakter'),
                //konfirmasiPassword is Password confirmation, must be same with password.
            konfirmasiPassword: Yup.string()
                .required('Konfirmasi password harus diisi')
                .oneOf([Yup.ref('password'), null], 'Password harus sama'),
            nomorHp: Yup.string()
                .required('Nomor HP harus diisi'),
            namaPerusahaan: Yup.string(),
            liniBisnis: Yup.string(),
            liniBisnisOtherVal: Yup.string(),
        }),
        onSubmit: async (values) => {
            try {
                const user = await auth.createUserWithEmailAndPassword(values.email, values.password);
                console.log("user: ", user);
                const objFirebase:any = {...values};

                delete objFirebase.password;
                delete objFirebase.konfirmasiPassword;
                await firestore.collection('usersData').doc(user.user?.uid).set(objFirebase);
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
                            <Typography variant="h5">Buat Akun Baru</Typography>
                            <Typography variant="subtitle1">Silakan isi form berikut</Typography>
                        </Box>
                            <form onSubmit={formik.handleSubmit}>
                        <Box className='flex flex-col justify-center items-center'>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Nama Lengkap" 
                                    variant="outlined" name="namaLengkap" fullWidth onChange={formik.handleChange} required value={formik.values.namaLengkap}
                                    error={formik.touched.namaLengkap && Boolean(formik.errors.namaLengkap)} helperText={formik.touched.namaLengkap && formik.errors.namaLengkap}
                                    />
                            </Box>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Email" 
                                    variant="outlined" name="email" fullWidth onChange={formik.handleChange} required value={formik.values.email}
                                    error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email}
                                    />
                            </Box>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Password" type="password" name="password" 
                                variant="outlined" fullWidth onChange={formik.handleChange} required value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password}
                                />
                            </Box>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Konfirmasi Password" type="password" name="konfirmasiPassword" 
                                variant="outlined" fullWidth onChange={formik.handleChange} required value={formik.values.konfirmasiPassword}
                                error={formik.touched.konfirmasiPassword && Boolean(formik.errors.konfirmasiPassword)} helperText={formik.touched.konfirmasiPassword && formik.errors.konfirmasiPassword}
                                />
                            </Box>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Nomor HP" 
                                    variant="outlined" name="nomorHp" fullWidth onChange={formik.handleChange} value={formik.values.nomorHp}
                                    error={formik.touched.nomorHp && Boolean(formik.errors.nomorHp)} required helperText={formik.touched.nomorHp && formik.errors.nomorHp}
                                    />
                            </Box>
                            <Typography variant="subtitle1" sx={{pt:4}}>Data Perusahaan</Typography>
                            <Box className='w-1/2 py-2'>
                                <TextField label="Nama Perusahaan" 
                                    variant="outlined" name="namaPerusahaan" fullWidth onChange={formik.handleChange} value={formik.values.namaPerusahaan}
                                    error={formik.touched.namaPerusahaan && Boolean(formik.errors.namaPerusahaan)} helperText={formik.touched.namaPerusahaan && formik.errors.namaPerusahaan}
                                    />
                            </Box>
                            
                            <Box className='w-1/2 py-2'>
                                <FormControl fullWidth>
                                <InputLabel id="business-label">Lini Bisnis</InputLabel>
                                <Select labelId="business-label" name="liniBisnis" fullWidth onChange={formik.handleChange} value={formik.values.liniBisnis}
                                label="Lini Bisnis" error={formik.touched.liniBisnis && Boolean(formik.errors.liniBisnis)}>
                                    {liniBisnis.map((businessLine) => (
                                        <MenuItem key={businessLine} value={businessLine}>{businessLine}</MenuItem>
                                    ))}
                                </Select>
                                { formik.touched.liniBisnis && Boolean(formik.errors.liniBisnis) &&
                                <FormHelperText error>{formik.errors.liniBisnis}</FormHelperText> }
                                </FormControl>
                                
                            </Box>
                            { formik.values.liniBisnis === 'Lainnya' &&
                            <Box className='w-1/2 py-2'>
                                <TextField label="Sebutkan lini bisnis Anda" 
                                    variant="outlined" name="liniBisnisOtherVal" fullWidth onChange={formik.handleChange} value={formik.values.liniBisnisOtherVal}
                                    error={formik.touched.liniBisnisOtherVal && Boolean(formik.errors.liniBisnisOtherVal)} helperText={formik.touched.liniBisnisOtherVal && formik.errors.liniBisnisOtherVal}
                                    />
                            </Box>
                            }
                            <Box className='w-1/2 py-2'>
                                <Button variant="contained" fullWidth color="garapinColor" style={{
                                                          backgroundColor: '#713F97',
                                                          color: '#ffffff'
                                                      }} type="submit" disabled={formik.isSubmitting}>Buat Akun {formik.isSubmitting && <CircularProgress size={10} color="secondary" sx={{ml: 2}}/>}</Button>
                            </Box>
                        </Box>
                            </form>
                        <Box className="text-center">
                            <Typography variant="subtitle1" sx={{pt:4}}>Sudah punya akun? <Link href="/login">Masuk</Link></Typography>
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
import LoginPage from "@/pages/login";
import * as React from 'react';
import clsx from 'clsx';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import {
    Box,
    Button,
    Divider,
    Typography,
    styled,
    TextField,
    InputAdornment,
    Dialog, DialogProps, DialogContent, DialogTitle, DialogActions
} from "@mui/material";
import GarapinAppBar from "@/components/GarapinAppBar";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppRedux";
import FallbackSpinner from "@/components/spinner";
import {getSingleProduct} from "@/store/modules/products";
import {i18n} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import InputBase from "@mui/material/InputBase";
import CardVertical from "@/components/CardVertical";
import GarapinProductCustomizer from "@/components/GarapinProductCustomizer";
import {useState} from "react";
import {Template, TemplateInput} from "@/types/product";
import {useFormik} from "formik";

// eslint-disable-next-line react/display-name
const BackdropUnstyled = React.forwardRef<
    HTMLDivElement,
    { open?: boolean; className: string }
>((props, ref) => {
    const {open, className, ...other} = props;
    return (
        <div
            className={clsx({'MuiBackdrop-open': open}, className)}
            ref={ref}
            {...other}
        />
    );
});

styled(ModalUnstyled)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.MuiModal-hidden {
    visibility: hidden;
  }
`);

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
styled(InputBase)(({theme}) => ({
    color: '#713F97',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 3),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '50ch',
        },
    },
}));

const ProductDetailPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [open, setOpen] = React.useState(false);

    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const formik = useFormik({
        initialValues: {
            orderDescription: '',
            quantity: '',
            contactName: '',
            phoneNumber: '',
            email: '',
            address: ''
        },
        onSubmit: async (values) => {
            console.log(values);
        },
    });


    const handleOpen = () => {
        setOpen(true);
        setScroll('paper');
    }
    const handleClose = () => setOpen(false);

    const {slug} = router.query;
    const {isProductLoading, singleProduct} = useAppSelector(state => state.products);

    console.log("SLUG:", slug);
    React.useEffect(() => {
        if (slug !== undefined) {
            dispatch(getSingleProduct(slug as string));
        }
    }, [slug])

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

    const template: Template = {
        active: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        variants: variants
    }

    const [variantSelectorValue, setVariantSelectorValue] = useState<TemplateInput>({});

    if (isProductLoading) {
        return <FallbackSpinner/>
    } else {
        return (
            <Box className="flex flex-col items-center">
                <GarapinAppBar searchVariant={true}/>
                <Box className="flex flex-row pt-20 md:px-72 justify-between">
                    <Box className="rounded-xl">
                        <img className="w-80 h-80"
                             src="https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg"
                             alt="Image with stock photos"/>
                    </Box>
                    <Box className="flex flex-col pl-20 w-full">
                        <Typography className="pt-10" variant="h4">{singleProduct?.productName}</Typography>
                        <Typography className="pt-2" variant="h5"
                                    color="#713F97">Rp {singleProduct?.minPrice?.toLocaleString('id-ID')} -
                            Rp {singleProduct?.maxPrice?.toLocaleString('id-ID')} / pcs</Typography>
                        <Box className="flex flex-row p-4 mt-6" sx={{borderRadius: '10px', backgroundColor: '#FADEFF'}}>
                            <img src="/warning_icon.svg" alt="icon warning"/>
                            <Typography className="pl-4">Harga yang tertera merupakan estimasi dan dapat berubah sesuai
                                kebutuhan atau permintaan yang diajukan</Typography>
                        </Box>
                        <Box className="flex flex-col">
                            <Box className="flex flex-row items-center justify-between pt-6">
                                <Typography variant="body2">Min. Pemesananan</Typography>
                                <Typography
                                    variant="body1"><b>{singleProduct?.moq?.toLocaleString('id-ID')} pcs</b></Typography>
                            </Box>
                            <Divider className="pt-2"/>
                            <Box className="flex flex-row items-center justify-between pt-2">
                                <Box className="flex flex-row items-center">
                                    <Typography className="mr-2" variant="body2">Lama Pengerjaan</Typography>
                                    <img className="w-3 h-3" src="/warning_icon.svg" alt="icon warning"/>
                                </Box>
                                <Typography variant="body1"><b>{singleProduct?.leadTime} hari</b></Typography>
                            </Box>
                            <Divider className="pt-2"/>
                            {/* <Box className="flex flex-row items-center justify-between pt-2">
                            <Typography variant="body2">Dikirim dari</Typography>
                            <Typography variant="body1"><b>{}</b></Typography>
                        </Box> */}
                            {/*<Divider className="pt-2"/>*/}
                            <Button className="my-10 w-fit" variant="contained"
                                    sx={{backgroundColor: '#713F97', color: 'white'}} onClick={handleOpen}>Minta
                                Penawaran</Button>
                            <form onSubmit={formik.handleSubmit}>
                                <Dialog
                                    aria-labelledby="scroll-dialog-title"
                                    aria-describedby="scroll-dialog-description"
                                    open={open}
                                    slots={{backdrop: Backdrop}}
                                    scroll={scroll}
                                    maxWidth={"lg"}
                                >
                                    <DialogTitle>Minta Penawaran</DialogTitle>
                                    <DialogContent dividers={scroll === 'paper'}>
                                        <Typography variant="body2">Anda mengajukan penawaran untuk produk
                                            berikut:</Typography>
                                        <br/>
                                        <CardVertical
                                            imageUrl='https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg'
                                            productName='test product' price='10000' location='Jakarta'
                                            slug='test-product' clickable={false}/>
                                        <br/>
                                        <Divider/>
                                        <br/>
                                        <GarapinProductCustomizer template={template} value={variantSelectorValue}
                                                                  handleChange={(variant, selected) => {
                                                                      if (selected !== undefined) {
                                                                          setVariantSelectorValue({
                                                                              ...variantSelectorValue,
                                                                              [variant.id]: {
                                                                                  variant,
                                                                                  selectedOption: selected
                                                                              }
                                                                          })
                                                                      }
                                                                  }} options={{alignVariantOptions: 'left'}}/>
                                        <br/>
                                        <Divider/>
                                        <br/>
                                        <Typography variant="body1"><b>Detail Produk</b></Typography>
                                        <br/>
                                        <Typography variant="body2">Masukkan informasi seputar kebutuhan anda atau
                                            pertanyaan terkait produk ini</Typography>
                                        <br/>
                                        <TextField fullWidth label='Order description'
                                                   value={formik.values.orderDescription} name={'orderDescription'}
                                                   onChange={formik.handleChange}/>
                                        <br/><br/>
                                        <TextField fullWidth label='Qty' value={formik.values.quantity} name={'quantity'}
                                                   onChange={formik.handleChange}/>
                                        <br/><br/>
                                        <Box className="max-w-xl mt-24 mb-20">
                                            <TextField placeholder={'Upload Files'} fullWidth
                                                       InputProps={{
                                                           endAdornment: <InputAdornment position="end"><Button
                                                               variant="contained"
                                                               color="garapinColor"
                                                               onClick={(event) => {

                                                               }}
                                                           >{'SELECT FILE'}</Button></InputAdornment>,
                                                       }}
                                            ></TextField>
                                        </Box>
                                        <br/>
                                        <Divider/>
                                        <br/>
                                        <Typography variant="body1"><b>Data Kontak</b></Typography>
                                        <br/>
                                        <Typography variant="body2">Mohon berikan kontak yang dapat dihubungi. Kami akan
                                            menindaklanjuti permintaan Anda melalui kontak berikut.</Typography>
                                        <br/>
                                        <TextField fullWidth label='Nama Contact Person' value={formik.values.contactName}
                                                   name={'contactName'}
                                                   onChange={formik.handleChange}/>
                                        <br/><br/>
                                        <TextField fullWidth label='081234567890' value={formik.values.phoneNumber}
                                                   name={'phoneNumber'}
                                                   onChange={formik.handleChange}/>
                                        <br/><br/>
                                        <TextField fullWidth label='emailanda@nama-perusahaan.co.id'
                                                   value={formik.values.email} name={'email'}
                                                   onChange={formik.handleChange}/>
                                        <br/><br/>
                                        <TextField fullWidth label='Alamat Perusahaan (opsional)'
                                                   value={formik.values.address} name={'address'}
                                                   onChange={formik.handleChange}/>
                                        <br/><br/>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button variant='text' onClick={handleClose}>Batal</Button>
                                        <Button variant='text' type='submit'>Kirim Permintaan</Button>
                                    </DialogActions>
                                </Dialog>
                            </form>
                            <Divider className="pt-2"/>
                            <Box>
                                <Typography className="pt-16" color="#7C7C7C" variant="h5">Tentang Produk</Typography>
                                <Typography className="pt-6" color="#3A3A3A"
                                            variant="body2">{singleProduct?.description}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="py-20">
                    <img src="/banner_inquiry.svg" alt="banner inquiry"/>
                </Box>
            </Box>
        )
    }
}

LoginPage.authGuard = false;
LoginPage.guestGuard = false;

export default ProductDetailPage;

export const getServerSideProps = async ({locale}: { locale: string }) => {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
    }
    return {
        props: {
            ...(await serverSideTranslations(locale, ['products', 'common']))
        }
    }
};
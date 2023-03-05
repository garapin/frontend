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
    Theme,
    TextField,
    css,
    InputAdornment,
    MenuItem,
    Menu
} from "@mui/material";
import GarapinAppBar from "@/components/GarapinAppBar";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppRedux";
import FallbackSpinner from "@/components/spinner";
import {getSingleProduct} from "@/store/modules/products";
import {i18n} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import CardHorizontal from "@/components/CardHorizontal";
import InputBase from "@mui/material/InputBase";
import Link from "next/link";

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

const Modal = styled(ModalUnstyled)(`
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

const StyledInputBase = styled(InputBase)(({theme}) => ({
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {slug} = router.query;
    const {isProductLoading, singleProduct} = useAppSelector(state => state.products);

    const style = (theme: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
        width: 1000,
        backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
        padding: '16px 16px 24px 16px',
    });

    const styleUpload = (theme: Theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 4,
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        width: '100%'
    });

    console.log("SLUG:", slug);
    React.useEffect(() => {
        if (slug !== undefined) {
            dispatch(getSingleProduct(slug as string));
        }
    }, [slug])


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
                            <Modal
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                                open={open}
                                onClose={handleClose}
                                slots={{backdrop: Backdrop}}
                                keepMounted
                            >
                                <Box sx={style}>
                                    <Typography variant="h6"><b>Minta Penawaran</b></Typography>
                                    <Typography variant="body2">Anda mengajukan penawaran untuk produk
                                        berikut:</Typography>
                                    <CardHorizontal
                                        imageUrl='https://edit.co.uk/uploads/2016/12/Image-1-Alternatives-to-stock-photography-Thinkstock.jpg'
                                        productName='test product' price='10000' location='Jakarta' slug='test-product' clickable={false}/>
                                    <Divider/>
                                    <Typography variant="body1"><b>Detail Produk</b></Typography>
                                    <Typography variant="body2">Masukkan informasi seputar kebutuhan anda atau pertanyaan terkait produk ini</Typography>
                                    <TextField label='Order description'/>
                                    <TextField label='Qty'/>
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
                                    <Divider/>
                                    <Typography variant="body1"><b>Data Kontak</b></Typography>
                                    <Typography variant="body2">Mohon berikan kontak yang dapat dihubungi. Kami akan menindaklanjuti permintaan Anda melalui kontak berikut.</Typography>
                                    <TextField label='Nama Contact Person'/>
                                    <TextField label='081234567890'/>
                                    <TextField label='emailanda@nama-perusahaan.co.id'/>
                                    <TextField label='Alamat Perusahaan (opsional)'/>
                                    <Button variant='text'>Kirim Permintaan</Button>
                                </Box>
                            </Modal>
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
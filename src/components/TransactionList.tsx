import { Typography, Modal, Fade, Backdrop, Button, Dialog, DialogProps, DialogTitle, DialogContent } from '@mui/material'
import React from 'react'
import { rupiah } from '@/tools/rupiah';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CardHorizontal from '@/components/CardHorizontal'
import { getAllHistory } from "@/store/modules/products";
import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux';

const dataSet = [
  {
    nama: 'Botol',
    img: 'https://assets.xboxservices.com/assets/1b/82/1b8254ab-e3cd-4443-8494-2478696632e7.jpg?n=111101_Gallery-0_31_1350x759.jpg',
    price: '143000',
    category: 'Ready to buy',
  },
  {
    nama: 'Botol',
    img: 'https://assets.xboxservices.com/assets/1b/82/1b8254ab-e3cd-4443-8494-2478696632e7.jpg?n=111101_Gallery-0_31_1350x759.jpg',
    price: '143000',
    category: 'Ready to buy',
  },
  {
    nama: 'Botol',
    img: 'https://assets.xboxservices.com/assets/1b/82/1b8254ab-e3cd-4443-8494-2478696632e7.jpg?n=111101_Gallery-0_31_1350x759.jpg',
    price: '143000',
    category: 'Ready to buy',
  },
  {
    nama: 'Botol',
    img: 'https://assets.xboxservices.com/assets/1b/82/1b8254ab-e3cd-4443-8494-2478696632e7.jpg?n=111101_Gallery-0_31_1350x759.jpg',
    price: '143000',
    category: 'Ready to buy',
  }
]

export default function TransactionList({ currentTab }: any) {

  const title = (category: any) => {
    if (category === '03') {
      return 'Custom Packaging'
    } else if (category === '02') {
      return 'Digital Packaging'
    } else {
      return 'Ready To Buy'
    }
  }

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [isHistory, setHistory] = React.useState()
  const handleOpen = (data) => {
    setOpen(true);
    setHistory(data)
  };
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { history } = useAppSelector(state => state.product);

  React.useEffect(() => {
    dispatch(getAllHistory())
    console.log(history?.filter((val: any) => val?.product?.category === '01', 'testf'));
    console.log(currentTab, 'testfa')

  }, [dispatch])

  let dataHistory = [];

  const renderList = () => {

  }

  if (currentTab === 'cp') {
    const cpData = history?.filter((val: any) => val?.product?.category === '03')
    dataHistory = cpData;
  }

  if (currentTab === 'rtb') {
    const cpData = history?.filter((val: any) => val?.product?.category === '01')
    dataHistory = cpData;
  }

  if (currentTab === 'dp') {
    const cpData = history?.filter((val: any) => val?.product?.category === '02')
    dataHistory = cpData;
  }

  console.log(dataHistory, 'testdf');

  return (
    <Box style={{ border: '1px solid black' }} className='p-6 rounded-xl'>
      {dataHistory?.map((val, i) => {
        return (
          <Box className='mt-5' key={i}>
            <Box style={{ border: '1px solid gray' }} className='w-full rounded-lg p-6 drop-shadow-2xl shadow-md'>
              <Box id='header' className='flex items-center'>
                <Typography fontWeight={600} marginRight='20px'>{title(val?.product?.category)}</Typography>
                <Typography marginRight='20px'> 25 Maret 2023</Typography>

                <Box className='bg-[#03AC0E] capitalize bg-opacity-30 p-3 pr-6 pl-6 text-[#03AC0E] rounded-full'>{val?.status}</Box>
              </Box>
              <Box className='flex items-center justify-between'>
                <Box>
                  <Box className='flex items-center'>
                    <img className='w-16 h-16 mr-4 object-contain' src={val?.product?.img?.[0]} alt="img_prod" />
                    <Typography variant='h6' fontWeight={600}>
                      {val?.product?.productName}
                    </Typography>
                  </Box>
                  {currentTab === 'cp' ? <>
                    <Typography>{val.quantity} items</Typography>
                    <Typography marginTop='10px' width='60%'>{val?.orderDescription}</Typography></> : null}
                </Box>
                {currentTab !== 'cp' ?
                  <>
                    <Box>
                      <Typography>Total Harga</Typography>
                      <Typography>{rupiah(val.quantity * val?.product?.maxPrice)}</Typography>
                    </Box></>
                  : null}
              </Box>
              <Box className='flex justify-end mt-5 mb-3'>
                <button onClick={() => handleOpen(val)} className='border-none outline-none bg-transparent text-[#bb86fc] cursor-pointer'>See Transaction Detail</button>
              </Box>
            </Box>
          </Box>
        )
      })}
      <Dialog
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        scroll={scroll}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle>
          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography id="transition-modal-title" variant="h5" marginBottom='10px' fontWeight={600} component="h2">
              Custom Packaging Inquiry
            </Typography>
            <Box style={{ cursor: 'pointer' }} onClick={() => handleClose()}>
              <CloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Typography id="transition-modal-description" fontWeight={600} marginBottom='10px' sx={{ mt: 2 }}>
            Inquiry Details
          </Typography>
          <CardHorizontal imageUrl={isHistory?.product?.img?.[0]} productName={isHistory?.product?.productName} price={rupiah(isHistory?.product?.minPrice) + '-' + rupiah(isHistory?.product?.maxPrice)} location="Jakarta" slug={isHistory?.product?.slug} />
          <Box>
            <table style={{ borderSpacing: '30px', borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
              <tr style={{ marginBottom: '20px' }}>
                <td style={{ width: '300px' }}>Quantity</td>
                <td>{isHistory?.quantity} items</td>
              </tr>
              <tr>
                <td>Attached File</td>
                <td>File.pdf</td>
              </tr>
              <tr>
                <td>Order Description</td>
                <td> {isHistory?.orderDescription}
                </td>
              </tr>
            </table>
          </Box>
          <Box sx={{ marginTop: '10px', display: 'flex' }}>
            <Typography sx={{ marginRight: '30px' }}>Product Customization</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {isHistory && Object?.keys( isHistory?.selectedOptions).map((key, i) => (
                <Box key={i} sx={{ marginRight: '30px' }}>
                  <Typography fontWeight={600}>{key}</Typography>
                  <Typography>Variant description here</Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Box style={{ marginRight: '10px', width: '50px', height: '50px', borderRadius: '2px', backgroundColor: 'red' }}></Box>
                    <Typography>Handle Box</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        {/* <Box sx={style}>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="transition-modal-title" variant="h5" marginBottom='10px' fontWeight={600} component="h2">
                Custom Packaging Inquiry
              </Typography>
              <Box style={{ cursor: 'pointer' }} onClick={() => handleClose()}>
                <CloseIcon />
              </Box>
            </Box>
            <hr style={{ marginBottom: '20px' }} />
            <Typography id="transition-modal-description" fontWeight={600} marginBottom='10px' sx={{ mt: 2 }}>
              Inquiry Details
            </Typography>
            <CardHorizontal />
            <Box>
              <table style={{ borderSpacing: '30px', borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
                <tr style={{ marginBottom: '20px' }}>
                  <td style={{ width: '300px' }}>Quantity</td>
                  <td>10 items</td>
                </tr>
                <tr>
                  <td>Attached File</td>
                  <td>File.pdf</td>
                </tr>
                <tr>
                  <td>Order Description</td>
                  <td> Long text.
                  </td>
                </tr>
              </table>
            </Box>
            <Box sx={{ marginTop: '10px', display: 'flex' }}>
              <Typography sx={{ marginRight: '30px' }}>Product Customization</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box sx={{ marginRight: '30px' }}>
                  <Typography fontWeight={600}>Corrugated Box Options</Typography>
                  <Typography>Variant description here</Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Box style={{ marginRight: '10px', width: '50px', height: '50px', borderRadius: '2px', backgroundColor: 'red' }}></Box>
                    <Typography>Handle Box</Typography>
                  </Box>
                </Box>
                <Box sx={{ marginRight: '30px' }}>
                  <Typography fontWeight={600}>Corrugated Box Options</Typography>
                  <Typography>Variant description here</Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Box style={{ marginRight: '10px', width: '50px', height: '50px', borderRadius: '2px', backgroundColor: 'red' }}></Box>
                    <Typography>Handle Box</Typography>
                  </Box>
                </Box>
                <Box sx={{ marginRight: '30px' }}>
                  <Typography fontWeight={600}>Corrugated Box Options</Typography>
                  <Typography>Variant description here</Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Box style={{ marginRight: '10px', width: '50px', height: '50px', borderRadius: '2px', backgroundColor: 'red' }}></Box>
                    <Typography>Handle Box</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '20px' }}>
              <Typography sx={{ marginRight: '80px' }}>Contanct Detail</Typography>
              <Box>
                <Typography fontWeight={600}>Arkan</Typography>
                <Typography>085717617899</Typography>
                <Typography>Jakarta</Typography>
                <Typography>arkanaa@gmail.com</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between' }}>
              <Typography variant='h5' fontWeight={600}>Quotation</Typography>
              <Button style={{ padding: '10px', borderRadius: '5px' }}>Download Quatitaion</Button>
            </Box>
          </Box> */}
      </Dialog>
    </Box>
  )
}

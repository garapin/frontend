import { Typography, Modal, Fade, Backdrop } from '@mui/material'
import React from 'react'
import { rupiah } from '@/tools/rupiah';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CardHorizontal from '@/components/CardHorizontal'

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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function TransactionList({ currentTab }: any) {

  const title = () => {
    if (currentTab === 'cp') {
      return 'Custom Packaging'
    } else if (currentTab === 'dp') {
      return 'Digital Packaging'
    } else {
      return 'Ready To Buy'
    }
  }

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ border: '1px solid black' }} className='p-6 rounded-xl'>
      {dataSet.map((val, i) => {
        return (
          <div className='mt-5' key={i}>
            <div style={{ border: '1px solid gray' }} className='w-full rounded-lg p-6 drop-shadow-2xl shadow-md'>
              <div id='header' className='flex items-center'>
                <Typography fontWeight={600} marginRight='20px'>{title()}</Typography>
                <Typography marginRight='20px'> 25 Maret 2023</Typography>
                <div className='bg-[#03AC0E] bg-opacity-30 p-3 pr-6 pl-6 text-[#03AC0E] rounded-full'>Shipped</div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='flex items-center'>
                    <img className='w-16 h-16 mr-4 object-contain' src="https://assets.xboxservices.com/assets/1b/82/1b8254ab-e3cd-4443-8494-2478696632e7.jpg?n=111101_Gallery-0_31_1350x759.jpg" alt="img_prod" />
                    <Typography variant='h6' fontWeight={600}>
                      Paper Cup Kopi “More Caffeine, Less Stressin’ “ (per pack @20pcs)
                    </Typography>
                  </div>
                  {currentTab === 'cp' ? <>
                    <Typography>2300 items</Typography>
                    <Typography marginTop='10px' width='60%'>Deskripsi yang ditulis user/customer di form Request Penawaran (textarea besar) ditulis disini. Lorem ipsum dolor sit amet consectetur. Nam ut erat proin sem fermentum. Blandit purus tincidunt quis feugiat.</Typography></> : null}
                </div>
                {currentTab !== 'cp' ?
                  <>
                    <div>
                      <Typography>Total Harga</Typography>
                      <Typography>{rupiah(1800000)}</Typography>
                    </div></>
                  : null}
              </div>
              <div className='flex justify-end mt-5 mb-3'>
                <button onClick={() => handleOpen()} className='border-none outline-none bg-transparent text-[#bb86fc] cursor-pointer'>See Transaction Detail</button>
              </div>
            </div>
          </div>
        )
      })}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography id="transition-modal-title" variant="h5" marginBottom='10px' fontWeight={600} component="h2">
                Custom Packaging Inquiry
              </Typography>
              <div style={{ cursor: 'pointer' }} onClick={() => handleClose()}>
                <CloseIcon />
              </div>
            </div>
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
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '10px', width: '50px', height: '50px', borderRadius: '2px', backgroundColor: 'red' }}></div>
                    <Typography>Handle Box</Typography>
                  </div>
                </Box>
                <Box sx={{ marginRight: '30px' }}>
                  <Typography fontWeight={600}>Corrugated Box Options</Typography>
                  <Typography>Variant description here</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '10px', width: '50px', height: '50px', borderRadius: '2px', backgroundColor: 'red' }}></div>
                    <Typography>Handle Box</Typography>
                  </div>
                </Box>
                <Box sx={{ marginRight: '30px' }}>
                  <Typography fontWeight={600}>Corrugated Box Options</Typography>
                  <Typography>Variant description here</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '10px', width: '50px', height: '50px', borderRadius: '2px', backgroundColor: 'red' }}></div>
                    <Typography>Handle Box</Typography>
                  </div>
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
              <button style={{ padding: '10px', borderRadius: '5px' }}>Download Quatitaion</button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

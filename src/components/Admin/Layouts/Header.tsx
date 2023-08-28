import { Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'

export default function Header({title, subtitle}: {title: string, subtitle: string}) {
  return (
    <>
        <Head>
            <title>{title} | Garapin Admin</title>
        </Head>
        <Typography variant='h5' sx={{pt:3}}>{title}</Typography>
        <Typography variant='subtitle1' sx={{pb:3}}>{subtitle}</Typography>
    </>
  )
}

import { Box, Divider, Typography } from '@mui/material';
import React from 'react'

export default function ListDetail({heading, children, showDivider=true}: {heading: string, children: React.ReactNode, showDivider?: boolean}) {
    return <>
        <Box display='flex' flexDirection={'column'} flexGrow={1}>
        <Box display='flex' sx={{ justifyContent: 'space-between', flexGrow: 1}}>
            <Typography flex={1}><b>{heading}</b></Typography>
            <Typography flex={2} align='right'>{children}</Typography>
        </Box>
        {showDivider && <Divider className="pt-3" />}
        </Box>
    </>;
}
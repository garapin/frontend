import { VariantOption } from '@/types/product';
import { Box, Card, CardContent, CardTypeMap, Grid, Typography } from '@mui/material'
import { display } from '@mui/system';
import React, { useState } from 'react'

type CardExtended = CardTypeMap['props'] & {
    active: boolean;
    imgSrc?: string;
    text: string;
    selectHandler: () => void;
}

const variants = [
    {
        name: 'Packaging Material',
        description: "Packaging material can be like this",
        options: [
            {
                name: 'Corrugated Box',
                imgSrc: 'https://picsum.photos/60',
                value: 'corrugated-box'
            },
            {
                name: 'Hard Box',
                imgSrc: 'https://picsum.photos/60',
                value: 'hard-box'
            },
            {
                name: 'Thin Paper',
                imgSrc: 'https://picsum.photos/60',
                value: 'thin-paper'
            },
            {
                name: 'Not sure',
                imgSrc: 'https://picsum.photos/60',
                value: 'not-sure'
            }
        ]
    },
];

export default function GarapinVariantSelector({handleChange, options, value, justifyContent='center', allowNotSure=true}: 
    {   handleChange: (value: string) => void, 
        options: VariantOption[], value?: string, 
        justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'inherit' | 'initial' | 'revert' | 'unset' | undefined
        allowNotSure?: boolean
    }) {
    const [selected, setSelected] = useState(1);
  return (
    <div>
        <Grid container
            justifyContent={justifyContent}>
            {options.map((item) => <Grid item xs={6} md={3} lg={2} key={item.value} sx={{p: 2 }}>
                <CardItemsOption active={item.value === value} imgSrc={item.imgSrc} text={item.name} selectHandler={() => handleChange(item.value)} />
                </Grid>)}
            { allowNotSure && (options.findIndex((item) => item.value === 'not-sure') === -1) && <Grid item xs={6} md={3} lg={2} sx={{p: 2 }} key="not-sure">
                    <CardItemsOption active={'not-sure' === value} text={'Not Sure'} selectHandler={() => handleChange('not-sure')} />
                </Grid>
            }   

        </Grid>
    </div>
  )
}
function CardItemsOption(props: CardExtended) {
    const {selectHandler, imgSrc, text, ...other} = props;
    return (<Card 
        aria-selected={props.active}
        tabIndex={0}
        variant="outlined"
        sx={{
            height: '100%',
            boxShadow: (theme) => props.active? `inset 0px 0px 0px 2px ${theme.palette.primary.main}` : `inset 0px 0px 1px ${theme.palette.grey[900]}`,
            backgroundColor: (theme) => props.active ? 'rgba(235, 228, 240,0.4)' : theme.palette.background.paper,

            border: 'none',
            transition: 'box-shadow 0.2s ease-in-out',
        }} 
        onClick={props.selectHandler}
        onKeyUp={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                props.selectHandler();
            }
        }}
        {...other}>
        <CardContent className='cursor-pointer' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', px: 4, py:4, justifyContent: 'center', height: '100%'}}>
            {props.imgSrc !== undefined && <img src={props.imgSrc} style={{ borderRadius: '5px', width: '80px' }}></img> }
            <Typography variant="body1" fontWeight={props.active ? 600 : 400} textAlign="center" sx={{
                pt: 2,
                lineHeight: 1.0,
                transition: 'font-weight 0.05s linear',
                transitionDelay: 'font-weight 0.1s'
            }}>{props.text}</Typography>
        </CardContent>
    </Card>);
}


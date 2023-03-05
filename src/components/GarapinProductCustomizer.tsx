import { rupiah } from '@/tools/rupiah';
import { Template, TemplateInput, Variant, VariantOption } from '@/types/product';
import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import GarapinVariantSelector from './GarapinVariantSelector';

interface options {
    showPriceCalculation?: boolean
    allowNotSure?: boolean
    alignVariantOptions?: 'left' | 'center' | 'right'
    title?: string
    showTitle?: boolean
}

export default function GarapinProductCustomizer({handleChange, template, value, options}: 
    {handleChange: (variant: Variant, selected: VariantOption|undefined) => void, template: Template, value: TemplateInput, options?: options}) {
        const [selectedVariant, setSelectedVariant] = React.useState<string | null>(null);



  return (
    <div>
        {options?.showTitle !== false && <Typography variant='h5' sx={{pb:1}}>{options?.title !== undefined ? options.title : 'Customize your Product'}</Typography> }
        {template.variants.map((variant) => 
            <div key={variant.name}>
                <Grid container sx={{pt:5}}>
                    <Grid item xs={options?.showPriceCalculation !== false? 7 : 12} md={options?.showPriceCalculation !== false?6:12}>
                        <Typography variant='h6' sx={{lineHeight: 1}}>{variant.name}</Typography>
                        <Typography variant='body1' sx={{pt:1}}>{variant.description}</Typography>
                    </Grid>
                    { options?.showPriceCalculation !== false && <Grid item xs={5} md={6}>
                        <Grid container alignItems={{xs: 'flex-start', md: 'center',}} justifyContent={'flex-end'} sx={{height: '100%'}}>
                            <Grid item>
                                <Typography variant='body1'>{value[variant.id] !== undefined ? rupiah(value[variant.id].selectedOption.price): ''}</Typography>
                            </Grid>
                        </Grid>
                    </Grid> }
                </Grid>
                <GarapinVariantSelector handleChange={(val) => {
                    if (val === 'not-sure' && options?.allowNotSure !== false) {
                        handleChange(variant, {name: 'Not Sure', value: 'not-sure', price: 0})
                    } else {
                        handleChange(variant, variant.options.find((varOptSingle) => varOptSingle.value === val))
                    }
                }} options={variant.options} value={
                    value[variant.id]?.selectedOption.value
                    }
                    justifyContent={options?.alignVariantOptions === 'left' ? 'flex-start' : options?.alignVariantOptions === 'right' ? 'flex-end' : 'center'}
                    />
            </div>
            )}

    </div>

  )
}

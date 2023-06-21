import { rupiah } from "@/tools/rupiah";
import {
  Template,
  TemplateInput,
  Variant,
  VariantOption,
} from "@/types/product";
import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import GarapinVariantSelector from "./GarapinVariantSelector";

interface options {
  showPriceCalculation?: boolean;
  allowNotSure?: boolean;
  alignVariantOptions?: "left" | "center" | "right";
  title?: string;
  showTitle?: boolean;
}

export default function GarapinProductCustomizer({
  handleChange,
  template,
  value,
  options,
}: {
  handleChange: (variant: Variant, selected: VariantOption | undefined) => void;
  template: Template;
  value: TemplateInput;
  options?: options;
}) {
  const [selectedVariant, setSelectedVariant] = React.useState(
    template.variants.map((variant: any) => {
      return {
        ...variant,
        hasQtyFields: variant.hasQtyFields ?? false,
        calculatePriceToDimension: variant.calculatePriceToDimension ?? false,
        qty: 1,
        selectedOption: null,
        totalPrice: 0,
      };
    })
  );

  return (
    <div>
      {options?.showTitle !== false && (
        <Typography variant="h5" sx={{ pb: 1 }}>
          {options?.title !== undefined
            ? options.title
            : "Customize your Product"}
        </Typography>
      )}
      {selectedVariant.map((variant) => (
        <div key={variant.name}>
          <Grid container sx={{ pt: 4 }}>
            <Grid item xs={options?.showPriceCalculation !== false ? 8 : 12}>
              <Grid container className="items-center" spacing={2}>
                <Grid item md={8}>
                  <Typography variant="h6" sx={{ lineHeight: 1 }}>
                    {variant.name}
                  </Typography>
                  <Typography variant="body1" sx={{ pt: 1 }}>
                    {variant.description}
                  </Typography>
                </Grid>
                {variant.hasQtyFields && (
                  <Grid
                    item
                    md={4}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Quantity"
                      defaultValue={1}
                      value={variant.qty}
                      required
                      error={parseInt(variant.qty as unknown as string) < 1}
                      name={"Qty"}
                      type="number"
                      onChange={(e) => {
                        const opt = variant.options.find(
                          (optSingle: any) =>
                            optSingle.value ===
                            (value[variant.id]?.selectedOption?.value ??
                              variant.options[0].value)
                        );
                        handleChange({...variant, qty: parseInt(e.target.value)}, opt);
                        setSelectedVariant(
                          selectedVariant.map((varSingle) => {
                            if (varSingle.id === variant.id) {
                              return {
                                ...varSingle,
                                qty: parseInt(e.target.value ?? 1),
                                totalPrice:
                                  parseInt(e.target.value ?? 1) *
                                  (varSingle.selectedOption?.price ?? 0),
                              };
                            } else {
                              return varSingle;
                            }
                          })
                        );
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            {options?.showPriceCalculation !== false && (
              <Grid item xs={4}>
                <Grid
                  container
                  alignItems={{ xs: "flex-start", md: "center" }}
                  justifyContent={"flex-end"}
                  sx={{ height: "100%" }}
                >
                  <Grid item>
                    <Typography variant="body1">
                      {value[variant.id] !== undefined
                        ? rupiah(
                            value[variant.id].selectedOption.price *
                              (variant.qty ?? 1)
                          )
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
          <GarapinVariantSelector
            handleChange={(val) => {
              if (val === "not-sure" && options?.allowNotSure !== false) {
                handleChange(variant, {
                  name: "Not Sure",
                  value: "not-sure",
                  price: 0,
                });
                setSelectedVariant((prev) => {
                  return prev.map((varSingle) => {
                    if (varSingle.id === variant.id) {
                      return {
                        ...varSingle,
                        selectedOption: {
                          name: "Not Sure",
                          value: "not-sure",
                          price: 0,
                        },
                        totalPrice: 0,
                      };
                    }
                    return varSingle;
                  });
                });
              } else {
                const findVariant = variant.options.find(
                  (varOptSingle: { value: string }) =>
                    varOptSingle.value === val
                );
                handleChange(
                  {
                    ...variant,
                    selectedOption: findVariant,
                    totalPrice: findVariant?.price ?? 0,
                  },
                  findVariant
                );
                setSelectedVariant((prev) => {
                  return prev.map((varSingle) => {
                    if (varSingle.id === variant.id) {
                      return {
                        ...varSingle,
                        selectedOption: findVariant,
                        totalPrice: findVariant?.price ?? 0,
                      };
                    } else {
                      return varSingle;
                    }
                  });
                });
              }
            }}
            options={variant.options}
            value={value[variant.id]?.selectedOption.value}
            justifyContent={
              options?.alignVariantOptions === "left"
                ? "flex-start"
                : options?.alignVariantOptions === "right"
                ? "flex-end"
                : "center"
            }
          />
        </div>
      ))}
    </div>
  );
}

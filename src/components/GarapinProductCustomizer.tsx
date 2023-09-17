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
import { NumericFormat } from "react-number-format";

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
      const updatedVariant = { ...variant };
      if (updatedVariant.hasOwnDimensionW) {
        updatedVariant.ownWidth = 0;
      }
      if (updatedVariant.hasOwnDimensionL) {
        updatedVariant.ownLength = 0;
      }
      if (updatedVariant.hasOwnDimensionH) {
        updatedVariant.ownHeight = 0;
      }
      return {
        ...updatedVariant,
        hasQtyFields: updatedVariant.hasQtyFields ?? false,
        calculatePriceToDimension:
          updatedVariant.calculatePriceToDimension ?? false,
        qty: 1,
        selectedOption: updatedVariant.canSelectMultiple ? [] : null,
        totalPrice: 0,
      };
    })
  );

  return (
    <div className="space-y-6">
      {selectedVariant.map((variant) => (
        <div key={variant.name}>
          <Grid container>
            <Grid item xs={options?.showPriceCalculation !== false ? 8 : 12}>
              <Grid container className="items-center space-y-4" spacing={2}>
                <Grid item md={12}>
                  <Typography
                    variant="h6"
                    sx={{ lineHeight: 1 }}
                    className="text-base font-semibold text-slate-600"
                  >
                    {variant.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ pt: 1 }}
                    className="text-base font-normal text-slate-600"
                  >
                    {variant.description}
                  </Typography>
                </Grid>
                {variant.hasQtyFields && (
                  <Grid
                    item
                    md={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid container className="mb-2">
                      <Grid item sm={4}>
                        <TextField
                          fullWidth
                          label="Quantity"
                          defaultValue={1}
                          value={variant.qty}
                          size="small"
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
                            handleChange(
                              { ...variant, qty: parseInt(e.target.value) },
                              opt
                            );
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
                    </Grid>
                  </Grid>
                )}
                {(variant.hasOwnDimensionW ||
                  variant.hasOwnDimensionL ||
                  variant.hasOwnDimensionH) && (
                  <Grid item md={12}>
                    <Grid container className="mb-2" spacing={2}>
                      {variant.hasOwnDimensionW && (
                        <Grid item sm={4}>
                          <NumericFormat
                            fullWidth
                            allowLeadingZeros
                            allowNegative={false}
                            allowedDecimalSeparators={[",", "."]}
                            customInput={TextField}
                            decimalSeparator="."
                            min={0}
                            variant="outlined"
                            label="Width"
                            name={"width"}
                            defaultValue={0}
                            value={variant.ownWidth}
                            inputProps={{
                              style: {
                                padding: "10px 14px",
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                fontSize: "14px",
                              },
                            }}
                            required
                            error={
                              parseInt(variant.qty as unknown as string) < 1
                            }
                            onChange={(e) => {
                              const oldPt = variant.options.find(
                                (optSingle: any) =>
                                  optSingle.value ===
                                  (value[variant.id]?.selectedOption?.value ?? {
                                    ...variant.options[0],
                                    value: "",
                                  })
                              );
                              const opt = { ...oldPt };
                              opt.ownWidth = parseInt(e.target.value ?? 1);

                              setSelectedVariant(
                                selectedVariant.map((varSingle) => {
                                  if (varSingle.id === variant.id) {
                                    return {
                                      ...varSingle,
                                      ownWidth: parseInt(e.target.value ?? 1),
                                      totalPrice:
                                        parseInt(e.target.value ?? 1) *
                                        (varSingle.selectedOption?.price ?? 0),
                                      options: varSingle.options.map(
                                        (optSingle: any) => {
                                          if (
                                            optSingle.value ===
                                            (value[variant.id]?.selectedOption
                                              ?.value ??
                                              variant.options[0].value)
                                          ) {
                                            return {
                                              ...optSingle,
                                              ownWidth: parseInt(
                                                e.target.value ?? 1
                                              ),
                                            };
                                          }
                                          return optSingle;
                                        }
                                      ),
                                    };
                                  } else {
                                    return varSingle;
                                  }
                                })
                              );
                              handleChange(
                                {
                                  ...variant,
                                  ownWidth: parseInt(e.target.value),
                                },
                                {
                                  ...opt,
                                }
                              );
                            }}
                          />
                        </Grid>
                      )}
                      {variant.hasOwnDimensionL && (
                        <Grid item sm={4}>
                          <NumericFormat
                            fullWidth
                            allowLeadingZeros
                            allowedDecimalSeparators={[",", "."]}
                            customInput={TextField}
                            allowNegative={false}
                            decimalSeparator="."
                            variant="outlined"
                            defaultValue={0}
                            inputProps={{
                              style: {
                                padding: "10px 14px",
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                fontSize: "14px",
                              },
                            }}
                            required
                            label="Length"
                            value={variant.ownLength}
                            size="small"
                            InputProps={{
                              inputProps: { min: 0 },
                            }}
                            error={
                              parseInt(variant.qty as unknown as string) < 1
                            }
                            name={"Length"}
                            onChange={(e) => {
                              const oldPt = variant.options.find(
                                (optSingle: any) =>
                                  optSingle.value ===
                                  (value[variant.id]?.selectedOption?.value ?? {
                                    ...variant.options[0],
                                    value: "",
                                  })
                              );

                              const opt = { ...oldPt };
                              opt.ownLength = parseInt(e.target.value ?? 1);

                              setSelectedVariant(
                                selectedVariant.map((varSingle) => {
                                  if (varSingle.id === variant.id) {
                                    return {
                                      ...varSingle,
                                      ownLength: parseInt(e.target.value ?? 1),
                                      totalPrice:
                                        parseInt(e.target.value ?? 1) *
                                        (varSingle.selectedOption?.price ?? 0),
                                      options: varSingle.options.map(
                                        (optSingle: any) => {
                                          if (
                                            optSingle.value ===
                                            (value[variant.id]?.selectedOption
                                              ?.value ??
                                              variant.options[0].value)
                                          ) {
                                            return {
                                              ...optSingle,
                                              ownLength: parseInt(
                                                e.target.value ?? 1
                                              ),
                                            };
                                          }
                                          return optSingle;
                                        }
                                      ),
                                    };
                                  } else {
                                    return varSingle;
                                  }
                                })
                              );
                              handleChange(
                                {
                                  ...variant,
                                  ownLength: parseInt(e.target.value),
                                },
                                {
                                  ...opt,
                                }
                              );
                            }}
                          />
                        </Grid>
                      )}
                      {variant.hasOwnDimensionH && (
                        <Grid item sm={4}>
                          <NumericFormat
                            fullWidth
                            allowLeadingZeros
                            allowedDecimalSeparators={[",", "."]}
                            customInput={TextField}
                            allowNegative={false}
                            decimalSeparator="."
                            variant="outlined"
                            defaultValue={0}
                            inputProps={{
                              style: {
                                padding: "10px 14px",
                              },
                            }}
                            InputLabelProps={{
                              style: {
                                fontSize: "14px",
                              },
                            }}
                            required
                            label="Height"
                            value={variant.ownerHeight}
                            size="small"
                            InputProps={{
                              inputProps: { min: 0 },
                            }}
                            error={
                              parseInt(variant.qty as unknown as string) < 1
                            }
                            name={"Height"}
                            onChange={(e) => {
                              const oldPt = variant.options.find(
                                (optSingle: any) =>
                                  optSingle.value ===
                                  (value[variant.id]?.selectedOption?.value ?? {
                                    ...variant.options[0],
                                    value: "",
                                  })
                              );

                              const opt = { ...oldPt };
                              opt.ownHeight = parseInt(e.target.value ?? 1);

                              setSelectedVariant(
                                selectedVariant.map((varSingle) => {
                                  if (varSingle.id === variant.id) {
                                    return {
                                      ...varSingle,
                                      ownHeight: parseInt(e.target.value ?? 1),
                                      totalPrice:
                                        parseInt(e.target.value ?? 1) *
                                        (varSingle.selectedOption?.price ?? 0),
                                      options: varSingle.options.map(
                                        (optSingle: any) => {
                                          if (
                                            optSingle.value ===
                                            (value[variant.id]?.selectedOption
                                              ?.value ??
                                              variant.options[0].value)
                                          ) {
                                            return {
                                              ...optSingle,
                                              ownHeight: parseInt(
                                                e.target.value ?? 1
                                              ),
                                            };
                                          }
                                          return optSingle;
                                        }
                                      ),
                                    };
                                  } else {
                                    return varSingle;
                                  }
                                })
                              );
                              handleChange(
                                {
                                  ...variant,
                                  ownHeight: parseInt(e.target.value),
                                },
                                {
                                  ...opt,
                                }
                              );
                            }}
                          />
                        </Grid>
                      )}
                    </Grid>
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
            handleChange={(val: any) => {
              if (variant.hasOwnDimensionW) {
                val.ownWidth = variant.ownWidth;
              }
              if (variant.hasOwnDimensionL) {
                val.ownLength = variant.ownLength;
              }
              if (variant.hasOwnDimensionH) {
                val.ownHeight = variant.ownHeight;
              }
              setSelectedVariant((prev) => {
                return prev.map((varSingle) => {
                  if (varSingle.id === variant.id) {
                    return {
                      ...varSingle,
                      selectedOption: val,
                      totalPrice: val?.price ?? 0,
                    };
                  } else {
                    return varSingle;
                  }
                });
              });
              handleChange(
                {
                  ...variant,
                  selectedOption: val,
                  totalPrice: val?.price ?? 0,
                },
                val
              );
            }}
            options={variant.options}
            value={value[variant.id]?.selectedOption}
            justifyContent={
              options?.alignVariantOptions === "left"
                ? "flex-start"
                : options?.alignVariantOptions === "right"
                ? "flex-end"
                : "center"
            }
            variant={variant}
          />
        </div>
      ))}
    </div>
  );
}

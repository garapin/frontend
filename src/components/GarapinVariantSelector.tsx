import { VariantOption } from "@/types/product";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardTypeMap,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { display } from "@mui/system";
import React, { useState } from "react";

type CardExtended = CardTypeMap["props"] & {
  active: boolean;
  imgSrc?: string;
  text: string;
  selectHandler: () => void;
};

export default function GarapinVariantSelector({
  handleChange,
  options,
  value,
  justifyContent = "center",
  allowNotSure = true,
  variant,
}: {
  handleChange: (value: any) => void;
  options: VariantOption[];
  value?: any;
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | undefined;
  allowNotSure?: boolean;
  variant?: any;
}) {
  options = options.map((item) => ({
    ...item,
    label: item.name,
  }));

  if (allowNotSure) {
    options.push({
      label: "Not Sure",
      name: "Not Sure",
      value: "not-sure",
      price: 0,
    });
  }
  const [tempValue, setTempValue] = useState<any>(
    value ?? variant.canSelectMultiple
      ? [
          {
            label: null,
            name: null,
            value: null,
            price: 0,
          },
        ]
      : null
  );

  const notSure = {
    label: "Not Sure",
    name: "Not Sure",
    value: "not-sure",
    price: 0,
  };

  return (
    <>
      {variant.canSelectMultiple ? (
        tempValue.map((item: any, index: number) => (
          <div className="mt-2">
            {options.length < 5 ? (
              <>
                <Grid container justifyContent={justifyContent} spacing={3}>
                  {options.map((opt, i) => (
                    <Grid item xs={6} md={3} lg={2} key={opt.value}>
                      <CardItemsOption
                        active={opt.value === item.value}
                        imgSrc={opt.imgSrc}
                        text={opt.name}
                        selectHandler={() => {
                          if (!variant.canSelectMultiple) {
                            handleChange({ ...opt });
                          } else {
                            handleChange(
                              tempValue.map((item: any, i: number) => {
                                return i === index ? opt : item;
                              })
                            );
                            setTempValue(
                              tempValue.map((item: any, i: number) => {
                                return i === index ? opt : item;
                              })
                            );
                          }
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
                {index === tempValue.length - 1 && (
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        if (tempValue.length === 1) return;
                        setTempValue(
                          tempValue.filter(
                            (dat: any, i: number) => dat.value !== item.value
                          )
                        );
                        handleChange(
                          tempValue.filter(
                            (dat: any, i: number) => dat.value !== item.value
                          )
                        );
                      }}
                      disabled={
                        tempValue.length === 1 || index < tempValue.length - 1
                      }
                    >
                      -
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={index !== tempValue.length - 1}
                      onClick={() => {
                        setTempValue([
                          ...tempValue,
                          {
                            label: null,
                            name: null,
                            value: null,
                            price: 0,
                          },
                        ]);
                      }}
                    >
                      +
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-stretch mt-4 gap-2" key={index}>
                  <Autocomplete
                    disablePortal
                    fullWidth
                    size="small"
                    options={options}
                    value={options.find((item) => item.value === value?.value)}
                    onChange={(e, newVal) => {
                      if (!variant.canSelectMultiple) {
                        handleChange(newVal);
                      } else {
                        setTempValue(
                          tempValue.map((item: any, i: number) => {
                            return i === index ? newVal : item;
                          })
                        );
                        handleChange(
                          tempValue.map((item: any, i: number) => {
                            return i === index ? newVal : item;
                          })
                        );
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={`Select${index > 0 ? " Another" : ""} ${
                          variant.name
                        }`}
                        required={variant.required}
                      />
                    )}
                    renderOption={(props: any, option: any) => {
                      const selected = Boolean(
                        value?.find((item: any, idx: number) => item.value === option.value && idx === index)
                      );
                      return (
                        <Box
                          component="li"
                          sx={{
                            "& > img": { mr: 2, flexShrink: 0 },
                            backgroundColor: (theme) =>
                              selected
                                ? "rgba(235, 228, 240,0.4)"
                                : theme.palette.background.paper,
                          }}
                          className="flex items-center gap-2 px-2 mb-2"
                          {...props}
                        >
                          <img
                            src={
                              option.imgSrc ?? "https://via.placeholder.com/150"
                            }
                            alt={option.name}
                            className="w-8 h-8 mr-2 rounded-sm"
                          />
                          <p>{option.name}</p>
                        </Box>
                      );
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    style={{
                      opacity: index !== tempValue.length - 1 ? 0 : 1,
                    }}
                    onClick={() => {
                      if (tempValue.length === 1) return;
                      setTempValue(
                        tempValue.filter(
                          (dat: any, i: number) => dat.value !== item.value
                        )
                      );
                      handleChange(
                        tempValue.filter(
                          (dat: any, i: number) => dat.value !== item.value
                        )
                      );
                    }}
                    disabled={
                      tempValue.length === 1 || index < tempValue.length - 1
                    }
                  >
                    -
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={index !== tempValue.length - 1}
                    style={{
                      opacity: index !== tempValue.length - 1 ? 0 : 1,
                    }}
                    onClick={() => {
                      setTempValue([
                        ...tempValue,
                        {
                          label: null,
                          name: null,
                          value: null,
                          price: 0,
                        },
                      ]);
                    }}
                  >
                    +
                  </Button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <div className="mt-2">
          <Grid container justifyContent={justifyContent} spacing={3}>
            {options.map((item) => (
              <Grid item xs={6} md={3} lg={2} key={item.value}>
                <CardItemsOption
                  active={item.value === value?.value}
                  imgSrc={item.imgSrc}
                  text={item.name}
                  selectHandler={() => {
                    if (!variant.canSelectMultiple) {
                      handleChange({ ...item });
                    } else {
                      handleChange([...tempValue, item]);

                      setTempValue([...tempValue, item]);
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}
function CardItemsOption(props: CardExtended) {
  const { selectHandler, imgSrc, text, ...other } = props;
  return (
    <Card
      aria-selected={props.active}
      tabIndex={0}
      variant="outlined"
      sx={{
        cursor: "pointer",
        height: "100%",
        boxShadow: (theme) =>
          props.active
            ? `inset 0px 0px 0px 2px ${theme.palette.primary.main}`
            : `inset 0px 0px 1px ${theme.palette.grey[900]}`,
        backgroundColor: (theme) =>
          props.active
            ? "rgba(235, 228, 240,0.4)"
            : theme.palette.background.paper,

        border: "none",
        transition: "box-shadow 0.2s ease-in-out",
      }}
      onClick={props.selectHandler}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          props.selectHandler();
        }
      }}
      {...other}
    >
      <CardContent
        className="cursor-pointer"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 4,
          py: 4,
          justifyContent: "center",
          height: "100%",
        }}
      >
        {props.imgSrc !== undefined && (
          <img
            src={props.imgSrc}
            style={{ borderRadius: "5px", width: "80px" }}
          ></img>
        )}
        <Typography
          variant="body1"
          fontWeight={props.active ? 600 : 400}
          textAlign="center"
          sx={{
            pt: 2,
            lineHeight: 1.0,
            transition: "font-weight 0.05s linear",
            transitionDelay: "font-weight 0.1s",
          }}
        >
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

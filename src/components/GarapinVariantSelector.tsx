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
  text: string;
  selectHandler: () => void;
};

export default function GarapinVariantSelector({
  handleChange,
  options,
  value,
  justifyContent = "center",
  allowNotSure = false,
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

  const [tempValue, setTempValue] = useState<any>(
    value ?? variant.canSelectMultiple ? [] : null
  );

  return (
    <>
      {variant.canSelectMultiple ? (
        <Autocomplete
          disablePortal
          fullWidth
          multiple
          size="small"
          className="mt-3"
          options={options}
          value={tempValue}
          onChange={(e: any, newVal) => {
            if (
              tempValue.find((item: any) => item.label == e.target.innerText)
            ) {
              setTempValue(
                tempValue.filter(
                  (item: any) => item.label != e.target.innerText
                )
              );
              handleChange(
                tempValue.filter(
                  (item: any) => item.label != e.target.innerText
                )
              );
            } else {
              setTempValue(newVal);
              handleChange(newVal);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // label={`Select ${variant.name}`}
              placeholder={`Select ${variant.name}`}
              inputProps={{
                ...params.inputProps,
                style: {
                  padding: "10px 4px",
                },
              }}
              required={variant.required}
            />
          )}
          renderOption={(props: any, option: any) => {
            const selected = Boolean(
              value?.find((item: any) => item.value === option.value)
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
                <p>{option.name}</p>
              </Box>
            );
          }}
        />
      ) : (
        <div className="mt-2">
          <Grid container justifyContent={justifyContent} spacing={3}>
            {options.map((item) => (
              <Grid item xs={6} md={4} lg={3} key={item.value}>
                <CardItemsOption
                  active={item.value === value?.value}
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
  const { selectHandler, text, ...other } = props;
  return (
    <Card
      aria-selected={props.active}
      tabIndex={0}
      className={`h-full shadow-none ${
        props.active ? "bg-[#713F97] text-white" : "bg-slate-50"
      }`}
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
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
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

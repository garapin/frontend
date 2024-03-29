import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  Divider,
  Fade,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  debounce,
} from "@mui/material";
import React, { useState } from "react";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { rupiah } from "@/tools/rupiah";
import { useRouter } from "next/router";
import {
  getProductCart,
  getProductTemplatePrice,
  getProductTemplatePriceCart,
  getRecalculateCartRTB,
} from "@/store/modules/products";
import { deleteItemCart, updateProductCartFromDBById } from "@/db";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { toast } from "react-toastify";
import { imagePlaceholder } from "@/components/ProductList/ProductList";
import { NumericFormat } from "react-number-format";
import { changeCurrency, getCategoryLabel } from "@/tools/utils";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  qty: number;
  maxQty: number;
}

function Cart() {
  const { t } = useTranslation("common");
  const { productCart } = useAppSelector((state) => state.product);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [cartList, setCartList] = useState<any>([]);
  const router = useRouter();
  const auth = useFirebaseAuth();
  const dispatch = useAppDispatch();
  const [cardDetail, setCardDetail] = useState<any>({
    open: false,
    data: {},
  });

  const handleDelete = async (product: any) => {
    deleteItemCart(product?.id, auth?.authUser?.uid);

    const updatedCart = cartList?.filter((val: any) => val.id !== product.id);
    setCartList(updatedCart);
  };

  React.useEffect(() => {
    dispatch(getProductCart(auth?.authUser?.uid));
  }, [auth?.authUser?.uid, dispatch]);

  React.useEffect(() => {
    setCartList(
      productCart.map((val: any) => {
        return {
          ...val,
          qty: parseInt(val.qty),
        };
      })
    );
  }, [productCart]);

  const toggleProductSelection = (productId: number) => {
    const product = cartList?.find((product: any) => product.id === productId);
    if (!product) {
      return;
    }

    if (changeCurrency(product.qty) > 0) {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.includes(productId)
          ? prevSelectedProducts.filter((id) => id !== productId)
          : [...prevSelectedProducts, productId]
      );
    } else {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((id) => id !== productId)
      );
    }
  };

  const buySelectedProducts = () => {
    const selectedProductNames = selectedProducts.map((productId) => {
      const product = cartList?.find((p: any) => p.id === productId);
      return product;
    });
    if (
      selectedProductNames.find((val) => val.productCategoryId === "02") !==
        undefined &&
      selectedProductNames.find((val) => val.productCategoryId === "01") !==
        undefined
    ) {
      toast.error("Tidak bisa checkout dengan category yang berbeda");
    } else {
      localStorage.setItem(
        "checkout_data",
        JSON.stringify(selectedProductNames)
      );
      router.push("/checkout");
    }
  };

  const debounceCalculatePrice = React.useRef(
    debounce(async (itemQty, productId, item, moq) => {
      if (itemQty < parseInt(moq)) {
        toast.error(`Minimal pembelian ${moq}`);
        return;
      }
      if (item.productCategoryId == 1) {
        const data: any = await dispatch(
          getRecalculateCartRTB(itemQty, productId, item.idempotencyKey)
        );
        if (data) {
          const payload = {
            ...item,
            qty: data.quantity,
            totalPrice: data.totalPrice,
            unitPrice: data.unitPrice,
            calculationId: data.calculationId,
            idempotencyKey: data.idempotencyKey,
          };
          updateProductCartFromDBById(item.id, payload);
          setCartList((prev: any) => {
            return prev.map((val: any) => {
              if (val.id == item.id) {
                return payload;
              }
              return val;
            });
          });
        }
      } else {
        const data: any = await dispatch(
          getProductTemplatePriceCart({
            product: item.product,
            selectedOptions: item.selectedOptions,
            dimension: item.dimension,
            quantity: itemQty,
            idempotencyKey: item.idempotencyKey,
          })
        );

        const payload = {
          ...item,
          qty: itemQty,
          quantity: itemQty,
          totalPrice: data.totalPrice,
          unitPrice: data.unitPrice,
          weight: data.weight,
          calculationId: data.calculationId,
          idempotencyKey: data.idempotencyKey,
        };
        updateProductCartFromDBById(item.id, payload);
        setCartList((prev: any) => {
          return prev.map((val: any) => {
            if (val.id == item.id) {
              return payload;
            }
            return val;
          });
        });
      }
    }, 500)
  ).current;

  const adjustProductQuantity = async (
    itemId: number,
    newQuantity: any,
    moq: number
  ) => {
    if (newQuantity >= moq) {
      const updatedProducts = cartList?.map((product: any) => {
        if (product.id === itemId) {
          return { ...product, qty: newQuantity };
        }
        return product;
      });
      setCartList(updatedProducts);
    }
  };

  return (
    <main className="bg-slate-50">
      <div className="max-w-[940px] mx-auto p-4 md:py-8">
        <Box className="h-min-screen flex flex-col justify-center bg-white rounded-xl py-8">
          <Container maxWidth="xl" className="px-4 md:px-6 space-y-4">
            <Typography
              fontSize={32}
              color="text.primary"
              className="pb-2 font-semibold"
            >
              {t("cart.title")}
            </Typography>
            {cartList?.map((val: any) => (
              <>
                {val?.delete ? null : (
                  <>
                    <Box>
                      <div className="flex items-start gap-2">
                        <Checkbox
                          checked={selectedProducts.includes(val.id)}
                          onChange={() => toggleProductSelection(val.id)}
                        />
                        <div className="w-full bg-slate-50 p-4 rounded-lg space-y-2 md:space-y-0">
                          <div
                            className="
                          md:flex md:items-center md:gap-4"
                          >
                            <img
                              style={{ borderRadius: "20%" }}
                              className="rounded-lg object-contain w-full md:w-44 md:h-44"
                              src={val?.product?.img?.[0] || imagePlaceholder}
                              alt="image"
                            />
                            <div className="md:flex md:items-center md:gap-4 md:justify-between w-full">
                              <div className="space-y-2 md:w-full">
                                <Typography
                                  className="max-w-[12rem] text-[#713F97] pt-2 font-semibold"
                                  fontSize={14}
                                  fontWeight={400}
                                >
                                  {getCategoryLabel(val?.productCategoryId)}
                                </Typography>
                                <Typography
                                  fontSize={17}
                                  fontWeight={400}
                                  color="text.primary"
                                  className="font-semibold"
                                >
                                  {val?.product?.productName}
                                </Typography>
                                <Typography className="text-sm text-slate-600">
                                  {rupiah(val.totalPrice)}
                                </Typography>
                                <Box className="space-y-4">
                                  <Box className="flex items-center md:max-w-[200px]">
                                    <Button
                                      disabled={val.qty === 1}
                                      onClick={() => {
                                        if (val.qty > val.product?.moq) {
                                          adjustProductQuantity(
                                            val.id,
                                            val.qty - 1,
                                            val.product?.moq
                                          );
                                          debounceCalculatePrice(
                                            val.qty - 1,
                                            val.productId,
                                            val,
                                            val.product?.moq
                                          );
                                        } else {
                                          toast.error(
                                            `Minimal pembelian ${val.product?.moq}`
                                          );
                                        }
                                      }}
                                      className="w-10 h-10 text-3xl text-white bg-[#713F97] border-none outline-none leading-3 max-w-10 min-w-max px-4"
                                    >
                                      -
                                    </Button>
                                    <NumericFormat
                                      value={val.qty}
                                      allowLeadingZeros
                                      className="w-full border-none outline-none text-center font-semibold text-sm py-3"
                                      thousandSeparator=","
                                      onChange={(e) => {
                                        if (e.target.value < val.product?.moq) {
                                          toast.dismiss();
                                          toast.error(
                                            `Minimal pembelian ${val.product?.moq}`
                                          );
                                        } else {
                                          adjustProductQuantity(
                                            val.id,
                                            parseInt(
                                              e.target.value.replace(
                                                /[^0-9]/g,
                                                ""
                                              )
                                            ),
                                            val.product?.moq
                                          );
                                          debounceCalculatePrice(
                                            parseInt(
                                              e.target.value.replace(
                                                /[^0-9]/g,
                                                ""
                                              )
                                            ),
                                            val.productId,
                                            val,
                                            val.product?.moq
                                          );
                                        }
                                      }}
                                    />
                                    <Button
                                      disabled={val.qty === val.product?.stock}
                                      onClick={() => {
                                        adjustProductQuantity(
                                          val.id,
                                          typeof val.qty === "string"
                                            ? parseInt(
                                                val.qty.replace(/[^0-9]/g, "")
                                              ) + 1
                                            : val.qty + 1,
                                          val.product?.moq
                                        );
                                        debounceCalculatePrice(
                                          val.qty + 1,
                                          val.productId,
                                          val,
                                          val.product?.moq
                                        );
                                      }}
                                      className="w-10 h-10 text-3xl text-white bg-[#713F97] border-none outline-none leading-3 max-w-10 min-w-max px-3"
                                    >
                                      +
                                    </Button>
                                  </Box>
                                  {val?.productCategoryId == 2 && (
                                    <>
                                      <Button
                                        variant="contained"
                                        className="capitalize md:hidden"
                                        fullWidth
                                        onClick={() => {
                                          if (val.id == cardDetail?.data?.id) {
                                            setCardDetail({
                                              open: false,
                                              data: {},
                                            });
                                          } else {
                                            setCardDetail({
                                              open: true,
                                              data: val,
                                            });
                                          }
                                        }}
                                      >
                                        Detail
                                      </Button>
                                    </>
                                  )}
                                  <Button
                                    onClick={() => handleDelete(val)}
                                    variant="outlined"
                                    className="capitalize md:hidden"
                                    fullWidth
                                  >
                                    Delete
                                  </Button>
                                  <div className="md:hidden">
                                    {val?.productCategoryId == 2 &&
                                      cardDetail?.open &&
                                      cardDetail?.data?.id == val?.id &&
                                      Object?.keys(val?.selectedOptions).map(
                                        (key: any, i) => {
                                          const selected: any =
                                            val?.selectedOptions[
                                              `${key as number}`
                                            ];
                                          const keyName = key
                                            .split("-")
                                            .map(
                                              (val: any) =>
                                                val.charAt(0).toUpperCase() +
                                                val.slice(1)
                                            )
                                            .join(" ");

                                          let selectedOptionName;

                                          if (
                                            !Array.isArray(
                                              selected.selectedOption
                                            )
                                          ) {
                                            selectedOptionName =
                                              selected.selectedOption.name;
                                          } else {
                                            selectedOptionName =
                                              selected.selectedOption
                                                .map((val: any) => val.name)
                                                .join(", ");
                                          }
                                          return (
                                            <Fade
                                              in={cardDetail.open}
                                              timeout={500}
                                            >
                                              <Grid
                                                item
                                                md={6}
                                                key={i}
                                                className="w-full"
                                              >
                                                <Typography className="font-medium text-slate-600 text-sm">
                                                  {keyName}
                                                </Typography>
                                                <Box
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <Typography className="font-medium text-[#713F97] text-sm">
                                                    {selectedOptionName}
                                                  </Typography>
                                                </Box>
                                              </Grid>
                                            </Fade>
                                          );
                                        }
                                      )}
                                  </div>
                                </Box>
                              </div>
                              <div className="hidden md:block">
                                <Tooltip placement="top" arrow title="Hapus">
                                  <IconButton onClick={() => handleDelete(val)}>
                                    <HighlightOffIcon
                                      color="error"
                                      className="text-danger"
                                    />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                          <div className="hidden md:block">
                            {val?.productCategoryId == 2 && (
                              <>
                                <div className="flex items-center justify-end">
                                  <Button
                                    className="capitalize"
                                    onClick={() => {
                                      if (val.id == cardDetail?.data?.id) {
                                        setCardDetail({
                                          open: false,
                                          data: {},
                                        });
                                      } else {
                                        setCardDetail({
                                          open: true,
                                          data: val,
                                        });
                                      }
                                    }}
                                    endIcon={
                                      cardDetail?.open ? (
                                        <ExpandLess />
                                      ) : (
                                        <ExpandMore />
                                      )
                                    }
                                  >
                                    Detail
                                  </Button>
                                </div>
                                <Divider />
                              </>
                            )}
                            <div className="hidden md:block mt-4">
                              {val?.productCategoryId == 2 &&
                                cardDetail?.open &&
                                cardDetail?.data?.id == val?.id &&
                                Object?.keys(val?.selectedOptions).map(
                                  (key: any, i) => {
                                    const selected: any =
                                      val?.selectedOptions[`${key as number}`];
                                    const keyName = key
                                      .split("-")
                                      .map(
                                        (val: any) =>
                                          val.charAt(0).toUpperCase() +
                                          val.slice(1)
                                      )
                                      .join(" ");

                                    let selectedOptionName;

                                    if (
                                      !Array.isArray(selected.selectedOption)
                                    ) {
                                      selectedOptionName =
                                        selected.selectedOption.name;
                                    } else {
                                      selectedOptionName =
                                        selected.selectedOption
                                          .map((val: any) => val.name)
                                          .join(", ");
                                    }
                                    return (
                                      <Fade in={cardDetail.open} timeout={500}>
                                        <Grid
                                          item
                                          md={6}
                                          key={i}
                                          className="w-full"
                                        >
                                          <Typography className="font-medium text-slate-600 text-sm">
                                            {keyName}
                                          </Typography>
                                          <Box
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Typography className="font-medium text-[#713F97] text-sm">
                                              {selectedOptionName}
                                            </Typography>
                                          </Box>
                                        </Grid>
                                      </Fade>
                                    );
                                  }
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </>
                )}
              </>
            ))}
            <Box className="pt-8 space-y-6">
              <Divider />
              <Button
                variant="contained"
                className="py-3 capitalize text-lg"
                onClick={() => buySelectedProducts()}
                disabled={selectedProducts?.length === 0}
                fullWidth
              >
                Lanjut Pembayaran
              </Button>
            </Box>
          </Container>
        </Box>
      </div>
    </main>
  );
}

Cart.guestGuard = false;
Cart.authGuard = true;

export default Cart;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["landing", "common"])),
    },
  };
};

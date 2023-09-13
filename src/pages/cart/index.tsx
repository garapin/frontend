import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
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

  const handleDelete = async (product: any) => {
    deleteItemCart(product?.id, auth?.authUser?.uid);

    const updatedCart = cartList?.filter((val: any) => val.id !== product.id);
    setCartList(updatedCart);
  };

  React.useEffect(() => {
    dispatch(getProductCart(auth?.authUser?.uid));
  }, [auth?.authUser?.uid, dispatch]);

  React.useEffect(() => {
    setCartList(productCart);
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

  const selectAllProducts = () => {
    if (
      selectedProducts?.length ===
      cartList?.filter((product: any) => product.qty > 0).length
    ) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(
        cartList
          ?.filter((product: any) => product.qty > 0)
          .map((product: any) => product.id)
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

  const getTotalPrice = () => {
    return selectedProducts.reduce((total, productId) => {
      const product = cartList?.find((p: any) => p.id === productId) ?? {
        totalPrice: 0,
      };
      return total + product.totalPrice;
    }, 0);
  };

  const debounceCalculatePrice = React.useRef(
    debounce(async (itemQty, productId, item?) => {
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

  const adjustProductQuantity = async (itemId: number, newQuantity: any) => {
    const updatedProducts = cartList?.map((product: any) => {
      if (product.id === itemId) {
        return { ...product, qty: newQuantity };
      }
      return product;
    });
    setCartList(updatedProducts);
  };

  return (
    <>
      <main className="max-w-md mx-auto bg-slate-50 p-6">
        <Box className="h-min-screen flex flex-col justify-center bg-white rounded-xl py-8">
          <Container maxWidth="xl" className="px-4 space-y-4">
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
                        <div className="w-full bg-slate-50 p-4 rounded-lg space-y-2">
                          <img
                            style={{ borderRadius: "20%" }}
                            className="rounded-lg object-contain w-full"
                            src={val?.product?.img?.[0] || imagePlaceholder}
                            alt="image"
                          />
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
                            <Box className="flex items-center">
                              <Button
                                disabled={val.qty === 1}
                                onClick={() => {
                                  if (val.qty > val.product?.moq) {
                                    adjustProductQuantity(val.id, val.qty - 1);
                                  }
                                  debounceCalculatePrice(
                                    val.qty - 1,
                                    val.productId,
                                    val
                                  );
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
                                  adjustProductQuantity(
                                    val.id,
                                    parseInt(
                                      e.target.value.replace(/[^0-9]/g, "")
                                    )
                                  );
                                  debounceCalculatePrice(
                                    parseInt(
                                      e.target.value.replace(/[^0-9]/g, "")
                                    ),
                                    val.productId,
                                    val
                                  );
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
                                      : val.qty + 1
                                  );
                                  debounceCalculatePrice(
                                    val.qty + 1,
                                    val.productId,
                                    val
                                  );
                                }}
                                className="w-10 h-10 text-3xl text-white bg-[#713F97] border-none outline-none leading-3 max-w-10 min-w-max px-3"
                              >
                                +
                              </Button>
                            </Box>
                            <Button
                              variant="contained"
                              className="capitalize"
                              fullWidth
                            >
                              Detail
                            </Button>
                            <Button
                              onClick={() => handleDelete(val)}
                              variant="outlined"
                              className="capitalize"
                              fullWidth
                            >
                              Delete
                            </Button>
                          </Box>
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
      </main>
    </>
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
      ...(await serverSideTranslations(locale, ["products", "common"])),
    },
  };
};

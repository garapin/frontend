import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { rupiah } from "@/tools/rupiah";
import { useRouter } from "next/router";
import { getProductCart } from "@/store/modules/products";
import { deleteItemCart } from "@/db";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppRedux";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { toast } from "react-toastify";
import { imagePlaceholder } from "@/components/ProductList/ProductList";

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
    deleteItemCart(product?.productId, auth?.authUser?.uid);

    const updatedCart = cartList?.filter(
      (val: any) => val.productId !== product.productId
    );
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

    if (product.qty > 0) {
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
      const product = cartList?.find((p: any) => p.id === productId);
      return total + product.totalPrice;
    }, 0);
  };

  const adjustProductQuantity = (productId: number, newQuantity: number) => {
    const updatedProducts = cartList?.map((product: any) => {
      if (product.id === productId) {
        return { ...product, qty: newQuantity };
      }
      return product;
    });
    setCartList(updatedProducts);
  };

  return (
    <>
      <main>
        <Box maxWidth="lg" className="flex flex-col content-center mx-auto">
          <Box className="h-min-screen flex flex-col justify-center bg-white">
            <Container
              maxWidth="xl"
              className="px-4 pt-36 pb-28 md:pt-48 md:pb-48"
            >
              <Typography fontSize={26} fontWeight={700} color="text.primary">
                {t("cart.title")}
              </Typography>
              <Box className="flex items-center">
                <Checkbox onClick={selectAllProducts} />
                <Typography fontSize={17} fontWeight={400} color="text.primary">
                  {t("cart.selectAll")}
                </Typography>
              </Box>
              <hr className="h-px my-2 bg-[#E2E2E2] border-0 dark:bg-[#E2E2E2]" />
              {cartList?.map((val: any) => (
                <>
                  {val?.delete ? null : (
                    <>
                      <Box className="mt-5 flex justify-between">
                        <Box className="flex items-center flex-1">
                          <Checkbox
                            checked={selectedProducts.includes(val.id)}
                            onChange={() => toggleProductSelection(val.id)}
                          />
                          <img
                            width={120}
                            style={{ borderRadius: "20%" }}
                            className="rounded-lg object-contain mr-3"
                            height={120}
                            src={val?.product?.img?.[0] || imagePlaceholder}
                            alt="image"
                          />
                          <Box className="flex-1">
                            {val?.productCategoryId === "02" ? (
                              <Typography
                                style={{
                                  background: "gray",
                                  borderRadius: "10px",
                                  textAlign: "center",
                                }}
                                className="font-bold max-w-[12rem]"
                                fontSize={17}
                                fontWeight={400}
                                color="text.primary"
                              >
                                Digital Packaging
                              </Typography>
                            ) : (
                              <Typography
                                style={{
                                  background: "gray",
                                  borderRadius: "10px",
                                  textAlign: "center",
                                }}
                                className="font-bold max-w-[12rem]"
                                fontSize={17}
                                fontWeight={400}
                                color="text.primary"
                              >
                                Ready to buy
                              </Typography>
                            )}
                            <Typography
                              fontSize={17}
                              fontWeight={400}
                              color="text.primary"
                            >
                              {val?.product?.productName}
                            </Typography>
                            <Typography
                              fontSize={17}
                              fontWeight={600}
                              color="text.primary"
                            >
                              {rupiah(val.totalPrice)}
                            </Typography>
                          </Box>
                        </Box>

                        <Box>
                          <Button
                            onClick={() => handleDelete(val)}
                            className="ml-7 text-red-500"
                          >
                            hapus
                          </Button>
                          <Box className="flex items-center">
                            <button
                              disabled={val.qty === 1}
                              onClick={() => {
                                if (val.qty > val.product?.moq) {
                                  adjustProductQuantity(val.id, val.qty - 1);
                                }
                              }}
                              className="w-7 h-7 bg-transparent outline-none border-slate-800 rounded-full cursor-pointer"
                            >
                              -
                            </button>
                            <Typography
                              fontSize={17}
                              marginLeft="15px"
                              marginRight="15px"
                              fontWeight={600}
                              color="text.primary"
                            >
                              {val.qty}
                            </Typography>
                            <button
                              disabled={val.qty === val.product?.stock}
                              onClick={() =>
                                adjustProductQuantity(val.id, val.qty + 1)
                              }
                              className="w-7 h-7 bg-transparent outline-none border-slate-800 rounded-full cursor-pointer"
                            >
                              +
                            </button>
                          </Box>
                        </Box>
                      </Box>
                      <hr className="h-px my-2 bg-[#E2E2E2] border-0 dark:bg-[#E2E2E2]" />
                    </>
                  )}
                </>
              ))}
              <Box className="mt-7 flex justify-between items-center">
                <Typography
                  fontSize={17}
                  marginLeft="15px"
                  marginRight="15px"
                  fontWeight={500}
                  color="text.primary"
                >
                  Total Harga:{" "}
                  <span className="font-bold">{rupiah(getTotalPrice())}</span>
                </Typography>
                <button
                  disabled={selectedProducts?.length === 0}
                  onClick={() => buySelectedProducts()}
                  className="w-16 h-9 bg-[#713F97] border-none rounded-md text-slate-50 cursor-pointer"
                >
                  Beli
                </button>
              </Box>
            </Container>
          </Box>
        </Box>
      </main>
    </>
  );
}

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

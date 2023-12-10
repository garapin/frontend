import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { Avatar, Box, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const GASSAppBar = () => {
  const router = useRouter();
  const auth: any = useFirebaseAuth();
  return (
    <Box className="pt-6 bg-white relative shadow-sm">
      <div className="max-w-screen-2xl mx-auto lg:relative">
        <div className="flex items-center justify-between shadow-sm lg:shadow-none pb-6 px-4">
          <div className="flex items-center gap-10">
            <Link href="/affiliate">
              <Image
                src="/assets/affiliate/gass-logo.png"
                alt="login-bg"
                width={300}
                height={100}
                className="w-[170px] h-[55px]"
              />
            </Link>
            <Link href="/affiliate/home">Home</Link>
            <Link href="/affiliate/transaction">Transaksi</Link>
          </div>
          <div className="flex items-center gap-10">
            <div>
              <p className="mb-1 text-slate-600">Saldo Affiliate</p>
              <p className="font-semibold">Rp.0</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar alt="Garapin Affiliate" src="" />
              <div>
                <p className="mb-1 text-slate-600">Halo,</p>
                {!auth.loading && auth.authUser !== null && (
                  <p className="font-semibold">
                    {auth.authUser.displayName ?? auth.authUser.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default GASSAppBar;

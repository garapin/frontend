import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const SecondHeaderTabs = () => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={false}
    >
      <Tab
        className="py-6"
        onClick={() => router.push("/transaction-list")}
        label="Daftar Transaksi"
      />
      {/* <Tab
            className="py-6"
            onClick={() => router.push("/address")}
            label="Alamat"
          />
          <Tab
            className="py-6"
            onClick={() => router.push("/customer-support")}
            label="Layanan Pelanggan"
          />
          <Tab
            className="py-6"
            onClick={() => router.push("/profile")}
            label="Profil Saya"
          /> */}
    </Tabs>
  );
};

export default SecondHeaderTabs;

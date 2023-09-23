import { Box, Button, Modal } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const ModalLogin = ({
  openLogin,
  handleCloseLogin,
}: {
  openLogin: boolean;
  handleCloseLogin: () => void;
}) => {
  const router = useRouter();
  const handleToLogin = () => {
    localStorage.setItem("redirect", router.asPath);
    router.push("/login");
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "24px",
    // before
    "&:before": {
      content: '""',
      position: "absolute" as "absolute",
      left: "0",
      top: "-10px",
      height: "48px",
      background: "#713F97",
      width: "100%",
      borderRadius: "24px 24px 0 0",
    },
    // after
    "&:after": {
      content: '""',
      position: "absolute" as "absolute",
      left: "0",
      top: "0",
      height: "48px",
      background: "white",
      width: "100%",
      borderRadius: "24px 24px 0 0",
    },
  };
  return (
    <Modal
      open={openLogin}
      onClose={handleCloseLogin}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="space-y-6 px-10 py-16">
        <h2 className="text-[40px] text-center max-w-xs font-medium pb-4">
          Ingin Memesan?
        </h2>
        <p className="text-slate-600 text-center max-w-xs pb-2 leading-5">
          Anda diharuskan untuk login/register terlebih dahulu jika ingin
          memesan produk kami
        </p>
        <Button
          variant="contained"
          className="py-3 text-lg font-normal capitalize"
          fullWidth
          onClick={() => router.push("/register")}
        >
          Daftar
        </Button>
        <Button
          variant="outlined"
          className="py-3 text-lg font-normal capitalize"
          fullWidth
          onClick={handleToLogin}
        >
          Login
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalLogin;

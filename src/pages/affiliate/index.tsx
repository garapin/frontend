import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useRouter } from "next/navigation";

interface IFaqs {
  id: number;
  question: string;
  answer: string;
}

const Affiliate = () => {
  const [openedFaq, setOpenedFaq] = React.useState<number[]>([]);
  const router = useRouter();
  const faqs: IFaqs[] = [
    {
      id: 1,
      question: "Apakah bergabung dengan GASS membutuhkan Modal ?",
      answer:
        "Tidak ! bergabung dengan GASS tidak memerlukan Modal sepeser pun, Jika ada Pihak-pihak yang mengatasnamakan produk HeiPack dan meminta uang, dipastikan adalah bukan Kami",
    },
    {
      id: 2,
      question: "Apakah produk di HeiPack adalah produk dalam negeri ?",
      answer:
        "HeiPack dan Garapin mengedepankan produsen lokal, jadi produk yang dijual di HeiPack adalah produk dari produsen dalam negeri.",
    },
    {
      id: 3,
      question: "Berapa Komisi di GASS ?",
      answer:
        "Komisi dari GASS maksimal adalah 35% dari setiap produk yang dijual.",
    },
    {
      id: 4,
      question: "Bagaimana Kami menerima komisi dari GASS ?",
      answer:
        "Komisi dari GASS akan Kamu dapatkan setelah produk DITERIMA oleh pembeli. Kamu bisa mentransfer pendapatan kamu dari GASS ke Bank pribadi Kamu.",
    },
    {
      id: 5,
      question:
        "Apakah komisi akan dipotong untuk biaya administrasi dan biaya transfer ?",
      answer:
        "Tidak ! bergabung dengan GASS tidak memerlukan Modal sepeser pun, Jika ada Pihak-pihak yang mengatasnamakan produk HeiPack dan meminta uang, dipastikan adalah bukan Kami",
    },
    {
      id: 6,
      question: "How do I change my account email?",
      answer:
        "Komisi dari GASS tidak akan dipotong untuk keperluan biaya administrasi dan biaya transfer. Jadi Kamu bebas untuk menerima Komisi penuh tanpa potongan biaya administrasi dan biaya transfer.",
    },
  ];
  return (
    <div>
      <section className="relative mb-36">
        <div className="top-0 left-0 w-full bg-gradient-to-r from-[#642B73] to-[#C6426E] gradient-hero-affiliate h-[650px]"></div>
        <div className="grid grid-cols-12 gap-8 items-start absolute top-20 w-full">
          <div className="grid col-span-6 space-y-4 text-white pt-20 justify-end">
            <div className="space-y-4">
              <h3>GARAPIN AFFILIATES SELLER SYSTEM</h3>
              <h1>GASS..</h1>
              <p className="max-w-xl leading-6">
                Tempat Kalian menjual produk-produk dari produsen Garapin,
                Kalian berpotensi untuk mendapatkan keuntungan hingga ratusan
                juta rupiah dengan menjadi reseller Garapin. Yang Kalian lakukan
                cuma menyempatkan waktu selama 45 menit sehari, menyiapkan
                konten, dan menawarkan produk Garapin ke jaringan Kalian. So,
                tunggu apalagi ? yuk GASS !!!
              </p>
              <div>
                <Button
                  variant="contained"
                  className="bg-white hover:bg-white/80 text-black capitalize mt-4"
                  onClick={() => router.push("/affiliate/home")}
                >
                  Daftar Affiliates
                </Button>
              </div>
            </div>
          </div>
          <div className="grid col-span-6 justify-end">
            <img
              src="/assets/affiliate/hero-illustration.svg"
              alt="affiliate"
              className="-mt-10"
            />
          </div>
        </div>
      </section>
      <section className="mb-36 relative max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#642B73] to-[#C6426E] rounded-lg">
          <div className="grid grid-cols-12 px-40 py-36">
            <div className="grid col-span-6">
              <p className="text-white text-4xl">
                Hanya Dengan Menjual Produk Box Sebanyak 5000,{" "}
                <span className="font-semibold">
                  Dapatkan Komisi Hingga 6 Juta Lebih !!
                </span>
              </p>
            </div>
          </div>
        </div>
        <img
          src="/assets/affiliate/woman-pointing.svg"
          alt="affiliate"
          className="absolute -top-10 right-40 w-[505px]"
        />
      </section>
      <section className="mb-36">
        <div className="text-center mb-24">
          <h3 className="text-4xl font-semibold mb-4">
            Cara <span className="text-[#642B73]">Promosinya Mudah Banget</span>
          </h3>
          <p className="text-slate-500">
            Cukup mencari produk yang akan ditawarkan kedalam konten Kalian, dan
            tunggu Komisi untuk setiap produk yang dijual.
          </p>
        </div>

        <div className="flex items-start justify-center gap-4">
          <div className="text-center text-2xl space-y-4">
            <img src="/assets/affiliate/find-product.svg" alt="affiliate" />
            <h3>
              Cari <span className="text-[#642B73]">Product</span>
            </h3>
          </div>
          <img
            src="/assets/affiliate/line.svg"
            alt="affiliate"
            className="pt-20"
          />
          <div className="text-center text-2xl space-y-4">
            <img src="/assets/affiliate/publish-product.svg" alt="affiliate" />
            <h3>
              Publish <span className="text-[#642B73]">Product</span>
            </h3>
          </div>
          <img
            src="/assets/affiliate/line.svg"
            alt="affiliate"
            className="pt-20"
          />
          <div className="text-center text-2xl space-y-4">
            <img src="/assets/affiliate/commision.svg" alt="affiliate" />
            <p>Komisi</p>
          </div>
        </div>
      </section>
      <section className="mb-10">
        <div className="text-center mb-24">
          <p className="text-4xl font-semibold mb-4">Potensi</p>
          <p className="text-slate-500">
            Ilustrasi pendapatan untuk menjual barang HEIPACK
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src="/assets/affiliate/potensi.svg" alt="affiliate" />
        </div>
      </section>
      <section className="bg-slate-50 mb-36">
        <div className="flex items-start gap-6 px-20 pt-20">
          <img
            src="/assets/affiliate/qna-illustration.svg"
            alt="affiliate"
            className="h-[600px] flex-1"
          />
          <div className="space-y-4 flex-1 pt-6">
            <h3 className="font-semibold text-4xl">
              Kenapa Gass di <span className="text-[#642B73]">Heipack</span>
            </h3>
            <p className="text-slate-500">
              HeiPack adalah produk dari Garapin yang khusus menjual produk
              packaging dari produsen lokal Garapin,
            </p>
            <ul className="list-none text-green-600 space-y-4">
              <li className="flex items-center gap-2 bg-green-200 px-4 py-2 rounded-md max-w-max">
                <CheckCircleIcon />
                <p>RETURN RATE yang sangat tinggi (up to 20%)</p>
              </li>
              <li className="flex items-center gap-2 bg-green-200 px-4 py-2 rounded-md max-w-max">
                <CheckCircleIcon />
                <p>Tidak perlu MODAL AWAL</p>
              </li>
              <li className="flex items-center gap-2 bg-green-200 px-4 py-2 rounded-md max-w-max">
                <CheckCircleIcon />
                <p>Produknya Heipack adalah FAST MOVING.</p>
              </li>
              <li className="flex items-center gap-2 bg-green-200 px-4 py-2 rounded-md max-w-max">
                <CheckCircleIcon />
                <p>Customer akan MEMBELI KEMBALI Produk HeiPack.</p>
              </li>
              <li className="flex items-center gap-2 bg-green-200 px-4 py-2 rounded-md max-w-max">
                <CheckCircleIcon />
                <p>Tidak perlu pusing mencari produsen</p>
              </li>
              <li className="flex items-center gap-2 bg-green-200 px-4 py-2 rounded-md max-w-max">
                <CheckCircleIcon />
                <p>
                  Bebas biaya ADMINISTRASI DAN POTONGAN untuk pencairan dana
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-36 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="grid col-span-6 space-y-4">
            <h3 className="font-semibold text-4xl">
              Customer <span className="text-[#642B73]">Segment</span>
            </h3>
            <p className="text-slate-500 leading-6">
              Lorem ipsum dolor sit amet consectetur. Egestas elit in interdum
              sollicitudin elementum rutrum. Laoreet enim non lobortis quam
              malesuada nunc ac. Sit imperdiet facilisi eget cursus.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-slate-50 px-4 py-2 rounded-md max-w-max flex items-center gap-2">
                <img
                  src="/assets/affiliate/delivery-truck.svg"
                  alt="affiliate"
                />
                <p className="font-semibold text-2xl">
                  Forwarder dan Jasa Pengiriman barang
                </p>
              </div>
              <div className="bg-slate-50 px-4 py-2 rounded-md max-w-max flex items-center gap-2">
                <img
                  src="/assets/affiliate/fastfood-location.svg"
                  alt="affiliate"
                />
                <p className="font-semibold text-2xl">
                  Restoran Mitra Gojek/Grab
                </p>
              </div>
              <div className="bg-slate-50 px-4 py-2 rounded-md max-w-max flex items-center gap-2">
                <img
                  src="/assets/affiliate/online-shopping.svg"
                  alt="affiliate"
                />
                <p className="font-semibold text-2xl">Toko Online</p>
              </div>
              <div className="bg-slate-50 px-4 py-2 rounded-md max-w-max flex items-center gap-2">
                <img
                  src="/assets/affiliate/delivery-location.svg"
                  alt="affiliate"
                />
                <p className="font-semibold text-2xl">Jasa Pindahan Rumah</p>
              </div>
              <div className="bg-slate-50 px-4 py-2 rounded-md max-w-max flex items-center gap-2">
                <img src="/assets/affiliate/sunglasses.svg" alt="affiliate" />
                <p className="font-semibold text-2xl">
                  Industri Garmen dan Fashion
                </p>
              </div>
            </div>
          </div>
          <div className="grid col-span-6">
            <img
              src="/assets/affiliate/customer-segment.svg"
              alt="affiliate"
              className="-mt-20"
            />
          </div>
        </div>
      </section>
      <section className="mb-36 relative max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#642B73] to-[#C6426E] rounded-lg">
          <div className="grid grid-cols-12 px-40 py-36">
            <div className="grid col-span-6 space-y-4">
              <p className="text-white text-4xl">
                Ayo <span className="font-semibold">GASS sekarang !</span>
              </p>
              <p className="text-white leading-6">
                Kamu bisa menjadikan GASS sebagai sumber pendapatan utama Kamu
                loh, karena produk yang ditawarkan di HeiPack adalah produk fast
                moving. Jadi tunggu apa lagi ? Langsung lah GASS !!!
              </p>
            </div>
          </div>
        </div>
        <img
          src="/assets/affiliate/gass-now.svg"
          alt="affiliate"
          className="absolute -top-4 right-40 w-[475px]"
        />
      </section>
      <section className="mb-36 max-w-5xl mx-auto">
        <h3 className="font-semibold text-4xl text-center mb-6">
          Pertanyaan Seputar <span className="text-[#642B73]">GASS</span>
        </h3>
        {faqs.map((faq) => (
          <Accordion
            key={faq.id}
            className="shadow-none py-2"
            expanded={openedFaq.includes(faq.id)}
          >
            <AccordionSummary
              expandIcon={
                openedFaq.includes(faq.id) ? (
                  <RemoveCircleOutlineIcon />
                ) : (
                  <AddCircleOutlineIcon />
                )
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => {
                if (openedFaq.includes(faq.id)) {
                  setOpenedFaq(openedFaq.filter((id) => id !== faq.id));
                } else {
                  setOpenedFaq([...openedFaq, faq.id]);
                }
              }}
            >
              <Typography className="font-medium">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </section>
    </div>
  );
};

export default Affiliate;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

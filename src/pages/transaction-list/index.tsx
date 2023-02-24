import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TransactionListIndex = () => {
    const auth = useFirebaseAuth();

    return (
        <div className="py-40">
            <Container>
                <Typography variant="h5">Transaction List</Typography>

                {auth.authUser?.authTokenData?.claims['printing']['customer'] && <Typography>Showing Customer DB</Typography> }
                {auth.authUser?.authTokenData?.claims['printing']['partner'] && <Typography>Showing Partner DB</Typography> }
            </Container>
        </div>
    );
}

TransactionListIndex.guestGuard= false
TransactionListIndex.authGuard= true;


export default TransactionListIndex;

export const getServerSideProps = async ({locale}: { locale: string }) => {
    if (process.env.NODE_ENV === "development") {
        await i18n?.reloadResources();
      }
    return {
    props: {
        ...(await serverSideTranslations(locale, ['auth', 'common']))
    }
}};
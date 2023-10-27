declare module "next" {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    authGuard: boolean;
    guestGuard: boolean;
    showFooter: boolean;
    showAppBar: boolean;
  };
}

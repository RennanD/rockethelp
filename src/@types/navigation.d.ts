export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SelectAccount: undefined;
      SignIn: {
        accountType: string;
      };
      Home: undefined;
      NewOrder: undefined;
      OrderDetails: {
        orderId: string;
      };
    }
  }
}

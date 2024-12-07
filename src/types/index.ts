export type NavigatorType = {
  Launch: undefined;
  Home: {
    id: 18;
  };
  Auth: undefined;
  Tabs: undefined;
  CreateOrder: undefined;
  Werhouse: undefined;
  Customers: undefined;
  Statistics: undefined;
  Sellers: undefined;
  Setting: undefined;
  AddProduct: undefined;
  ListView: undefined;
  CustomerInfo: undefined;
  SellerTabs: undefined;
};
export type BottomTabType = {
  Home: undefined;
  Werhouse: undefined;
  Customers: undefined;
  Statistics: undefined;
  Sellers: undefined;
  Basket: undefined;
};
export type SellerBottomTabType = {
  Home: undefined;
  Customers: undefined;
};

export type screens =
  | 'Launch'
  | 'CreateOrder'
  | 'Home'
  | 'Setting'
  | 'Auth'
  | 'SellerTabs'
  | 'Customers'
  | 'Tabs'
  | 'Statistics'
  | 'Sellers'
  | 'AddProduct'
  | 'Basket'
  | 'ListView'
  | 'CustomerInfo'
  | 'Werhouse';

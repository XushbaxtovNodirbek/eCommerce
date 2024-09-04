export type NavigatorType = {
  Launch: undefined;
  Home: {
    id: 18;
  };
  Auth: undefined;
  Tabs: undefined;
  Werhouse: undefined;
  Customers: undefined;
  Statistics: undefined;
  Sellers: undefined;
  Setting: undefined;
  AddProduct: undefined;
};
export type BottomTabType = {
  Home: undefined;
  Werhouse: undefined;
  Customers: undefined;
  Statistics: undefined;
  Sellers: undefined;
};

export type screens =
  | 'Launch'
  | 'Home'
  | 'Setting'
  | 'Auth'
  | 'Customers'
  | 'Tabs'
  | 'Statistics'
  | 'Sellers'
  | 'AddProduct'
  | 'Werhouse';

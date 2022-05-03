export async function getLeftMenuData() {
  return [
    {
      title: 'Menus',
      key: 'menus',
      url: '/menus',
      icon: 'fas fa-burger-soda fa-lg',
      hide: false,
      roles: ['customer', 'employee'],
    },
    {
      title: 'Cart',
      key: 'cart',
      url: '/cart',
      icon: 'fas fa-cart-arrow-down fa-lg',
      hide: false,
      roles: ['customer', 'employee'],
    },
  ];
}
export async function getTopMenuData() {
  return [
    {
      title: 'Menus',
      key: 'menus',
      url: '/menus',
      icon: 'fas fa-burger-soda fa-lg',
      roles: ['customer', 'employee'],
    },
    {
      title: 'Cart',
      key: 'cart',
      url: '/cart',
      icon: 'fas fa-cart-arrow-down fa-lg',
      roles: ['customer', 'employee'],
    },
  ];
}

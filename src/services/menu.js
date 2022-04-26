// TODO: Merge everything into one function after a desired layout is choosed
// Note: Required adjusting Menu and Breadcrumbs layout components

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
  ]
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
  ]
}

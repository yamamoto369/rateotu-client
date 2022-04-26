export function getLayout(pathname) {
  const nonAuthAccountsPaths = ['/accounts/settings'];

  if (pathname === '/') {
    return 'public';
  }
  if (/^\/accounts(?=\/|$)/i.test(pathname)) {
    if (!nonAuthAccountsPaths.includes(pathname)) {
      return 'login';
    }
  }
  return 'main';
}

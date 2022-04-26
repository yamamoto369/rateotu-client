// Side effects Services
export function getAuthTokens() {
  return {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh')
  }
}

export function setAuthTokens(access, refresh) {
  if (access !== undefined) localStorage.setItem('access', access);
  if (refresh !== undefined) localStorage.setItem('refresh', refresh);
}

export function removeAuthTokens() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}

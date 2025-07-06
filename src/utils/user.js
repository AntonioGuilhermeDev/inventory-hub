const STORAGE_KEY = 'currentUser';

export function saveUser(userData) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

export function getUser() {
  const data = sessionStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function getToken() {
  const user = getUser();
  return user ? user.token : null;
}

export function isLoggedIn() {
  return !!getToken();
}

export function clearUser() {
  sessionStorage.removeItem(STORAGE_KEY);
}

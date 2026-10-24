// Samples 20 characters from a 64-character alphabet using browser entropy.
// Retry until each character group is represented; never store or log the result.
export function generateStrongPassword(): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let password: string;
  do {
    password = Array.from(crypto.getRandomValues(new Uint8Array(20)), byte => alphabet[byte & 63]).join('');
  } while (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[-_]/.test(password));
  return password;
}

import { parseCookies } from 'nookies';

export const checkIfUserIsLoggedIn = (): boolean => {
  // Parse cookies
  const cookies = parseCookies();

  // Check if the authentication token exists
  const authToken: string | undefined = cookies.authToken;

  // Return true if authToken exists, false otherwise
  return !!authToken;
};

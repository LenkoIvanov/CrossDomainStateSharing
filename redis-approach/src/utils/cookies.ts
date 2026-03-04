import Cookies from "js-cookie";
const SESSION_ID_COOKIE_NAME = "sessionId";

export const getSessionIdFromCookie = () => {
  return Cookies.get(SESSION_ID_COOKIE_NAME);
};

export const setSessionIdCookie = (sessionId: string) => {
  Cookies.set(SESSION_ID_COOKIE_NAME, sessionId, {
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
    expires: 1,
    secure: true,
    sameSite: "Lax",
  });
};

import Cookies from "js-cookie";
const SESSION_ID_COOKIE_NAME = "sessionId";
const DOMAIN_NAME = ".lenko.space";

export const getSessionIdFromCookie = () => {
  return Cookies.get(SESSION_ID_COOKIE_NAME);
};

export const setSessionIdCookie = (sessionId: string) => {
  Cookies.set(SESSION_ID_COOKIE_NAME, sessionId, {
    // domain: DOMAIN_NAME,
    expires: 1,
    secure: true,
    sameSite: "Lax",
  });
};

export const domainOne = "https://sub1.clientapp.vercel.com";

export const domainTwo = "https://sub2.clientapp.vercel.com";

export const localOne = "http://iframe1.local.test:3000";

export const localTwo = "http://iframe2.local.test:3001";

export const isDomainOne = (currentSubDomain: string) => {
  // "sub1"
  if (currentSubDomain === "iframe1") return true;

  return false;
};

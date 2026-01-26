export const domainOne = "https://sub1.clientapp.vercel.com";

export const domainTwo = "https://sub2.clientapp.vercel.com";

export const isDomainOne = (currentSubDomain: string) => {
  if (currentSubDomain === "sub1") return true;

  return false;
};

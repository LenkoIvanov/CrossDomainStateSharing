import { headers } from "next/headers";
import Main from "./page/Main";
import { isDomainOne } from "@/utils/syncDomains";

export default async function Home() {
  const host = (await headers()).get("host");
  const hostname = host?.split(":")[0];
  const subdomain = hostname?.split(".")[0] || "";

  return <Main isFirstSubDomain={isDomainOne(subdomain)} />;
}

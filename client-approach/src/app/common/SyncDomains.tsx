import { useRef } from "react";

interface SyncDomainsProps {
  // targetDomain:
  //   | "https://sub1.clientapp.vercel.com"
  //   | "https://sub2.clientapp.vercel.com";
  targetDomain: "http://iframe1.local.test" | "http://iframe2.local.test";
}

export const SyncDomains = ({ targetDomain }: SyncDomainsProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <iframe ref={iframeRef} src={targetDomain} style={{ display: "none" }} />
  );
};

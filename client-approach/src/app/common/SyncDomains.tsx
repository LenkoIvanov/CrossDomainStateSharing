import { fetchCartItemsFromLocalStorage } from "@/utils/localStorage";
import {
  IframePayloadEventKey,
  dispatchUpdateEventType,
} from "@/utils/syncDomains";
import { useEffect, useRef } from "react";

export const SyncDomains = () => {
  const targetDomain = process.env.NEXT_PUBLIC_TARGET_DOMAIN;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIncomingMessage = (ev: MessageEvent) => {
    if (ev.origin !== targetDomain) return;
    if (ev.data?.key === IframePayloadEventKey) return;

    console.log("Received event from sub-domain: ", ev);
  };

  const handlePostMessage = (targetDomain: string) => {
    const cartItems = fetchCartItemsFromLocalStorage();
    const iframePayload = {
      key: IframePayloadEventKey,
      value: cartItems,
    };
    iframeRef.current?.contentWindow?.postMessage(iframePayload, targetDomain);
  };

  useEffect(() => {
    if (!targetDomain) return;

    window.addEventListener("message", (ev) => handleIncomingMessage(ev));
    window.addEventListener(dispatchUpdateEventType, () =>
      handlePostMessage(targetDomain)
    );

    return () => {
      window.removeEventListener("message", handleIncomingMessage);
      window.removeEventListener(dispatchUpdateEventType, () =>
        handlePostMessage(targetDomain)
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDomain]);

  return (
    <iframe ref={iframeRef} src={targetDomain} style={{ display: "none" }} />
  );
};

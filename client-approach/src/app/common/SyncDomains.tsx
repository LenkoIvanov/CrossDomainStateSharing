import { CartItem } from "@/types/CartItem";
import {
  fetchCartItemsFromLocalStorage,
  syncLocalStorageState,
} from "@/utils/localStorage";
import {
  IframeHandshakeEventType,
  IframePayloadEventKey,
  dispatchUpdateEventType,
} from "@/utils/syncDomains";
import { useEffect, useEffectEvent, useRef, useState } from "react";

export const SyncDomains = () => {
  const targetDomain = process.env.NEXT_PUBLIC_TARGET_DOMAIN;
  const [isIframeReady, setIsIframeReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInsideIframe =
    typeof window !== "undefined" && window.self !== window.top;

  const handleIncomingMessage = (ev: MessageEvent) => {
    if (ev.origin !== targetDomain) return;

    if (ev.data?.key === IframePayloadEventKey) {
      console.log(
        `Successfully received from ${ev.origin} with cartItems ${ev.data.value}`,
      );
      const cartItems: CartItem[] = ev.data.value;
      syncLocalStorageState(cartItems);
    }
  };

  const handleHandshake = (ev: MessageEvent) => {
    if (ev.origin !== targetDomain) return;

    if (ev.data.type === IframeHandshakeEventType) {
      console.log(`Received handshake from ${ev.origin}`);
      setIsIframeReady(true);
    }
  };

  const handlePostMessage = useEffectEvent(() => {
    if (!isIframeReady || !targetDomain) return;

    const cartItems = fetchCartItemsFromLocalStorage();
    const iframePayload = {
      key: IframePayloadEventKey,
      value: cartItems,
    };
    iframeRef.current?.contentWindow?.postMessage(iframePayload, targetDomain);
  });

  useEffect(() => {
    if (!targetDomain) return;

    if (isInsideIframe) {
      window.parent.postMessage({ type: "SYNC_READY" }, targetDomain);

      window.addEventListener("message", handleIncomingMessage);

      return () => {
        window.removeEventListener("message", handleIncomingMessage);
      };
    } else {
      window.addEventListener("message", handleHandshake);
      window.addEventListener(dispatchUpdateEventType, handlePostMessage);

      return () => {
        window.removeEventListener("message", handleHandshake);
        window.removeEventListener(dispatchUpdateEventType, handlePostMessage);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInsideIframe, isIframeReady, targetDomain]);

  if (isInsideIframe) return null;
  return (
    <iframe ref={iframeRef} src={targetDomain} style={{ display: "none" }} />
  );
};

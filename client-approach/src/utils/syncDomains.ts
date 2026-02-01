export const dispatchUpdateEventType = "dispatchUpdate";

export const IframePayloadEventKey = "IncomingLocalStorageItems";
export const IframeHandshakeEventType = "SYNC_READY";

// Explicitly disabled due to untyped action in middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shouldDispatchIframeEvent = (actionObject: any): boolean => {
  const isPayloadInActionObject =
    typeof actionObject === "object" &&
    actionObject !== null &&
    "payload" in actionObject &&
    actionObject.payload !== "undefined";

  if (!isPayloadInActionObject) return false;

  const isDispatchEventFlagInActionObject =
    typeof actionObject.payload === "object" &&
    actionObject.payload !== null &&
    "iframeEventDispatchFlag" in actionObject.payload;

  if (!isDispatchEventFlagInActionObject) return false;

  const isDispatchFlagTrue =
    typeof actionObject.payload.iframeEventDispatchFlag === "boolean" &&
    actionObject.payload.iframeEventDispatchFlag === true;

  if (isDispatchFlagTrue) return true;

  return false;
};

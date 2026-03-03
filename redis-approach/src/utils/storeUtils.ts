// Explicitly disabled due to untyped action in middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shouldDispatchServerUpdate = (actionObject: any): boolean => {
  const isPayloadInActionObject =
    typeof actionObject === "object" &&
    actionObject !== null &&
    "payload" in actionObject &&
    actionObject.payload !== "undefined";

  if (!isPayloadInActionObject) return false;

  const isDispatchUpdateFlagInActionObject =
    typeof actionObject.payload === "object" &&
    actionObject.payload !== null &&
    "shouldPostUpdateFlag" in actionObject.payload;

  if (!isDispatchUpdateFlagInActionObject) return false;

  const isDispatchFlagTrue =
    typeof actionObject.payload.shouldPostUpdateFlag === "boolean" &&
    actionObject.payload.shouldPostUpdateFlag === true;

  if (isDispatchFlagTrue) return true;

  return false;
};

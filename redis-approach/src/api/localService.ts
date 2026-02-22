import { localAPI } from "./localAPI";

interface APICartData {
  itemId: string;
  itemQty: number;
}

interface Payload {
  sessionId: string;
  cartData: APICartData[];
}

export const postCartDataToCache = async (
  sessionId: string,
  cartData: APICartData[],
) => {
  const body: Payload = {
    sessionId,
    cartData,
  };

  try {
    const response = await localAPI.post("/cartInfo", body);
    console.log(response);
  } catch (err) {
    console.error("An error has occured during caching operation: ", err);
  }
};

export const fetchCartDataFromCache = async (sessionId: string) => {
  try {
    const response = await localAPI.get(`/cartInfo/${sessionId}`);
    console.log(response);
  } catch (err) {
    console.error("An error has occured during fetching operation: ", err);
  }
};

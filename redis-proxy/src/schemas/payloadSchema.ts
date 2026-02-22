import { z } from 'zod';

export const payloadSchema = z.object({
  sessionId: z.string(),
  cartData: z.array(
    z.object({
      itemId: z.string(),
      itemQty: z.number(),
    })
  ),
});

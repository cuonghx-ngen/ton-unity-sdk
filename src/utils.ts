import { beginCell } from "@ton/core";

export const textToBase64 = (text: string) => {
  const cell = beginCell()
    .storeUint(0x00000000, 32)
    .storeStringTail(text)
    .endCell();

  const boc = cell.toBoc();
  return boc.toString("base64");
};

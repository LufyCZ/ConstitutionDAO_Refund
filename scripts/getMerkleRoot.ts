import fetch from "node-fetch";
import csv from "csvtojson";
import { ethers } from "ethers";
import { parseBalanceMap } from "./merkle/parse-balance-map";

const SHEET_ID = "11D1KS9l5TgkBNf_vkdaFQoJ-FLK3Xg-Ml3Eeme6Boc4";
const SHEETS_API = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

export default async function getMerkleRoot() {
  const amounts = (
    await csv().fromString(await fetch(SHEETS_API).then((d) => d.text()))
  )
    .filter((row) => row["Claim (ETH)"] !== "0")
    .reduce(
      (acc, row) => ({
        ...acc,
        [row.Address]: ethers.utils.parseEther(row["Claim (ETH)"]).toBigInt(),
      }),
      {}
    );

  const merkleTree = parseBalanceMap(amounts);

  Object.keys(amounts).forEach((key) => (amounts[key] = String(amounts[key])));

  return {
    amounts,
    merkleTree,
  };
}

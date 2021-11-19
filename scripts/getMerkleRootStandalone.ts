import fs from "fs";
import getMerkleRoot from "./getMerkleRoot";

main();

async function main() {
  const { merkleTree, amounts } = await getMerkleRoot();

  if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");
  fs.writeFileSync("outputs/amounts.json", JSON.stringify(amounts, null, 2));
  fs.writeFileSync("outputs/merkle.json", JSON.stringify(merkleTree, null, 2));
}

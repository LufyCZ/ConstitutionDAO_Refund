import hre from "hardhat";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import getMerkleTree from "./../scripts/getMerkleRoot";

const ARBITRUM_WETH = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";

module.exports = async function main({
  deployments,
  getUnnamedAccounts,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const [deployer] = await getUnnamedAccounts();

  const { merkleTree } = await getMerkleTree();

  const { address } = await deploy("MerkleDistributor", {
    from: deployer,
    args: [ARBITRUM_WETH, merkleTree.merkleRoot],
  });

  console.log("Succesfully deployed:", address);

  try {
    await hre.run(`verify:verify`, {
      address: address,
      network: hre.network,
      constructorArguments: [ARBITRUM_WETH, merkleTree.merkleRoot],
    });
  } catch {}
};

module.exports.tags = ["Servers"];

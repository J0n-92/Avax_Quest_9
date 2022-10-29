import { ethers } from "ethers";
import abi from "../abi.json";

export async function connectToWallet() {
  // Paste Step 5 code here
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
}

export async function getContract(signer) {
  // Paste Step 6 code here
  const contractAddress = "0x8f5577ee1078376714bd73c3e2b6fa18a877fce9";
  return new ethers.Contract(contractAddress, abi, signer);
}

export async function mintNFT(stringURI, contract) {
  // Paste step 7 code here
  const tx = await contract.mint(stringURI);
  console.log("transaction:>> ", tx);
  await tx.wait();
  return tx;
}

export function configureTokenURI(imageURL, name, description) {
  return JSON.stringify({
    name,
    description,
    image: imageURL,
    attributes: [],
  });
}

const { ethers } = require("ethers");
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
    ],
    name: "ScoreSubmitted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
    ],
    name: "getScore",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "messageHash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "recoverSigner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "splitSignature",
    outputs: [
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
    ],
    name: "submitScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAddress = "0xcBD1Acd3178Abab0DCe9A4B755A30E85671F0E65";

const submitScore = async (req, res) => {
  const { walletAddress } = req.params;

  if (!walletAddress) {
    return res.status(400).send({ error: "Cüzdan adresi sağlanmalı!" });
  }

  try {
    // Skoru hesapla
    const score = 70;

    // Akıllı kontrata skoru yazabiliriz, isterseniz burada çağırabilirsiniz.
    const provider = new ethers.JsonRpcProvider(
      "https://testnet.sapphire.oasis.io"
    );
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const ScoreRegistry = new ethers.Contract(contractAddress, abi, wallet);
    // const signature = await wallet.signMessage("ZenCycle");
    const tx = await ScoreRegistry.submitScore(
      walletAddress,
      //   ethers.toBeHex(signature), // İmzayı hex'e çevirerek gönder
      score
    );

    const receipt = await tx.wait();

    res.json({ walletAddress, score });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send({ error: "Bir hata oluştu." });
  }
};
const getScore = async (req, res) => {
  const { walletAddress } = req.params;

  if (!walletAddress) {
    return res.status(400).send({ error: "Cüzdan adresi sağlanmalı!" });
  }

  try {
    // Akıllı kontrata skoru yazabiliriz, isterseniz burada çağırabilirsiniz.
    const provider = new ethers.JsonRpcProvider(
      "https://testnet.sapphire.oasis.io"
    );
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const ScoreRegistry = new ethers.Contract(contractAddress, abi, wallet);
    const score = await ScoreRegistry.getScore(wallet.address);

    res.json({ walletAddress: wallet.address, score: score.toString() });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send({ error: "Bir hata oluştu." });
  }
};

module.exports = { submitScore, getScore };

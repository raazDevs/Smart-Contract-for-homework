import React, { useState } from "react";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("User denied account access or there was an error:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Connect MetaMask Wallet</h2>
      <button
        onClick={connectWallet}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#f6851b",
          border: "none",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Connect Wallet
      </button>
      {walletAddress && (
        <div style={{ marginTop: "20px" }}>
          <h2>Connected Wallet Address:</h2>
          <p>{walletAddress}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;

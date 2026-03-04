import React from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { TbWallet } from "react-icons/tb";

function WalletConnect(props) {
  const { address, isConnected, isConnecting } = useAppKitAccount({
    namespace: "eip155",
  });
  const { open } = useAppKit();

  const handleClick = () => {
    if (isConnected && address) {
      open({ view: "Account" });
    } else {
      open({ view: "Connect", namespace: "eip155" });
    }
  };

  let displayText = "Connect Wallet";

  if (isConnecting) {
    displayText = "Connecting...";
  } else if (isConnected && address) {
    // Optional: truncate address
    const addr = address;
    displayText = `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return (
    <div
      onClick={(e) => handleClick()}
      className="bg-burgundy text-parchment font-jakarta ml-4 flex items-center gap-x-3 rounded-full px-8 py-2 font-medium shadow-md transition hover:brightness-110"
    >
      <h4>
        <TbWallet size={25} className="text-secondary2" />
      </h4>

      <h4 className="grow">{displayText}</h4>
    </div>
  );
}

export default WalletConnect;

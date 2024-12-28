import { Client } from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const connectTelegramWallet = async () => {
  const client = new Client({
    relayUrl: "wss://relay.walletconnect.com",
    projectId: "your_project_id", // Замените на ваш Project ID
  });

  const session = await client.connect({
    requiredNamespaces: {
      eip155: {
        methods: ["eth_sendTransaction", "personal_sign"],
        chains: ["eip155:1"],
        events: ["chainChanged", "accountsChanged"],
      },
    },
  });

  QRCodeModal.open(session.uri, () => {
    console.log("QR Code Modal closed");
  });

  client.on("session_update", (updatedSession) => {
    console.log("Updated session:", updatedSession);
  });

  client.on("disconnect", () => {
    console.log("Disconnected");
  });

  return session;
};

export default connectTelegramWallet;
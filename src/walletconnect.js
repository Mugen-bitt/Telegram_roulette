// import Client from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";

// const connectTelegramWallet = async () => {
//   try {
//     const client = await Client.init({
//       relayUrl: "wss://relay.walletconnect.com",
//       projectId: "b2556b776adefee3108209ff1e81049b", // Замените на ваш Project ID
//     });

//     const session = await client.connect({
//       metadata: {
//         name: "My Telegram Wallet App",
//         description: "A demo app for connecting Telegram Wallet",
//         url: "https://my-app-url.com",
//         icons: ["https://my-app-url.com/icon.png"],
//       },
//       permissions: {
//         blockchain: {
//           chains: ["eip155:1"], // Ethereum mainnet
//         },
//         jsonrpc: {
//           methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
//         },
//       },
//     });

//     console.log("Connected session:", session);

//     QRCodeModal.open(session.uri, () => {
//       console.log("QR Code Modal closed");
//     });

//     return session;
//   } catch (error) {
//     console.error("WalletConnect error:", error);
//   }
// };

// export default connectTelegramWallet;
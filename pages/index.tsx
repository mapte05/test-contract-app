import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// function GiftNFTModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Modal heading
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

const Home: NextPage = () => {
  const CONTRACT_ADDRESS = "0x6269a775E31449acc5500a66a266A156ed3c8c74";

  const { contract } = useContract(CONTRACT_ADDRESS);

  const connectedAddress = useAddress();

  const { data: ownedNFTs } = useOwnedNFTs(contract, connectedAddress);

  const displayNFTs =
    ownedNFTs?.length == 0 ? (
      <div className={styles.card}>
        <h3>No Refi Gratitude Buffalos found in your wallet</h3>
      </div>
    ) : (
      ownedNFTs?.map((nft) => (
        <div className={styles.card}>
          <h3>{nft.metadata.name}</h3>
          <ThirdwebNftMedia width="200" metadata={nft.metadata} />
        </div>
      ))
    );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>The Refi Gratitude Collection is HERE!</h1>
        <br />
        <h1>Connect</h1>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div className={styles.grid}>{displayNFTs}</div>

        <h1>Mint</h1>

        <Web3Button
          className={styles.connect}
          accentColor="green"
          contractAddress={CONTRACT_ADDRESS}
          action={(contract) => contract.erc721.claim(2)}
        >
          Claim Your Buffalos
        </Web3Button>

        <h1>Gift</h1>

        <Web3Button
          className={styles.connect}
          accentColor="purple"
          contractAddress={CONTRACT_ADDRESS}
          action={(contract) => console.log(contract.getAddress)}
        >
          Gift Your Second Buffalo
        </Web3Button>

        {/* <div className={styles.grid}>
          <a href="https://portal.thirdweb.com/" className={styles.card}>
            <h2>Portal &rarr;</h2>
            <p>
              Guides, references and resources that will help you build with
              thirdweb.
            </p>
          </a>

          <a href="https://thirdweb.com/dashboard" className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>
              Deploy, configure and manage your smart contracts from the
              dashboard.
            </p>
          </a>

          <a
            href="https://portal.thirdweb.com/templates"
            className={styles.card}
          >
            <h2>Templates &rarr;</h2>
            <p>
              Discover and clone template projects showcasing thirdweb features.
            </p>
          </a>
        </div> */}
      </main>
    </div>
  );
};

export default Home;

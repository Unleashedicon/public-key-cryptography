import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Transfer() {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const address = toHex(secp256k1.getPublicKey(privateKey));
      const timestamp = Date.now();
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        nonce: timestamp,
      });
      setBalance(balance);
      setSendAmount("");
      setRecipient("");
      toast.success("Transfer Successful", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Private Key
        <input
          placeholder="Enter your private key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
      <ToastContainer />
    </form>
  );
}

export default Transfer;

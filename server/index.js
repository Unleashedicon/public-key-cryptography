const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02cb5a3b2acec388d1e6cbf28cb380db7633bc4f0aa6dede9a94c462db019cca57": 100,
  "03c2cc315ff95c0b487b1983d958b3ef40dea7b10172ead391f2fda796dbe7a1b7": 50,
  "02a797abb466250a727974583c379bafeda3193a532dbf371554a505cc05d619c7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

const usedNonces = [];
app.post("/send", (req, res) => {
  const { sender, recipient, amount, nonce } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    if (usedNonces.includes(nonce)) {
      res.status(400).send({ message: "Not enough funds!"});
    } else {
      usedNonces.push(nonce);
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }

  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

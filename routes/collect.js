const router = require("express").Router();
const poynt = require("../lib/poynt");
const util = require("util");

router.get("/", (req, res) => {
  res.render("collect/v2", {
    apiKey: req.query.apiKey || global.configs.collectApiKey,
    applicationId: global.configs.applicationId,
    businessId: req.query.businessId || global.configs.collectBusinessId,
    theme: req.query.theme || "customer",
    page: "collect-v2",
  });
});

router.post("/tokenize", async (req, res) => {
  var tokenized;
  try {
    const asyncTokenizeCard = util.promisify(poynt.tokenizeCard).bind(poynt);
    tokenized = await asyncTokenizeCard({
      businessId: req.body.businessId,
      nonce: req.body.nonce,
    });
  } catch (err) {
    console.log("Tokenization failed", err);
    return res.status(400).send(err);
  }

  res.status(200).send(tokenized);
});

router.post("/charge", async (req, res) => {
  var charge;
  try {
    const asyncChargeToken = util.promisify(poynt.chargeToken).bind(poynt);
    var chargeRequest = {
      businessId: req.body.businessId,
      action: "SALE",
      amounts: {
        transactionAmount: req.body.amount,
        orderAmount: req.body.amount,
      },
      currency: "USD",
      token: req.body.token,
      emailReceipt: !!req.body.emailAddress,
      partialAuthEnabled: false,
      receiptEmailAddress: req.body.emailAddress,
    };
    if (req.body.token) {
      chargeRequest.token = req.body.token;
    } else if (req.body.nonce) {
      chargeRequest.nonce = req.body.nonce;
    } else {
      res.send(400).send("Missing funding source: nonce or token");
    }
    charge = await asyncChargeToken(chargeRequest);
  } catch (err) {
    console.log("Charge failed", err);
    return res.status(400).send(err);
  }

  res.status(200).send(charge);
});

module.exports = router;

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
    charge = await asyncChargeToken({
      businessId: req.body.businessId,
      action: "SALE",
      amounts: {
        transactionAmount: req.body.amount,
        orderAmount: req.body.amount,
      },
      currency: "USD",
      token: req.body.token,
      emailReceipt: !!req.body.emailAddress,
      receiptEmailAddress: req.body.emailAddress,
    });
  } catch (err) {
    console.log("Charge failed", err);
    return res.status(400).send(err);
  }

  res.status(200).send(charge);
});

router.get("/v1", (req, res) => {
  res.render("collect/v1", {
    apiKey: req.query.apiKey || global.configs.collectApiKey,
    applicationId: global.configs.applicationId,
    businessId: req.query.businessId || global.configs.collectBusinessId,
    theme: req.query.theme || global.configs.collectTheme,
    page: "collect-v1",
  });
});

module.exports = router;

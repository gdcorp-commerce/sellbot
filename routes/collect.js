const router = require("express").Router();

router.get("/", (_req, res) => {
  res.render("collect/tokenize", {
    apiKey: req.query.apiKey || global.configs.collectApiKey,
    applicationId: global.configs.applicationId,
    businessId: req.query.businessId || global.configs.collectBusinessId,
    theme: req.query.theme || global.configs.collectTheme,
    page: "collect",
  });
});

module.exports = router;

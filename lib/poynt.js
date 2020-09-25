const poynt = require("poynt")({
  env: "st",
  applicationId: "urn:aid:de21a730-891c-4800-a27c-0c747cd6a187",
  filename: __dirname + "/../keypair.pem",
});

module.exports = poynt;

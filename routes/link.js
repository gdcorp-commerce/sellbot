const router = require('express').Router();
const poynt = require('../lib/poynt');
const jwt = require('jsonwebtoken');
const util = require('util');
const uuid = require('uuid');

const asyncGetBusiness = util.promisify(poynt.getBusiness).bind(poynt);

router.get('/', (_req, res) => {
  res.render('link/index', {
    page: 'link',
    uuid: uuid.v4(),
  });
});

router.get('/callback', async (req, res) => {
  var token;
  if (req.query.code) {
    try {
      token = jwt.decode(req.query.code);
    } catch (err) {
      console.log('Decoding token failed', err);
    }
  }

  var business;
  if (token && token['poynt.biz']) {
    try {
      business = await asyncGetBusiness({
        businessId: token['poynt.biz'],
      });
    } catch (err) {
      console.log('Loading business info failed', err);
    }
  }

  res.render('link/callback', {
    business: business,
    context: req.query.context,
    page: 'link',
    token: token,
  });
});

module.exports = router;

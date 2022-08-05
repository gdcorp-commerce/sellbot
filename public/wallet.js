var walletCollect = document.createElement('script');
walletCollect.src = 'https://ote.poynt.net/snippet/poynt-collect/bundle-ote.js';
walletCollect.async = true;
walletCollect.onload = function () {
  var order = {
    total: {
      label: 'SELLBOT - TOTAL',
      amount: '2.00'
    },
    lineItems: [
      {
        label: 'Blanket',
        amount: '0.50',
        type: 'final'
      },
      {
        label: 'Pillow',
        amount: '0.50',
        type: 'final'
      },
      {
        label: 'Jacket',
        amount: '1.00',
        type: 'final'
      },
    ],
    coupon: {
      code: '',
      label: '',
      amount: '0.00'
    },
  };

  const walletRequest = {
    merchantName: 'Sellbot Merchant',
    country: 'US',
    currency: 'USD',
    lineItems: order.lineItems,
    total: {
      label: 'SELLBOT - TOTAL',
      amount: '30.00'
    },
    requireEmail: true,
    requirePhone: true ,
    requireShippingAddress: true,
    supportCouponCode: true
  };
  var collect = new TokenizeJs('84fa5bf5-bd51-4653-80de-ce46348f7659', 'urn:aid:de21a730-891c-4800-a27c-0c747cd6a187', walletRequest);
  
  // [Required] Payment authorization handling
  collect.on('payment_authorized', function (event) {
    if (event.nonce) {
      console.log('Nonce created for ' + event.source, event.nonce);
      document.getElementById('collect-nonce-nonce').innerHTML = event.nonce;
      document.getElementById('collect-form').style.display = 'none';
      document.getElementById('nonce-transaction-success').style.display = 'none';
      document.getElementById('collect-nonce').style.display = 'block';
      document.getElementById('collect-nonce-success').style.display = 'block';
      document.getElementById('collect-nonce-failed').style.display = 'none';
    } else {
      document.getElementById('collect-form').style.display = 'none';
      document.getElementById('collect-nonce').style.display = 'block';
      document.getElementById('collect-nonce-success').style.display = 'none';
      document.getElementById('collect-nonce-failed').style.display = 'block';
    }
    event.complete();
  });

  // Shipping address handling
  collect.on('shipping_address_change', function (event) {
    const shippingMethods = [{
      id: 'free',
      label: 'Free Shipping',
      detail: '(5-business days) Free shipping for 5-business day',
      amount: '0.00',
    },
    {
      id: 'ground_ship',
      label: 'Ground Shipping',
      detail: '(3-business days) Ground shipping fulfilled by GoDaddy',
      amount: '0.00',
    }]

    event.updateWith({
      lineItems: order.lineItems,
      shippingMethods: shippingMethods,
      total: order.total,
    });
  });

  // Coupon code handling
  collect.on('coupon_code_change', function (event) {
    if (event.couponCode === 'free') {
      order.coupon = {
        code: 'free',
        label: 'Free-bot Promo',
        amount: '-29.99',
      }
      order.total.amount = "0.01";
    } else {
      order.coupon = {
        code: '',
        label: '',
        amount: '0.00'
      };
      order.total.amount = "2.00";
    }
    event.updateWith({
      lineItems: order.lineItems,
      shippingMethods: order.shippingMethods,
      couponCode: order.coupon,
      total: order.total,
    });
  });
  
  collect.on('close_wallet', function (event) {
    console.log('wallet closed', event);
  });

  collect.supportWalletPayments().then(function (result) {
    var paymentMethods = [];
    if (result.googlePay) {
      paymentMethods.push('google_pay');
    }
    if (result.applePay) {
      paymentMethods.push('apple_pay');
    }
    const mountOptions = {
      paymentMethods: paymentMethods,
      buttonOptions: {
        width: '160px',
        height: '30px',
        color: 'black',
        type: 'plain',
      },
      buttonsContainerOptions: {
        style: {
          "height": "auto",
          "flex-flow": "row wrap",
          "justify-content": "normal",
          "align-content": "left",
          "margin": "0 auto",
          "margin-top": "-10px",
        }
      }
    };
    
    collect.mount('collect-wallet-button', document, mountOptions);
  });
};
document.head.appendChild(walletCollect);
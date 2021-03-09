<img src="https://sellbot.co/images/sellbot-1000.png" alt="Sellbot" width="300" />

### A sample cloud application using various Poynt APIs. Visit it at https://sellbot.co!

We made this app for three purposes:

1. To make it easy to test out various SDKs Poynt has to offer developers – even before writing any code on your own.

2. To show more complex flows such as Connect with Poynt that require some setup beforehand.

3. To share sample code to help our developers get up and running more easily.

Since there are multiple scenarios demoed on this site, we've included a list of relevant files for each of the demos below.

---

## Link with Poynt

We want it to be extremely easy for our partners to send their customers/merchants to Poynt to sign up for processing in our whitelabeled signup flow, then receive the merchant back after their application is complete with full access to merchant info and application status via API.

**Try it out at [https://sellbot.co/link](https://sellbot.co/link).**

```
lib
  poynt.js – wrapper around the Poynt SDK (https://github.com/poynt/poynt-node)
routes
  link.js – serves both routes: /link and /link/callback
views
  link
    callback.pug – handle the callback after the merchant is redirected back after the application
    index.pug - take in some info about the merchant and kick off the Poynt processing signup flow
```

---

## Poynt Collect

As a merchant, easily accept payments from your customers online. As a developer, embed a Poynt-hosted credit card form on your own app, so you can tokenize cards and process payments on behalf of the merchant without worrying about PCI certification yourself.

**Try it out at [https://sellbot.co/collect](https://sellbot.co/collect).**

```
public
  css
    collect.css – some styles to hide various elements of the page until they're needed
routes
  collect.js – serves the page where the Collect form is hosted
views
  collect
    tokenize.pug – an HTML page that serves the Collect form so you can try tokenizing/charging a card
```

---

## Setup

To run this app with your own application ID:

1. Create a reseller organization on Staging (https://st.poynt.net/auth/signup/reseller) and email c@poynt.com to ask to configure it properly.
2. Create a cloud app on your developer portal.
3. Save the keypair PEM file as `keypair.pem` in the root of this repo.
4. Update `lib/configs.json` with the corresponding IDs for your organization, application, and a sample business on your organization.

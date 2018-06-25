const TradeOfferManager = require ('steam-tradeoffer-manager');
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const config = require ('./config.json')

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
	steam: client,
	community: community,
	language: 'en'
});

client.on('webSession', (sessionid, cookies) => {
  manager.setCookies(cookies);

  community.setCookies(cookies);
  community.startConfirmationChecker(10000, (config.shared_secret));
});

manager.on('newOffer', offer => {
  if (offer.partner.getSteamID64() === '76561198132844160') {
    offer.accept((err, status) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Accepted offer. Status: ${status}.`);
      }
    });
  } else {
    offer.decline(err => {
      if (err) {
        console.log(err);
      } else {
        console.log('Canceled offer from scammer.');
      }
    });
  }
});

manager.on('newOffer', offer => {
  if (offer.itemsToGive.length === 0) {
    offer.accept((err, status) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Donation accepted. Status: ${status}.`);
      }
    });
  } else {
    offer.decline(err => {
      if (err) {
        console.log(err);
      } else {
        console.log('Donation declined (wanted our items).');
      }
    });
  }
});
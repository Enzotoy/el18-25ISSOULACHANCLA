const TradeOfferManagner = require ('steam-tradeoffer-manager');
const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');

const community = new SteamCommunity();
const client = new SteamUser();
const manager = new TradeOfferManagner({
	steam: client,
	community: community,
	language: 'en'
});

function handletrade (trade, app) {
    if (trade.partner === '76561198132844160') {
    offer.accept();
    console.log('admin trade');
  } else {
    doOtherStuff
    }
}


exports.printMsg = function() {
  console.log("This is a message from the demo package");
}


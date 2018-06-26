const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManagner = require ('steam-tradeoffer-manager');
const Request = require ('Request');

const config = require('./config.json');
const trade = require('./trade.js');

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManagner({
	steam: client,
	community: community,
	language: 'en'
});

const logOnOptions = {
  accountName: config.username,
  password: config.password,
  twoFactorCode: SteamTotp.generateAuthCode(config.shared_secret)
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
  console.log('Logged into Steam');

  client.setPersona(SteamUser.Steam.EPersonaState.Online);
  client.gamesPlayed(440);
});

	client.on('webSession', (sessionid, cookies) => {
		manager.setCookies(cookies);

		community.setCookies(cookies);
		community.startConfirmationChecker(10000, '');

});

	client.on('friendRelationship', (steamid, relationship) => {
		if (relationship === 2) {
			client.addFriend(steamid);
			client.chatMessage(steamid, "Hello, i'm a bot ! Thank's for adding me ! If you have any question, add my owner. the link of my owner profile is on my profile ! :)")
			console.log("J'ai ajouté quelqu'un en ami")
		}
	});

trade.printMsg();

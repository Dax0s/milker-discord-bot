require('dotenv').config();

const { MessageEmbed, Message } = require('discord.js');

const PREFIX = process.env.PREFIX;

// Emotes
const errorEmote = '<:error:879405644149571645>';
const successEmote = '<:success:879405668778520606>';

// Example embed
const exampleEmbed = new MessageEmbed()
	.setColor('#5531f5')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

// Embeds
const memberNotFound = new MessageEmbed()
    .setColor('#CC0101')
    .setDescription(`${errorEmote} member not found`);

// Kick embeds
const kickFailed = new MessageEmbed()
    .setColor('#CC0101')
    .setDescription(`${errorEmote} couldn't kick the user`);

const kickSucceeded = new MessageEmbed()
    .setColor('#42B482')
    .setDescription(`${successEmote} user kicked successfully`);

const noKickPermissions = new MessageEmbed()
	.setColor('#CC0101')
	.setDescription(`${errorEmote} You have no power here, peasant!`);

const kickHelp = new MessageEmbed()
    .setColor('#dae5f0')
    .setTitle(`Command: ${PREFIX}kick`)
	.setDescription(`**Description:** Kick a member
					 **Usage:** ${PREFIX}kick [user] [reason]`);

// Ban embeds
const banFailed = new MessageEmbed()
    .setColor('#CC0101')
    .setDescription(`${errorEmote} couldn't ban the user`);

const banSucceeded = new MessageEmbed()
    .setColor('#42B482')
    .setDescription(`${successEmote} user baned successfully`);

const noBanPermissions = new MessageEmbed()
	.setColor('#CC0101')
	.setDescription(`${errorEmote} you are far too weak to wield the ban hammer, little one!`);

const banHelp = new MessageEmbed()
    .setColor('#dae5f0')
    .setTitle(`Command: ${PREFIX}ban`)
	.setDescription(`**Description:** Ban a member
					 **Usage:** ${PREFIX}Ban [user] [reason]`);

// Unban embeds
const unbanFailed = new MessageEmbed()
    .setColor('#CC0101')
    .setDescription(`${errorEmote} couldn't unban the user`);

const unbanSucceeded = new MessageEmbed()
	.setColor('#42B482')
	.setDescription(`${successEmote} user unbaned successfully`);

const unbanHelp = new MessageEmbed()
    .setColor('#dae5f0')
    .setTitle(`Command: ${PREFIX}unban`)
	.setDescription(`**Description:** Unban a member
					 **Usage:** ${PREFIX}Unban [user] [reason]`);


function setEmbedDescription(embed, value) {
	embed.setDescription(value);
}

// Embeds
let embeds = { 'example': exampleEmbed,
			   // Kick embeds
			   'kickFailed': kickFailed,
			   'kickSucceeded': kickSucceeded, 
			   'noKickPermissions': noKickPermissions,
			   'kickHelp': kickHelp,
			   // Ban embeds
			   'banFailed': banFailed,
			   'banSucceeded': banSucceeded,
			   'noBanPermissions': noBanPermissions,
			   'banHelp': banHelp,
			   // Unban embeds
			   'unbanFailed': unbanFailed,
			   'unbanSucceeded': unbanSucceeded,
			   'unbanHelp': unbanHelp,

			   'memberNotFound': memberNotFound };

// Embeds which require an author
let embedsArr = [ exampleEmbed,
				  // Kick embeds
				  kickFailed,
				  kickSucceeded,
				  noKickPermissions,
				  kickHelp,
				  // Ban embeds
				  banFailed,
				  banSucceeded,
				  noBanPermissions,
				  banHelp,
				  // Unban embeds
				  unbanFailed,
				  unbanSucceeded,
				  unbanHelp,

				  memberNotFound ];

module.exports.embeds = embeds;

function setEmbedAuthor(authorName, authorAvatar) {
	embedsArr.forEach(element => {
		element.setAuthor(authorName, authorAvatar);
	});
}

// Emotes
const emotes = { 'errorEmote': errorEmote,
				 'successEmote': successEmote };

module.exports.emotes = emotes;

// Functions
const functions = { 'setEmbedDescription': setEmbedDescription,
					'setEmbedAuthor': setEmbedAuthor };

module.exports.functions = functions;
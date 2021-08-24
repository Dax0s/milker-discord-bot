require('dotenv').config();

const { MessageEmbed } = require('discord.js');

const PREFIX = process.env.PREFIX;

const errorEmote = '<:error:879405644149571645>';
const successEmote = '<:success:879405668778520606>';

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

const kickFailed = new MessageEmbed()
    .setColor('#CC0101')
    .setDescription(`${errorEmote} couldn't kick the user`);

const kickSucceeded = new MessageEmbed()
    .setColor('#42B482')
    .setDescription(`${successEmote} user kicked successfully`);

const noKickPermissions = new MessageEmbed()
	.setColor('#CC0101')
	.setDescription(`${errorEmote} You have no power here, peasant!`);
	// .setDescription(`${errorEmote} You do not have the permissions to kick someone`);

const kickHelp = new MessageEmbed()
    .setColor('#dae5f0')
    .setTitle(`Command: ${PREFIX}kick`)
	.setDescription(`**Description:** Kick a member
					 **Usage:** ${PREFIX}kick [user] [reason]`);

const memberNotFound = new MessageEmbed()
    .setColor('#CC0101')
    .setDescription(`${errorEmote} member not found`);

function setEmbedDescription(embed, value) {
	embed.setDescription(value);
}

// Embeds
let embeds = { 'example': exampleEmbed,
			   'kickFailed': kickFailed,
			   'kickSucceeded': kickSucceeded, 
			   'noKickPermissions': noKickPermissions,
			   'kickHelp': kickHelp,
			   'memberNotFound': memberNotFound };

// Embeds which require an author
let embedsArr = [ exampleEmbed,
				  kickFailed,
				  kickSucceeded,
				  noKickPermissions,
				  kickHelp,
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
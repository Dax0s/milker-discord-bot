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

const kickHelp = new MessageEmbed()
    .setColor('#dae5f0')
    .setTitle(`Command: ${PREFIX}kick`)
    .addField('Description: ', 'Kick a member', false);
    // .setFields(
    //     { name: 'Description: ', value: 'Kick a member', inline: false },
    //     { name: 'Usage', value: `${PREFIX}kick [user]`, inline: false }
    // );

function setKickSucceededEmbed(member) {
	kickSucceeded.setDescription(`${successEmote} ${member} was kicked successfully`);
}

module.exports.example = exampleEmbed;
module.exports.kickFailed = kickFailed;
module.exports.kickSucceeded = kickSucceeded;
module.exports.kickHelp = kickHelp;

module.exports.successEmote = successEmote;

module.exports.setKickSucceededEmbed = setKickSucceededEmbed;
require('dotenv').config();

const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const client = new discord.Client({ intents: ['GUILD_MESSAGES', 'GUILDS'] });

const prefix = '.';

client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    getInfo();
    console.log('\n');
});


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


client.on("messageCreate", (message) => {
    let m_content = message.content;

    if (!m_content.startsWith(prefix) || message.author.bot) return;

    if (m_content.startsWith(prefix + "ping")) {
        message.channel.send(message.author.tag);
    }
    else if (m_content.startsWith(prefix + 'username')) {
        m_content = m_content.replace(`${prefix}username `, '');
        message.client.user.setUsername(m_content);
    } 
    else if (m_content.startsWith(prefix + 'avatar')) {
        message.channel.send(message.author.displayAvatarURL());
    }
    else if (m_content.startsWith(prefix + "get info")) {
        getInfo();
    }
    else if (m_content.startsWith(prefix + "fake channel"))
    {
        console.log(message);
        console.log('\n');
        message.channelId = '878648104864346112';
        console.log(message);
        console.log('\n');
        message.channel.send("Yeaaaah booiiii");
    }
    else if (m_content.startsWith(prefix + "check")) {
        console.log(message.mentions);
    }
    else if (m_content.startsWith(prefix + "embed")) {
        message.channel.send({ embeds: [exampleEmbed] });
    }
});

client.on("messageDelete", (message) => {
    if (message.author.bot) return;

    message.channel.send(`[${message.author.tag}] message was deleted: [${message.content}]`);
    console.log(`[${message.author.tag}] message was deleted: [${message.content}]`);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    oldMessage.channel.send(`[${oldMessage.author.tag}] edited a message: [${oldMessage}] => [${newMessage}]`);
    console.log(`[${oldMessage.author.tag}] edited a message: [${oldMessage}] => [${newMessage}]`);
});

function getInfo() {
    console.log(client.guilds);
}



/* async function replyWithInvite(message) {
    let invite = await message.channel.createInvite(
    {
      maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
      maxUses: 1 // maximum times it can be used
    },
  )
  .catch(console.log);
  
    console.log(invite ? `Here's your invite: ${invite}` : "There has been an error during the creation of the invite.");
  } */
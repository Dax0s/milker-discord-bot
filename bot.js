require('dotenv').config();

const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const client = new discord.Client({ intents: ['GUILD_MESSAGES', 'GUILDS'] });

const prefix = '.';

client.login(process.env.TOKEN);


// Event listener which triggers when the discord bot logs in
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    getInfo();
    console.log('\n');
});


// Event listener which triggers when someone sends a message
client.on("messageCreate", (message) => {
    let m_content = message.content;
    
    // Checks if message starts with the prefix and it wasn't sent by a bot
    if (!m_content.startsWith(prefix) || message.author.bot) return;

    // Sends the avatar of the user whom used the command
    if (m_content.startsWith(prefix + 'avatar')) {
        message.channel.send(message.author.displayAvatarURL());
    }

    // Activates the getInfo() function
    else if (m_content.startsWith(prefix + "get info")) {
        getInfo();
    }

    // Bot sends a message to a channel different from where it got the message
    else if (m_content.startsWith(prefix + "fake channel"))
    {
        console.log(message);
        console.log('\n');
        message.channelId = '878648104864346112';
        console.log(message);
        console.log('\n');
        message.channel.send("Yeaaaah booiiii");
    }

    // Logs out the mentions in a message
    else if (m_content.startsWith(prefix + "check")) {
        console.log(message.mentions);
    }
});

// Event listener which triggers when a message is deleted
client.on("messageDelete", (message) => {
    if (message.author.bot) return;

    // Sends the deleted message or logs it out
    // message.channel.send(`[${message.author.tag}] message was deleted: [${message.content}]`);
    console.log(`[${message.author.tag}] message was deleted: [${message.content}]`);
});

// Event listener which triggers when a message is updated
client.on("messageUpdate", (oldMessage, newMessage) => {
    if (message.author.bot) return;

    // Sends the updated message or logs it out
    // oldMessage.channel.send(`[${oldMessage.author.tag}] edited a message: [${oldMessage}] => [${newMessage}]`);
    console.log(`[${oldMessage.author.tag}] edited a message: [${oldMessage}] => [${newMessage}]`);
});

function getInfo() {
    console.log(client.guilds);
}

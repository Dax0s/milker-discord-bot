require('dotenv').config();

const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const client = new discord.Client({ intents: ['GUILD_MESSAGES', 'GUILDS'] });

const PREFIX = '.';

client.login(process.env.TOKEN);


// Event listener which triggers when the discord bot logs in
client.on("ready", () => {
    console.log('\n' + `Logged in as ${client.user.tag}!` + '\n');
    getInfo();
    console.log('\n');
});


// Event listener which triggers when someone sends a message
client.on("messageCreate", (message) => {
    if (message == null) return;

    // Checks if message starts with the prefix and it wasn't sent by a bot
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    
    const [ command, ...args ] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

    console.log(command, args, '\n');

    // Sends the avatar of the user whom used the command
    if (command === "avatar") {
        message.channel.send(message.author.displayAvatarURL());
    }

    // Activates the getInfo() function
    else if (command === "getInfo") {
        console.log(message.guild.members.fetch('483377420494176258'));
    }

    // Bot sends a message to a channel different from where it got the message
    else if (command === "fakeChannel")
    {
        console.log(message);
        console.log('\n');
        message.channelId = '878648104864346112';
        console.log(message);
        console.log('\n');
        message.channel.send("Yeaaaah booiiii");
    }

    // Logs out the mentions in a message
    else if (command === "checkMentions") {
        console.log(message.mentions);
    }

    // Kicks the member with the specified ID
    else if (command === "kick") {
        const authorMemberObj = message.guild.members.cache.get(message.author.id);
        if (!authorMemberObj.permissions.has('KICK_MEMBERS')) return message.reply("You do not have the permissions to kick someone");

        if (args.length === 0) return message.reply("Please provide an ID or mention someone");
        args[0] = args[0].replace(/[^0-9]/g, '');

        const members = message.guild.members;
        if (members) {
            members.kick(args[0])
                .then((member) => message.channel.send(`${member} was kicked`))
                .catch((err) => message.channel.send(`Couldn't kick ${member}`));
        } else {
            message.reply("Member not found");
        }
    }
});

// Event listener which triggers when a message is deleted
client.on("messageDelete", (message) => {
    if (message.author.bot) return;

    // Sends the deleted message or logs it out
    console.log(`[${message.author.tag}] message was deleted: [${message.content}]`);
    // message.channel.send(`[${message.author.tag}] message was deleted: [${message.content}]`);
});

// Event listener which triggers when a message is updated
client.on("messageUpdate", (oldMessage, newMessage) => {
    if (message.author.bot) return;

    // Sends the updated message or logs it out
    console.log(`[${oldMessage.author.tag}] edited a message: [${oldMessage}] => [${newMessage}]`);
    // oldMessage.channel.send(`[${oldMessage.author.tag}] edited a message: [${oldMessage}] => [${newMessage}]`);
});

function getInfo() {
    // console.log(client.guilds.cache);
}

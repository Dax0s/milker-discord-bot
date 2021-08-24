// const embeds = require('./embeds');
const { embeds, emotes, functions } = require('./embeds');

require('dotenv').config();

const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const client = new discord.Client({ intents: ['GUILD_MESSAGES', 'GUILDS'] });

const PREFIX = process.env.PREFIX;

client.login(process.env.TOKEN);


// Event listener which triggers when the discord bot logs in
client.on('ready', () => {
    console.log('\n' + `Logged in as ${client.user.tag}!` + '\n');
    getInfo();
    console.log('\n');
});


// Event listener which triggers when someone sends a message
client.on('messageCreate', (message) => {
    if (message == null) return;

    // Checks if message starts with the prefix and it wasn't sent by a bot
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    
    const [ command, ...args ] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

    console.log(command, args, '\n');

    switch (command) {

        // Sends the avatar of the user whom used the command
        case 'avatar':
            message.channel.send(message.author.displayAvatarURL());
            // message.channel.send(client.user.displayAvatarURL());
            break;

        // Activates the getInfo() function
        case 'getInfo':
            console.log(message.guild.members.fetch('483377420494176258'));
            break;

        // Command to test random things
        case 'test':
            message.channel.send({ embeds: [embeds.example] });
            break;

        // Bot sends a message to a channel different from where it got the message
        case 'fakeChannel':
            console.log(message);
            console.log('\n');
            message.channelId = '878648104864346112';
            console.log(message);
            console.log('\n');
            message.channel.send('Yeaaaah booiiii');
            break;

        // Kicks the member with the specified ID
        case 'kick':
            const authorMemberObj = message.guild.members.cache.get(message.author.id);
            if (!authorMemberObj.permissions.has('KICK_MEMBERS')) return message.reply({ embeds: [embeds.noKickPermissions] });
            if (args.length === 0) return message.channel.send({ embeds: [embeds.kickHelp] });
            
            args[0] = args[0].replace(/[^0-9]/g, '');

            const members = message.guild.members;
            const member = members.cache.get(args[0]);
            functions.setEmbedDescription(embeds.kickSucceeded, `${emotes.successEmote} ${member} had to be removed by force`);
            functions.setEmbedAuthor(embeds.kickSucceeded, message.author.tag, message.author.displayAvatarURL())
            
            let reason = [ ...args ]
                .toString()
                .replace(/[0-9]/g, '')
                .slice(1)
                .replaceAll(',', ' ');

            console.log(reason);

            if (members && member in members) {
                members.kick(args[0], reason)
                    .then((member) => message.channel.send({ embeds: [embeds.kickSucceeded] }))
                    .catch((err) => message.channel.send({ embeds: [embeds.kickFailed] }));
            } else {
                message.channel.send({ embeds: [embeds.memberNotFound] });
            }

            break;
    }
});

// Event listener which triggers when a message is deleted
client.on('messageDelete', (message) => {
    if (message.author.bot) return;

    // Sends the deleted message or logs it out
    console.log(`[${message.author.tag}] message was deleted: [${message.content}]`);
    // message.channel.send(`[${message.author.tag}] message was deleted: [${message.content}]`);
});

// Event listener which triggers when a message is updated
client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;

    // Sends the updated message or logs it out
    console.log(`[${oldMessage.author.tag}] edited a message: [${oldMessage}] => [${newMessage}]`);
    // oldMessage.channel.send(`[${oldMessage.author.tag}] edited a message: [${oldMessage}] => [${newMessage}]`);
});

function getInfo() {
    // console.log(client.guilds.cache);
}

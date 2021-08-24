// const embeds = require('./embeds');
const { embeds, emotes, functions } = require('./embeds');

require('dotenv').config();

const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

const client = new discord.Client({ intents: ['GUILDS', 
                                              'GUILD_MEMBERS', // Privileged 
                                              'GUILD_BANS', 
                                              'GUILD_EMOJIS_AND_STICKERS', 
                                              'GUILD_INTEGRATIONS',
                                              'GUILD_INVITES', 
                                              'GUILD_VOICE_STATES',
                                              'GUILD_PRESENCES', // Privileged
                                              'GUILD_MESSAGES',
                                              'GUILD_MESSAGE_REACTIONS',
                                              'GUILD_MESSAGE_TYPING', 
                                              'DIRECT_MESSAGES', 
                                              'DIRECT_MESSAGE_REACTIONS',
                                              'DIRECT_MESSAGE_TYPING'] });

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
            getInfo();
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
            message.delete();
            functions.setEmbedAuthor(message.author.tag, message.author.displayAvatarURL());

            if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({ embeds: [embeds.noKickPermissions] });
            if (args.length === 0) return message.channel.send({ embeds: [embeds.kickHelp] });
            
            args[0] = args[0].replace(/[^0-9]/g, '');
            
            var member = message.guild.members.cache.get(args[0]);
            args[0] = '';

            functions.setEmbedDescription(embeds.kickSucceeded, `${emotes.successEmote} ${member} had to be removed by force`);
            functions.setEmbedDescription(embeds.kickFailed, `${emotes.errorEmote} ${member} was stronger than me`);

            var reason = [ ...args ]
                .toString()
                .slice(1)
                .replaceAll(',', ' ');

            console.log(...args);
            console.log(reason);

            if (member) {
                member.kick(reason)
                    .then((member) => message.channel.send({ embeds: [embeds.kickSucceeded] }))
                    .catch((err) => message.channel.send({ embeds: [embeds.kickFailed] }));
            } else {
                message.channel.send({ embeds: [embeds.memberNotFound] });
            }
            break;
        
        // Bans the member with the specified ID
        case 'ban':
            message.delete();
            functions.setEmbedAuthor(message.author.tag, message.author.displayAvatarURL());
            
            if (args.length === 0) return message.channel.send({ embeds: [embeds.banHelp] });
            if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send({ embeds: [embeds.noBanPermissions] });
        
            args[0] = args[0].replace(/[^0-9]/g, '');
            
            var member = message.guild.members.cache.get(args[0]);
            args[0] = '';

            functions.setEmbedDescription(embeds.banSucceeded, `${emotes.successEmote} ${member} was banished to the far lands`);
            functions.setEmbedDescription(embeds.banFailed, `${emotes.errorEmote} ${message.author} hmm, seems like I lost my ban hammer`);

            var reason = [ ...args ]
                .toString()
                .slice(1)
                .replaceAll(',', ' ');

            if (member) {
                member.ban({ reason: reason })
                    .then((member) => message.channel.send({ embeds: [embeds.banSucceeded] }))
                    .catch((err) => message.channel.send({ embeds: [embeds.banFailed] }));
            } else {
                message.channel.send({ embeds: [embeds.memberNotFound] });
            }
            break;

        // Unbans the member with the specified ID
        case 'unban':
            message.delete();
            functions.setEmbedAuthor(message.author.tag, message.author.displayAvatarURL());
            
            if (args.length === 0) return message.channel.send({ embeds: [embeds.banHelp] });
            if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send({ embeds: [embeds.noBanPermissions] });
            
            userID = args[0].replace(/[^0-9]/g, '').toString();
            args[0] = '';
            
            var reason = [ ...args ]
                .toString()
                .slice(1)
                .replaceAll(',', ' ');
            
            var bannedUsersList = message.guild.bans;

            if (bannedUsersList.cache.has(userID)) {
                bannedUsersList.remove(userID, reason)
                    .then((user) => {
                        functions.setEmbedDescription(embeds.banSucceeded, `${emotes.successEmote} ${user.username} can now return from the far lands`);
                        message.channel.send({ embeds: [embeds.banSucceeded] })
                    })
                    .catch((err) => message.channel.send({ embeds: [embeds.unbanFailed] }));
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

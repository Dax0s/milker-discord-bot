const { embeds, emotes, functions } = require('./embeds');

const discord = require('discord.js');
const fs = require('fs');

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


// Jsons paths
const configJsonPath = './jsons/config.json';

// Jsons
let configJson = require(configJsonPath);

// Jsons booleans to check if they have changed
let configJsonBool = false;

// Errors
const resolveError = 'Couldn\'t resolve the user id to unban.';
const unknownBanError = 'Unknown Ban';

// If true, messages will be deleted after sending back the command embed
let deleteMessage = false;

let prefix = configJson.prefix;

client.login(configJson.token);

// Event listener which triggers when the discord bot logs in
client.on('ready', () => {
    console.log('\n' + `Logged in as ${client.user.tag}!` + '\n');
    client.user.setActivity('Milking you');
});

// Event listener which triggers when someone sends a message
client.on('messageCreate', (message) => {
    if (message == null) return;

    // Checks if message starts with the prefix and if it wasn't sent by a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const [ ...messageArr ] = message.content
        .trim()
        .substring(prefix.length)
        .split(/\s+/); // Splits the message.content into an array by using a regex. \s - whitespace. + - one or more repetitions

    functions.setEmbedAuthor(message.author.tag, message.author.displayAvatarURL());

    let [ command ] = messageArr;
    command = command.toLowerCase();
    switch (command) {

        // Changes the prefix into the specified one
        case 'prefix':
            var [ , newPrefix ] = messageArr;
            
            if (!newPrefix) return message.channel.send(`The prefix for this server is ${prefix}`);
            
            configJson.prefix = newPrefix;
            configJson = JSON.stringify(configJson, null, '\t');
            fs.writeFile(configJsonPath, configJson, (err) => err && console.error(err));
            break;

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
            if (!message.mentions) return message.channel.send('No mentions');
            console.log(message.mentions);
            // message.channel.send(message.mentions);
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
            deleteMessage && message.delete();

            var [ , userID, ...reason ] = messageArr;
            
            if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send({ embeds: [embeds.noKickPermissions] });
            if (!userID) return message.channel.send({ embeds: [embeds.kickHelp] });
            
            userID = userID.replace(/[^0-9]/g, ''); // Removes every character except the numbers using regex. g - finds all occurences
            var member = message.guild.members.cache.get(userID);

            functions.setEmbedDescription(embeds.kickSucceeded,`${emotes.successEmote} ${member} had to be removed by force`);
            functions.setEmbedDescription(embeds.kickFailed, `${emotes.errorEmote} ${member} was stronger than me`);

            reason = reason
                .toString()
                .replaceAll(',', ' ');

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
            deleteMessage && message.delete();

            var [ , userID, ...reason ] = messageArr;
            
            if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send({ embeds: [embeds.noBanPermissions] });
            if (!userID) return message.channel.send({ embeds: [embeds.banHelp] });
            
            userID = userID.replace(/[^0-9]/g, ''); // Removes every character except the numbers using regex. g - finds all occurences
            var member = message.guild.members.cache.get(userID);

            functions.setEmbedDescription(embeds.banSucceeded, `${emotes.successEmote} ${member} was banished to the far lands`);
            functions.setEmbedDescription(embeds.banFailed, `${emotes.errorEmote} ${message.author} hmm, seems like I lost my ban hammer`);

            reason = reason
                .toString()
                .replaceAll(',', ' ');

            member ? member.ban({ reason: reason })
                .then((member) => message.channel.send({ embeds: [embeds.banSucceeded] }))
                .catch((err) => message.channel.send({ embeds: [embeds.banFailed] }))
                : message.channel.send({ embeds: [embeds.memberNotFound] });
            break;

        // Unbans the member with the specified ID
        case 'unban':
            deleteMessage && message.delete();
            
            var [ , userID, ...reason ] = messageArr;
            
            if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send({ embeds: [embeds.noBanPermissions] });
            if (!userID) return message.channel.send({ embeds: [embeds.banHelp] });
            
            userID = userID.replace(/[^0-9]/g, ''); // Removes every character except the numbers using regex. g - finds all occurences
            
            functions.setEmbedDescription(embeds.unbanFailed, `${emotes.errorEmote} ${message.author} hmm, seems like I lost my ban hammer`);

            reason = reason
                .toString()
                .replaceAll(',', ' ');
            
            var bannedUsersList = message.guild.bans;

            bannedUsersList.remove(userID, reason)
                .then((user) => {
                    functions.setEmbedDescription(embeds.unbanSucceeded, `${emotes.successEmote} ${user.username} can now return from the far lands`);
                    message.channel.send({ embeds: [embeds.unbanSucceeded] });
                })
                .catch((err) => { 
                    if (err.message == unknownBanError) { 
                        message.channel.send({ embeds: [embeds.memberNotFound] });
                    } else if (err.message == resolveError) {
                        message.channel.send({ embeds: [embeds.memberNotFound] });
                    } else {
                        message.channel.send({ embeds: [embeds.unbanFailed] });
                }});
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
# Discord Bot Milker

Milker is a discord bot made by me on my free time. For now, it's just a simple discord moderation bot, but I'm planning on making it bigger and adding a dashboard.

## Table of contents

* [Requirements](#requirements)
* [Getting started](#getting-started)
* [Setting up the bot](#setting-up-the-bot)
* [Author](#author)

## Requirements

* [Node](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)

## Getting started

Make sure you have all the required tools installed, if so continue on with the instructions bellow.

### Setting up the bot

In case you haven't yet setup the bot in [Discord developers portal](https://discord.com/developers/applications), follow these steps to do so.

##### 1. Creating the application

To create the application click the blue button saying 'New Application'.

![New application](https://raw.githubusercontent.com/Dax0s/milker-discord-bot/media/ReadMeImages/NewApplication.png?raw=true)

Then, specify the name and click 'Create'.

![Create application](https://raw.githubusercontent.com/Dax0s/milker-discord-bot/media/ReadMeImages/CreateApplication.png?raw=true)


##### 2. Creating the bot

To create the bot go to the section named 'Bot',

![Bot section](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/BotSection.png?raw=true)

click the blue button saying 'Add Bot'

![Add bot](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/AddBot.png?raw=true)

and then click 'Yes, do it!'.

![Add bot 2](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/AddBot2.png?raw=true)


##### 4. Setting up the bot

After you create the bot, you can get the token by clicking 'Copy'. **Do not share** this token with anyone, since with it, they can do anything they want with the bot. Howewer, if your token gets out, just click the button saying 'Regenerate'.

![Token](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/Token.png?raw=true)


Next, make sure 'Presence intent' and 'Server members intent' options are selected, since they are needed for the bot to work.

![Intents](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/Intents.png?raw=true)


##### 5. Adding the bot to your server

First, go to the section named 'OAuth2',

![Oauth2 section](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/OAuthSection.png?raw=true)

then, in the scopes selection, select 'bot'

![Bot scope](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/BotScope.png?raw=true)

and at bot permissions, select 'Administrator'.

![Bot permissions](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/BotPermissions.png?raw=true)

Later, I'll see which individual permissions does the bot need, but for now, I'll just leave it at 'Administrator', since I'm still adding new features to it.

Finally, click the blue button saying Copy and enter the copied link in a new browser tab.

![Invite link](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/InviteLink.png?raw=true)

After that, just select the server, to which you want to add the bot, click 'Continue' and the 'Authorize'.

![Add to server](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/AddToServer.png?raw=true)
![Add to server 2](https://github.com/Dax0s/milker-discord-bot/blob/media/ReadMeImages/AddToServer2.png?raw=true)

### Installation

```sh
# Clone the repository
git clone https://github.com/Dax0s/milker-discord-bot.git

# Enter the bot directory
cd milker-discord-bot/
```

### Configuration

After cloning the project, add your discord API token and specify the prefix in the config.json file.

### Starting the application

```js
# Start the bot by typing in the command bellow
npm run start
```

## Author

Feel free to contact me on [discord](https://discord.com/): 'Dax0s#2248'

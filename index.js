const { Client, Intents } = require('discord.js');
const { GPT3 } = require('openai');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const openai = new GPT3({ key: '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' });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.content === '/set77' && message.guild) {
    // Save the channel ID where the command was invoked
    const channelID = message.channelId;

    // Listen for messages in the specific channel
    const channel = await client.channels.fetch(channelID);
    if (channel.isText()) {
      channel.messages.fetch().then(messages => {
        messages.forEach(async msg => {
          if (msg.author.id === client.user.id) return;

          // Use OpenAI to generate a response
          const response = await openai.complete({
            engine: 'gpt-3.5-turbo-instruct',
            prompt: msg.content,
            maxTokens: 150
          });

          // Send the response to the same channel  
          channel.send(response.choices[0].text);
        });
      });
    }
  }
});

client.login('MTIwODc1MTk2MTk0ODU1MzMxNw.GrNcmh.PuvjIJ8EqnBJbyafZLIlxlg41WJ1tsfig_FhyE');

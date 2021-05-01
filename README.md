# codex-manage-bot
This is a telegram bot hosted on heroku that uses node-iterapi and telegram webhooks.<br>
The main idea of make this bot was to auto verify the students that are qualified to join the codex main group.

## How to Use
Host it on you on heroku dyno<br>
<ol>
<li>add BOT_TOKEN envioment variable and set it to your bot token</li>
<li>add JOIN_URL envioment variable and set it to the joining link of your club</li>
</ol>

For the end user:<br>
<ol>
<li>use /register in group or dm it and the bot will dm the user the instructions</li>
<li>use /login [registrationnumber] [password] to verify your identity</li>
</ol>

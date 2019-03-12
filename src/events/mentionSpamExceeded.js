const { Event } = require('klasa');

module.exports = class extends Event {

	async run(message) {
		await message.guild.ban(message.author.id, { days: 2, reason: 'Automatic: Mention Spam threshold exceeded' });
		await message.guild.unban(message.author.id, 'Softban process, pruned two days worth of messages');
		return message.send(`${message.author} has been banned for exceeding this guild's mention spam threshold`);
	}

};

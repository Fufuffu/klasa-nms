const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			ignoreOthers: false,
			ignoreBots: false
		});

		this.roleValue = this.client.options.nms.role;
		this.everyoneValue = this.client.options.nms.everyone;
	}

	async run(message) {
		if (!message.guild || !message.guild.settings['no-mention-spam'].enabled) return;

		const mentions = message.mentions.users.filter(user => !user.bot && user !== message.author).size +
			(message.mentions.roles.size * this.roleValue) +
			(Number(message.mentions.everyone) * this.everyoneValue);

		if (!mentions) return;

		const rateLimit = message.guild.nms.acquire(message.author.id);

		try {
			for (let i = 0; i < mentions; i++) rateLimit.drip();
			if (rateLimit.remaining / rateLimit.bucket < 0.20) this.client.emit('mentionSpamWarning', message);
		} catch (err) {
			this.client.emit('mentionSpamExceeded', message);
		}
	}

};

const { Structures } = require('discord.js');
const { RateLimitManager } = require('klasa');

module.exports = Structures.extend('Guild', Guild => {
	/**
	 * Klasa's Extended Guild
	 * @extends external:Guild
	 */
	class KlasaNMSGuild extends Guild {

		/**
		 * @param {...*} args Normal D.JS Guild args
		 */
		constructor(...args) {
			super(...args);

			/**
			 * The ratelimit management for the no-mention-spam behavior
			 * @since 0.0.1
			 * @type {RateLimitManager}
			 * @protected
			 */
			this.nms = new RateLimitManager(
				this.settings['no-mention-spam'].mentionsAllowed,
				this.settings['no-mention-spam'].timePeriod * 1000
			);

			if (this.client.ready) {
				this.settings.sync().then(() => {
					this.nms.bucket = this.settings['no-mention-spam'].mentionsAllowed;
					this.nms.cooldown = this.settings['no-mention-spam'].timePeriod * 1000;
				});
			}
		}

	}

	return KlasaNMSGuild;
});

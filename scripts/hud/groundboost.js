'use strict';

const MAX_GB_DEN = 1 / 250;

class Groundboost {
	/** @type {CircuularProgressBar} @static */
	static groundboostMeter = $('#GroundboostMeter');
	/** @type {Label} @static */
	static groundboostTime = $('#GroundboostTime');
	/** @type {Panel} @static */
	static container = $('#GroundboostContainer');

	static onUpdate() {
		const lastMoveData = MomentumMovementAPI.GetLastMoveData();
		const knockbackTime = Math.max(lastMoveData.knockbackTime, 0);

		this.groundboostMeter.value = Math.min(knockbackTime * MAX_GB_DEN, 1);
		this.groundboostTime.text = knockbackTime > 0 ? knockbackTime.toFixed() : '';
	}

	static {
		$.RegisterEventHandler('ChaosHudProcessInput', $.GetContextPanel(), this.onUpdate.bind(this));
	}
}

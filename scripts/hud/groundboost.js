'use strict';

const TIMER_FLAGS = {
	NONE: 0,
	LANDING: 1 << 0,
	KNOCKBACK: 1 << 1,
	WATERJUMP: 1 << 2
};

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
		const defragTimer = lastMoveData.defragTimer;
		const bGroundboost = lastMoveData.defragTimerFlags & TIMER_FLAGS.KNOCKBACK && lastMoveData.moveStatus === 1;

		this.groundboostMeter.value = bGroundboost ? Math.min(defragTimer * MAX_GB_DEN, 1) : 0;
		this.groundboostTime.text = lastMoveData.defragTimerFlags === 3; //defragTimer > 0 ? defragTimer : '';
	}

	static {
		$.RegisterEventHandler('ChaosHudProcessInput', $.GetContextPanel(), this.onUpdate.bind(this));
	}
}

'use strict';

describe('Pricebreak', function () {
	var Pricebreak = require('../');
	var should = require('should');
	var pricebreaks = {10: 26.96, 50: 25.46, 100: 23.96};
	var pricebreak = Pricebreak(29.95, pricebreaks);

	describe('#price', function () {
		it('should return `quantity * pricebreak` within the proper range', function () {
			(pricebreak.price(50) / 50).should.be.exactly(25.46)
		});

		it('should return `quantity * base` when quantity is less than first break', function () {
			var price;
			for (var i = 1; i < 10; i++) {
				pricebreak.price(i).should.be.exactly(i * 29.95);
			}
		});

	});

	describe('#humanize', function () {
		it('should set ranges to X-Y where Y is the next break minus one', function () {
			var start = 1;
			var nextRange;
			var breaks = Object.keys(pricebreaks).sort(function (a,b) {
				return (parseInt(a) > parseInt(b)) ? 1 : -1;
			});
			var human = pricebreak.humanize();
			human.forEach(function(_break, idx) {
				var range = _break.range.split('-');
				if (idx > 0) { start = breaks[idx-1]; }
				var end = (idx < breaks.length) ? (breaks[idx] - 1) : '+';

				if (range.length === 2) {
					range[0].should.be.exactly(start.toString());
					range[1].should.be.exactly(end.toString());
				} else {
					range[0].should.be.exactly(start+end);
				}
			});
		});

		it('should end ranges with "+" if `vague` is true', function () {
			var human = pricebreak.humanize(true);
			Object.keys(human).forEach(function (key) {
				human[key].range.slice(-1).should.be.exactly('+');
			});
		});
	});
});
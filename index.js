(function (root) {
	'use strict';

	function Pricebreak(base, breaks) {
		if (!(this instanceof Pricebreak)) {
			return new Pricebreak(base, breaks);
		}

		var sortedBreaks = Object.keys(breaks)
			.sort(function (a,b) { if (a > b) { return -1; } });
		
		/**
		 * Calculate total price based on quantity.
		 * @param quantity
		 * @returns {number}
		 */
		function price(quantity) {
			var price = base;
			var max = 0;

			sortedBreaks
				.forEach(function (_break) {
					_break = parseInt(_break);
					if (_break > max) { max = _break; }
					
					if (quantity >= _break) {
						price = breaks[_break];
					}
				});

			price = (Math.round(100 * quantity * (price || breaks[max])) / 100);

			return price;
		}

		/**
		 * Get an array of objects with humanized ranges and prices
		 * @param vague - if true, display range as X+ instead of X-Y
		 * @returns {Array}
		 */
		function humanize(vague) {
			
			var statements = sortedBreaks.map(function (_break, idx, arr) {
					_break = parseInt(_break);
					var nextQb = parseInt(arr[idx + 1]);
					var start = _break;
					var end = 0; 

					if (idx === arr.length - 1 || vague) { end = '+'; }
					else { end = '-' + (nextQb - 1); }

					return {range: start + end, price: breaks[_break.toString()].toFixed(2)};
				});
			
			statements.unshift({
				range: '1' + ((vague) ? '+' : '-' + (sortedBreaks[0] - 1)),
				price: base.toFixed(2)
			});

			return statements;
		}

		this.price = price;
		this.humanize = humanize;
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Pricebreak;
	} else if (typeof define !== 'undefined' && define.amd) {
		define([], function () { return Pricebreak; });
	} else {
		if (!root.Pricebreak) { root.Pricebreak = Pricebreak; }
	}
	
})(this);
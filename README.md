# pricebreak [![Build Status](https://travis-ci.org/shopfrontjs/pricebreak.svg)](https://travis-ci.org/shopfrontjs/pricebreak)

Define price breaks and calculate total price based on quantity.

## Install

```
npm install pricebreak
```

## Quick Example

```js
var Pricebreak = require('pricebreak');

// define base price and price breaks
var pricebreak = Pricebreak(20.00, {
	10: 18.50,
	50: 17.00,
	100: 16.50
});

// calculate total from quantity
var total = pricebreak.price(15);
// total -> 277.5

// get humanized price breaks
var humanized = pricebreak.humanize();
/* [ { range: '1-9', price: '20.00'   },
	 { range: '10-49', price: '18.50' },
	 { range: '50-99', price: '17.00' },
	 { range: '100+', price: '16.50'  } ] */

// get humanized price breaks with vague range
humanized = pricebreak.humanize(true);
/* [ { range: '1+', price: '20.00'   },
	 { range: '10+', price: '18.50'  },
	 { range: '50+', price: '17.00'  },
	 { range: '100+', price: '16.50' } ] */

```

## License

Copyright (c) 2015, Adam Snodgrass <overra@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
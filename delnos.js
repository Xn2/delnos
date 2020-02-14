const jimp = require('jimp');
const classes = require('./classes.js');
const texturesPath = './tex';
const rawVolforce = parseFloat(process.argv.slice(2)).toFixed(2);

if (isNaN(rawVolforce)) {
	throw new Error('Please input a number between 0.00 and 23.99');
}

function getClass(volforce) {
	let goodTier;
	let goodDivision;
	let keys = Object.keys(classes);
	for (let i = 0; i <= keys.length; i++) {
		if (volforce >= classes[keys[i]].volforcemin && volforce <= classes[keys[i]].volforcemax) {
			goodTier = classes[keys[i]];
			break;
		}
	}

	keys = Object.keys(goodTier.subclasses);

	for (let i = 0; i <= keys.length; i++) {
		if (
			volforce >= goodTier.subclasses[keys[i]].volforcemin &&
			volforce <= goodTier.subclasses[keys[i]].volforcemax
		) {
			goodDivision = goodTier.subclasses[keys[i]];
			break;
		}
	}

	return { tier: goodTier.name, division: goodDivision.number };
}
console.log(getClass(rawVolforce));

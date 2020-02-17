const jimp = require('jimp');
const classes = require('./classes.js');
const texturesPath = './tex/';
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

function makeImage(tier, division, volforce) {
	volUnits = parseInt(volforce.toString().split('.')[0]);
	volDecimals = parseInt(volforce.toString().split('.')[1]);
	jimp
		.read(texturesPath + tier + division + '.png')
		.then((image) => {
			loadedImage = image;
			return jimp.loadFont('./font/digital.fnt');
		})
		.then((font) => {
			let unitX;
			if (volUnits < 10) {
				unitX = 38;
			} else if (volUnits >= 10 && volUnits < 20) {
				unitX = 32;
			} else if (volUnits >= 20) {
				unitX = 24;
			}
			if (volDecimals < 10) {
				volDecimals = '0' + volDecimals.toString();
			}
			loadedImage.print(font, unitX, 80, volUnits).print(font, 57, 80, volDecimals).write('output.png');
			console.log("Saved image to output.png")
})
		.catch((error) => {
			throw error;
		});
}

const options = getClass(rawVolforce);
makeImage(options.tier, options.division, rawVolforce);

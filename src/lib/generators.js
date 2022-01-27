import hexToHSL from "./hexConvert";

export function generateStartColor() {
	let randomBit = (Math.random() * 0xfffff * 1000000).toString(16);
	let hex = `#${randomBit.slice(0, 6)}`;
	return { hsl: hexToHSL(hex), hex };
}

export function generateColorList() {
	let tempArray = [];
	for (var i = 0; i < 5; i++) {
		const colorObject = generateStartColor();
		tempArray.push(colorObject.hex);
	}
	return tempArray;
}

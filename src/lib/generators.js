import hexToHSL from "./hexConvert";

export function generateStartColor() {
	let randomBit = (Math.random() * 0xfffff * 1000000).toString(16);
	let hex = `#${randomBit.slice(0, 6)}`;
	return { hsv: hexToHSL(hex), hex };
}

export function generateColorList(oldColorList) {
	const totalCount = oldColorList.length;
	let tempArray = [];
	const colorCount = totalCount > 0 ? totalCount : 5;
	for (var i = 0; i < colorCount; i++) {
		const colorObject = generateStartColor();
		tempArray.push({ color: colorObject.hex, isLocked: false });
	}
	return tempArray;
}

export function generateNewList(oldColorList) {
	const totalCount = oldColorList.length;
	let tempArray = [...oldColorList];

	const colorCount = totalCount > 0 ? totalCount : 5;
	for (var i = 0; i < colorCount; i++) {
		const colorObject = generateStartColor();
		if (!tempArray[i].isLocked) {
			tempArray[i] = { color: colorObject.hex, isLocked: false };
		}
	}

	return tempArray;
}

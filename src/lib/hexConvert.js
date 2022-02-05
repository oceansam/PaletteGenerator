// https://css-tricks.com/converting-color-spaces-in-javascript/
function hexToHSL(H) {
	// Convert hex to RGB first
	let r = 0,
		g = 0,
		b = 0;
	if (H.length === 4) {
		r = "0x" + H[1] + H[1];
		g = "0x" + H[2] + H[2];
		b = "0x" + H[3] + H[3];
	} else if (H.length === 7) {
		r = "0x" + H[1] + H[2];
		g = "0x" + H[3] + H[4];
		b = "0x" + H[5] + H[6];
	}
	let v = Math.max(r, g, b),
		c = v - Math.min(r, g, b);
	let h =
		c && (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);
	return { h: 60 * (h < 0 ? h + 6 : h), s: (v && c / v) * 100, v };
}

export default hexToHSL;

import "./styles/App.scss";
import ColorCell from "./components/ColorCell";
import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import hexToHsl from "./lib/hexConvert";

function App() {
	const [color, setColor] = useState("");
	const [colorList, setColorList] = useState(["C76D7E", "9F8082", "AD9B9A"]);

	function genStartColor() {
		let randomBit = (Math.random() * 0xfffff * 1000000).toString(16);
		let hex = `#${randomBit.slice(0, 6)}`;
		return { hsl: hexToHsl(hex), hex };
	}
	useEffect(() => {
		let tempArray = [];
		for (var i = 0; i < 5; i++) {
			const colorObject = genStartColor();
			tempArray.push(colorObject.hex);
		}
		setColorList(tempArray);
	}, []);

	function addColor() {
		setColorList(colorList.concat(genStartColor().hex));
	}

	return (
		<div className="color-container">
			{colorList.map((color, i) => (
				<ColorCell name={color} key={i} />
			))}
			<IconButton onClick={addColor} size="large" color="primary">
				<Add />
			</IconButton>
		</div>
	);
}

export default App;

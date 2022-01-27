import "./styles/App.scss";
import ColorCell from "./components/ColorCell";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Icon from "@mui/material/Icon";
import { generateColorList, generateStartColor } from "./lib/generators";
import { animated, useTransition } from "react-spring";

function App() {
	const [colorList, setColorList] = useState([]);
	const [title, setTitle] = useState("");
	useEffect(() => {
		getNewColorList();
	}, []);

	// Color List Methods
	function getNewColorList() {
		setColorList(generateColorList());
	}
	function addColor() {
		setColorList(colorList.concat(generateStartColor().hex));
	}
	function popColor() {
		console.log("trigger");
		const newList = colorList.filter((color, i) => i != colorList.length);
		newList.pop();
		setColorList(newList);
	}

	// Transition Header
	const transitions = useTransition(title, {
		from: {
			transform: "rotateX(0deg)",
			color: "#ff7a90",
		},
		enter: [
			{ transform: "rotateX(180deg)", color: "#ff7a90" },
			{ transform: "rotateX(0deg)" },
		],
	});

	useEffect(() => {
		if (title.length === 0) {
			setTimeout(() => {
				setTitle("Palette");
			});
		}
	}, [title]);
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div style={{ display: "flex" }} className="header">
					{transitions(({ innerHeight, ...rest }, item) => (
						<animated.div style={rest} className="transitionsItem">
							<animated.div style={{ overflow: "hidden", height: innerHeight }}>
								{item}
							</animated.div>
						</animated.div>
					))}
					<span style={{ color: "white" }}> Generator</span>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Button onClick={popColor}>
					<Icon>remove</Icon>
				</Button>
				<Button variant="outlined" onClick={getNewColorList}>
					<Icon>shuffle</Icon>
				</Button>
				<Button onClick={addColor}>
					<Icon>add</Icon>
				</Button>
			</div>
			<div className="color-container">
				{colorList.length}
				{colorList.map((color, i) => (
					<>
						<ColorCell name={color} key={i} />
					</>
				))}
			</div>
		</>
	);
}

export default App;

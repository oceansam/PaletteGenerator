// Styles
import "./styles/App.scss";
// Library
import { useEffect, useState } from "react";
import { Button, Snackbar } from "@mui/material";
import Icon from "@mui/material/Icon";
import {
	generateColorList,
	generateStartColor,
	generateNewList,
} from "./lib/generators";
import { animated, useTransition } from "react-spring";
// Component(s)
import ColorCell from "./components/ColorCell";

function App() {
	const [colorList, setColorList] = useState([]);
	// Strictly stylistic usage
	const [title, setTitle] = useState("");
	const [notify, setNotify] = useState(null);
	// Used to track interval id
	const [resetID, setRestID] = useState(null);
	useEffect(() => {
		setColorList(generateColorList(colorList));
	}, []);

	// Color List Methods
	function getNewColorList() {
		setColorList(generateNewList(colorList));
	}
	function addColor() {
		setColorList(
			colorList.concat({ color: generateStartColor().hex, isLocked: false })
		);
	}
	function popColor() {
		const newList = colorList.filter((_, i) => i !== colorList.length);
		newList.pop();
		setColorList(newList);
	}
	function findColorIndex(colorName) {
		return colorList.findIndex((circle) => circle.color === colorName);
	}
	function lockColor(currentColor) {
		let tempArray = [...colorList];
		const lockIndex = findColorIndex(currentColor);
		// Prevents weird interaction with clicking on the text of the color ( better to validate anyways )
		if (lockIndex != -1) {
			tempArray[lockIndex].isLocked = !tempArray[lockIndex].isLocked;
			setColorList(tempArray);
		}
	}
	function removeColor(currentColor) {
		let tempArray = [...colorList];
		const closeIndex = findColorIndex(currentColor);
		tempArray.splice(closeIndex, 1);
		setColorList(tempArray);
	}

	function copyColor(currentColor) {
		clearInterval(resetID);
		navigator.clipboard.writeText(currentColor);
		setNotify(currentColor);
		var notiTimer = setInterval(() => {
			console.log("triggered");
			setNotify(null);
		}, [5000]);
		// Track set interval ID to clear previous interval if user presses different colors quickly
		setRestID(notiTimer);
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
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				key={`top,center`}
				open={!!notify}
				ContentProps={{
					style: {
						background: notify,
					},
				}}
				message="Color copied to clipboard!"
			/>
			<div className="flex-center">
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
			<div className="flex-center m-bot">
				<span style={{ color: "white" }}>Made by&nbsp;</span>{" "}
				<a style={{ color: "#ff7a90" }} href="https://github.com/oceansam">
					oceansam
				</a>
			</div>
			<div className="flex-center">
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
				{colorList.map((circle, i) => (
					<>
						<ColorCell
							name={circle.color}
							isLocked={circle.isLocked}
							lockCurrentColor={lockColor}
							removeCurrentColor={removeColor}
							copyCurrentColor={copyColor}
							key={i}
						/>
					</>
				))}
			</div>
		</>
	);
}

export default App;

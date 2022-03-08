// Styles
import "../styles/ColorCell.scss";
// Library
import { useState } from "react";
import Icon from "@mui/material/Icon";
// Component(s)
import OptionMenu from "./OptionMenu";

function ColorCell({
	name,
	lockCurrentColor,
	removeCurrentColor,
	isLocked,
	copyCurrentColor,
}) {
	const [isVisible, setOptionsVisibility] = useState(false);
	function copyColor() {
		copyCurrentColor(name);
	}
	function lockColor() {
		lockCurrentColor(name);
	}
	function removeColor() {
		removeCurrentColor(name);
	}
	return (
		<>
			<div
				style={{
					position: "relative",
					width: "100%",
					height: "30%",
				}}
			>
				<div
					className="action-color-container"
					onMouseEnter={() => setOptionsVisibility(true)}
					onMouseLeave={() => setOptionsVisibility(false)}
				>
					<OptionMenu
						showMenu={isVisible}
						updateColorLock={lockColor}
						updateColorClose={removeColor}
						isLocked={isLocked}
					/>
					<svg viewBox="0 0 25 20">
						<circle
							className="color-circle"
							cx="12"
							cy="10"
							r="8"
							fill={`${name}`}
							stroke="black"
							strokeWidth="0.2"
							onClick={copyColor}
						/>
						<text
							x="48%"
							y="45%"
							textAnchor="middle"
							fill="white"
							fontSize="2px"
							fontFamily="Arial"
							dy=".3em"
							onClick={lockCurrentColor}
						>
							{name}
						</text>
						<text
							x="40%"
							y="90%"
							textAnchor="middle"
							fill="black"
							fontSize="2px"
							fontFamily="Arial"
							dy=".3em"
						></text>
					</svg>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Icon className="icon-white">{isLocked ? "lock" : ""}</Icon>
					</div>
				</div>
			</div>
		</>
	);
}

export default ColorCell;

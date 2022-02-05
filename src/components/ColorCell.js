import "../styles/ColorCell.scss";

import { useState } from "react";
import Icon from "@mui/material/Icon";
// Components
import OptionMenu from "./OptionMenu";

function ColorCell({ name, lockCurrentColor, isLocked }) {
	const [isVisible, setOptionsVisibility] = useState(false);
	function handleCopy() {
		navigator.clipboard.writeText(name);
	}

	function lockColor() {
		lockCurrentColor(name);
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
							onClick={handleCopy}
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

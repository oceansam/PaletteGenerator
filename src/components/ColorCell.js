import "../styles/ColorCell.scss";
import { Button } from "@mui/material";
import { animated, useTrail } from "react-spring";
import { useState } from "react";
import Icon from "@mui/material/Icon";

function OptionMenu(Visible) {
	const icons = ["lock", "remove", "add", "close"];

	const trail = useTrail(icons.length, {
		config: { mass: 5, tension: 2000, friction: 200 },
		opacity: Visible.canShow ? 1 : 0,
		x: Visible.canShow ? 0 : 20,
		width: Visible.canShow ? 110 : 0,
		from: { opacity: 0, x: 20, height: 0 },
	});
	if (Visible.canShow) {
		return (
			<animated.div
				style={{
					position: "relative",
					display: "flex",
					justifyContent: "center",
					height: "30px",
					marginTop: "15px",
					alignItems: "center",
				}}
			>
				{trail.map(({ width, ...style }, index) => (
					<animated.div key={index} style={style}>
						<Button>
							<Icon className="icon" sx={{ fontSize: 30 }} style={{ width }}>
								{icons[index]}
							</Icon>
						</Button>
					</animated.div>
				))}
			</animated.div>
		);
	}
	return <div style={{ height: "30px", marginTop: "15px" }}></div>;
}
function ColorCell({ name }) {
	const [isVisible, setOptionsVisibility] = useState(false);

	function handleCopy() {
		console.log("COPY-TEXT:", name);
		navigator.clipboard.writeText(name);
	}
	function changeShade() {
		console.log(changeShade);
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
					<OptionMenu canShow={isVisible} />
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
				</div>
			</div>
		</>
	);
}

export default ColorCell;

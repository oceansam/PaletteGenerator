import { Button } from "@mui/material";
import { animated, useTrail } from "react-spring";
import Icon from "@mui/material/Icon";

function OptionMenu({ showMenu, updateColorLock, isLocked }) {
	const icons = ["lock", "remove", "add", "close"];
	const trail = useTrail(icons.length, {
		config: { mass: 5, tension: 2000, friction: 200 },
		opacity: showMenu ? 1 : 0,
		x: showMenu ? 0 : 20,
		width: showMenu ? 110 : 0,
		from: { opacity: 0, x: 20, height: 0 },
	});

	function handleClick(index_icon) {
		if (icons[index_icon] === "lock") {
			updateColorLock();
		} else if (icons[index_icon] === "close") {
			console.log("close");
		}
	}
	if (showMenu) {
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
							<Icon
								className="icon"
								sx={{ fontSize: 30 }}
								style={{ width }}
								onClick={() => {
									handleClick(index);
								}}
							>
								{icons[index] === "lock"
									? isLocked
										? "lock"
										: "lockopen"
									: icons[index]}
							</Icon>
						</Button>
					</animated.div>
				))}
			</animated.div>
		);
	}
	return <div style={{ height: "30px", marginTop: "15px" }}></div>;
}
export default OptionMenu;

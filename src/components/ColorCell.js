import "../styles/ColorCell.scss";
import { ContentCopy } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function copyCell() {
	return <ContentCopy fontSize="large" />;
}
// function copyNotification() {
// 	<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
// 		<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
// 			This is a success message!
// 		</Alert>
// 	</Snackbar>;
// }
function ColorCell({ name }) {
	function handleCopy() {
		console.log("COPY-TEXT:", name);
		navigator.clipboard.writeText(name);
	}
	return (
		<>
			<svg viewBox="0 0 25 35">
				<circle
					className="color-circle"
					cx="15"
					cy="17"
					r="8"
					fill={`${name}`}
					stroke="black"
					strokeWidth="0.2"
					onClick={handleCopy}
				/>
				<text
					x="60%"
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
		</>
	);
}

export default ColorCell;

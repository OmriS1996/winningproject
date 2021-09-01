import Letter from "./Letter";
import "./Word.css";

const Word = ({ word }) => {
	console.log(word);
	const letterArray = word.split("");
	return (
		<div className="word-container">
			{letterArray.map((ele) => {
				return <Letter letter={ele}></Letter>;
			})}
		</div>
	);
};

export default Word;

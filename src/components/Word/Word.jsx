import Letter from "./Letter";
import "./Word.css";

const Word = ({ word, missingLetterIndex }) => {
	const letterArray = word.split("");
	letterArray[missingLetterIndex] = "_";
	return (
		<div className="word-container">
			{letterArray.map((ele, i) => {
				return <Letter key={i} letter={ele}></Letter>;
			})}
		</div>
	);
};

export default Word;

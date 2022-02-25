import './Card.css';

const Card = ({ card, flipped, handleChoice }) => {
    // const [disabled, setDisabled] = useState(false);
    const classes = 'relative w-full h-40 cursor-pointer card';

    function handleClick() {
        if (!flipped) {
            // setDisabled(true);
            handleChoice(card);
        }
    }

    return (
        <div onClick={handleClick} className={flipped ? ('flipped ' + classes) : (classes)}>
            <div className="border-2 border-white h-full w-full bg-white rounded-xl flex back flex-col items-center justify-center shadow-lg">
                <img src='/images/back.svg' alt={card.name} className="h-24 m-auto" />
            </div>
            <div className="border-2 border-white h-full w-full bg-white rounded-xl absolute front top-0 flex flex-col items-center justify-center shadow-lg">
                <img src={card.src} alt={card.name} className="h-24 m-auto" />
            </div>
        </div>
    );
}
 
export default Card;
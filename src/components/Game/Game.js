import { Card } from "..";
import { useState, useEffect } from "react";

const fruits = [
    {
        name: 'Mango',
        src: '/images/mango.svg'
    },
    {
        name: 'Strawberry',
        src: '/images/strawberry.svg'
    },
    {
        name: 'Lemon',
        src: '/images/lemon.svg'
    },
    {
        name: 'Orange',
        src: '/images/orange.svg'
    },
    {
        name: 'Pomegranate',
        src: '/images/pomegranate.svg'
    },
    {
        name: 'Watermelon',
        src: '/images/watermelon.svg'
    },
]

const Grid = () => {
    const [cards, setCards] = useState([]);
    const [firstChoice, setFirstChoice] = useState(null);
    const [secondChoice, setSecondChoice] = useState(null);
    const [disabled, setDisabled] = useState(false);

    function setup() {
        const tempCards = [...fruits, ...fruits]
        .sort(() => Math.random() - 0.5)
        .map((item) => (
            {
                id: Math.random(),
                ...item,
                matched: false,
            }
        ));

        setCards(tempCards);
    }

    function handleChoice(card) {
        if(!disabled) {
            firstChoice ? setSecondChoice(card) : setFirstChoice(card)
        }
    }

    useEffect(() => {
        setup();
    }, []);

    useEffect(() => {
      if(firstChoice && secondChoice) {
        setDisabled(true);
        if (firstChoice.name === secondChoice.name) {
            setCards(prevCards => {
                return prevCards.map((card) => {
                    if (card.name === firstChoice.name) {
                        return {...card, matched: true}
                    } else {
                        return card;
                    }
                });
            });
            reset();
        } else {
            setTimeout(() => {
                reset();
            }, 1000);
        }
      }
    }, [firstChoice, secondChoice])
    
    function reset() {
        setFirstChoice(null);
        setSecondChoice(null);
        setDisabled(false);
    }

    function handleClick() {
        reset();
        setup();
    }
    
    return (
        <div className="container mx-auto">
        <div className="flex justify-between mb-10 flex-row items-center">
          <h1 className="text-white drop-shadow-lg font-bold text-3xl text-center">Fruit Memory Game</h1>
          <button onClick={handleClick} className="bg-white rounded-full shadow-lg text-black px-8 py-1 hover:bg-blue-400 hover:text-white transition duration-300">Reset</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            { cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    flipped={card === firstChoice || card === secondChoice || card.matched}
                    handleChoice={handleChoice}
                />
            )) }
        </div>
      </div>
    );
}
 
export default Grid;
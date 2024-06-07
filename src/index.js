import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const generateNumber = () => {
    let digits = new Set();
    while (digits.size < 4) {
        digits.add(Math.floor(Math.random() * 10));
    }
    return Array.from(digits).join('');
};

const calculateBullsAndCows = (guess, secret) => {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }
    return { bulls, cows };
};

const App = () => {
    const [secret, setSecret] = useState(generateNumber());
    const [guess, setGuess] = useState('');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');

    const handleGuess = () => {
        if (guess.length !== 4 || new Set(guess).size !== 4) {
            setMessage('Введите корректное число из 4 уникальных цифр.');
            return;
        }

        const { bulls, cows } = calculateBullsAndCows(guess, secret);
        setResults([...results, { guess, bulls, cows }]);
        setGuess('');

        if (bulls === 4) {
            setMessage('Поздравляем! Вы угадали число!');
        } else {
            setMessage('');
        }
    };

    const handleRestart = () => {
        setSecret(generateNumber());
        setGuess('');
        setResults([]);
        setMessage('');
    };

    return (
        <div className="container">
            <h1>Быки и Коровы</h1>
            <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                maxLength="4"
                placeholder="Введите число"
            />
            <button onClick={handleGuess}>Проверить</button>
            <button onClick={handleRestart}>Начать заново</button>
            {message && <p>{message}</p>}
            <div className="results">
                {results.map((result, index) => (
                    <div key={index} className="result">
                        <p>Число: {result.guess}</p>
                        <p>Быки: {result.bulls}, Коровы: {result.cows}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

import type { FocusEvent, KeyboardEvent } from 'react';
import type { QuizAnswers, TranslitData } from '@/types';
import React, { useEffect, useState } from 'react';
import { Button, SpeechBubble, Container, Card, Header, List, ListItem } from '@/components';
import { getRandomNumber } from '@/utils';
import StyledQuizCardsPage from './quiz-cards.styles';

type Props = {
  onSubmit: (answers: QuizAnswers) => void;
  onClickHome: () => void;
  translitData: TranslitData;
};

const QuizCardsPage: React.FC<Props> = ({
  onSubmit,
  onClickHome,
  translitData
}) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [enableAutoscroll, setEnableAutoscroll] = useState(false);
  const [randomizedAlphabet, setRandomizedAlphabet] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<QuizAnswers['correct']>({});
  const [incorrectAnswers, setIncorrectAnswers] = useState<QuizAnswers['incorrect']>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
    window.scrollTo(0, 0);
  }, []);

  if (isHydrated && !randomizedAlphabet.length) {
    setRandomizedAlphabet([...Object.keys(translitData)].sort(getRandomNumber));
  }

  const proceedToNextCard = (letter: string, isCorrect: boolean) => {
    const currentIndex = randomizedAlphabet.indexOf(letter);
    const nextItemIndex = randomizedAlphabet
      .slice(currentIndex)
      .findIndex((searchLetter) => {
        return searchLetter === letter ? !isCorrect : !correctAnswers[searchLetter];
      });

    if (nextItemIndex !== -1) {
      setActiveIndex(currentIndex + nextItemIndex);
      return;
    }
    
    const remainingItemIndex = randomizedAlphabet
      .findIndex((searchLetter, i) => i < currentIndex && !correctAnswers[searchLetter]);

    if (remainingItemIndex !== -1) {
      setActiveIndex(remainingItemIndex);
      return;
    }
  };

  const validateAnswer = (
    event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
    letter: string
  ) => {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    const value = event.target.value.toLowerCase().trim();
    if (!value) {
      return;
    }
    
    const lowercaseTranslit = translitData[letter].map((t) => t.toLowerCase());
    const isCorrect = lowercaseTranslit.includes(value);

    if (isCorrect) {
      const updatedAnswers = { ...correctAnswers, [letter]: isCorrect };
      setCorrectAnswers(updatedAnswers);
      
      const isDone = Object.values(updatedAnswers).filter(isCorrect => isCorrect).length
        === randomizedAlphabet.length;
      if (isDone) {
        onSubmit({ correct: updatedAnswers, incorrect: incorrectAnswers });
        return;
      }
    } else {
      setIncorrectAnswers({
        ...incorrectAnswers,
        [letter]: (incorrectAnswers[letter] ?? 0) + 1
      });
    }

    proceedToNextCard(letter, isCorrect);
  };

  const confirmFinishQuiz = () => {
    const correctAnswerCount = randomizedAlphabet
      .filter(letter => correctAnswers[letter])
      .length;
    const hasIncompleteAnswers = correctAnswerCount !== randomizedAlphabet.length;
    const shouldSubmit = !hasIncompleteAnswers || (hasIncompleteAnswers && window.confirm(
      'You still have a few cards that need work. Are you sure you want to finish the quiz now?'
    ));

    if (shouldSubmit) {
      onSubmit({ correct: correctAnswers, incorrect: incorrectAnswers });
    }
  };

  return (
    <StyledQuizCardsPage>
      
      <Container flexDirection='column' pb='2rem'>
        <Header>{`Type transliterations for the letters you know`}</Header>
        <SpeechBubble tailPosition='up' mt='1rem'>
          <List>
            <ListItem>
              {`Press ENTER, or click away from the card, to submit your answer`}
            </ListItem>
            <ListItem>
              {`Repeat for as many cards as you can`}
            </ListItem>
            <ListItem>
              {`You can try as many times as you want`}
            </ListItem>
            <ListItem>
              {`When you're done press the "Finish quiz" button at the bottom`}
            </ListItem>
          </List>
        </SpeechBubble>
      </Container>

      <Container pb='2rem'>
        {randomizedAlphabet.map((letter, index) => (
          <Card
            key={letter}
            text={letter}
            onAnswer={validateAnswer}
            onSelect={() => setActiveIndex(index)}
            onDeselect={index === 0 ? () => setEnableAutoscroll(true) : () => null}
            isActive={index === activeIndex}
            isCorrect={correctAnswers[letter] === true}
            isWrong={correctAnswers[letter] === false}
            enableAutoscroll={enableAutoscroll}
          />
        ))}
      </Container>
      
      <Container>
        <Button onClick={onClickHome}>Home</Button>
        <Button onClick={confirmFinishQuiz}>Finish quiz</Button>
      </Container>

    </StyledQuizCardsPage>
  )
};

export default QuizCardsPage;

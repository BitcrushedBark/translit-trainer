import type { FocusEvent, KeyboardEvent } from 'react';
import type { QuizAnswers, TranslitData } from '@/types';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Button, SpeechBubble, Container, Card, Header, List, ListItem, Text } from '@/components';
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
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const [cardInputValues, setCardInputValues] = useState<(string | null)[]>([]);
  const [cardPrevInputValues, setCardPrevInputValues] = useState<(string | null)[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [flippingCards, setFlippingCards] = useState<boolean[]>([]);

  const correctAnswerCount = useMemo(() => randomizedAlphabet
    .filter(letter => correctAnswers[letter])
    .length, [randomizedAlphabet, correctAnswers]);
  const hasIncompleteAnswers = useMemo(
    () => correctAnswerCount !== randomizedAlphabet.length,
    [randomizedAlphabet, correctAnswerCount]);

  useEffect(() => {
    setIsHydrated(true);
    window.scrollTo(0, 0);
  }, []);

  if (isHydrated && !randomizedAlphabet.length) {
    setRandomizedAlphabet([...Object.keys(translitData)].sort(getRandomNumber));
  }

  const restartQuiz = useCallback(() => {
    setRandomizedAlphabet([...Object.keys(translitData)].sort(getRandomNumber));
    setActiveIndex(0);
    setEnableAutoscroll(false);
    setIsQuizFinished(false);
    setCorrectAnswers({});
    setIncorrectAnswers({});
    setCardInputValues([]);
    setCardPrevInputValues([]);
    setFlippedCards([]);
    setFlippingCards([]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, [translitData]);

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

  const confirmFinishQuiz = useCallback(() => {
    const shouldSubmit = !hasIncompleteAnswers || (hasIncompleteAnswers && window.confirm(
      `You still have a few cards that need work. Are you sure you want to finish the quiz now?`
    ));

    if (shouldSubmit) {
      setIsQuizFinished(true);
      window.scrollTo(0, 0);
    }
  }, [hasIncompleteAnswers]);

  useEffect(() => {
    if (randomizedAlphabet.length && randomizedAlphabet.length === correctAnswerCount) {
      confetti({ disableForReducedMotion: true });
      confirmFinishQuiz();
    }
  }, [randomizedAlphabet, correctAnswerCount, confirmFinishQuiz]);

  const confirmGoHome = useCallback(() => {
    const shouldGoHome = isQuizFinished || (hasIncompleteAnswers && window.confirm(
      `You still have a few cards that need work. Are you sure you want to go back?`
    ));

    if (shouldGoHome) {
      onClickHome();
    }
  }, [hasIncompleteAnswers, isQuizFinished, onClickHome]);

  return (
    <StyledQuizCardsPage>
      
      {!isQuizFinished ? <Container flexDirection='column' pb='2rem'>
        <Header>{`Type transliterations for the letters you know`}</Header>
        <SpeechBubble tailPosition='up' mt='1rem'>
          <List>
            <ListItem>
              {`Press Enter, Tab, or click away to submit your answer`}
            </ListItem>
            <ListItem>
              {`Repeat for as many cards as you can`}
            </ListItem>
            <ListItem>
              {`You can try as many times as you want`}
            </ListItem>
            <ListItem>
              {`When you're done, press the "Finish quiz" button at the bottom`}
            </ListItem>
          </List>
        </SpeechBubble>
      </Container> : null}

      {isQuizFinished ? <Container flexDirection='column'>
        <Header>View Your Results</Header>
        <SpeechBubble tailPosition='up' mb='1rem'>
          <Container alignItems='center' justifyContent='center' width='100%'>
            <Text fontSize='1.2rem' mb='1rem'>
              {`Overall Correct: ${correctAnswerCount}/${randomizedAlphabet.length} (${
                (correctAnswerCount * 100 / randomizedAlphabet.length).toFixed(2)
              }%)`} 
            </Text>
          </Container>
          <List>
            <ListItem>
              {`You can flip each card to see the correct answer`}
            </ListItem>
          </List>
        </SpeechBubble>
      </Container> : null}

      <Container pb='2rem'>
        {randomizedAlphabet.map((letter, index) => (
          <Card
            key={letter}
            text={letter}
            attempts={incorrectAnswers[letter]}
            onAnswer={validateAnswer}
            onSelect={() => setActiveIndex(index)}
            onDeselect={index === 0 ? () => setEnableAutoscroll(true) : () => null}
            isActive={!isQuizFinished && index === activeIndex}
            isCorrect={correctAnswers[letter] === true}
            isWrong={isQuizFinished && !correctAnswers[letter]}
            isDisabled={isQuizFinished}
            cardBackText={translitData[letter].join(', ')}
            enableAutoscroll={enableAutoscroll}
            inputValue={cardInputValues[index]}
            setInputValue={(value) => {
              const updatedValues = [...cardInputValues];
              updatedValues[index] = value;
              setCardInputValues(updatedValues);
            }}
            prevInputValue={cardPrevInputValues[index]}
            setPrevInputValue={(value) => {
              const updatedValues = [...cardPrevInputValues];
              updatedValues[index] = value;
              setCardPrevInputValues(updatedValues);
            }}
            isShowingBack={flippedCards[index]}
            setIsShowingBack={(value) => {
              const updatedValues = [...flippedCards];
              updatedValues[index] = value;
              setFlippedCards(updatedValues);
            }}
            isFlipping={flippingCards[index]}
            setIsFlipping={(value) => {
              const updatedValues = [...flippingCards];
              updatedValues[index] = value;
              setFlippingCards(updatedValues);
            }}
          />
        ))}
      </Container>
      
      <Container rowGap='1rem'>
        <Button onClick={confirmGoHome}>Home</Button>
        {
          isQuizFinished ? 
          <Button onClick={restartQuiz}>Restart</Button> : 
          <Button onClick={confirmFinishQuiz}>Finish quiz</Button>
        }
      </Container>

    </StyledQuizCardsPage>
  )
};

export default QuizCardsPage;

import React, { useEffect } from 'react';
import type { QuizAnswers, TranslitData } from '@/types';
import {
  Button,
  Container,
  SpeechBubble,
  Header,
  Table,
  THead,
  TBody,
  TRow,
  TH,
  TD,
} from '@/components';
import * as S from './quiz-results.styles';

type Props = {
  onClickHome: () => void;
  onClickQuizAgain: () => void;
  translitData: TranslitData;
  answers: QuizAnswers;
};

const createResultTables = (alphabet: string[], answers: QuizAnswers) => {
  const tables = [];
  const maxColumns = 8;

  for (let i = 0; i < alphabet.length; i += maxColumns) {
    const tableHeaders = alphabet
      .slice(i, i + maxColumns)
      .map(letter => <TH key={letter}>{letter}</TH>);
    
    const tableRows = alphabet.slice(i, i + maxColumns).map(letter => {
      const incorrectCount = answers.incorrect[letter];
      const isCorrect = answers.correct[letter];
      const isNA = incorrectCount === undefined && isCorrect === undefined;

      return <TD key={letter}>{
        isNA ? '✘: N/A' : ''
      }{
        incorrectCount ? `✘: ${incorrectCount}` : ''
      }{
        !incorrectCount && isCorrect ? '✓' : ''
      }</TD>
    });
    
    const table = (
      <Table key={i}>
        <THead><TRow>{tableHeaders}</TRow></THead>
        <TBody><TRow>{tableRows}</TRow></TBody>
      </Table>
    );

    tables.push(table);
  }

  return tables;
}

const QuizResultsPage: React.FC<Props> = ({
  onClickHome,
  onClickQuizAgain,
  translitData,
  answers
}) => {
  const alphabet = Object.keys(translitData);
  const correctCount = Object.values(answers.correct).filter(isCorrect => isCorrect).length;
  const totalCount = alphabet.length;
  const correctPercentage = (correctCount * 100 / totalCount).toFixed(2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <S.QuizResultsPage>

        <Container flexDirection='column'>
          <Header>View Your Results</Header>
          <SpeechBubble tailPosition='up' mb='1rem'>
            {`Overall Correct: ${correctCount}/${totalCount} (${correctPercentage}%)`}
          </SpeechBubble>
        </Container>

        <Container flexDirection='column'>
          {createResultTables(alphabet, answers)}
        </Container>

        <Container>
          <Button onClick={onClickHome}>Home</Button>
          <Button onClick={onClickQuizAgain}>Quiz again</Button>
        </Container>

    </S.QuizResultsPage>
  )
};

export default QuizResultsPage;

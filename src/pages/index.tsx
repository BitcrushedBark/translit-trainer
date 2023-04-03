import type { QuizAnswers, TranslitData } from '@/types';
import { useState } from 'react';
import Head from 'next/head';
import { robotoCondensed } from '@/utils';
import * as S from './home.styles';
import IntroPage from './intro';
import QuizCardsPage from './quiz-cards';
import QuizResultsPage from './quiz-results';
import { Footer } from '@/components';

export default function Home() {
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [translitData, setTranslitData] = useState<TranslitData>();

  const resetAll = () => {
    setQuizAnswers(null);
    setIsQuizStarted(false);
  };

  const resetQuizResults = () => {
    setQuizAnswers(null);
  };

  return (
    <>
      <Head>
        <title>Translit Trainer</title>
        <meta name="description" content="Translit Trainer is an application for studying alphabet letters and their transliterations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <S.Home className={robotoCondensed.className}>
        <S.HomeBorder>
          {
            !isQuizStarted ?
            <>
              <IntroPage
                onStartQuiz={() => setIsQuizStarted(true)}
                onTranslitDataChange={setTranslitData}
              />
              <Footer />
            </> :
            null
          }
          {
            isQuizStarted && !quizAnswers && translitData ? 
              <QuizCardsPage
                onSubmit={setQuizAnswers}
                onClickHome={resetAll}
                translitData={translitData}
              /> : 
              null
          }
          {
            isQuizStarted && quizAnswers && translitData ?
              <QuizResultsPage
                translitData={translitData}
                answers={quizAnswers}
                onClickHome={resetAll}
                onClickQuizAgain={resetQuizResults}
              /> :
              null
          }
        </S.HomeBorder>
      </S.Home>
    </>
  )
}

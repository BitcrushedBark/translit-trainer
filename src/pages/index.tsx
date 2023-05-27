import type { TranslitData } from '@/types';
import { useState } from 'react';
import Head from 'next/head';
import { robotoCondensed } from '@/utils';
import IntroPage from './intro';
import QuizCardsPage from './quiz-cards';
import { Footer } from '@/components';
import StyledHome from './home.styles';
import StyledHomeBorder from './home-border.styles';

export default function Home() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [translitData, setTranslitData] = useState<TranslitData | null>(null);

  const resetAll = () => {
    setIsQuizStarted(false);
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

      <StyledHome className={robotoCondensed.className}>
        <StyledHomeBorder>
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
            isQuizStarted && translitData ? 
              <QuizCardsPage
                onSubmit={() => null}
                onClickHome={resetAll}
                translitData={translitData}
              /> : 
              null
          }
        </StyledHomeBorder>
      </StyledHome>
    </>
  )
}

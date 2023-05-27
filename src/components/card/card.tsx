import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { GenericStyleProps } from '@/utils';
import React, { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { notoSansSymbols2 } from '@/utils';
import * as S from './card.styles';

type Props = {
  text: string;
  attempts?: number;
  onAnswer?: (
    event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
    text: string
  ) => void;
  onSelect?: () => void;
  onDeselect?: () => void;
  isActive?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  isDisabled?: boolean;
  enableAutoscroll?: boolean;
  cardBackText?: string;
  inputValue?: string | null;
  setInputValue: (value: string | null) => void;
  prevInputValue?: string | null;
  setPrevInputValue: (prevValue: string | null) => void;
  isShowingBack?: boolean;
  setIsShowingBack: (isShowingBack: boolean) => void;
  isFlipping?: boolean;
  setIsFlipping: (isFlipping: boolean) => void;
};

export const Card: React.FC<Props & GenericStyleProps> = ({
  text,
  attempts,
  onAnswer,
  onSelect,
  onDeselect,
  isActive,
  isCorrect,
  isWrong,
  isDisabled,
  cardBackText,
  enableAutoscroll,
  inputValue = null,
  setInputValue,
  prevInputValue = null,
  setPrevInputValue,
  isShowingBack = false,
  setIsShowingBack,
  isFlipping = false,
  setIsFlipping
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cardRef = useRef<HTMLFormElement | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = () => {
    scrollAnchorRef.current?.scrollIntoView(isMobile ? true :{
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  useEffect(() => {
    if (isActive && !isCorrect) {
      inputRef.current?.focus();
      if (enableAutoscroll) {
        setTimeout(() => scrollIntoView(), 0);
      }
    } else if (!isActive) {
      onDeselect?.();
    }
  }, [enableAutoscroll, isActive, isCorrect, onDeselect]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const submitAnswer: typeof onAnswer = (event, text) => {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    const { value } = event.target;
    if (!value) {
      return;
    }

    setPrevInputValue(value);
    onAnswer?.(event, text);
    setInputValue('');
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    const { value } = event.target;
    if (!value) {
      return;
    }

    setPrevInputValue(value);
    onAnswer?.(event, text);
    setInputValue('');
  };

  return (
    <S.CardWrapper
      isFlipping={isFlipping}
      isShowingBack={isShowingBack}
      onAnimationEnd={() => {
        setIsFlipping(false);
      }
    }>
      <S.Card
        key={text}
        ref={cardRef}
        onClick={onSelect}
        isActive={isActive && !isCorrect}
        isCorrect={isCorrect}
        hasIncorrectAttempts={Boolean(attempts && attempts > 0)}
        isWrong={isWrong}
        isMobile={isMobile}
        isDisabled={isDisabled}
      >
        <S.ScrollAnchor ref={scrollAnchorRef} isMobile={isMobile} />
        
        <S.CardText
          isDisabled={isDisabled}
          isFlipping={isFlipping}
          isPlaceholder={!cardBackText && isShowingBack}
          isShowingBack={isShowingBack}
          title={isShowingBack ? cardBackText || '(empty)' : text}
        >{
          isShowingBack ? (cardBackText ?? '∅') : text
        }</S.CardText>

        <S.CardAnswerCounter isShowingBack={isShowingBack} isFlipping={isFlipping}>{
          prevInputValue ? (attempts ? `${attempts > 1000 ? 'Many' : attempts}✘` : '✓') : ''
        }</S.CardAnswerCounter>

        {isShowingBack ? null :<S.CardInput
          type="text"
          value={isDisabled && !attempts && !isCorrect ? '—' : inputValue || ''}
          placeholder={prevInputValue || ''}
          ref={inputRef}
          disabled={isCorrect || isDisabled}
          onChange={handleInputChange}
          onFocus={onSelect}
          onBlur={(event) => submitAnswer(event, text)}
          onKeyDown={onInputKeyDown}
          isFlipping={isFlipping}
          isVisible={!isShowingBack}
        />}
      </S.Card>
      <S.CardRotateIcon
        className={notoSansSymbols2.className}
        isVisible={isDisabled}
        onClick={() => {
          setIsFlipping(true);
          setIsShowingBack(!isShowingBack);
        }}
      >⮯</S.CardRotateIcon>
    </S.CardWrapper>
  )
}

import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { GenericStyleProps } from '@/utils';
import React, { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as S from './card.styles';

type Props = {
  text: string;
  onAnswer?: (
    event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
    text: string
  ) => void;
  onSelect?: () => void;
  onDeselect?: () => void;
  isActive?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  enableAutoscroll?: boolean;
};

export const Card: React.FC<Props & GenericStyleProps> = ({
  text,
  onAnswer,
  onSelect,
  onDeselect,
  isActive,
  isCorrect,
  isWrong,
  enableAutoscroll
}) => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [prevInputValue, setPrevInputValue] = useState<string | null>(null);
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
        scrollIntoView();
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
    <S.Card
      key={text}
      ref={cardRef}
      onClick={onSelect}
      isActive={isActive && !isCorrect}
      isCorrect={isCorrect}
      isWrong={isWrong}
      isMobile={isMobile}
    >
      <S.ScrollAnchor ref={scrollAnchorRef} isMobile={isMobile} />
      <S.CardText>{text}</S.CardText>
      <S.CardInput
        type="text"
        value={inputValue || ''}
        placeholder={prevInputValue || ''}
        ref={inputRef}
        disabled={isCorrect}
        onChange={handleInputChange}
        onFocus={onSelect}
        onBlur={(event) => submitAnswer(event, text)}
        onKeyDown={onInputKeyDown}
      />
    </S.Card>
  )
}

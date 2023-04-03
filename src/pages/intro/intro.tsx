import type { ChangeEvent } from 'react';
import type { TranslitData } from '@/types';
import type { PresetName } from '@/data';
import React, { useEffect, useState } from 'react';
import {
  FileInput,
  Button,
  Container,
  SpeechBubble,
  Header,
  List,
  ListItem,
  Text,
  Select,
  JsonBlock
} from '@/components';
import StyledIntroPage from './intro.styles';
import { translitDataPresets } from '@/data';

type Props = {
  onStartQuiz: () => void;
  onTranslitDataChange: (data: TranslitData) => void;
};

const IntroPage: React.FC<Props> = ({
  onStartQuiz,
  onTranslitDataChange
}) => {
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<TranslitData | null>(null);
  const [presetName, setPresetName] = useState<PresetName | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data && onTranslitDataChange) {
      setFileErrorMessage(null);
      onTranslitDataChange(data);
    }
  }, [data, onTranslitDataChange]);

  useEffect(() => {
    setData(translitDataPresets[presetName as PresetName]);
  }, [presetName]);

  const onFileInputClick = () => {
    setPresetName(null);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setFileErrorMessage(null);
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content !== 'string') {
        setFileErrorMessage('The JSON file you provided is invalid!');
        return;
      }

      let jsonData: TranslitData;

      try {
        jsonData = JSON.parse(content);
      } catch (e) {
        setFileErrorMessage('The JSON file you provided is invalid!');
        return;
      }
      
      const hasInvalidValues = Object
        .values(jsonData)
        .some(translitValues => {
          return !Array.isArray(translitValues) ||
            translitValues.some(value => typeof value !== 'string')
        });
      
      if (hasInvalidValues) {
        setFileErrorMessage('Valid JSON must contain only an array of strings as value for each key!');
        return;
      }

      setData(jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <StyledIntroPage>

      <Container>
        <Header>Translit Trainer</Header>
      </Container>
      
      <Container flexDirection='column' mb='1rem'>
          <SpeechBubble mb='2rem'>
            <Text fontSize='1.2rem' mb='1rem'>
              Select a preset, or upload a custom JSON file containing the mapping of alphabet letters to their corresponding transliterations.
            </Text>
            <List>
              <ListItem>The keys in your JSON file must be of string type</ListItem>
              <ListItem>The values must be arrays containing strings</ListItem>
            </List>
          </SpeechBubble>
          
          <Container mb='2rem'>
            <Button onClick={onStartQuiz} disabled={!data}>Start quiz</Button>
          </Container>

          <Container flexDirection='column'>
            <Container flexDirection='column' mb='2rem'>
              <FileInput onChange={handleFileUpload} onClick={onFileInputClick} mt='0'>
                Use a custom file
              </FileInput>
              {
                fileErrorMessage ?
                  <SpeechBubble
                    bubbleStyle='error'
                    tailPosition='up'
                    mt='3rem'
                    mb='1rem'
                  >
                    <Text>{fileErrorMessage}</Text>
                  </SpeechBubble> :
                  null
              }
            </Container>

            <Container alignItems='center' mb='2rem'>
              <Text fontSize='1.5rem' mr='0.5rem'>{`or, select a preset:`}</Text>
              <Select
                placeholder={'Select a preset'}
                options={Object.keys(translitDataPresets).map((presetName) => {
                  return {
                    value: presetName,
                    label: presetName
                  }
                })}
                value={presetName}
                onChange={(name) => setPresetName(name as PresetName)}
              />
            </Container>

          </Container>

          <Container>
            <SpeechBubble bubbleStyle='code' tailPosition='up'>
              <Text>
                {presetName ?`${presetName}:` : ''}
                {!presetName && data ? 'Custom file:' : ''}
                {!presetName && !data ? 'This area displays a preview of the transliterated data' : ''}
              </Text>
              {data ? <JsonBlock json={data} mt='1rem' /> : null}
            </SpeechBubble>
          </Container>

        </Container>

    </StyledIntroPage>
  )
};

export default IntroPage;

import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { fontScaleNormalize, moderateScale } from '../../core/utils';
import { palette } from '../../core/styleGuide';
import { useCallback } from 'react/cjs/react.development';

const LanguageFilter = ({
  store: { languages, toggleSelectedLanguages, selectedLanguages },
}) => {
  return (
    <Container>
      <ScrollView horizontal={true}>
        {languages.map(title => (
          <Touchblable
            onPress={() => toggleSelectedLanguages(title)}
            isSelected={selectedLanguages.some(selected => selected === title)}>
            <Text>{title.toUpperCase()}</Text>
          </Touchblable>
        ))}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View``;

const ScrollView = styled.ScrollView``;

const Touchblable = styled.TouchableOpacity`
  margin: ${moderateScale(13)}px ${moderateScale(7)}px;
  padding: ${moderateScale(9)}px ${moderateScale(26)}px;
  border-radius: ${moderateScale(26)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isSelected }) =>
    isSelected ? palette.imperialRed : palette.goldWebGolden};
  font-weight: bold;
`;

const Text = styled.Text`
  line-height: ${fontScaleNormalize(13)}px;
  font-size: ${fontScaleNormalize(13)}px;
  color: ${palette.prussianBlue};
`;

export default compose(inject('store'), observer)(LanguageFilter);

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Linking } from 'react-native';

import { fontScaleNormalize, moderateScale } from '../../core/utils';
import ToggleFavorites from '../ToggleFavorites';
import { palette } from '../../core/styleGuide';

export const ProjectCards = ({
  project: {
    avatar_url,
    description,
    full_name,
    id,
    inFavorits,
    language,
    url,
    stargazers_count,
  },
  toggleFavorites,
}) => {
  const openUrl = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  const addToFavorites = useCallback(() => {
    toggleFavorites(id);
  }, [id, toggleFavorites]);

  return (
    <Container>
      <Row>
        <Column width={'20%'}>
          <Avatar
            source={{
              uri: avatar_url,
            }}
          />
        </Column>
        <Column width={'80%'}>
          <Title>{full_name}</Title>
          <URL onPress={openUrl}>
            <URLTEXT>{url}</URLTEXT>
          </URL>
        </Column>
      </Row>
      <Row style={{ marginTop: moderateScale(10) }}>
        <Column width={'90%'}>
          <Text>{description}</Text>
        </Column>
        <Column width={'10%'}>
          <Favorites onPress={addToFavorites}>
            <ToggleFavorites isFavorites={inFavorits} />
          </Favorites>
        </Column>
      </Row>
      <Row style={{ marginTop: moderateScale(10) }}>
        <Column width={'70%'} />
        <Column width={'30%'}>
          <StarsText>{stargazers_count}★</StarsText>
        </Column>
      </Row>
    </Container>
  );
};

const Container = styled.View`
  border-radius: ${moderateScale(30)}px;
  padding: ${moderateScale(15)}px;
  margin: ${moderateScale(9)}px;
  background-color: ${palette.aliceBlue};
  elevation: 5;
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: center;
  width: ${({ width = 'auto' }) => width};
`;

const Row = styled.View`
  flex-direction: row;
`;

const Favorites = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const URL = styled.TouchableOpacity``;
const URLTEXT = styled.Text`
  font-size: ${fontScaleNormalize(14)}px;
  color: ${palette.mikadoYellow};
  text-decoration: underline;
`;

const Title = styled.Text`
  font-size: ${fontScaleNormalize(15)}px;
  line-height: ${fontScaleNormalize(18)}px;
  color: ${palette.prussianBlue};
  margin-bottom: ${moderateScale(4)}px;
`;

const Text = styled.Text`
  font-size: ${fontScaleNormalize(13)}px;
  line-height: ${fontScaleNormalize(15)}px;
  color: ${palette.oxfordBlue};
`;

const StarsText = styled.Text`
  font-size: ${fontScaleNormalize(13)}px;
  line-height: ${fontScaleNormalize(15)}px;
  color: ${palette.goldWebGolden};
  background-color: ${palette.prussianBlue};
  display: flex;
  text-align: center;
  padding: ${moderateScale(3)}px;
  margin-top: ${moderateScale(6)}px;
  border-radius: ${moderateScale(4)}px;
`;

const Avatar = styled.Image`
  height: ${moderateScale(40)}px;
  width: ${moderateScale(40)}px;
  border-radius: ${moderateScale(4)}px;
  margin: ${moderateScale(5)}px;
  margin-left: auto;
  margin-right: auto;
`;

export default ProjectCards;

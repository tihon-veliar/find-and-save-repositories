import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from '../../core/styleGuide/indsx';
import { moderateScale } from '../../core/utils';
import { Linking } from 'react-native';

export const ProjectCards = ({
  project: { avatar_url, description, full_name, id, inFavorits, language, url },
  toggleFavorites,
}) => {
  const openUrl = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  const addToFavorites = useCallback(() => {
    console.log('add to Fav', id);
    toggleFavorites(id);
  }, [id, toggleFavorites]);

  return (
    <Container>
      <Text>{full_name}</Text>
      <URL onPress={openUrl}>
        <Text>{url}</Text>
      </URL>
      <Text>{description}</Text>
      <Text>{avatar_url}</Text>
      <Avatar
        source={{
          uri: avatar_url,
        }}
      />
      <Favorites onPress={addToFavorites}>
        <Text>{inFavorits ? '+' : '-'}</Text>
      </Favorites>
    </Container>
  );
};

const Container = styled.View`
  border: ${moderateScale(1)}px solid ${palette.manatee};
  border-radius: ${moderateScale(23)}px;
  padding: ${moderateScale(15)}px;
`;

const Favorites = styled.TouchableOpacity`
  width: ${moderateScale(15)}px;
  height: ${moderateScale(15)}px;
  background-color: ${palette.goldWebGolden};
  align-items: center;
  justify-content: center;
`;

const URL = styled.TouchableOpacity``;

const Text = styled.Text``;

const Avatar = styled.Image`
  height: ${moderateScale(40)}px;
  width: ${moderateScale(40)}px;
  border-radius: ${moderateScale(4)}px;
`;

export default ProjectCards;

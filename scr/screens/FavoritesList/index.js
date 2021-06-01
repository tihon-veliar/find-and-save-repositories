import React, { useCallback, useMemo } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { compose } from 'recompose';

import _ from 'lodash';

import { fontScaleNormalize, moderateScale } from '../../core/utils';
import ProjectCards from '../../components/ProjectCards';
import { palette } from '../../core/styleGuide';

const FavoritesList = ({ store: { favorites, toggleFavorites } }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <ProjectCards
        project={item}
        key={item.id}
        toggleFavorites={toggleFavorites}
      />
    ),
    [toggleFavorites],
  );
  const keyExtractor = useCallback(repo => repo.id, []);

  const ListEmptyComponent = useMemo(
    () => <ListEmpty>There's nothing here yet...</ListEmpty>,
    [],
  );
  return (
    <View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const FlatList = styled.FlatList``;

const ListEmpty = styled.Text`
  width: 100%;
  margin-top: ${moderateScale(40)}px;
  font-size: ${fontScaleNormalize(19)}px;
  text-align: center;
  color: ${palette.manatee};
`;

const View = styled.View`
  flex: 1;
`;

export default compose(inject('store'), observer)(FavoritesList);

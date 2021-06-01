import React, { useCallback, useState, useRef, useMemo } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { compose } from 'recompose';

import _ from 'lodash';

import LanguageFilter from '../../components/LanguageFilter';
import {
  fontScaleNormalize,
  moderateScale,
  screenHeight,
  screenWidth,
} from '../../core/utils';
import ProjectCards from '../../components/ProjectCards';
import { palette } from '../../core/styleGuide';

const RepositoryScreen = ({
  store: {
    repository,
    toggleFavorites,
    fetchRepositorysBeString,
    isFetching,
    loadeMoreRepositorys,
    language,
  },
}) => {
  const [searchString, setSearchString] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const delayedQuery = useRef(
    _.debounce(q => {
      fetchRepositorysBeString(q);
    }, 1000),
  ).current;

  const onSearch = useCallback(
    value => {
      setSearchString(value);
      delayedQuery(value);
    },
    [delayedQuery],
  );

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

  const onEndReached = useCallback(
    () => loadeMoreRepositorys(searchString),
    [loadeMoreRepositorys, searchString],
  );

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchRepositorysBeString(searchString);
    setIsRefreshing(false);
  }, [searchString, fetchRepositorysBeString]);

  const keyExtractor = useCallback(repo => repo.id, []);

  const ListEmptyComponent = useMemo(
    () => <ListEmpty>There's nothing here yet...</ListEmpty>,
    [],
  );

  return (
    <View>
      <Elevation>
        <Search
          value={searchString}
          onChangeText={onSearch}
          placeholder={'Search..'}
        />
        <LanguageFilter />
      </Elevation>
      {isFetching && !isRefreshing && (
        <Loading>
          <LoadingText>Loading...</LoadingText>
        </Loading>
      )}
      <FlatList
        data={repository}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const Elevation = styled.View`
  elevation: 3;
  background-color: whitesmoke;
`;

const FlatList = styled.FlatList`
  flex: 1;
`;
const View = styled.View`
  flex: 1;
`;

const ListEmpty = styled.Text`
  width: 100%;
  margin-top: ${moderateScale(40)}px;
  font-size: ${fontScaleNormalize(19)}px;
  text-align: center;
  color: ${palette.manatee};
`;

const Loading = styled.View`
  position: absolute;
  width: 100%;
  align-items: center;
  justify-content: center;
  top: ${moderateScale(40)}px;
`;

const LoadingText = styled.Text`
  padding-horizontal: ${moderateScale(18)}px;
  border-radius: ${moderateScale(9)};
  font-size: ${fontScaleNormalize(14)}px;
  line-height: ${fontScaleNormalize(18)}px;
  background-color: whitesmoke;
  color: ${palette.prussianBlue};
  elevation: 5;
`;

const Search = styled.TextInput`
  border-bottom-width: ${moderateScale(2)};
  border-color: ${palette.aliceBlue};
  padding-horizontal: ${moderateScale(13)};
`;

export default compose(inject('store'), observer)(RepositoryScreen);

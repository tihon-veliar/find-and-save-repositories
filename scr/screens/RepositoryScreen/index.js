import React, { useCallback, useState, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { compose } from 'recompose';

import _ from 'lodash';

import LanguageFilter from '../../components/LanguageFilter';
import { screenHeight, screenWidth } from '../../core/utils';
import ProjectCards from '../../components/ProjectCards';
import { palette } from '../../core/styleGuide/indsx';

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

  const delayedQuery = useRef(
    _.debounce(q => {
      console.log('debounce', q);
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

  const keyExtractor = useCallback(repo => repo.id, []);

  return (
    <View>
      <Search value={searchString} onChangeText={onSearch} />
      <LanguageFilter />
      {isFetching && <Black />}

      <FlatList
        data={repository}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
      />
      {/* <Scroll>
        {repository.map(repo => (
          <ProjectCards
            project={repo}
            key={repo.id}
            toggleFavorites={toggleFavorites}
          />
        ))}
      </Scroll> */}
    </View>
  );
};

const Scroll = styled.ScrollView`
  border: 1px solid green;
`;

const FlatList = styled.FlatList`
  flex: 1;
  border: 1px solid red;
`;
const View = styled.View`
  flex: 1;
`;

const Black = styled.View`
  background-color: ${palette.spaceCadet};
  width: 40px;
  height: 40px;
`;

const Search = styled.TextInput``;

export default compose(inject('store'), observer)(RepositoryScreen);

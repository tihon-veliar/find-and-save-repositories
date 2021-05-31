import React, { useCallback, useState, useRef } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { compose } from 'recompose';

import _ from 'lodash';

import ProjectCards from '../../components/ProjectCards';
import { screenHeight } from '../../core/utils';
import { palette } from '../../core/styleGuide/indsx';

const FavoritesList = ({ store: { favorites, toggleFavorites } }) => (
  <View>
    <Scroll>
      {favorites.map(repo => (
        <ProjectCards
          project={repo}
          key={repo.id}
          toggleFavorites={toggleFavorites}
        />
      ))}
    </Scroll>
  </View>
);
const Scroll = styled.ScrollView`
  border: 1px solid green;
`;
const View = styled.View``;

const Black = styled.View`
  background-color: ${palette.spaceCadet};
  width: 40px;
  height: 40px;
`;

const Search = styled.TextInput``;

export default compose(inject('store'), observer)(FavoritesList);

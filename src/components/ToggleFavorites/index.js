import React from 'react';
import Liked from '../icons/Liked';
import Unliked from '../icons/Unliked';

export const ToggleFavorites = ({ isFavorites, color }) => {
  if (isFavorites) {
    return <Liked color={color} />;
  }
  return <Unliked color={color} />;
};

export default ToggleFavorites;

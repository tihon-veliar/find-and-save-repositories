import { types as t } from 'mobx-state-tree';

const Repository = t.model('repository', {
  id: t.number,
  full_name: t.maybeNull(t.string),
  avatar_url: t.maybeNull(t.string),
  description: t.maybeNull(t.string),
  url: t.maybeNull(t.string),
  language: t.maybeNull(t.string),
  stargazers_count: t.maybeNull(t.number),
});

export default Repository;

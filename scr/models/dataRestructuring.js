export const restructuringTheRepository = arreyOfRepository =>
  arreyOfRepository.map(repo => ({
    id: repo.id,
    full_name: repo.full_name,
    avatar_url: repo?.owner?.avatar_url,
    description: repo.description,
    url: repo.url,
    language: repo.language,
  }));

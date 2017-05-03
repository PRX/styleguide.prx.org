import ActionTypes from './actionTypes';

export function episodeList(episodes: string[]) {
  return {
    type: ActionTypes.EPISODE_LIST,
    payload: {
      episodes
    }
  };
};

export function episodeShow(episode: string, show: boolean) {
  return {
    type: ActionTypes.EPISODE_SHOW,
    payload: {
      episode,
      show
    }
  };
};

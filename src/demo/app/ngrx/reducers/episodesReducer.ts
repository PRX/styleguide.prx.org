import { ActionReducer, Action } from '@ngrx/store';
import ActionTypes from '../actions/actionTypes';

let initialState = [];

export function EpisodesReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.EPISODE_LIST:
      return action.payload.episodes.map((episode) => {
        let existingEntry = state.map(entry => entry.name).indexOf(episode);
        return {name: episode, show: existingEntry > -1 ? state.episodes[existingEntry].show : false};
      });
    case ActionTypes.EPISODE_SHOW:
      let existingEntry = state.map(entry => entry.name).indexOf(action.payload.episode);
      return existingEntry > -1 ?
        [...state.slice(0, existingEntry), {name: action.payload.episode, show: action.payload.show}, ...state.slice(existingEntry + 1)] :
        [...state, {name: action.payload.episode, show: action.payload.show}] ;
    default:
      return state;
  }
}

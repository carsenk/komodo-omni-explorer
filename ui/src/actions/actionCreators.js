import 'whatwg-fetch';
import 'bluebird';
import config from '../config';

import {
  UPDATE,
  SEARCH,
  SUMMARY,
  INTEREST,
  UNSPENTS,
  UPDATE_SEARCH_TERM,
} from './storeType';

export function summaryState(summary) {
  return {
    type: SUMMARY,
    summary,
  }
}

export function overviewState(overview) {
  return {
    type: UPDATE,
    overview,
  }
}

export function searchState(search) {
  return {
    type: SEARCH,
    search,
  }
}

export function searchTermState(searchTerm) {
  return {
    type: UPDATE_SEARCH_TERM,
    searchTerm,
  }
}

export function resetInterestState() {
  return {
    type: UNSPENTS,
    unspentsAddress: null,
    interestAddress: null,
    unspents: null,
    interest: null,
  }
}

export function interestState(interestAddress, interest) {
  return {
    type: INTEREST,
    interestAddress,
    interest,
  }
}

export function unspentsState(unspentsAddress, unspents) {
  return {
    type: UNSPENTS,
    unspentsAddress,
    unspents,
  }
}

export function searchTerm(searchTerm, currentState) {
  return dispatch => {
    dispatch(searchTermState(searchTerm));

    return fetch(`http://${config.ip}:${config.port}/api/explorer/search?term=${searchTerm}`, {
      method: 'GET',
    })
    .catch((error) => {
      console.warn(error);
    })
    .then(response => response.json())
    .then(json => {
      dispatch(searchState(json.result));

      if (!currentState) {
        dispatch(searchState(json.result));
      }
    });
  }
}

export function getOverview(currentState) {
  return dispatch => {
    return fetch(`http://${config.ip}:${config.port}/api/explorer/overview`, {
      method: 'GET',
    })
    .catch((error) => {
      console.warn(error);
    })
    .then(response => response.json())
    .then(json => {
      dispatch(overviewState(json.result));

      if (!currentState) {
        dispatch(overviewState(json.result));
      }
    });
  }
}

export function getSummary(currentState) {
  return dispatch => {
    return fetch(`http://${config.ip}:${config.port}/api/explorer/summary`, {
      method: 'GET',
    })
    .catch((error) => {
      console.warn(error);
    })
    .then(response => response.json())
    .then(json => {
      dispatch(summaryState(json.result));

      if (!currentState) {
        dispatch(summaryState(json.result));
      }
    });
  }
}

export function getInterest(address, currentState) {
  return dispatch => {
    return fetch(`http://${config.ip}:${config.port}/api/kmd/interest?address=${address}`, {
      method: 'GET',
    })
    .catch((error) => {
      console.warn(error);
    })
    .then(response => response.json())
    .then(json => {
      dispatch(interestState(address, json.result));

      if (!currentState) {
        dispatch(interestState(address, json.result));
      }
    });
  }
}

export function getUnspents(address, currentState) {
  return dispatch => {
    return fetch(`http://${config.ip}:${config.port}/api/kmd/listunspent?address=${address}`, {
      method: 'GET',
    })
    .catch((error) => {
      console.warn(error);
    })
    .then(response => response.json())
    .then(json => {
      dispatch(unspentsState(address, json.result));

      if (!currentState) {
        dispatch(unspentsState(address, json.result));
      }
    });
  }
}
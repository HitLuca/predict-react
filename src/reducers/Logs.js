/**
 * Created by Tõnis Kasekamp on 22.09.2017.
 */

import {CHANGE_VISIBLE_LOG, LOG_LIST_FAILED, LOG_LIST_REQUESTED, LOG_LIST_RETRIEVED} from '../actions/LogActions';

const initialState = {
  fetchState: {inFlight: false},
  logs: []
};

const dummy = (id, name, properties) => {
  return {
    id: id,
    name: name,
    fetchState: {inFlight: false},
    visible: false,
    properties: properties
  };
};

const mergeIncomingLogs = (logList, existingLogs) => {
  return logList.map((newLog) => {
    const log = (existingLogs.find((exLog) => exLog.id === newLog.id));
    if (log) {
      return log;
    } else {
      return dummy(newLog.id, newLog.name, newLog.properties);
    }
  });
};

const logs = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_VISIBLE_LOG: {
        const resetLogs = state.logs.map((log) => {
          if (log.id === action.payload.logId) {
            return {...log, visible: true};
          } else {
            return {...log, visible: false};
          }
        });

        return {
          ...state,
          logs: resetLogs
        };
      }

      case LOG_LIST_REQUESTED: {
        return {
          ...state,
          fetchState: {inFlight: true},
        };
      }

      case LOG_LIST_RETRIEVED: {
        return {
          ...state,
          fetchState: {inFlight: false},
          logs: mergeIncomingLogs(action.payload, state.logs)
        };
      }

      case LOG_LIST_FAILED: {
        return {
          ...state,
          fetchState: {inFlight: false, error: action.payload},
        };
      }
      default:
        return state;
    }
  }
;

export default logs;

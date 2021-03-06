import {MODEL_CHANGED, MODELS_FAILED, MODELS_REQUESTED, MODELS_RETRIEVED} from '../actions/ModelActions';
import {LOG_CHANGED} from '../actions/LogActions';
import {CLASSIFICATION, REGRESSION, TIME_SERIES_PREDICTION} from '../reference';

const initialState = {
    fetchState: {inFlight: false},
    models: [],
    logId: 0,
    regselected: 0,
    classelected: 0,
    timeseriespredselected: 0,
    regressionModels: [],
    classificationModels: [],
    timeSeriesPredictionModels: [],
    pLength: 0,
};

const filterModels = (modelstmp, plength, method) => {
    const models = modelstmp.filter((model) => (model.type === method));
    return models.filter((model) => (model.config.encoding.prefix_length === plength)
        || (((model.config.padding === 'all_in_one') || (model.config.padding === 'zero_padding')) &&
            (model.config.encoding.prefix_length >= plength)));
};

const mergeIncomingModels = (incoming, existing) => {
    // From https://stackoverflow.com/a/34963663
    const a3 = existing.concat(incoming).reduce((acc, x) => {
        acc[x.id] = Object.assign(acc[x.id] || {}, x);
        return acc;
    }, {});
    return Object.keys(a3).map((key) => a3[key]);
};

const models = (state = initialState, action) => {
    switch (action.type) {
        case MODELS_REQUESTED: {
            return {
                ...state,
                fetchState: {inFlight: true},
            };
        }

        case MODELS_RETRIEVED: {
            const models = mergeIncomingModels(action.payload, state.models);
            const regressionModels = models.filter((model) => (model.type === REGRESSION));
            const classificationModels = models.filter((model) => (model.type === CLASSIFICATION));
            const timeSeriesPredictionModels = models.filter((model) => (model.type === TIME_SERIES_PREDICTION));
            return {
                ...state,
                fetchState: {inFlight: false},
                models: models,
                regressionModels: regressionModels,
                classificationModels: classificationModels,
                timeSeriesPredictionModels: timeSeriesPredictionModels,
            };
        }

        case MODELS_FAILED: {
            return {
                ...state,
                fetchState: {inFlight: false, error: action.payload},
            };
        }

        case MODEL_CHANGED: {
            if (action.method === REGRESSION) {
                const regselected = action.modelId;
                return {
                    ...state,
                    regselected,
                };
            } else if (action.method === CLASSIFICATION) {
                const classelected = action.modelId;
                return {
                    ...state,
                    classelected,
                };
            } else if (action.method === TIME_SERIES_PREDICTION) {
                const timeseriespredselected = action.modelId;
                return {
                    ...state,
                    timeseriespredselected,
                };
            } else {
                return null;
            }
        }

        case LOG_CHANGED: {
            const logId = action.logId;
            const regressionModels = filterModels(state.models, action.pLength, REGRESSION);
            const classificationModels = filterModels(state.models, action.pLength, CLASSIFICATION);
            const timeSeriesPredictionModels = filterModels(state.models, action.pLength, TIME_SERIES_PREDICTION);
            const pLength = action.pLength;

            return {
                ...state,
                logId,
                regressionModels,
                classificationModels,
                timeSeriesPredictionModels,
                pLength,
            };
        }

        default:
            return state;
    }
};

export default models;

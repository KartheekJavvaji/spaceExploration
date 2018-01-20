import _ from 'lodash';

const getSerializedParamReducer = (acc, value, key) => `${acc}&${key}=${value}`

export const serialize = (params) => {
  const serializedParams = _.reduce(params, getSerializedParamReducer, '');
  return serializedParams? serializedParams.substring(1): '';
}
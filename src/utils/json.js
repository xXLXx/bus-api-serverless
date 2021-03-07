import isObject from 'lodash/isObject';

/**
 * JSON response
 */
export default function json(response, format = false) {
  const defaultBody = {
    success: response.statusCode && response.statusCode !== 200 ? false : true,
    message: '',
    data: null,
    errors: []
  };

  return {
    ...response,
    headers: {
      ...(response.headers || {}),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: isObject(response.body) ?
      JSON.stringify({
        ...defaultBody,
        ...response.body
      }, ...(format ? [null, 2] : [])) :
      response.body
  };
}
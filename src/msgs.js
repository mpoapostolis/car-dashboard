import curry from 'ramda/src/curry';
import pathOr from 'ramda/src/pathOr';

export const MSGS = {
};

export const getMsg = curry((lng, key) => pathOr(key, [key, lng], MSGS));

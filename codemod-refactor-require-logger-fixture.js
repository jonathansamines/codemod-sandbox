'use strict';

const logger = require('logger')();
const world = require('world');
const log = require('winston')();

logger.info('something');
logger.error(new Error('world'));
'use strict';


export const ENV = process.env.NODE_ENV;

export const DEV = ENV !== 'production';

export const REV = global.__REX_REV__;

export const API = global.__REX_API__;

export const STATE = global.__REX_DAT__;


export const UPDATE_HOME_CONTENT = 'UPDATE_HOME_CONTENT';

export const UPDATE_ABOUT_CONTENT = 'UPDATE_ABOUT_CONTENT';

import calc from './modules/calc';
import form from './modules/form';
import modal from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    calc();
    form();
    modal('.modalWindow', '.overlay');
});
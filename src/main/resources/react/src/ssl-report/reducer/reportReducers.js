/*

 The MIT License (MIT)

 Copyright (c) 2018 Marius Thiemann <marius dot thiemann at ploin dot de>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.


 */

import {SUBMIT_FORM, FETCH_REPORT_RESPONSE, NEW_REPORT, FETCH_REPORT_FAILURE, CLEAR_FORM} from '../actions/ActionTypes';
import {FORM_VIEW, LOADER_VIEW, SHEET_VIEW} from '../components/ViewStates'

export function reportReducer(state, action) {
    let newState = {...state};

    if(action.type === SUBMIT_FORM) {
        newState.activeState = LOADER_VIEW;
        newState.requestData = action.formData;

        if(newState.fetchError) {
            newState.fetchError = null;
        }
    }

    if(action.type === FETCH_REPORT_RESPONSE) {
        newState.activeState = SHEET_VIEW;
        newState.sslReports = action.sslReports;
    }

    if(action.type === FETCH_REPORT_FAILURE) {
        newState.activeState = FORM_VIEW;
        newState.fetchError = action.fetchError;
    }

    if(action.type === NEW_REPORT) {
        newState.activeState = FORM_VIEW;
    }

    if(action.type === CLEAR_FORM) {
        newState.activeState = FORM_VIEW;
        if(newState.requestData) {
            newState.requestData = null;
        }

    }

    return newState;
}
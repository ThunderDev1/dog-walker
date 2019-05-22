import {combineReducers} from 'redux';

import {CreateMeetingState, reducer as createMeeting} from './createMeeting';

export const reducer = combineReducers({
  createMeeting,
});

export interface MeetingState {
  createMeeting: CreateMeetingState;
}

import {combineReducers} from 'redux';

import {CreateMeetingState, reducer as createMeeting} from './createMeeting';
import {MeetingListState, reducer as meetingList} from './meetingList';

export const reducer = combineReducers({
  createMeeting,
  meetingList,
});

export interface MeetingState {
  createMeeting: CreateMeetingState;
  meetingList: MeetingListState;
}

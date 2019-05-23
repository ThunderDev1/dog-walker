import {combineReducers} from 'redux';

import {CreateMeetingState, reducer as createMeeting} from './createMeeting';
import {MeetingListState, reducer as meetingList} from './meetingList';
import {MeetingDetailsState, reducer as meetingDetails} from './meetingDetails';
import {User} from '../friendList';

export const reducer = combineReducers({
  createMeeting,
  meetingList,
  meetingDetails,
});

export interface MeetingState {
  createMeeting: CreateMeetingState;
  meetingList: MeetingListState;
  meetingDetails: MeetingDetailsState;
}

export type Guest = User & {
  status: number;
};

export enum MeetingStatus {
  Pending = 1,
  Going = 2,
  NotGoing = 3,
}

// import { InviteMemberModel } from 'src/app/model/inviteMember.model';

import { User } from 'src/app/model/user.model';

export interface InviteMemberState {
  inviteMember: User | null;
  inProcess: boolean;
  isLoading: boolean;
  error: string;
}

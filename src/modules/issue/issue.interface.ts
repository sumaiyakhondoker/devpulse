export interface IIssueBody {
    title: string;
    description: string;
    type: string;
}

export interface IIssueDetails {
    id:number;
    title: string;
    description: string;
    type: string;
   status: string;
  reporter_id : number;
  created_at: string;
  updated_at: string;
}

export interface Iuser {
    id:number;
    name: string;
    email: string;
   password: string;
  role : string;
  created_at: string;
  updated_at: string;
}


import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CreateProposalErr = { 'NotDAOMember' : null } |
  { 'NotEnoughTokens' : null };
export type CreateProposalOk = bigint;
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export interface Proposal {
  'id' : bigint,
  'status' : Status,
  'creator' : Principal,
  'votes' : bigint,
  'voteNo' : bigint,
  'voters' : Array<Principal>,
  'voteYes' : bigint,
  'manifest' : string,
}
export type Status = { 'Open' : null } |
  { 'Rejected' : null } |
  { 'Accepted' : null };
export type StreamingCallback = ActorMethod<
  [StreamingCallbackToken],
  StreamingCallbackResponse
>;
export interface StreamingCallbackResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Uint8Array | number[],
}
export interface StreamingCallbackToken {
  'key' : string,
  'index' : bigint,
  'content_encoding' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }
  };
export type VoteErr = { 'AlreadyVoted' : null } |
  { 'ProposalEnded' : null } |
  { 'ProposalNotFound' : null } |
  { 'NotDAOMember' : null } |
  { 'NotEnoughTokens' : null };
export type VoteOk = { 'ProposalOpen' : null } |
  { 'ProposalRefused' : null } |
  { 'ProposalAccepted' : null };
export type submitProposalResult = { 'ok' : CreateProposalOk } |
  { 'err' : CreateProposalErr };
export type voteResult = { 'ok' : VoteOk } |
  { 'err' : VoteErr };
export interface _SERVICE {
  'getAllProposals' : ActorMethod<[], Array<[bigint, Proposal]>>,
  'getProposal' : ActorMethod<[bigint], [] | [Proposal]>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'submitProposal' : ActorMethod<[string], submitProposalResult>,
  'vote' : ActorMethod<[bigint, boolean], voteResult>,
}

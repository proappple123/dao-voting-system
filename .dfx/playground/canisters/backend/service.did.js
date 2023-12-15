export const idlFactory = ({ IDL }) => {
  const Status = IDL.Variant({
    'Open' : IDL.Null,
    'Rejected' : IDL.Null,
    'Accepted' : IDL.Null,
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat,
    'status' : Status,
    'votes' : IDL.Int,
    'voters' : IDL.Vec(IDL.Principal),
    'manifest' : IDL.Text,
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const StreamingCallbackToken = IDL.Record({
    'key' : IDL.Text,
    'index' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const StreamingCallbackResponse = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const StreamingCallback = IDL.Func(
      [StreamingCallbackToken],
      [StreamingCallbackResponse],
      ['query'],
    );
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingCallbackToken,
      'callback' : StreamingCallback,
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const CreateProposalOk = IDL.Nat;
  const CreateProposalErr = IDL.Variant({
    'NotDAOMember' : IDL.Null,
    'NotEnoughTokens' : IDL.Null,
  });
  const submitProposalResult = IDL.Variant({
    'ok' : CreateProposalOk,
    'err' : CreateProposalErr,
  });
  const VoteOk = IDL.Variant({
    'ProposalOpen' : IDL.Null,
    'ProposalRefused' : IDL.Null,
    'ProposalAccepted' : IDL.Null,
  });
  const VoteErr = IDL.Variant({
    'AlreadyVoted' : IDL.Null,
    'ProposalEnded' : IDL.Null,
    'ProposalNotFound' : IDL.Null,
    'NotDAOMember' : IDL.Null,
    'NotEnoughTokens' : IDL.Null,
  });
  const voteResult = IDL.Variant({ 'ok' : VoteOk, 'err' : VoteErr });
  return IDL.Service({
    'getAllProposals' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, Proposal))],
        ['query'],
      ),
    'getProposal' : IDL.Func([IDL.Nat], [IDL.Opt(Proposal)], ['query']),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'submitProposal' : IDL.Func([IDL.Text], [submitProposalResult], []),
    'vote' : IDL.Func([IDL.Nat, IDL.Bool], [voteResult], []),
  });
};
export const init = ({ IDL }) => { return []; };

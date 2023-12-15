import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import Hash "mo:base/Hash";
import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
actor {

  public type Result<A, B> = Result.Result<A, B>;

  type Status = {
    #Open;
    #Accepted;
    #Rejected;
  };

  type Proposal = {
    id : Nat;
    status : Status;
    manifest : Text;
    votes : Int;
    voters : [Principal];
    creator : Principal;
    voteYes : Int;
    voteNo : Int;
  };

  public type CreateProposalOk = Nat;
  public type CreateProposalErr = {
    #NotDAOMember;
    #NotEnoughTokens;
  };

  public type VoteOk = {
    #ProposalAccepted;
    #ProposalRefused;
    #ProposalOpen;
  };
  public type VoteErr = {
    #NotDAOMember;
    #NotEnoughTokens;
    #ProposalNotFound;
    #ProposalEnded;
    #AlreadyVoted;
  };

  public type createProposalResult = Result<CreateProposalOk, CreateProposalErr>;
  public type submitProposalResult = Result<CreateProposalOk, CreateProposalErr>;

  public type voteResult = Result<VoteOk, VoteErr>;

  var nextProposalId : Nat = 0;

  let proposals : TrieMap.TrieMap<Nat, Proposal> = TrieMap.TrieMap(Nat.equal, Hash.hash);

  let users : TrieMap.TrieMap<Principal, Nat> = TrieMap.TrieMap(Principal.equal, Principal.hash);

  public shared ({ caller }) func submitProposal(manifest : Text) : async submitProposalResult {
    let proposal = {
      id = nextProposalId;
      status = #Open;
      manifest = manifest;
      votes = 0;
      voters = [];
      creator = caller;
      voteYes = 0;
      voteNo = 0;
    };

    proposals.put(nextProposalId, proposal);
    nextProposalId += 1;
    return #ok(proposal.id);
  };

  public shared ({ caller }) func vote(id : Nat, votes : Bool) : async voteResult {

    let proposal = switch (proposals.get(id)) {
      case (null) { return #err(#ProposalNotFound) };
      case (?exist) { exist };
    };

    if (proposal.status != #Open) {
      return #err(#ProposalEnded);
    };

    for (voter in proposal.voters.vals()) {
      if (voter == caller) {
        return #err(#AlreadyVoted);
      };
    };

    let newVoteYes = if (votes) { proposal.voteYes + 1 } else { proposal.voteYes };
    let newVoteNo = if (not votes) {proposal.voteNo + 1} else {proposal.voteNo};
    let newVoters = Buffer.fromArray<Principal>(proposal.voters);
    newVoters.add(caller);
    let newVotes = newVoteYes - newVoteNo;
    let newStatus = if (newVoteYes >= 3) { #Accepted } else if (newVoteNo <= -3) {
      #Rejected;
    } else { #Open };

    let newProposal : Proposal = {
      id = proposal.id;
      status = newStatus;
      manifest = proposal.manifest;
      votes = newVotes;
      voteYes = newVoteYes;
      voteNo = newVoteNo;
      voters = Buffer.toArray(newVoters);
      creator = proposal.creator; 
    };

    proposals.put(id, newProposal);

    switch (newStatus) {
      case (#Accepted) { return #ok(#ProposalAccepted) };
      case (#Rejected) { return #ok(#ProposalRefused) };
      case (#Open) { return #ok(#ProposalOpen) };
    };
  };

  public query func getProposal(id : Nat) : async ?Proposal {
    return proposals.get(id);
  };

  public query func getAllProposals() : async [(Nat, Proposal)] {
    return Iter.toArray<(Nat, Proposal)>(proposals.entries());
  };

  // Webpage
  public type HttpRequest = Http.Request;
  public type HttpResponse = Http.Response;
  public query func http_request(request : HttpRequest) : async HttpResponse {
    let proposalsArray = Iter.toArray<(Nat, Proposal)>(proposals.entries());
    let acceptedProposal = Array.find<(Nat, Proposal)>(
      proposalsArray,
      func((_, proposal)) {
        proposal.status == #Accepted;
      },
    );
    let body = switch (acceptedProposal) {
      case (null) { "This is a DAO controlled webpage" };
      case (?(_, proposal)) { proposal.manifest }; 
    };
    return {
      body = Text.encodeUtf8(body);
      headers = [("Content-Type", "text/html; charset=UTF-8")];
      status_code = 200 : Nat16;
      streaming_strategy = null;
    };
  };
};

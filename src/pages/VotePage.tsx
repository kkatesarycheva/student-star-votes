import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useElection } from "@/lib/electionContext";
import { candidates, positionLabels } from "@/lib/mockData";
import CandidateCard from "@/components/CandidateCard";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Vote, AlertTriangle, CheckCircle, Lock } from "lucide-react";

const VotePage = () => {
  const { isLoggedIn, hasVoted, votingOpen, votes, setVotes, submitVote } = useElection();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const headgirlCandidates = candidates.filter(c => c.position === "headgirl");
  const headboyCandidates = candidates.filter(c => c.position === "headboy");
  const prefectCandidates = candidates.filter(c => c.position === "prefect");

  const selectHeadgirl = (id: string) => setVotes({ ...votes, headgirl: votes.headgirl === id ? null : id });
  const selectHeadboy = (id: string) => setVotes({ ...votes, headboy: votes.headboy === id ? null : id });
  const togglePrefect = (id: string) => {
    const current = votes.prefects;
    if (current.includes(id)) {
      setVotes({ ...votes, prefects: current.filter(p => p !== id) });
    } else if (current.length < 4) {
      setVotes({ ...votes, prefects: [...current, id] });
    }
  };

  const canSubmit = votes.headgirl && votes.headboy && votes.prefects.length > 0;

  const selectedHeadgirl = candidates.find(c => c.id === votes.headgirl);
  const selectedHeadboy = candidates.find(c => c.id === votes.headboy);
  const selectedPrefects = candidates.filter(c => votes.prefects.includes(c.id));

  const handleConfirmSubmit = () => {
    submitVote();
    setShowConfirm(false);
    navigate("/confirmation");
  };

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  if (hasVoted) {
    navigate("/confirmation");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Cast Your Vote</h1>
          <p className="text-muted-foreground">Select your candidates below. You may choose up to 4 prefects.</p>
        </div>

        {/* Head Girl */}
        <section className="mb-10">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-sm">👑</span>
            Head Girl <span className="text-sm font-body font-normal text-muted-foreground">(select one)</span>
          </h2>
          <div className="space-y-3">
            {headgirlCandidates.map(c => (
              <CandidateCard key={c.id} candidate={c} selected={votes.headgirl === c.id} onSelect={() => selectHeadgirl(c.id)} selectable />
            ))}
          </div>
        </section>

        {/* Head Boy */}
        <section className="mb-10">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">🎓</span>
            Head Boy <span className="text-sm font-body font-normal text-muted-foreground">(select one)</span>
          </h2>
          <div className="space-y-3">
            {headboyCandidates.map(c => (
              <CandidateCard key={c.id} candidate={c} selected={votes.headboy === c.id} onSelect={() => selectHeadboy(c.id)} selectable />
            ))}
          </div>
        </section>

        {/* Prefects */}
        <section className="mb-10">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm">⭐</span>
            Prefects <span className="text-sm font-body font-normal text-muted-foreground">(select up to 4) — {votes.prefects.length}/4 selected</span>
          </h2>
          <div className="space-y-3">
            {prefectCandidates.map(c => (
              <CandidateCard key={c.id} candidate={c} selected={votes.prefects.includes(c.id)} onSelect={() => togglePrefect(c.id)} selectable />
            ))}
          </div>
        </section>

        {/* Submit */}
        <div className="sticky bottom-4 bg-card border border-border rounded-xl p-4 shadow-elevated flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {!canSubmit && (
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-accent" />
                Select at least one candidate per category
              </span>
            )}
            {canSubmit && (
              <span className="flex items-center gap-1.5 text-success">
                <CheckCircle className="w-4 h-4" />
                Ready to submit
              </span>
            )}
          </div>
          <Button
            disabled={!canSubmit}
            onClick={() => setShowConfirm(true)}
            className="bg-gradient-gold text-secondary-foreground font-semibold hover:opacity-90 shadow-gold"
          >
            <Vote className="w-4 h-4 mr-2" />
            Review & Submit
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Confirm Your Vote</DialogTitle>
            <DialogDescription>Please review your selections. Votes cannot be changed after submission.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Head Girl</p>
              <p className="text-sm text-muted-foreground">{selectedHeadgirl?.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Head Boy</p>
              <p className="text-sm text-muted-foreground">{selectedHeadboy?.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Prefects</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                {selectedPrefects.map(p => <li key={p.id}>{p.name}</li>)}
              </ul>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>Go Back</Button>
            <Button onClick={handleConfirmSubmit} className="bg-gradient-navy text-primary-foreground font-semibold hover:opacity-90">
              Submit Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VotePage;

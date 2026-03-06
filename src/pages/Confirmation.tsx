import { useNavigate } from "react-router-dom";
import { useElection } from "@/lib/electionContext";
import { candidates } from "@/lib/mockData";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const { isLoggedIn, hasVoted, votes } = useElection();
  const navigate = useNavigate();

  const selectedHeadgirl = candidates.find(c => c.id === votes.headgirl);
  const selectedHeadboy = candidates.find(c => c.id === votes.headboy);
  const selectedPrefects = candidates.filter(c => votes.prefects.includes(c.id));

  if (!isLoggedIn) { navigate("/login"); return null; }
  if (!hasVoted) { navigate("/vote"); return null; }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-success flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Vote Submitted!</h1>
          <p className="text-muted-foreground mb-8">Thank you for participating in the school elections. Your vote has been recorded securely.</p>

          <div className="bg-card border border-border rounded-xl p-6 shadow-card text-left mb-8">
            <h3 className="font-display font-semibold text-foreground mb-4">Your Selections</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Head Girl</p>
                <p className="text-foreground font-medium">{selectedHeadgirl?.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Head Boy</p>
                <p className="text-foreground font-medium">{selectedHeadboy?.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prefects</p>
                {selectedPrefects.map(p => (
                  <p key={p.id} className="text-foreground font-medium">• {p.name}</p>
                ))}
              </div>
            </div>
          </div>

          <Link to="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

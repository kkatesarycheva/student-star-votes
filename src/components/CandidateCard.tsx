import { Candidate, positionLabels } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  selected?: boolean;
  onSelect?: () => void;
  selectable?: boolean;
}

const positionColors: Record<string, string> = {
  headgirl: "bg-pink-100 text-pink-800 border-pink-200",
  headboy: "bg-blue-100 text-blue-800 border-blue-200",
  prefect: "bg-amber-100 text-amber-800 border-amber-200",
};

const CandidateCard = ({ candidate, selected, onSelect, selectable }: CandidateCardProps) => {
  return (
    <button
      type="button"
      onClick={selectable ? onSelect : undefined}
      disabled={!selectable}
      className={`group w-full text-left rounded-lg border-2 p-4 transition-all duration-200 ${
        selected
          ? "border-accent bg-gold-light/30 shadow-gold"
          : selectable
          ? "border-border bg-card hover:border-accent/50 hover:shadow-elevated cursor-pointer"
          : "border-border bg-card"
      } ${!selectable ? "cursor-default" : ""}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
          selected ? "bg-gradient-gold" : "bg-muted"
        }`}>
          <User className={`w-6 h-6 ${selected ? "text-secondary-foreground" : "text-muted-foreground"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-card-foreground truncate">{candidate.name}</h3>
            {selected && (
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center text-xs font-bold text-secondary-foreground">✓</span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`text-xs ${positionColors[candidate.position]}`}>
              {positionLabels[candidate.position]}
            </Badge>
            <span className="text-xs text-muted-foreground">{candidate.year}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{candidate.statement}</p>
        </div>
      </div>
    </button>
  );
};

export default CandidateCard;

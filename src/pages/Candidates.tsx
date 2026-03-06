import { candidates, positionLabels } from "@/lib/mockData";
import CandidateCard from "@/components/CandidateCard";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, GraduationCap, Star } from "lucide-react";

const positionIcons = {
  headgirl: Crown,
  headboy: GraduationCap,
  prefect: Star,
};

const Candidates = () => {
  const positions = ["headgirl", "headboy", "prefect"] as const;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">Meet the Candidates</h1>
          <p className="text-muted-foreground max-w-md mx-auto">Get to know the students standing for election before you cast your vote.</p>
        </div>

        <Tabs defaultValue="headgirl" className="max-w-3xl mx-auto">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            {positions.map((pos) => {
              const Icon = positionIcons[pos];
              return (
                <TabsTrigger key={pos} value={pos} className="flex items-center gap-1.5 text-sm">
                  <Icon className="w-4 h-4" />
                  {positionLabels[pos]}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {positions.map((pos) => (
            <TabsContent key={pos} value={pos} className="space-y-4">
              {candidates.filter(c => c.position === pos).map(c => (
                <CandidateCard key={c.id} candidate={c} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Candidates;

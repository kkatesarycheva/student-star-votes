import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useElection } from "@/lib/electionContext";
import { mockResults, candidates, positionLabels } from "@/lib/mockData";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Users, Vote, Settings, Download, Power, PlusCircle, Trophy, Crown, GraduationCap, Star } from "lucide-react";

const AdminDashboard = () => {
  const { isLoggedIn, isAdmin, votingOpen, toggleVoting } = useElection();
  const navigate = useNavigate();
  const [newCandidate, setNewCandidate] = useState({ name: "", position: "", year: "", statement: "" });

  if (!isLoggedIn || !isAdmin) {navigate("/login");return null;}

  const totalVoters = 54;
  const votedCount = 42;

  const exportCSV = () => {
    const rows = [["Position", "Name", "Votes"]];
    Object.entries(mockResults).forEach(([pos, results]) => {
      results.forEach((r) => rows.push([positionLabels[pos] || pos, r.name, String(r.votes)]));
    });
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "election_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const ResultSection = ({ title, icon: Icon, results, color }: {title: string;icon: React.ElementType;results: {name: string;votes: number;}[];color: string;}) => {
    const maxVotes = Math.max(...results.map((r) => r.votes));
    return (
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
          
          {title}
        </h3>
        <div className="space-y-3">
          {results.map((r, i) =>
          <div key={r.name} className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            i === 0 ? "bg-gradient-gold text-secondary-foreground" : "bg-muted text-muted-foreground"}`
            }>{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-foreground">{r.name}</span>
                  <span className="text-sm font-bold text-foreground">{r.votes}</span>
                </div>
                <Progress value={r.votes / maxVotes * 100} className="h-2" />
              </div>
              {i === 0 && <Trophy className="w-4 h-4 text-accent" />}
            </div>
          )}
        </div>
      </div>);

  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage the election process</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={votingOpen ? "default" : "secondary"} className={votingOpen ? "bg-success text-success-foreground" : ""}>
              {votingOpen ? "Voting Open" : "Voting Closed"}
            </Badge>
            <Button variant="outline" onClick={toggleVoting} className="gap-2">
              <Power className="w-4 h-4" />
              {votingOpen ? "Close Voting" : "Open Voting"}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
          { label: "Total Teachers", value: totalVoters, icon: Users },
          { label: "Votes Cast", value: votedCount, icon: Vote },
          { label: "Turnout", value: `${Math.round(votedCount / totalVoters * 100)}%`, icon: BarChart },
          { label: "Candidates", value: candidates.length, icon: Star }].
          map((s) =>
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList>
            <TabsTrigger value="results" className="gap-1.5"><BarChart className="w-4 h-4" />Results</TabsTrigger>
            <TabsTrigger value="candidates" className="gap-1.5"><Users className="w-4 h-4" />Candidates</TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5"><Settings className="w-4 h-4" />Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-6">
            <div className="flex justify-end">
              <Button variant="outline" onClick={exportCSV} className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <ResultSection title="Head Girl" icon={Crown} results={mockResults.headgirl} color="text-pink-500" />
              <ResultSection title="Head Boy" icon={GraduationCap} results={mockResults.headboy} color="text-blue-500" />
            </div>
            <ResultSection title="Prefects" icon={Star} results={mockResults.prefects} color="text-amber-500" />
          </TabsContent>

          <TabsContent value="candidates">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-accent" />
                Add New Candidate
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-card-foreground">Name</Label>
                  <Input className="mt-1" placeholder="Student name" value={newCandidate.name} onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })} />
                </div>
                <div>
                  <Label className="text-card-foreground">Position</Label>
                  <Select value={newCandidate.position} onValueChange={(v) => setNewCandidate({ ...newCandidate, position: v })}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select position" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="headgirl">Head Girl</SelectItem>
                      <SelectItem value="headboy">Head Boy</SelectItem>
                      <SelectItem value="prefect">Prefect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-card-foreground">Year Group</Label>
                  <Input className="mt-1" placeholder="e.g. Year 13" value={newCandidate.year} onChange={(e) => setNewCandidate({ ...newCandidate, year: e.target.value })} />
                </div>
                <div>
                  <Label className="text-card-foreground">Statement</Label>
                  <Input className="mt-1" placeholder="Candidate statement" value={newCandidate.statement} onChange={(e) => setNewCandidate({ ...newCandidate, statement: e.target.value })} />
                </div>
              </div>
              <Button className="bg-gradient-navy text-primary-foreground font-semibold hover:opacity-90 gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Candidate
              </Button>
            </div>

            <div className="mt-6 bg-card border border-border rounded-xl p-6 shadow-card">
              <h3 className="font-display font-semibold text-foreground mb-4">Current Candidates</h3>
              <div className="divide-y divide-border">
                {candidates.map((c) =>
                <div key={c.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-foreground">{c.name}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">Remove</Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6">
              <div>
                <h3 className="font-display font-semibold text-foreground mb-2">Voting Controls</h3>
                <p className="text-sm text-muted-foreground mb-3">Enable or disable voting for all teachers.</p>
                <Button variant={votingOpen ? "destructive" : "default"} onClick={toggleVoting} className="gap-2">
                  <Power className="w-4 h-4" />
                  {votingOpen ? "Close Voting" : "Open Voting"}
                </Button>
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-2">Add Teacher Account</h3>
                <p className="text-sm text-muted-foreground mb-3">Create login credentials for a new teacher.</p>
                <div className="flex gap-3">
                  <Input placeholder="Teacher email" className="max-w-xs" />
                  <Button className="bg-gradient-navy text-primary-foreground font-semibold hover:opacity-90">Add Teacher</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>);

};

export default AdminDashboard;
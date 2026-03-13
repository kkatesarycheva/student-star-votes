import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useElection } from "@/lib/electionContext";
import { positionLabels } from "@/lib/mockData";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Users, Vote, Settings, Download, Power, PlusCircle, Trophy, Crown, GraduationCap, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { isLoggedIn, isAdmin, votingOpen, toggleVoting, candidates, results, allVotes, teachers, addCandidate, removeCandidate, addTeacher, removeTeacher } = useElection();
  const navigate = useNavigate();
  const [newCandidate, setNewCandidate] = useState({ name: "", id: "", year: "" });
  const [newTeacherEmail, setNewTeacherEmail] = useState("");

  if (!isLoggedIn || !isAdmin) { navigate("/login"); return null; }

  const totalVoters = teachers.filter((t) => t.email !== "admin@school.com" && t.email !== "it@school.com").length;
  const votedCount = allVotes.length;

  const handleAddCandidate = () => {
    if (!newCandidate.name.trim() || !newCandidate.id.trim()) {
      toast.error("Please enter a name and ID.");
      return;
    }
    if (candidates.some((c) => c.id === newCandidate.id)) {
      toast.error("A candidate with this ID already exists.");
      return;
    }
    addCandidate({ id: newCandidate.id, name: newCandidate.name, photo: "", year: newCandidate.year });
    setNewCandidate({ name: "", id: "", year: "" });
    toast.success("Candidate added successfully.");
  };

  const handleAddTeacher = () => {
    if (!newTeacherEmail.trim() || !newTeacherEmail.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (teachers.some((t) => t.email === newTeacherEmail)) {
      toast.error("This teacher already exists.");
      return;
    }
    addTeacher(newTeacherEmail);
    setNewTeacherEmail("");
    toast.success("Teacher added successfully.");
  };

  const exportCSV = () => {
    const rows = [["Position", "Name", "Votes"]];
    results.headgirl.forEach((r) => rows.push(["Head Girl", r.name, String(r.votes)]));
    results.headboy.forEach((r) => rows.push(["Head Boy", r.name, String(r.votes)]));
    results.prefects.forEach((r) => rows.push(["Prefect", r.name, String(r.votes)]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "election_results.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const ResultSection = ({ title, icon: Icon, resultData }: { title: string; icon: React.ElementType; resultData: { name: string; votes: number }[] }) => {
    const maxVotes = Math.max(...resultData.map((r) => r.votes), 1);
    return (
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
          <Icon className="w-5 h-5 text-accent" />
          {title}
        </h3>
        {resultData.length === 0 ? (
          <p className="text-sm text-muted-foreground">No votes yet.</p>
        ) : (
          <div className="space-y-3">
            {resultData.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0 ? "bg-gradient-gold text-secondary-foreground" : "bg-muted text-muted-foreground"
                }`}>{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{r.name}</span>
                    <span className="text-sm font-bold text-foreground">{r.votes}</span>
                  </div>
                  <Progress value={(r.votes / maxVotes) * 100} className="h-2" />
                </div>
                {i === 0 && <Trophy className="w-4 h-4 text-accent" />}
              </div>
            ))}
          </div>
        )}
      </div>
    );
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
            { label: "Turnout", value: totalVoters > 0 ? `${Math.round((votedCount / totalVoters) * 100)}%` : "0%", icon: BarChart },
            { label: "Candidates", value: candidates.length, icon: Star },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            </div>
          ))}
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
              <ResultSection title="Head Girl" icon={Crown} resultData={results.headgirl} />
              <ResultSection title="Head Boy" icon={GraduationCap} resultData={results.headboy} />
            </div>
            <ResultSection title="Prefects" icon={Star} resultData={results.prefects} />
          </TabsContent>

          <TabsContent value="candidates">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-accent" />
                Add New Candidate
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-card-foreground">Student ID</Label>
                  <Input className="mt-1" placeholder="e.g. 4291" value={newCandidate.id} onChange={(e) => setNewCandidate({ ...newCandidate, id: e.target.value })} />
                </div>
                <div>
                  <Label className="text-card-foreground">Full Name</Label>
                  <Input className="mt-1" placeholder="Student name" value={newCandidate.name} onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })} />
                </div>
                <div>
                  <Label className="text-card-foreground">Year Group</Label>
                  <Input className="mt-1" placeholder="e.g. Year 13" value={newCandidate.year} onChange={(e) => setNewCandidate({ ...newCandidate, year: e.target.value })} />
                </div>
              </div>
              <Button onClick={handleAddCandidate} className="bg-gradient-navy text-primary-foreground font-semibold hover:opacity-90 gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Candidate
              </Button>
            </div>

            <div className="mt-6 bg-card border border-border rounded-xl p-6 shadow-card">
              <h3 className="font-display font-semibold text-foreground mb-4">Current Candidates ({candidates.length})</h3>
              <div className="divide-y divide-border max-h-96 overflow-y-auto">
                {candidates.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {c.id}{c.year && ` • ${c.year}`}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeCandidate(c.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
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
                <p className="text-sm text-muted-foreground mb-3">Create login credentials for a new teacher. Password will be "teacher123".</p>
                <div className="flex gap-3">
                  <Input placeholder="Teacher email" className="max-w-xs" value={newTeacherEmail} onChange={(e) => setNewTeacherEmail(e.target.value)} />
                  <Button onClick={handleAddTeacher} className="bg-gradient-navy text-primary-foreground font-semibold hover:opacity-90">Add Teacher</Button>
                </div>
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-2">Teacher Accounts</h3>
                <div className="divide-y divide-border">
                  {teachers.filter((t) => t.email !== "admin@school.com" && t.email !== "it@school.com").map((t) => (
                    <div key={t.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={t.hasVoted ? "text-success border-success/30" : "text-muted-foreground"}>
                          {t.hasVoted ? "Voted" : "Not voted"}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeTeacher(t.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

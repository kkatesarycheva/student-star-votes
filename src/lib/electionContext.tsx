import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { candidates as initialCandidates, Candidate, VoteSelection, Teacher } from "./mockData";

interface StoredVote {
  teacherEmail: string;
  selections: VoteSelection;
}

interface ElectionContextType {
  // Auth
  isLoggedIn: boolean;
  isAdmin: boolean;
  isITAdmin: boolean;
  teacherName: string;
  currentEmail: string;
  hasVoted: boolean;
  votingOpen: boolean;

  // Votes
  votes: VoteSelection;
  allVotes: StoredVote[];

  // Candidates
  candidates: Candidate[];

  // Teachers
  teachers: Teacher[];

  // Computed results
  results: {
    headgirl: { name: string; votes: number }[];
    headboy: { name: string; votes: number }[];
    prefects: { name: string; votes: number }[];
  };

  // Actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setVotes: (votes: VoteSelection) => void;
  submitVote: () => void;
  toggleVoting: () => void;
  addCandidate: (candidate: Candidate) => void;
  removeCandidate: (id: string) => void;
  addTeacher: (email: string) => void;
  removeTeacher: (id: string) => void;
}

const ElectionContext = createContext<ElectionContextType | null>(null);

export const useElection = () => {
  const ctx = useContext(ElectionContext);
  if (!ctx) throw new Error("useElection must be used within ElectionProvider");
  return ctx;
};

const defaultTeachers: Teacher[] = [
  { id: "t1", name: "Admin", email: "admin@school.com", hasVoted: false },
  { id: "t2", name: "IT Administrator", email: "it@school.com", hasVoted: false },
  { id: "t3", name: "John Smith", email: "john.smith@school.com", hasVoted: false },
  { id: "t4", name: "Jane Doe", email: "jane.doe@school.com", hasVoted: false },
];

export const ElectionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isITAdmin, setIsITAdmin] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [votingOpen, setVotingOpen] = useState(true);
  const [votes, setVotes] = useState<VoteSelection>({ headgirl: null, headboy: null, prefects: [] });
  const [allVotes, setAllVotes] = useState<StoredVote[]>([]);
  const [candidateList, setCandidateList] = useState<Candidate[]>(initialCandidates);
  const [teachers, setTeachers] = useState<Teacher[]>(defaultTeachers);

  const hasVoted = allVotes.some((v) => v.teacherEmail === currentEmail);

  const results = useMemo(() => {
    const hgCount: Record<string, number> = {};
    const hbCount: Record<string, number> = {};
    const prCount: Record<string, number> = {};

    allVotes.forEach((v) => {
      if (v.selections.headgirl) hgCount[v.selections.headgirl] = (hgCount[v.selections.headgirl] || 0) + 1;
      if (v.selections.headboy) hbCount[v.selections.headboy] = (hbCount[v.selections.headboy] || 0) + 1;
      v.selections.prefects.forEach((p) => { prCount[p] = (prCount[p] || 0) + 1; });
    });

    const toSorted = (counts: Record<string, number>) =>
      Object.entries(counts)
        .map(([id, voteCount]) => ({
          name: candidateList.find((c) => c.id === id)?.name || id,
          votes: voteCount,
        }))
        .sort((a, b) => b.votes - a.votes);

    return {
      headgirl: toSorted(hgCount),
      headboy: toSorted(hbCount),
      prefects: toSorted(prCount),
    };
  }, [allVotes, candidateList]);

  const login = (email: string, password: string) => {
    if (email === "admin@school.com" && password === "admin123") {
      setIsLoggedIn(true); setIsAdmin(true); setIsITAdmin(false);
      setTeacherName("Admin"); setCurrentEmail(email);
      return true;
    }
    if (email === "it@school.com" && password === "it123") {
      setIsLoggedIn(true); setIsAdmin(false); setIsITAdmin(true);
      setTeacherName("IT Administrator"); setCurrentEmail(email);
      return true;
    }
    // Check if teacher exists
    const teacher = teachers.find((t) => t.email === email);
    if (teacher && password === "teacher123") {
      setIsLoggedIn(true); setIsAdmin(false); setIsITAdmin(false);
      setTeacherName(teacher.name); setCurrentEmail(email);
      return true;
    }
    // Allow any email with teacher123 for demo
    if (email && password === "teacher123") {
      const name = email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      setIsLoggedIn(true); setIsAdmin(false); setIsITAdmin(false);
      setTeacherName(name); setCurrentEmail(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false); setIsAdmin(false); setIsITAdmin(false);
    setTeacherName(""); setCurrentEmail("");
    setVotes({ headgirl: null, headboy: null, prefects: [] });
  };

  const submitVote = () => {
    setAllVotes((prev) => [...prev, { teacherEmail: currentEmail, selections: { ...votes } }]);
    // Mark teacher as voted
    setTeachers((prev) => prev.map((t) => t.email === currentEmail ? { ...t, hasVoted: true } : t));
  };

  const toggleVoting = () => setVotingOpen((prev) => !prev);

  const addCandidate = (candidate: Candidate) => {
    setCandidateList((prev) => [...prev, candidate]);
  };

  const removeCandidate = (id: string) => {
    setCandidateList((prev) => prev.filter((c) => c.id !== id));
  };

  const addTeacher = (email: string) => {
    const name = email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    setTeachers((prev) => [...prev, { id: `t${Date.now()}`, name, email, hasVoted: false }]);
  };

  const removeTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ElectionContext.Provider value={{
      isLoggedIn, isAdmin, isITAdmin, teacherName, currentEmail, hasVoted, votingOpen,
      votes, allVotes, candidates: candidateList, teachers, results,
      login, logout, setVotes, submitVote, toggleVoting,
      addCandidate, removeCandidate, addTeacher, removeTeacher,
    }}>
      {children}
    </ElectionContext.Provider>
  );
};

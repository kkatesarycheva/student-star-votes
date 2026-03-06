import React, { createContext, useContext, useState, ReactNode } from "react";
import { VoteSelection } from "./mockData";

interface ElectionContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  teacherName: string;
  hasVoted: boolean;
  votingOpen: boolean;
  votes: VoteSelection;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setVotes: (votes: VoteSelection) => void;
  submitVote: () => void;
  toggleVoting: () => void;
}

const ElectionContext = createContext<ElectionContextType | null>(null);

export const useElection = () => {
  const ctx = useContext(ElectionContext);
  if (!ctx) throw new Error("useElection must be used within ElectionProvider");
  return ctx;
};

export const ElectionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [votingOpen, setVotingOpen] = useState(true);
  const [votes, setVotes] = useState<VoteSelection>({
    headgirl: null,
    headboy: null,
    prefects: [],
  });

  const login = (email: string, password: string) => {
    if (email === "admin@school.com" && password === "admin123") {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setTeacherName("Admin");
      return true;
    }
    if (email && password === "teacher123") {
      setIsLoggedIn(true);
      setIsAdmin(false);
      setTeacherName(email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setTeacherName("");
  };

  const submitVote = () => {
    setHasVoted(true);
  };

  const toggleVoting = () => setVotingOpen(prev => !prev);

  return (
    <ElectionContext.Provider value={{ isLoggedIn, isAdmin, teacherName, hasVoted, votingOpen, votes, login, logout, setVotes, submitVote, toggleVoting }}>
      {children}
    </ElectionContext.Provider>
  );
};

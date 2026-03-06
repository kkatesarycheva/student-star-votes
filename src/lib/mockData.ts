export interface Candidate {
  id: string;
  name: string;
  position: "headgirl" | "headboy" | "prefect";
  photo: string;
  statement: string;
  year: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  hasVoted: boolean;
}

export interface VoteSelection {
  headgirl: string | null;
  headboy: string | null;
  prefects: string[];
}

export const candidates: Candidate[] = [
  { id: "hg1", name: "Emily Carter", position: "headgirl", photo: "", statement: "I will champion student wellbeing and ensure every voice is heard across all year groups.", year: "Year 13" },
  { id: "hg2", name: "Amara Osei", position: "headgirl", photo: "", statement: "My goal is to create a more inclusive school environment through community-led initiatives.", year: "Year 13" },
  { id: "hg3", name: "Sophie Williams", position: "headgirl", photo: "", statement: "I believe in leading by example and building stronger connections between students and staff.", year: "Year 13" },
  { id: "hb1", name: "Daniel Lee", position: "headboy", photo: "", statement: "I will work tirelessly to improve school facilities and represent students at every level.", year: "Year 13" },
  { id: "hb2", name: "James Mensah", position: "headboy", photo: "", statement: "Together we can make this school a place where every student thrives and succeeds.", year: "Year 13" },
  { id: "hb3", name: "Oliver Patel", position: "headboy", photo: "", statement: "I bring fresh ideas for student engagement and I'm committed to transparent leadership.", year: "Year 13" },
  { id: "p1", name: "Alex Wong", position: "prefect", photo: "", statement: "I want to be a bridge between students and staff, helping to solve everyday issues.", year: "Year 12" },
  { id: "p2", name: "Sofia Ivanova", position: "prefect", photo: "", statement: "I'm passionate about organising events that bring our school community together.", year: "Year 12" },
  { id: "p3", name: "Marcus Johnson", position: "prefect", photo: "", statement: "I'll focus on improving the lunch experience and after-school activities for all.", year: "Year 12" },
  { id: "p4", name: "Priya Sharma", position: "prefect", photo: "", statement: "As prefect, I will advocate for better mental health support and peer mentoring.", year: "Year 12" },
  { id: "p5", name: "Lucas Brown", position: "prefect", photo: "", statement: "I believe in fairness and will ensure school rules are applied consistently and kindly.", year: "Year 11" },
  { id: "p6", name: "Zara Ahmed", position: "prefect", photo: "", statement: "I want to champion sustainability initiatives and make our school greener.", year: "Year 11" },
];

export const positionLabels: Record<string, string> = {
  headgirl: "Head Girl",
  headboy: "Head Boy",
  prefect: "Prefect",
};

export const mockResults = {
  headgirl: [
    { name: "Emily Carter", votes: 24 },
    { name: "Amara Osei", votes: 18 },
    { name: "Sophie Williams", votes: 12 },
  ],
  headboy: [
    { name: "Daniel Lee", votes: 22 },
    { name: "James Mensah", votes: 19 },
    { name: "Oliver Patel", votes: 13 },
  ],
  prefects: [
    { name: "Alex Wong", votes: 32 },
    { name: "Sofia Ivanova", votes: 28 },
    { name: "Priya Sharma", votes: 25 },
    { name: "Marcus Johnson", votes: 22 },
    { name: "Lucas Brown", votes: 18 },
    { name: "Zara Ahmed", votes: 15 },
  ],
};

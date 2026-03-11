export interface Candidate {
  id: string;
  name: string;
  photo: string;
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

export const positionLabels: Record<string, string> = {
  headgirl: "Head Girl",
  headboy: "Head Boy",
  prefect: "Prefect",
};

export const candidates: Candidate[] = [
  { id: "4291", name: "Aaiez Afzal", photo: "", year: "" },
  { id: "7709", name: "Zere Aldabergenova", photo: "", year: "" },
  { id: "4428", name: "Can Alemdar", photo: "", year: "" },
  { id: "3130", name: "Ela Suna Aydeniz", photo: "", year: "" },
  { id: "7684", name: "Dincsen Bilal Bakay", photo: "", year: "" },
  { id: "6915", name: "Deniz Ai Lin Baki", photo: "", year: "" },
  { id: "2053", name: "Bersun Başar", photo: "", year: "" },
  { id: "5561", name: "Melisa Başlılar", photo: "", year: "" },
  { id: "5562", name: "Timur Başlılar", photo: "", year: "" },
  { id: "5563", name: "Yasmin Başlılar", photo: "", year: "" },
  { id: "2250", name: "Nerin Batıbeniz", photo: "", year: "" },
  { id: "2365", name: "Mehmet Benlioğlu", photo: "", year: "" },
  { id: "6805", name: "Vladyslav Boiko", photo: "", year: "" },
  { id: "7535", name: "Alexandra Cara", photo: "", year: "" },
  { id: "4501", name: "Metehan Çelik", photo: "", year: "" },
  { id: "6896", name: "Nikita Chinaev", photo: "", year: "" },
  { id: "7446", name: "Behrad Delavarihasankeyadeh", photo: "", year: "" },
  { id: "3755", name: "Belgin Dilekkaya", photo: "", year: "" },
  { id: "2923", name: "Demren Ekinci", photo: "", year: "" },
  { id: "1982", name: "Almila Engin", photo: "", year: "" },
  { id: "2040", name: "Ayla Ergüler", photo: "", year: "" },
  { id: "2491", name: "Mehmet Ergün", photo: "", year: "" },
  { id: "1970", name: "Halil Cahit Falyalı", photo: "", year: "" },
  { id: "1969", name: "Melis Gülen Falyalı", photo: "", year: "" },
  { id: "2666", name: "Simay Gümüşay", photo: "", year: "" },
  { id: "9233", name: "Zuxin Guo", photo: "", year: "" },
  { id: "7588", name: "Mani Hafez Sanati", photo: "", year: "" },
  { id: "3600", name: "Filiz Hamit", photo: "", year: "" },
  { id: "3599", name: "Kardelen Hamit", photo: "", year: "" },
  { id: "2258", name: "Derin Haslıel", photo: "", year: "" },
  { id: "2064", name: "Erin Haydar", photo: "", year: "" },
  { id: "9659", name: "Liana Jafarnejad", photo: "", year: "" },
  { id: "2532", name: "Halil İlkay Kahraman", photo: "", year: "" },
  { id: "2531", name: "Şengül Kahraman", photo: "", year: "" },
  { id: "3984", name: "Oliver Can Karabulut", photo: "", year: "" },
  { id: "9806", name: "Magdalena Maria Kartuszynski", photo: "", year: "" },
  { id: "9501", name: "Anastasiia Kopysova", photo: "", year: "" },
  { id: "1988", name: "Edim Korkmazel", photo: "", year: "" },
  { id: "3536", name: "Yiğit Toprak Köşker", photo: "", year: "" },
  { id: "9218", name: "Grigorii Kostiukov", photo: "", year: "" },
  { id: "2230", name: "Ada Su Kurtarıcıeller", photo: "", year: "" },
  { id: "2745", name: "Aylin Kutluba", photo: "", year: "" },
  { id: "6692", name: "Hasan Fikri Macila", photo: "", year: "" },
  { id: "6749", name: "Jan Memish", photo: "", year: "" },
  { id: "2372", name: "Şanel Müdüroğlu", photo: "", year: "" },
  { id: "1996", name: "Demre Murat", photo: "", year: "" },
  { id: "7691", name: "Andrii Mykhailov", photo: "", year: "" },
  { id: "1972", name: "Tayla İlker Nevzat", photo: "", year: "" },
  { id: "2001", name: "Alya Öcal", photo: "", year: "" },
  { id: "7555", name: "Madina Orazaly", photo: "", year: "" },
  { id: "9466", name: "Amirsam Poorjabar", photo: "", year: "" },
  { id: "9651", name: "Abolfazl Ravanbakhsh Niar", photo: "", year: "" },
  { id: "3966", name: "Elizaveta Gven Reyser", photo: "", year: "" },
  { id: "7216", name: "Ekaterina Sarycheva", photo: "", year: "" },
  { id: "2369", name: "Elay Saygınsoy", photo: "", year: "" },
  { id: "3323", name: "Teoman Eren Schrotter Bozkaya", photo: "", year: "" },
  { id: "3774", name: "Pavel Severgin", photo: "", year: "" },
  { id: "4254", name: "Jamal Sharifov", photo: "", year: "" },
  { id: "7321", name: "Timur Slivkin", photo: "", year: "" },
  { id: "2709", name: "Seda Eda Suyolcu", photo: "", year: "" },
  { id: "7576", name: "Yaman Talay", photo: "", year: "" },
  { id: "6870", name: "Elif Taştan", photo: "", year: "" },
  { id: "2569", name: "Sare Tayanç", photo: "", year: "" },
  { id: "2456", name: "Sarp Rüzgar Tuğyan", photo: "", year: "" },
  { id: "2056", name: "Arın Türsoy", photo: "", year: "" },
  { id: "4247", name: "Ahmet Salih Ünverdi", photo: "", year: "" },
  { id: "2130", name: "Efe Uzunoğlu", photo: "", year: "" },
  { id: "1331", name: "Ayda Vehbi", photo: "", year: "" },
  { id: "6725", name: "Eylül Yılmaz", photo: "", year: "" },
];

export const mockResults = {
  headgirl: [] as { name: string; votes: number }[],
  headboy: [] as { name: string; votes: number }[],
  prefects: [] as { name: string; votes: number }[],
};

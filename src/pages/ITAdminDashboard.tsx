import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useElection } from "@/lib/electionContext";
import { candidates as initialCandidates, Candidate } from "@/lib/mockData";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileSpreadsheet,
  Image,
  Users,
  PlusCircle,
  Trash2,
  Search,
  FolderUp,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

const ITAdminDashboard = () => {
  const { isLoggedIn, isITAdmin } = useElection();
  const navigate = useNavigate();

  const [candidateList, setCandidateList] = useState<Candidate[]>(initialCandidates);
  const [newCandidate, setNewCandidate] = useState({ name: "", id: "", year: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [xlsxFile, setXlsxFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [photoUploadStatus, setPhotoUploadStatus] = useState<"idle" | "success" | "error">("idle");

  const xlsxInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  if (!isLoggedIn || !isITAdmin) {
    navigate("/login");
    return null;
  }

  const filteredCandidates = candidateList.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.includes(searchQuery)
  );

  const handleAddCandidate = () => {
    if (!newCandidate.name.trim() || !newCandidate.id.trim()) return;
    setCandidateList((prev) => [
      ...prev,
      { id: newCandidate.id, name: newCandidate.name, photo: "", year: newCandidate.year },
    ]);
    setNewCandidate({ name: "", id: "", year: "" });
  };

  const handleRemoveCandidate = (id: string) => {
    setCandidateList((prev) => prev.filter((c) => c.id !== id));
  };

  const handleXlsxSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (validTypes.includes(file.type) || file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        setXlsxFile(file);
        setUploadStatus("idle");
      }
    }
  };

  const handleXlsxUpload = () => {
    if (!xlsxFile) return;
    // Mock upload — in production this would parse the xlsx and update candidates
    setTimeout(() => {
      setUploadStatus("success");
    }, 1000);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPhotoFiles(Array.from(files));
      setPhotoUploadStatus("idle");
    }
  };

  const handlePhotoUpload = () => {
    if (photoFiles.length === 0) return;
    // Mock upload
    setTimeout(() => {
      setPhotoUploadStatus("success");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">IT Administrator</h1>
            <p className="text-muted-foreground">Manage candidates, upload data &amp; photos</p>
          </div>
          <Badge className="bg-accent text-accent-foreground">IT Admin</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Candidates", value: candidateList.length, icon: Users },
            { label: "With Photos", value: candidateList.filter((c) => c.photo).length, icon: Image },
            { label: "Without Photos", value: candidateList.filter((c) => !c.photo).length, icon: AlertCircle },
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

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload" className="gap-1.5">
              <FileSpreadsheet className="w-4 h-4" />
              Upload Candidates
            </TabsTrigger>
            <TabsTrigger value="photos" className="gap-1.5">
              <Image className="w-4 h-4" />
              Upload Photos
            </TabsTrigger>
            <TabsTrigger value="manage" className="gap-1.5">
              <Users className="w-4 h-4" />
              Manage Candidates
            </TabsTrigger>
          </TabsList>

          {/* XLSX Upload Tab */}
          <TabsContent value="upload">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6">
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-accent" />
                  Upload Candidate List (.xlsx)
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload an Excel file matching the school register format. Columns should include: Student ID, Full Name, Year Group.
                </p>
              </div>

              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors"
                onClick={() => xlsxInputRef.current?.click()}
              >
                <input
                  ref={xlsxInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleXlsxSelect}
                />
                <FileSpreadsheet className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                {xlsxFile ? (
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">{xlsxFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(xlsxFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">Click to select an Excel file</p>
                    <p className="text-sm text-muted-foreground">Supports .xlsx and .xls formats</p>
                  </div>
                )}
              </div>

              {xlsxFile && (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleXlsxUpload}
                    className="bg-gradient-gold text-secondary-foreground font-semibold hover:opacity-90 gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload &amp; Import
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setXlsxFile(null);
                      setUploadStatus("idle");
                    }}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="flex items-center gap-2 text-success bg-success/10 rounded-md px-4 py-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">File uploaded successfully! Candidates will be imported.</span>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Photo Upload Tab */}
          <TabsContent value="photos">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6">
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1 flex items-center gap-2">
                  <FolderUp className="w-5 h-5 text-accent" />
                  Upload Student Photos
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select multiple photos from a folder. File names should match Student IDs (e.g. 4291.jpg) for automatic matching.
                </p>
              </div>

              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors"
                onClick={() => photoInputRef.current?.click()}
              >
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoSelect}
                />
                <Image className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                {photoFiles.length > 0 ? (
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">{photoFiles.length} photo(s) selected</p>
                    <p className="text-sm text-muted-foreground">
                      {photoFiles.slice(0, 3).map((f) => f.name).join(", ")}
                      {photoFiles.length > 3 && ` and ${photoFiles.length - 3} more...`}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">Click to select student photos</p>
                    <p className="text-sm text-muted-foreground">
                      Select multiple images (JPG, PNG). Name files by Student ID.
                    </p>
                  </div>
                )}
              </div>

              {photoFiles.length > 0 && (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handlePhotoUpload}
                    className="bg-gradient-gold text-secondary-foreground font-semibold hover:opacity-90 gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photos
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setPhotoFiles([]);
                      setPhotoUploadStatus("idle");
                    }}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                </div>
              )}

              {photoUploadStatus === "success" && (
                <div className="flex items-center gap-2 text-success bg-success/10 rounded-md px-4 py-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {photoFiles.length} photo(s) uploaded and matched to candidates!
                  </span>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Manage Candidates Tab */}
          <TabsContent value="manage">
            {/* Add candidate form */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card mb-6">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-accent" />
                Add New Candidate
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-card-foreground">Student ID</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. 4291"
                    value={newCandidate.id}
                    onChange={(e) => setNewCandidate({ ...newCandidate, id: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-card-foreground">Full Name</Label>
                  <Input
                    className="mt-1"
                    placeholder="Student name"
                    value={newCandidate.name}
                    onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-card-foreground">Year Group</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. Year 13"
                    value={newCandidate.year}
                    onChange={(e) => setNewCandidate({ ...newCandidate, year: e.target.value })}
                  />
                </div>
              </div>
              <Button
                onClick={handleAddCandidate}
                className="bg-gradient-navy text-primary-foreground font-semibold hover:opacity-90 gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Candidate
              </Button>
            </div>

            {/* Candidate list */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">
                  Current Candidates ({candidateList.length})
                </h3>
                <div className="relative w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or ID..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="divide-y divide-border max-h-96 overflow-y-auto">
                {filteredCandidates.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {c.id}{c.year && ` • ${c.year}`}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {c.photo ? (
                        <Badge variant="outline" className="text-success border-success/30 text-xs">Photo ✓</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground text-xs">No Photo</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveCandidate(c.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredCandidates.length === 0 && (
                  <p className="py-6 text-center text-muted-foreground text-sm">No candidates found.</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ITAdminDashboard;

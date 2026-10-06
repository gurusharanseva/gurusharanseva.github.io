import { useState, useRef } from "react";
import { Upload, Trash2, LogOut, Image, Newspaper, Users, HeartHandshake, Eye, EyeOff, Pencil, Check, X, Loader2 } from "lucide-react";
import { teamMembers as initialTeam } from "./Team";
import { uploadToCloudinary } from "@/lib/cloudinary";

const ADMIN_EMAIL = "shreegurusharansevatrust@gmail.com";
const ADMIN_PASSWORD = "sgst@admin2024";

const mockGalleryItems: { id: string; caption: string; url: string }[] = [];
const mockNewsItems: { id: string; title: string; date: string; imageUrl: string }[] = [];
const mockServices = [
  { id: "1", title: "Free Medical Camps", titleHindi: "निशुल्क चिकित्सा शिविर", description: "Regular health camps in rural villages providing free consultations, medicines, and health screenings.", imageUrl: "" },
  { id: "2", title: "Charitable Hospital", titleHindi: "धर्मार्थ अस्पताल", description: "Shri Guru Sharan Health Care offers affordable treatment, surgeries, and emergency care.", imageUrl: "" },
  { id: "3", title: "Rural Healthcare Access", titleHindi: "ग्रामीण स्वास्थ्य सेवा", description: "Bringing modern healthcare to remote villages through mobile medical units.", imageUrl: "" },
  { id: "4", title: "Disaster Relief", titleHindi: "आपदा राहत", description: "Immediate response during natural calamities with food, ration kits, and medical checkups.", imageUrl: "" },
  { id: "5", title: "Clean Water & Sanitation", titleHindi: "स्वच्छ जल एवं स्वच्छता", description: "Providing clean drinking water facilities and hygiene support.", imageUrl: "" },
  { id: "6", title: "Community Outreach", titleHindi: "सामुदायिक सेवा", description: "Health awareness programs, disease prevention workshops, and community support.", imageUrl: "" },
];

type Tab = "gallery" | "news" | "team" | "services";

const TabButton = ({ id, active, icon: Icon, label, onClick }: { id: Tab; active: boolean; icon: React.ElementType; label: string; onClick: (t: Tab) => void }) => (
  <button onClick={() => onClick(id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}>
    <Icon className="h-4 w-4" />{label}
  </button>
);

const UploadBox = ({ onUpload, uploading, accept = "image/*,video/*", label = "Upload Photo or Video" }: { onUpload: (file: File) => void; uploading: boolean; accept?: string; label?: string }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div onClick={() => !uploading && ref.current?.click()} className="bg-card rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors p-8 text-center cursor-pointer">
      {uploading ? <Loader2 className="h-10 w-10 text-primary mx-auto mb-3 animate-spin" /> : <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />}
      <p className="font-medium text-foreground mb-1">{uploading ? "Uploading..." : label}</p>
      {!uploading && <p className="text-muted-foreground text-xs mt-1">JPG, PNG, JFIF, MP4 supported</p>}
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={e => { if (e.target.files?.[0]) onUpload(e.target.files[0]); }} />
    </div>
  );
};

const AdminPanel = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("gallery");

  const [galleryItems, setGalleryItems] = useState(mockGalleryItems);
  const [newsItems, setNewsItems] = useState(mockNewsItems);
  const [teamData, setTeamData] = useState(initialTeam);
  const [services, setServices] = useState(mockServices);

  const [uploading, setUploading] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newEventFile, setNewEventFile] = useState<File | null>(null);
  const [newEventPreview, setNewEventPreview] = useState("");

  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editTeamName, setEditTeamName] = useState("");
  const [editTeamRole, setEditTeamRole] = useState("");
  const [editTeamRoleHindi, setEditTeamRoleHindi] = useState("");

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editServiceDesc, setEditServiceDesc] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) { setLoggedIn(true); setError(""); }
    else setError("Invalid email or password.");
  };

  const handleGalleryUpload = async (file: File) => {
    setUploading("gallery");
    try {
      const url = await uploadToCloudinary(file, "ssgst/gallery");
      const caption = file.name.replace(/\.[^/.]+$/, "");
      setGalleryItems(prev => [...prev, { id: Date.now().toString(), caption, url }]);
    } catch { alert("Upload failed. Please try again."); }
    setUploading(null);
  };

  const handleEventFileSelect = (file: File) => {
    setNewEventFile(file);
    setNewEventPreview(URL.createObjectURL(file));
  };

  const addNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;
    let imageUrl = "";
    if (newEventFile) {
      setUploading("news");
      try { imageUrl = await uploadToCloudinary(newEventFile, "ssgst/events"); }
      catch { alert("Image upload failed."); setUploading(null); return; }
      setUploading(null);
    }
    setNewsItems(prev => [{ id: Date.now().toString(), title: newTitle, date: newDate, imageUrl }, ...prev]);
    setNewTitle(""); setNewDate(""); setNewEventFile(null); setNewEventPreview("");
  };

  const handleTeamPhotoUpload = async (file: File, memberId: string) => {
    setUploading(`team-${memberId}`);
    try {
      const url = await uploadToCloudinary(file, "ssgst/team");
      setTeamData(prev => prev.map(m => m.id === memberId ? { ...m, photoUrl: url } : m));
    } catch { alert("Upload failed."); }
    setUploading(null);
  };

  const handleServicePhotoUpload = async (file: File, serviceId: string) => {
    setUploading(`service-${serviceId}`);
    try {
      const url = await uploadToCloudinary(file, "ssgst/services");
      setServices(prev => prev.map(s => s.id === serviceId ? { ...s, imageUrl: url } : s));
    } catch { alert("Upload failed."); }
    setUploading(null);
  };

  const startEditTeam = (m: typeof teamData[0]) => { setEditingTeamId(m.id); setEditTeamName(m.name); setEditTeamRole(m.role); setEditTeamRoleHindi(m.roleHindi); };
  const saveTeamEdit = (id: string) => { setTeamData(prev => prev.map(m => m.id === id ? { ...m, name: editTeamName, role: editTeamRole, roleHindi: editTeamRoleHindi } : m)); setEditingTeamId(null); };
  const startEditService = (s: typeof services[0]) => { setEditingServiceId(s.id); setEditServiceDesc(s.description); };
  const saveServiceEdit = (id: string) => { setServices(prev => prev.map(s => s.id === id ? { ...s, description: editServiceDesc } : s)); setEditingServiceId(null); };

  if (!loggedIn) return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-elevated border border-border w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-saffron-light rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-2xl">🙏</span></div>
          <h1 className="font-playfair text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-1">Shri Guru Sharan Sewa Trust</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="your@email.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-10" placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
            </div>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors">Login</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground text-xs">Shri Guru Sharan Sewa Trust</p>
        </div>
        <button onClick={() => setLoggedIn(false)} className="flex items-center gap-2 text-muted-foreground hover:text-destructive text-sm transition-colors"><LogOut className="h-4 w-4" /> Logout</button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-wrap gap-2 mb-8">
          <TabButton id="gallery" active={activeTab === "gallery"} icon={Image} label="Gallery" onClick={setActiveTab} />
          <TabButton id="news" active={activeTab === "news"} icon={Newspaper} label="News & Events" onClick={setActiveTab} />
          <TabButton id="team" active={activeTab === "team"} icon={Users} label="Team" onClick={setActiveTab} />
          <TabButton id="services" active={activeTab === "services"} icon={HeartHandshake} label="Services" onClick={setActiveTab} />
        </div>

        {/* ── GALLERY ── */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <UploadBox onUpload={handleGalleryUpload} uploading={uploading === "gallery"} />
            {galleryItems.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-4">Gallery ({galleryItems.length} items)</h3>
                <div className="space-y-3">
                  {galleryItems.map(item => (
                    <div key={item.id} className="bg-card rounded-xl border border-border p-3 flex items-center gap-4">
                      <img src={item.url} alt={item.caption} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                      <span className="text-sm text-foreground flex-1">{item.caption}</span>
                      <button onClick={() => setGalleryItems(prev => prev.filter(g => g.id !== item.id))} className="text-muted-foreground hover:text-destructive transition-colors p-1"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {galleryItems.length === 0 && <p className="text-center text-muted-foreground text-sm py-4">No photos yet. Upload your first photo above.</p>}
          </div>
        )}

        {/* ── NEWS ── */}
        {activeTab === "news" && (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Add New Event</h3>
              <form onSubmit={addNews} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Event Title</label>
                  <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Free Medical Camp — October 2024" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                  <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                {newEventPreview
                  ? <div className="relative rounded-xl overflow-hidden aspect-video"><img src={newEventPreview} className="w-full h-full object-cover" /><button type="button" onClick={() => { setNewEventFile(null); setNewEventPreview(""); }} className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1"><X className="h-4 w-4" /></button></div>
                  : <div onClick={() => document.getElementById("event-file-input")?.click()} className="bg-muted/50 rounded-xl border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload event photo or video (optional)</p>
                      <input id="event-file-input" type="file" accept="image/*,video/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleEventFileSelect(e.target.files[0]); }} />
                    </div>
                }
                <button type="submit" disabled={!!uploading} className="w-full bg-secondary text-secondary-foreground py-2.5 rounded-xl font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {uploading === "news" ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</> : "Add Event"}
                </button>
              </form>
            </div>
            {newsItems.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-4">Events ({newsItems.length})</h3>
                <div className="space-y-3">
                  {newsItems.map(item => (
                    <div key={item.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
                      {item.imageUrl && <img src={item.imageUrl} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.title}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{item.date}</p>
                      </div>
                      <button onClick={() => setNewsItems(prev => prev.filter(n => n.id !== item.id))} className="text-muted-foreground hover:text-destructive transition-colors p-1"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TEAM ── */}
        {activeTab === "team" && (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">Update team member names, roles, and photos.</p>
            {teamData.map(member => (
              <div key={member.id} className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div onClick={() => { const el = document.getElementById(`team-photo-${member.id}`); el?.click(); }} className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border relative group cursor-pointer">
                      {uploading === `team-${member.id}` ? <Loader2 className="h-6 w-6 animate-spin text-primary" /> : member.photoUrl ? <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" /> : <Users className="h-7 w-7 text-muted-foreground" />}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full"><Upload className="h-5 w-5 text-white" /></div>
                    </div>
                    <input id={`team-photo-${member.id}`} type="file" accept="image/*,.jfif" className="hidden" onChange={e => { if (e.target.files?.[0]) handleTeamPhotoUpload(e.target.files[0], member.id); }} />
                    <p className="text-xs text-muted-foreground text-center mt-1">Photo</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    {editingTeamId === member.id ? (
                      <div className="space-y-2">
                        <input value={editTeamName} onChange={e => setEditTeamName(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Full name" />
                        <input value={editTeamRole} onChange={e => setEditTeamRole(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Role in English" />
                        <input value={editTeamRoleHindi} onChange={e => setEditTeamRoleHindi(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="भूमिका हिंदी में" />
                        <div className="flex gap-2 mt-1">
                          <button onClick={() => saveTeamEdit(member.id)} className="flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-xs font-medium"><Check className="h-3 w-3" /> Save</button>
                          <button onClick={() => setEditingTeamId(null)} className="flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-lg text-xs font-medium"><X className="h-3 w-3" /> Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold text-foreground text-sm">{member.name}</p>
                        <p className="text-xs text-primary mt-0.5">{member.role}</p>
                        <p className="text-xs text-muted-foreground">{member.roleHindi}</p>
                      </div>
                    )}
                  </div>
                  {editingTeamId !== member.id && <button onClick={() => startEditTeam(member)} className="text-muted-foreground hover:text-primary transition-colors p-1 flex-shrink-0"><Pencil className="h-4 w-4" /></button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SERVICES ── */}
        {activeTab === "services" && (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">Update service photos and descriptions for the "How We Serve" section.</p>
            {services.map(service => (
              <div key={service.id} className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div onClick={() => document.getElementById(`service-photo-${service.id}`)?.click()} className="w-20 h-16 rounded-xl bg-muted flex items-center justify-center overflow-hidden border-2 border-border relative group cursor-pointer">
                      {uploading === `service-${service.id}` ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : service.imageUrl ? <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" /> : <Image className="h-6 w-6 text-muted-foreground" />}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"><Upload className="h-5 w-5 text-white" /></div>
                    </div>
                    <input id={`service-photo-${service.id}`} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleServicePhotoUpload(e.target.files[0], service.id); }} />
                    <p className="text-xs text-muted-foreground text-center mt-1">Photo</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{service.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">{service.titleHindi}</p>
                    {editingServiceId === service.id ? (
                      <div className="space-y-2">
                        <textarea value={editServiceDesc} onChange={e => setEditServiceDesc(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                        <div className="flex gap-2">
                          <button onClick={() => saveServiceEdit(service.id)} className="flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-xs font-medium"><Check className="h-3 w-3" /> Save</button>
                          <button onClick={() => setEditingServiceId(null)} className="flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-lg text-xs font-medium"><X className="h-3 w-3" /> Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                    )}
                  </div>
                  {editingServiceId !== service.id && <button onClick={() => startEditService(service)} className="text-muted-foreground hover:text-primary transition-colors p-1 flex-shrink-0"><Pencil className="h-4 w-4" /></button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

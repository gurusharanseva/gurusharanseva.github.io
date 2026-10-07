import { useState, useRef, useEffect } from "react";
import { Upload, Trash2, LogOut, Image, Newspaper, Users, HeartHandshake, Eye, EyeOff, Pencil, Check, X, Loader2, RefreshCw } from "lucide-react";
import { teamMembers as initialTeam } from "./Team";
import { uploadToCloudinary, fetchFromCloudinary, uploadConfig, fetchConfig, CloudinaryResource, CLOUDINARY_CLOUD_NAME } from "@/lib/cloudinary";

const ADMIN_EMAIL = "shreegurusharansevatrust@gmail.com";
const ADMIN_PASSWORD = "sgst@admin2024";

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

const AdminPanel = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("gallery");

  // Cloudinary-backed state
  const [galleryItems, setGalleryItems] = useState<CloudinaryResource[]>([]);
  const [newsItems, setNewsItems] = useState<CloudinaryResource[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);

  const [teamData, setTeamData] = useState(initialTeam);
  const [services, setServices] = useState(mockServices);
  const [uploading, setUploading] = useState<string | null>(null);

  // News form
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newEventFile, setNewEventFile] = useState<File | null>(null);
  const [newEventPreview, setNewEventPreview] = useState("");

  // Team edit
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editTeamName, setEditTeamName] = useState("");
  const [editTeamRole, setEditTeamRole] = useState("");
  const [editTeamRoleHindi, setEditTeamRoleHindi] = useState("");

  // Service edit
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editServiceDesc, setEditServiceDesc] = useState("");

  const loadGallery = () => { setGalleryLoading(true); fetchFromCloudinary("ssgst/gallery").then(setGalleryItems).finally(() => setGalleryLoading(false)); };
  const loadNews = () => { setNewsLoading(true); fetchFromCloudinary("ssgst/events").then(d => setNewsItems(d.sort((a, b) => new Date(b.context.date || b.createdAt).getTime() - new Date(a.context.date || a.createdAt).getTime()))).finally(() => setNewsLoading(false)); };

  useEffect(() => { if (loggedIn && activeTab === "gallery") loadGallery(); }, [loggedIn, activeTab]);
  useEffect(() => { if (loggedIn && activeTab === "news") loadNews(); }, [loggedIn, activeTab]);

  // Load saved team/service config from Cloudinary on login
  useEffect(() => {
    if (!loggedIn) return;
    fetchConfig<Record<string, any>>("team").then(overrides => {
      if (overrides) setTeamData(initialTeam.map(m => ({ ...m, ...overrides[m.id] })));
    });
    fetchConfig<Record<string, any>>("services").then(overrides => {
      if (overrides) setServices(mockServices.map(s => ({ ...s, ...overrides[s.id] })));
    });
  }, [loggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) { setLoggedIn(true); setError(""); }
    else setError("Invalid email or password.");
  };

  const handleGalleryUpload = async (file: File) => {
    setUploading("gallery");
    try {
      const caption = file.name.replace(/\.[^/.]+$/, "");
      await uploadToCloudinary(file, "ssgst/gallery", { caption });
      setTimeout(loadGallery, 1500);
    } catch { alert("Upload failed. Please try again."); }
    setUploading(null);
  };

  const addNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate || !newEventFile) return;
    setUploading("news");
    try {
      await uploadToCloudinary(newEventFile, "ssgst/events", { title: newTitle, date: newDate });
      setNewTitle(""); setNewDate(""); setNewEventFile(null); setNewEventPreview("");
      setTimeout(loadNews, 1500);
    } catch { alert("Upload failed."); }
    setUploading(null);
  };

  const handleTeamPhotoUpload = async (file: File, memberId: string) => {
    setUploading(`team-${memberId}`);
    try {
      const { url } = await uploadToCloudinary(file, "ssgst/team");
      setTeamData(prev => {
        const updated = prev.map(m => m.id === memberId ? { ...m, photoUrl: url } : m);
        const overrides = Object.fromEntries(updated.map(m => [m.id, { name: m.name, role: m.role, roleHindi: m.roleHindi, photoUrl: m.photoUrl }]));
        uploadConfig("team", overrides);
        return updated;
      });
    } catch { alert("Upload failed."); }
    setUploading(null);
  };

  const handleServicePhotoUpload = async (file: File, serviceId: string) => {
    setUploading(`service-${serviceId}`);
    try {
      const { url } = await uploadToCloudinary(file, "ssgst/services");
      setServices(prev => {
        const updated = prev.map(s => s.id === serviceId ? { ...s, imageUrl: url } : s);
        const overrides = Object.fromEntries(updated.map(s => [s.id, { description: s.description, imageUrl: s.imageUrl }]));
        uploadConfig("services", overrides);
        return updated;
      });
    } catch { alert("Upload failed."); }
    setUploading(null);
  };

  const startEditTeam = (m: typeof teamData[0]) => { setEditingTeamId(m.id); setEditTeamName(m.name); setEditTeamRole(m.role); setEditTeamRoleHindi(m.roleHindi); };
  const saveTeamEdit = (id: string) => {
    setTeamData(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, name: editTeamName, role: editTeamRole, roleHindi: editTeamRoleHindi } : m);
      const overrides = Object.fromEntries(updated.map(m => [m.id, { name: m.name, role: m.role, roleHindi: m.roleHindi, photoUrl: m.photoUrl }]));
      uploadConfig("team", overrides);
      return updated;
    });
    setEditingTeamId(null);
  };
  const startEditService = (s: typeof services[0]) => { setEditingServiceId(s.id); setEditServiceDesc(s.description); };
  const saveServiceEdit = (id: string) => {
    setServices(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, description: editServiceDesc } : s);
      const overrides = Object.fromEntries(updated.map(s => [s.id, { description: s.description, imageUrl: s.imageUrl }]));
      uploadConfig("services", overrides);
      return updated;
    });
    setEditingServiceId(null);
  };

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
            <div onClick={() => { if (!uploading) document.getElementById("gallery-upload")?.click(); }} className="bg-card rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors p-8 text-center cursor-pointer">
              {uploading === "gallery" ? <Loader2 className="h-10 w-10 text-primary mx-auto mb-3 animate-spin" /> : <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />}
              <p className="font-medium text-foreground mb-1">{uploading === "gallery" ? "Uploading..." : "Upload Photo or Video"}</p>
              {!uploading && <p className="text-muted-foreground text-xs mt-1">JPG, PNG, JFIF, MP4 supported</p>}
              <input id="gallery-upload" type="file" accept="image/*,video/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleGalleryUpload(e.target.files[0]); }} />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Gallery ({galleryItems.length} items)</h3>
              <button onClick={loadGallery} className="text-muted-foreground hover:text-primary transition-colors"><RefreshCw className={`h-4 w-4 ${galleryLoading ? "animate-spin" : ""}`} /></button>
            </div>
            {galleryLoading ? <div className="grid grid-cols-3 gap-3">{[...Array(3)].map((_, i) => <div key={i} className="aspect-video rounded-xl bg-muted animate-pulse" />)}</div> : (
              <div className="space-y-3">
                {galleryItems.map(item => (
                  <div key={item.publicId} className="bg-card rounded-xl border border-border p-3 flex items-center gap-4">
                    <img src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_120,h_80,c_fill/${item.publicId}`} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                    <span className="text-sm text-foreground flex-1">{item.context.caption || item.publicId.split("/").pop()}</span>
                  </div>
                ))}
                {galleryItems.length === 0 && <p className="text-center text-muted-foreground text-sm py-4">No photos yet. Upload above.</p>}
              </div>
            )}
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
                  : <div onClick={() => document.getElementById("event-file")?.click()} className="bg-muted/50 rounded-xl border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload event photo (required)</p>
                      <input id="event-file" type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) { setNewEventFile(e.target.files[0]); setNewEventPreview(URL.createObjectURL(e.target.files[0])); }}} />
                    </div>
                }
                <button type="submit" disabled={!!uploading || !newEventFile} className="w-full bg-secondary text-secondary-foreground py-2.5 rounded-xl font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {uploading === "news" ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</> : "Add Event"}
                </button>
              </form>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Events ({newsItems.length})</h3>
              <button onClick={loadNews} className="text-muted-foreground hover:text-primary transition-colors"><RefreshCw className={`h-4 w-4 ${newsLoading ? "animate-spin" : ""}`} /></button>
            </div>
            {newsLoading ? <div className="space-y-3">{[...Array(2)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}</div> : (
              <div className="space-y-3">
                {newsItems.map(item => (
                  <div key={item.publicId} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
                    <img src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_80,h_60,c_fill/${item.publicId}`} alt="" className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{item.context.title}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{item.context.date}</p>
                    </div>
                  </div>
                ))}
                {newsItems.length === 0 && <p className="text-center text-muted-foreground text-sm py-4">No events yet. Add one above.</p>}
              </div>
            )}
          </div>
        )}

        {/* ── TEAM ── */}
        {activeTab === "team" && (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">Click on a photo to update it. Click ✏️ to edit name or role.</p>
            {teamData.map(member => (
              <div key={member.id} className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div onClick={() => document.getElementById(`team-photo-${member.id}`)?.click()} className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border relative group cursor-pointer">
                      {uploading === `team-${member.id}` ? <Loader2 className="h-6 w-6 animate-spin text-primary" /> : member.photoUrl ? <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" /> : <Users className="h-7 w-7 text-muted-foreground" />}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full"><Upload className="h-5 w-5 text-white" /></div>
                    </div>
                    <input id={`team-photo-${member.id}`} type="file" accept="image/*,.jfif" className="hidden" onChange={e => { if (e.target.files?.[0]) handleTeamPhotoUpload(e.target.files[0], member.id); }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {editingTeamId === member.id ? (
                      <div className="space-y-2">
                        <input value={editTeamName} onChange={e => setEditTeamName(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Full name" />
                        <input value={editTeamRole} onChange={e => setEditTeamRole(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Role in English" />
                        <input value={editTeamRoleHindi} onChange={e => setEditTeamRoleHindi(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="भूमिका हिंदी में" />
                        <div className="flex gap-2">
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
            <p className="text-muted-foreground text-sm">Click on a photo to update it. Click ✏️ to edit description.</p>
            {services.map(service => (
              <div key={service.id} className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div onClick={() => document.getElementById(`service-photo-${service.id}`)?.click()} className="w-20 h-16 rounded-xl bg-muted flex items-center justify-center overflow-hidden border-2 border-border relative group cursor-pointer">
                      {uploading === `service-${service.id}` ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : service.imageUrl ? <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" /> : <Image className="h-6 w-6 text-muted-foreground" />}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"><Upload className="h-5 w-5 text-white" /></div>
                    </div>
                    <input id={`service-photo-${service.id}`} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleServicePhotoUpload(e.target.files[0], service.id); }} />
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
                    ) : <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>}
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

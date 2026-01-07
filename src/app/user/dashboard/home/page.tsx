"use client";
import React, { useState, useEffect } from 'react';
import {
  LayoutGrid,
  Users,
  MessageCircle,
  FileText,
  Calendar,
  CreditCard,
  Star,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Download,
  ShieldCheck,
  ChevronRight,
  Bell,
  Menu,
  X,
  ExternalLink,
  User,
  Settings,
  Mail,
  Phone,
  Globe,
  Camera,
  Lock,
  Eye,
  Save,
  LogOutIcon
} from 'lucide-react';
import { useGetTickets, useTicketCreation } from '@/app/hooks/tickets';
import { useToast } from '../../../components/ui/toast';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { usePathname, useRouter } from 'next/navigation';

// --- Mock Data ---
const MOCK_EXPERTS = [
  { id: 1, name: "Dr. Sarah Chen", expertise: "Renewable Energy Strategy", geography: "APAC", seniority: "15+ Years", rating: 4.9, hourly: "$450", tags: ["ESG", "Solar", "Policy"] },
  { id: 2, name: "Marcus Thorne", expertise: "FinTech Compliance", geography: "Europe", seniority: "10+ Years", rating: 4.8, hourly: "$375", tags: ["Banking", "GDPR", "KYC"] },
  { id: 3, name: "Elena Rodriguez", expertise: "Supply Chain Optimization", geography: "LATAM", seniority: "12+ Years", rating: 4.7, hourly: "$400", tags: ["Logistics", "AI", "Manufacturing"] },
];

const MOCK_PROJECTS = [
  { id: 'PRJ-001', topic: 'Market Entry Strategy', status: 'In Progress', expert: 'Dr. Sarah Chen', budget: '$5,000' },
  { id: 'PRJ-002', topic: 'Post-Merger Integration', status: 'Pending Approval', expert: 'TBD', budget: '$12,000' }
];

// --- Sub-components ---

const Badge = ({ children, variant = "blue" }: { children: any, variant: any }) => {
  const styles = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
  };
  return <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>{children}</span>;
};

const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: any, active: any, onClick: any }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const FormField = ({ label, icon: Icon, type = "text", placeholder, value = null, onChange, multiple, required = false }: { label: any, icon: any, type: any, placeholder: any, value: any, onChange: any, multiple: any, required: boolean }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
      <input
        type={type}
        multiple={multiple}
        accept=".png,.jpg,.jpeg,.pdf,.doc"
        {...(type !== 'file' ? { value } : {})}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all`}
      />
    </div>
  </div>
);

export default function UserHomePage() {
  const [activeTab, setActiveTab] = useState('tickets');
  const [showBriefForm, setShowBriefForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { handleTicketCreation, loading, setLoading } = useTicketCreation();
  const { showToast } = useToast();
  const { data: userTickets, isLoading } = useGetTickets();

  const router = useRouter();
  const pathname = usePathname();

  // Profile State
  const [profile, setProfile] = useState({
    firstName: '',
    email: '',
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("username");
    if (storedEmail) {
      setProfile({ email: storedEmail, firstName: storedName });
    }
  }, []);

  // ticket State
  const [ticket, setTicket] = useState({
    assignedSME: "Not Assigned",
    topic: "",
    problemStatement: "",
    budgetRange: "1k - 5k",
    urgency: "Standard (3-5 days)",
    attachments: [],
  });

  // create new ticket
  const submitTicket = async (e: any) => {
    e.preventDefault();
    try {
      await handleTicketCreation(ticket);
      showToast("New Ticket created successfully", "success")
      setShowBriefForm(false)
      setTicket({ assignedSME: '', topic: '', problemStatement: '', urgency: '', attachments: [], budgetRange: '' })
      setLoading(false)
    }
    catch (err) {
      showToast("Something went wrong while creating Ticket, Try again later.", "error")
    }
  }

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (res.ok) {
        // Optional: Clear client-side cache so old data doesn't flash if they log back in
        // queryClient.clear(); 

        // Redirect to login page
        router.push('/user/login');

        // Force a router refresh to ensure Server Components re-render without the cookie
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-3 text-white">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black">S</div>
          <span className="font-bold text-xl tracking-tight">SMEonCall</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-gray-400">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-auto">
        {/* <NavItem icon={LayoutGrid} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} /> */}
        <NavItem icon={FileText} label="My Tickets" active={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} />
        {/* <NavItem icon={Users} label="Find Experts" active={activeTab === 'experts'} onClick={() => setActiveTab('experts')} /> */}
        {/* <NavItem icon={Calendar} label="Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} /> */}
        {/* <NavItem icon={CreditCard} label="Billing" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} /> */}
        {/* <NavItem icon={MessageCircle} label="Chats" active={activeTab === 'chats'} onClick={() => setActiveTab('chats')} /> */}
        {/* <NavItem icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} /> */}

        {/* Mobile Actions */}
        <div className="md:hidden mt-6 space-y-3">
          <button
            onClick={() => {
              setShowBriefForm(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            <PlusCircle size={18} />
            <span>New Request</span>
          </button>

          <button
            onClick={() => {
              handleLogout()
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition"
          >
            <LogOutIcon size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>



      <div className="pt-6 border-t border-gray-800">
        <button
          // onClick={() => setActiveTab('profile')}
          className="w-full bg-gray-800 p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-700 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{profile.firstName} {profile.lastName}</p>
            <p className="text-gray-500 text-[10px] truncate">{profile.position}</p>
          </div>
          <Settings size={14} className="text-gray-500" />
        </button>
      </div>
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    let styles = "bg-gray-100 text-gray-600";

    if (status !== "Not Assigned") styles = "bg-green-100 text-green-700 border border-green-200";

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles}`}>
        {status}
      </span>
    );
  };

  const ticketsColumn: GridColDef[] = [
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "problemStatement",
      headerName: "Problem Statement",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => <span className="text-gray-500">{params.value || "-"}</span>
    },
    {
      field: "urgency",
      headerName: "Urgency",
      flex: 1.5,
      minWidth: 250,
    },
    {
      field: "budgetRange",
      headerName: "Budget Range",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "assignedSME",
      headerName: "Assigned SME",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => <StatusBadge status={params.value} />
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">

      {/* Sidebars */}
      <aside className="hidden md:block w-64 bg-gray-900 flex-shrink-0 border-r border-gray-800">
        <SidebarContent />
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-gray-900 z-[60] transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition" onClick={() => setShowBriefForm(true)}>
              <PlusCircle size={16} />
              <span>New Request</span>
            </button>
            {/* <div className="relative p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div> */}
            <button className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition" onClick={handleLogout}>
              <LogOutIcon size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">

          {activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { label: 'Active Ticket', value: '0', icon: LayoutGrid, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Upcoming Calls', value: '4', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Unpaid Invoices', value: '2', icon: CreditCard, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Active Engagements</h2>
                    <button className="text-sm text-blue-600 font-semibold hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {MOCK_PROJECTS.map(project => (
                      <div key={project.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-blue-200 transition-all">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <FileText size={20} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{project.topic}</h3>
                            <p className="text-xs text-gray-500">Expert: {project.expert}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-4">
                          <Badge variant={project.status === 'In Progress' ? 'blue' : 'yellow'}>{project.status}</Badge>
                          <ChevronRight className="text-gray-300 hidden sm:block" size={18} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-bold">Next Call</h2>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-200">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Today @ 2:00 PM</p>
                        <h3 className="text-xl font-bold leading-tight">Sarah Chen: Tech Due Diligence</h3>
                      </div>
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Calendar size={20} />
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center font-bold text-xs">SC</div>
                      <span className="text-sm font-medium">Dr. Sarah Chen</span>
                    </div>
                    <button className="w-full py-3 bg-white text-blue-700 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-50 transition flex items-center justify-center space-x-2">
                      <ExternalLink size={16} />
                      <span>Join Video Call</span>
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          )}

          {activeTab === 'experts' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search expertise, industry, or region..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                  />
                </div>
                <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 transition shadow-sm">
                  <Filter size={18} />
                  <span>Filters</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {MOCK_EXPERTS.map(expert => (
                  <div key={expert.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-lg uppercase">
                        {expert.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg text-yellow-700">
                        <Star size={14} fill="currentColor" />
                        <span className="ml-1 text-xs font-bold">{expert.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{expert.name}</h3>
                    <p className="text-sm text-blue-600 font-semibold mb-4 leading-tight min-h-[40px]">{expert.expertise}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Geography</p>
                        <p className="text-xs font-bold text-gray-700">{expert.geography}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Experience</p>
                        <p className="text-xs font-bold text-gray-700">{expert.seniority}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {expert.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] rounded-md font-bold uppercase">{tag}</span>
                      ))}
                    </div>

                    {/* <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200">
                      Request Consultation
                    </button> */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                  <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-[2rem] shadow-lg">
                    <div className="relative group">
                      <div className="w-24 h-24 bg-blue-100 rounded-[1.8rem] flex items-center justify-center text-blue-600 text-3xl font-black">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </div>
                      <button className="absolute inset-0 bg-black/40 rounded-[1.8rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Camera size={24} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
                    <p className="text-gray-500 font-medium">{profile.position} at {profile.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition flex items-center gap-2">
                      <Save size={18} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          label="First Name"
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                        <FormField
                          label="Last Name"
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                      </div>
                      <FormField
                        label="Email Address"
                        icon={Mail}
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder={""}
                      />
                      <FormField
                        label="Phone Number"
                        icon={Phone}
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Corporate Details</h3>
                      <FormField
                        label="Company Name"
                        value={profile.company}
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      />
                      <FormField
                        label="Job Title"
                        value={profile.position}
                        onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                      />
                      <FormField
                        label="Region / Headquarters"
                        icon={Globe}
                        value={profile.region}
                        onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Security & Privacy</h3>
                        <p className="text-xs text-gray-500">Manage your password and security settings</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition group text-left">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg text-gray-600 group-hover:text-blue-600 transition">
                            <Lock size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">Change Password</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Last changed 3 months ago</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                      </button>
                      <button className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition group text-left">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg text-gray-600 group-hover:text-blue-600 transition">
                            <ShieldCheck size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">2-Step Verification</p>
                            <p className="text-[10px] text-green-600 uppercase font-bold tracking-tight">Currently Enabled</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {['tickets', 'bookings', 'chats', 'feedback'].includes(activeTab) && (
            <div className="h-full flex flex-col p-8 bg-white rounded-3xl border border-dashed border-gray-200">
              {
                activeTab === 'tickets' &&
                <Box sx={{ width: '100%' }}>
                  <DataGrid
                    rows={userTickets?.data || []}
                    columns={ticketsColumn}
                    getRowId={(row) => row.id}
                    loading={isLoading}
                    onRowClick={(params) => {
                      router.push(`${pathname}/ticket/${params.row.documentId}`);
                    }}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                    // Matching Dashboard Styles
                    sx={{
                      border: 0,
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f9fafb",
                        borderBottom: "1px solid #e5e7eb",
                        color: "#374151",
                        fontWeight: 600,
                      },
                      "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid #f3f4f6",
                      },
                      "& .MuiDataGrid-row:hover": {
                        backgroundColor: "#f9fafb",
                        cursor: "pointer",
                      },
                      "& .MuiDataGrid-cell:focus": {
                        outline: "none",
                      },
                      "& .MuiDataGrid-columnHeader:focus": {
                        outline: "none",
                      },
                    }}
                  />
                </Box>
              }
            </div>
          )}

        </main>
      </div>

      {/* Brief Form Modal */}
      {showBriefForm && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-xl rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Expert Brief</h2>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Project Requirements</p>
              </div>
              <button onClick={() => setShowBriefForm(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={submitTicket}>
              <div className="p-6 md:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <FormField label="Topic" placeholder="e.g. Market Analysis" required={true} value={ticket.topic} onChange={(e) => setTicket({ ...ticket, topic: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">The Problem Statement</label>
                  <textarea value={ticket.problemStatement} required={true} onChange={(e) => setTicket({ ...ticket, problemStatement: e.target.value })} rows={4} placeholder="Briefly describe what you'd like to achieve..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Budget Range</label>
                    <select value={ticket.budgetRange} onChange={(e) => setTicket({ ...ticket, budgetRange: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all">
                      <option value={"1k - 5k"}>1k - 5k</option>
                      <option value={"5k - 15k"}>5k - 15k</option>
                      <option value={"15k - 20k"}>15k - 20k</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Urgency</label>
                    <select value={ticket.urgency} onChange={(e) => setTicket({ ...ticket, urgency: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all">
                      <option value={"Standard (3-5 days)"}>Standard (3-5 days)</option>
                      <option value={"Urgent (24-48 hrs)"}>Urgent (24-48 hrs)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <FormField multiple type='file' label="attachments" placeholder="e.g. attachments"
                    onChange={(e) => {
                      // Convert the FileList into a real Array
                      const selectedFiles = Array.from(e.target.files);
                      setTicket({ ...ticket, attachments: selectedFiles });
                    }}
                  />
                  {ticket.attachments.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-600">
                      {ticket.attachments.map((file, index) => (
                        <li key={index}>📄 {file.name}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-blue-50 p-5 rounded-2xl flex items-start space-x-4 border border-blue-100">
                  <div className="bg-blue-600 text-white p-1 rounded-md mt-0.5 shadow-md">
                    <ShieldCheck size={16} />
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <strong>Click-wrap Agreement:</strong> By proceeding, you agree to generate a project-specific NDA for matching experts. This request falls under your Master Services Agreement (MSA).
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <button
                  disabled={loading}
                  className={`flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all
                      ${loading
                      ? "bg-gray-400 cursor-not-allowed opacity-70 pointer-events-none"
                      : ""
                    }
                    `}
                >
                  {loading ? 'Submitting...' : 'Submit Brief'}
                </button>
                <button onClick={() => setShowBriefForm(false)} className="flex-1 py-4 bg-white text-gray-500 rounded-2xl font-bold text-lg border border-gray-200 hover:bg-gray-100 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
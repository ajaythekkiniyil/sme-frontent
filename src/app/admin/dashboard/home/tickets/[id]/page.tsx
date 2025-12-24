"use client";
import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Clock,
  User,
  Mail,
  LucideSend,
  Phone,
  Building2,
  MapPin,
  Briefcase,
  FileText,
  Download,
  ArrowLeft,
  UserPlus,
  CreditCard,
  ShieldCheck,
  ExternalLink,
  Search,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useTicketDetails, useUpdateTicketStatus } from '@/app/hooks/tickets';
import { STRAPI_URL } from '@/app/components/homePage/heroSection';
import { useSme } from '@/app/hooks/getSme';
import { useToast } from '../../../../../components/ui/toast'

export default function TicketDetails({ params }: { params: Promise<{ id: number }> }) {
  const { id } = React.use(params)
  const { data: ticket, isLoading } = useTicketDetails(id);
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateTicketStatus();
  const { data: smesData, isLoading: isLoadingSMEs } = useSme();
  const { showToast } = useToast();

  // Local UI State
  const [isSMEModalOpen, setIsSMEModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleVerify = () => {
    updateStatus({ id, ticketStatus: true, assignedSmeName: null, paymentStatus: null }, {
      onSuccess: () => { showToast("Ticket status updated successfully!", "success") },
      onError: () => { showToast("Something went wrong while updating ticket status. Please try again later", "error") },
    });
  };

  const handleAssign = () => {
    setIsSMEModalOpen(true);
  };

  const handleSelectSME = (name: string) => {
    updateStatus({ id, ticketStatus: true, assignedSmeName: name, paymentStatus: null }, {
      onSuccess: () => { showToast("Ticket assigned to SME", "success"); setIsSMEModalOpen(false) },
      onError: () => { showToast("Something went wrong while updating ticket status. Please try again later", "error") },
    });
  };

  const handlePayment = () => {
    updateStatus({ id, ticketStatus: true, assignedSmeName: null, paymentStatus: 'paid' }, {
      onSuccess: () => { showToast("Payment status updated!", "success") },
      onError: () => { showToast("Something went wrong while updating ticket status. Please try again later", "error") },
    });
  };

  // Filtered SME list logic (only active user + search keyword)
  const filteredSMEs = useMemo(() => {
    if (!smesData?.data) return [];
    return smesData.data.filter((sme: any) => {
      return sme.smeStatus === 'active' &&
        (sme.legalFirstName.toLowerCase().includes(searchTerm.toLowerCase()) || sme.businessEmail?.toLowerCase().includes(searchTerm.toLowerCase()))
    });
  }, [smesData, searchTerm]);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const ticketData = ticket?.data;

  if (!ticketData) {
    return <div className="p-8 text-center text-slate-500 font-medium">Ticket not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button className="flex items-center text-slate-500 hover:text-slate-800 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <Link href={'/admin/dashboard/home/tickets'}><span className="text-sm font-medium">Back to Dashboard</span></Link>
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                    {ticketData.username}
                  </h1>
                  <div className="flex items-center mt-2 text-slate-500 text-sm">
                    <Clock className="w-4 h-4 mr-1.5" />
                    Submitted {new Date(ticketData.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <StatusBadge
                    label={ticketData.verifiedStatus ? 'Verified' : 'Not Verified'}
                    type={ticketData.verifiedStatus ? 'success' : 'warning'}
                    icon={<ShieldCheck className="w-3.5 h-3.5 mr-1" />}
                  />
                  <StatusBadge
                    label={'Payment ' + ticketData.paymentStatus}
                    type={ticketData.paymentStatus === 'paid' ? 'success' : 'neutral'}
                    icon={<CreditCard className="w-3.5 h-3.5 mr-1" />}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mt-8 py-6 border-t border-slate-100">
                <DetailItem icon={<Mail />} label="Business Email" value={ticketData.email} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mt-8 py-6 border-t border-slate-100">
                <DetailItem icon={<LucideSend />} label="Topic" value={ticketData.topic} />
              </div>
            </div>

            {/* Enquiry Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                Enquiry
              </h3>
              <div className="bg-slate-50 rounded-lg p-5 text-slate-700 leading-relaxed whitespace-pre-wrap">
                {ticketData.problemStatement}
              </div>
            </div>

            {/* Attachments Section */}
            {ticketData.attachments && ticketData.attachments.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Attachments</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ticketData.attachments.map((file: any) => (
                    <a
                      key={file.documentId}
                      href={STRAPI_URL + file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-200"
                    >
                      <div className="flex items-center min-w-0">
                        <div className="p-2 bg-slate-100 rounded text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                          <FileIcon mime={file.mime} />
                        </div>
                        <span className="ml-3 text-sm font-medium text-slate-700 truncate group-hover:text-indigo-700">
                          {file.name}
                        </span>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Admin Actions</h3>

              <div className="space-y-3">
                <ActionButton
                  onClick={handleVerify}
                  disabled={ticketData.verifiedStatus || isUpdatingStatus}
                  variant="success"
                  icon={<ShieldCheck className="w-4 h-4" />}
                >
                  {ticketData.verifiedStatus ? 'Verified' : 'Mark as Verified'}
                </ActionButton>

                <ActionButton
                  onClick={handleAssign}
                  disabled={!ticketData.verifiedStatus || isUpdatingStatus}
                  variant="warning"
                  icon={<UserPlus className="w-4 h-4" />}
                >
                  {ticketData.assignedSME !== 'Not Assigned' ? 'Assigned' : 'Assign to SME'}
                </ActionButton>

                <ActionButton
                  onClick={handlePayment}
                  disabled={!ticketData.verifiedStatus || ticketData.assignedSME === 'Not Assigned' || isUpdatingStatus}
                  variant="primary"
                  icon={<CreditCard className="w-4 h-4" />}
                >
                  {(ticketData.paymentStatus === 'pending') ? 'Payment Pending' : 'Mark as Paid'}
                </ActionButton>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <User className="w-10 h-10 text-slate-400 bg-white rounded-full p-2 mr-3 border border-slate-100" />
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Assigned SME</p>
                    <p className="text-sm font-medium text-slate-900">{ticketData.assignedSME}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* NEW: SME Selection Modal */}
      {isSMEModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Assign Subject Matter Expert</h3>
              <button onClick={() => setIsSMEModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search SME by name or expertise..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* SME List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoadingSMEs ? (
                  <div className="py-8 text-center text-slate-500">Loading SMEs...</div>
                ) : filteredSMEs.length > 0 ? (
                  filteredSMEs.map((sme: any) => (
                    <button
                      key={sme.id}
                      onClick={() => handleSelectSME(sme.legalFirstName)}
                      className="w-full flex items-center p-3 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/50 transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3">
                        {sme.legalFirstName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">{sme.legalFirstName}</p>
                        <p className="text-xs text-slate-500 truncate">{sme.discipline || 'General Expert'}</p>
                      </div>
                      <UserPlus className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-slate-500">No experts found matching "{searchTerm}"</div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button
                onClick={() => setIsSMEModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * UI Sub-Components preserved and updated
 */

function DetailItem({ icon, label, value }: { icon: any, label: any, value: any }) {
  return (
    <div className="flex items-start">
      <div className="mt-1 text-indigo-500 mr-3">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-slate-900 font-semibold mt-0.5 break-all">{value || 'N/A'}</p>
      </div>
    </div>
  );
}

function StatusBadge({ label, type, icon }: { label: any, type: 'success' | 'warning' | 'neutral', icon: any }) {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border transition-colors ${styles[type]}`}>
      {icon}
      {label}
    </span>
  );
}

function ActionButton({ children, onClick, disabled, variant, icon }: { children: any, onClick: any, disabled: any, variant: 'primary' | 'success' | 'warning', icon: any }) {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 disabled:bg-indigo-200",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100 disabled:bg-emerald-200",
    warning: "bg-orange-400 hover:bg-orange-500 text-white shadow-orange-100 disabled:bg-orange-200",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md disabled:cursor-not-allowed disabled:shadow-none ${variants[variant]}`}
    >
      {icon}
      {children}
      {disabled && variant === 'success' && <CheckCircle2 className="w-4 h-4 ml-1" />}
    </button>
  );
}

function FileIcon({ mime }: { mime: any }) {
  if (mime?.includes('pdf')) return <FileText className="w-5 h-5" />;
  if (mime?.includes('image')) return <ExternalLink className="w-5 h-5" />;
  return <FileText className="w-5 h-5" />;
}
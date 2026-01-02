"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  User,
  Mail,
  LucideSend,
  FileText,
  Download,
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  SendHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { useTicketDetails } from '@/app/hooks/tickets';

// --- MOCKED DEPENDENCIES FOR PREVIEW ---

const STRAPI_URL = "https://example.com";

// Mock Data
const MOCK_TICKET = {
  id: 1,
  topic: "Payment Gateway Integration Issue",
  username: "Alex Johnson",
  email: "alex.j@example.com",
  createdAt: new Date().toISOString(),
  verifiedStatus: true,
  paymentStatus: "pending", // 'paid', 'pending'
  assignedSME: "Sarah Connor", // 'Not Assigned' or a name
  problemStatement: "I am facing issues integrating the Stripe payment gateway with my custom checkout flow. The webhook doesn't seem to trigger after a successful payment. I've checked the logs but can't find the specific error code.",
  attachments: [
    { documentId: "doc1", url: "/logs.txt", name: "server_logs.txt", mime: "text/plain" },
    { documentId: "doc2", url: "/screenshot.png", name: "error_screenshot.png", mime: "image/png" }
  ]
};


const useToast = () => {
  return {
    showToast: (message: string, type: 'success' | 'error') => {
      console.log(`[${type.toUpperCase()}] ${message}`);
      // In a real app, this would trigger a UI toast
      // alert(message); 
    }
  };
};

// --- END MOCKED DEPENDENCIES ---

// Types for Chat
type Message = {
  id: string;
  sender: 'user' | 'sme';
  text: string;
  timestamp: Date;
};

// Modified component signature to work without Next.js router for preview
export default function TicketDetails({ params }: { params: Promise<{ id: number }> }) {
  const { id } = React.use(params)
  const { data: ticket, isLoading } = useTicketDetails(id);
  
  const { showToast } = useToast();

  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const ticketData = ticket?.data;

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Sending Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message to state
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage('');

    // Simulate SME Reply for demo
    setTimeout(() => {
      const smeMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'sme',
        text: "Thanks for the details. Have you checked if the webhook secret key matches in your dashboard settings?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, smeMsg]);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!ticketData) {
    return <div className="p-8 text-center text-slate-500 font-medium">Ticket not found.</div>;
  }

  const isAssigned = ticketData.assignedSME && ticketData.assignedSME !== 'Not Assigned';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button className="flex items-center text-slate-500 hover:text-slate-800 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <Link href={'/user/dashboard/home/'} className="text-sm font-medium">Back to My Tickets</Link>
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Ticket Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                    {ticketData.topic}
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
                    label={ticketData.verifiedStatus ? 'Verified Request' : 'Under Review'}
                    type={ticketData.verifiedStatus ? 'success' : 'warning'}
                    icon={<ShieldCheck className="w-3.5 h-3.5 mr-1" />}
                  />
                  <StatusBadge
                    label={ticketData.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                    type={ticketData.paymentStatus === 'paid' ? 'success' : 'neutral'}
                    icon={<CreditCard className="w-3.5 h-3.5 mr-1" />}
                  />
                </div>
              </div>

              {/* User Info (Read Only) */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mt-8 py-6 border-t border-slate-100">
                <DetailItem icon={<User />} label="Name" value={ticketData.ticketCreatedBy} />
                <DetailItem icon={<Mail />} label="Email" value={ticketData.ticketCreatedBy} />
              </div> */}
            </div>

            {/* Enquiry Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                Your Enquiry
              </h3>
              <div className="bg-slate-50 rounded-lg p-5 text-slate-700 leading-relaxed whitespace-pre-wrap border border-slate-100">
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
                      href={file?.url}
                      className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-200"
                      target='_blank'
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

          {/* Right Column: Chat / Status */}
          <div className="space-y-6">
            <div className="sticky top-24">
              
              {/* Conditional Rendering: Chat or Status Card */}
              {isAssigned ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Assigned Expert</h3>
                        <p className="text-indigo-600 font-semibold">{ticketData.assignedSME}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Chat Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-4">
                            <MessageSquare className="w-10 h-10 mb-2 opacity-20" />
                            <p className="text-sm">Start the conversation with your assigned expert.</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                                        msg.sender === 'user' 
                                            ? 'bg-indigo-600 text-white rounded-br-none' 
                                            : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                                    }`}
                                >
                                    <p>{msg.text}</p>
                                    <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input Area */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-50 border border-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                        <button 
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors"
                        >
                            <SendHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Not Assigned View */
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Finding an Expert</h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                        We are currently reviewing your ticket and looking for the best Subject Matter Expert (SME) to handle your request.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 border border-slate-100">
                        Average wait time: <span className="font-semibold text-slate-700">24-48 hours</span>
                    </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * UI Helper Components
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

function FileIcon({ mime }: { mime: any }) {
  if (mime?.includes('pdf')) return <FileText className="w-5 h-5" />;
  if (mime?.includes('image')) return <ExternalLink className="w-5 h-5" />;
  return <FileText className="w-5 h-5" />;
}
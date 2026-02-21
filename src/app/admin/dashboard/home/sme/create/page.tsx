"use client";

import React, { useState } from 'react';
import {
  ArrowLeft,
  UserPlus,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  GraduationCap,
  Calendar,
  FileText,
  Upload
} from 'lucide-react';
import { useRouter } from 'next/dist/client/components/navigation';
import { uploadFiles } from '@/app/lib/uploadFiles';
import { useToast } from '@/app/components/ui/toast';
import { useQueryClient } from '@tanstack/react-query';

/**
 * CreateSME Component
 * A professional registration form for Subject Matter Experts.
 * Refined with consistent styling, improved grid layouts, and robust state mapping.
 */
export default function CreateSME() {
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessEmail: "",
    businessNumber: "",
    location: "",
    school: "",
    degree: "",
    discipline: "",
    endDate: "",
    legalFirstName: "",
    legalLastName: "",
    preferredFirstName: "",
    linkedinProfile: "",
    website: "",
    whereDidYouFindOutAboutThisRole: "",
    previousEmployee: "",
    nonDisclosureAgreement: "",
    relationStatus: "",
    relationName: "",
  });

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const { showToast } = useToast();

  const handleFileChange = (e, setter) => {
    if (e.target.files && e.target.files.length > 0) {
      // normalize to an array for uploadFiles
      setter(Array.from(e.target.files));
    } else {
      setter(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'businessEmail', 'businessNumber', 'location', 'legalFirstName', 'legalLastName', 'preferredFirstName'];
    for (let field of requiredFields) {
      if (!formData[field]?.trim()) {
        setError(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
        showToast(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`, "error");
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.businessEmail)) {
      setError('Please enter a valid business email address');
      showToast('Please enter a valid business email address', "error");
      return false;
    }

    if (!resume) {
      setError('Resume is required');
      showToast('Resume is required', "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    console.log(formData, resume, coverLetter);


    try {
      let resumeId: number[] | null = null;
      let coverLetterId: number[] | null = null;

      if (resume) {
        resumeId = await uploadFiles(resume)
      }

      if (coverLetter) {
        coverLetterId = await uploadFiles(coverLetter)
      }

      const smeApplicationPayload = {
        data: {
          ...formData,
          resume: resumeId, // resume is the name used in strapi
          coverLetter: coverLetterId, // coverLetter is the name used in strapi
        }
      };

      // publlic can apply new application, no authentication required
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/sme-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smeApplicationPayload),
      });

      if (!res.ok) {
        const { error } = await res.json()
        if (error.details.errors[0].message === "This attribute must be unique") {
          showToast("This email or phone is already registered.", "error")
        }
        else {
          showToast('Something went wrong while submitting your Application.', "error")
        }
        return setLoading(false)
      }

      showToast('Application submitted successfully!', "success")
      queryClient.invalidateQueries({ queryKey: ["smes"] });
      setLoading(false)
      setFormData({
        firstName: "",
        lastName: "",
        businessEmail: "",
        businessNumber: "",
        location: "",
        school: "",
        degree: "",
        discipline: "",
        endDate: "",
        legalFirstName: "",
        legalLastName: "",
        preferredFirstName: "",
        linkedinProfile: "",
        website: "",
        whereDidYouFindOutAboutThisRole: "",
        previousEmployee: "",
        nonDisclosureAgreement: "",
        relationStatus: "",
        relationName: "",
      })
      setResume(null)
      setCoverLetter(null)
      router.push('/admin/dashboard/home/sme')
    }
    catch (err) {
      showToast('Something went wrong while submitting your Application. Please try again later', "error")
      setLoading(false)
    }
  };

  // Common Input Styling
  const inputClasses = "block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all";
  const selectClasses = "block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none";
  const labelClasses = "text-sm font-semibold text-slate-700 ml-1 mb-1.5 block";

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.back()} className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Administration Console</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 sm:px-10 border-b border-slate-100 bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">SME Registration</h2>
                <p className="text-sm text-slate-500">Initialize a new profile in the expert database</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-10 space-y-8">
            {/* Notifications */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-800 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                <p className="text-sm font-medium">{success}</p>
              </div>
            )}

            {/* Basic Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Basic Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>First Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClasses} placeholder="John" />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Last Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClasses} placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Business Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input type="email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} className={inputClasses} placeholder="john.doe@company.com" />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Business Phone</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input type="tel" name="businessNumber" value={formData.businessNumber} onChange={handleChange} className={inputClasses} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Primary Location</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClasses} placeholder="City, Country" />
                  </div>
                </div>
              </div>
            </section>

            {/* Documentation */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Professional Documents</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClasses}>Resume / CV *</label>
                  <div className="relative group border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-slate-50/50">
                    <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, setResume)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <Upload className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-slate-700 truncate">{resume ? resume.name : "Select or drag file"}</p>
                        <p className="text-[10px] text-slate-400">PDF, DOC up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Cover Letter (Optional)</label>
                  <div className="relative group border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-slate-50/50">
                    <input type="file" name="coverLetter" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, setCoverLetter)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <Upload className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-slate-700 truncate">{coverLetter ? coverLetter.name : "Select or drag file"}</p>
                        <p className="text-[10px] text-slate-400">PDF, DOC up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <GraduationCap className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Education Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelClasses}>School / University</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <input type="text" name="school" value={formData.school} onChange={handleChange} className={inputClasses} placeholder="Harvard University" />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Degree</label>
                  <select name="degree" value={formData.degree} onChange={handleChange} className={selectClasses}>
                    <option value="">Select Degree</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Master">Master's Degree</option>
                    <option value="MBA">MBA</option>
                    <option value="PhD">Doctorate (PhD)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Discipline</label>
                  <select name="discipline" value={formData.discipline} onChange={handleChange} className={selectClasses}>
                    <option value="">-- Select Discipline --</option>
                    <option>Accounting</option>
                    <option>African Studies</option>
                    <option>Agriculture</option>
                    <option>Anthropology</option>
                    <option>Applied Health Services</option>
                    <option>Architecture</option>
                    <option>Art</option>
                    <option>Asian Studies</option>
                    <option>Biology</option>
                    <option>Business</option>
                    <option>Business Administration</option>
                    <option>Chemistry</option>
                    <option>Classical Languages</option>
                    <option>Communications & Film</option>
                    <option>Computer Science</option>
                    <option>Dentistry</option>
                    <option>Developing Nations</option>
                    <option>Discipline Unknown</option>
                    <option>Earth Sciences</option>
                    <option>Economics</option>
                    <option>Education</option>
                    <option>Electronics</option>
                    <option>Engineering</option>
                    <option>English Studies</option>
                    <option>Environmental Studies</option>
                    <option>European Studies</option>
                    <option>Fashion</option>
                    <option>Finance</option>
                    <option>Fine Arts</option>
                    <option>General Studies</option>
                    <option>Health Services</option>
                    <option>History</option>
                    <option>Human Resources Management</option>
                    <option>Humanities</option>
                    <option>Industrial Arts & Carpentry</option>
                    <option>Information Systems</option>
                    <option>International Relations</option>
                    <option>Journalism</option>
                    <option>Languages</option>
                    <option>Latin American Studies</option>
                    <option>Law</option>
                    <option>Linguistics</option>
                    <option>Manufacturing & Mechanics</option>
                    <option>Mathematics</option>
                    <option>Medicine</option>
                    <option>Middle Eastern Studies</option>
                    <option>Naval Science</option>
                    <option>North American Studies</option>
                    <option>Nuclear Technics</option>
                    <option>Operations Research & Strategy</option>
                    <option>Organizational Theory</option>
                    <option>Philosophy</option>
                    <option>Physical Education</option>
                    <option>Physical Sciences</option>
                    <option>Physics</option>
                    <option>Political Science</option>
                    <option>Psychology</option>
                    <option>Public Policy</option>
                    <option>Public Service</option>
                    <option>Religious Studies</option>
                    <option>Russian & Soviet Studies</option>
                    <option>Scandinavian Studies</option>
                    <option>Science</option>
                    <option>Slavic Studies</option>
                    <option>Social Science</option>
                    <option>Social Sciences</option>
                    <option>Sociology</option>
                    <option>Speech</option>
                    <option>Statistics & Decision Theory</option>
                    <option>Urban Studies</option>
                    <option>Veterinary Medicine</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Graduation / End Date</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className={inputClasses} />
                  </div>
                </div>
              </div>
            </section>

            {/* Legal / Social */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Legal & Online Presence</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Legal First Name</label>
                  <input type="text" name="legalFirstName" value={formData.legalFirstName} onChange={handleChange} className={inputClasses.replace('pl-10', 'px-4')} placeholder="Legal Name" />
                </div>
                <div>
                  <label className={labelClasses}>Legal Last Name</label>
                  <input type="text" name="legalLastName" value={formData.legalLastName} onChange={handleChange} className={inputClasses.replace('pl-10', 'px-4')} placeholder="Legal Surname" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Preferred First Name</label>
                  <input type="text" name="preferredFirstName" value={formData.preferredFirstName} onChange={handleChange} className={inputClasses.replace('pl-10', 'px-4')} placeholder="Nickname or Professional Name" />
                </div>
                <div>
                  <label className={labelClasses}>LinkedIn Profile URL</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <input type="url" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} className={inputClasses} placeholder="linkedin.com/in/username" />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Personal Website</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input type="url" name="website" value={formData.website} onChange={handleChange} className={inputClasses} placeholder="https://yourportfolio.com" />
                  </div>
                </div>
              </div>
            </section>

            {/* Questions Section */}
            <section className="space-y-6 pt-4">
              <div className="space-y-4">
                <label className={labelClasses}>How did you hear about this role? *</label>
                <select name="whereDidYouFindOutAboutThisRole" value={formData.whereDidYouFindOutAboutThisRole} onChange={handleChange} className={selectClasses}>
                  <option value="">Select Source</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Referral">Word of mouth / Referral</option>
                  <option value="JobBoard">Job Board</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {[
                { label: "Have you previously been employed by SMEONCALL? *", name: "previousEmployee" },
                { label: "Are you subject to any non-compete agreements? *", name: "nonDisclosureAgreement" },
                { label: "Related to any SMEONCALL employees or clients? *", name: "relationStatus" }
              ].map((q) => (
                <div key={q.name} className="space-y-3">
                  <p className="text-sm font-medium text-slate-700">{q.label}</p>
                  <div className="flex gap-6">
                    {['Yes', 'No'].map(option => (
                      <label key={option} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name={q.name}
                          value={option}
                          checked={formData[q.name] === option}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-2 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {formData.relationStatus === 'Yes' && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <label className={labelClasses}>Please list the name(s)</label>
                  <input type="text" name="relationName" value={formData.relationName} onChange={handleChange} className={inputClasses.replace('pl-10', 'px-4')} placeholder="Full names of relations" />
                </div>
              )}
            </section>

            {/* Actions */}
            <div className="pt-8 flex flex-col-reverse sm:flex-row gap-4">
              <button
                onClick={() => router.back()}
                type="button"
                className="flex-1 px-6 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !!success}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-semibold text-sm disabled:bg-blue-300 disabled:shadow-none disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Initialize SME Account'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export const App = CreateSME;

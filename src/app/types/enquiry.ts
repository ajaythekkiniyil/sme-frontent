export type Enquiry = {
    id: number;
    documentId: string;
    firstName: string;
    lastName: string | null;
    company: string | null;
    businessNumber: string | null;
    businessEmail: string | null;
    location: string | null;
    field: string | null;
    enquiry: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    attachments: [{
        url: string,
        name: string,
        mime: string,
        documentId: string
    }]
};

export type smeApplication = {
    fullName: string,
    email: string,
    phone: string,
    linkedinUrl: string,
    experience: string,
    pastCompanies: string,
    expertiseAreas: string,
    languageSpoken: string
}
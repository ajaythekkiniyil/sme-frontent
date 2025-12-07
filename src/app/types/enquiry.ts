export type Tickets = {
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
    }],
    adminVerified: boolean
};
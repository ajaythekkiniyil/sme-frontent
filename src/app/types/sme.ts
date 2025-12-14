export type getStepContentSMEType = {
    fullName: string,
    smeStatus: string,
    email: string,
    phone: string,
    linkedinUrl: string,
    experience: string,
    pastCompanies: string,
    expertiseAreas: string,
    languageSpoken: string,
    resume: {
        url: string,
        name: string,
    },
    documentId: number
}

export enum smeStatusType {
    rejected = "rejected",
    active = "active",
    pending = "pending",
    inactive = "inactive",
}
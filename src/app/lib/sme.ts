import { smeStatusType } from "../types/sme";

export async function fetchSme() {
    // call api routes GET method with token
    const res = await fetch('/api/sme-applications');
    if (!res.ok) throw new Error("Failed to fetch SMEs");
    return res.json();
}

export async function fetchSmeDetails(id: number) {
    // call api routes GET method with token
    const res = await fetch(`/api/sme-applications/${id}`);
    if (!res.ok) throw new Error("Failed to fetch SMEs details");
    return res.json();
}

export async function updateSmeStatus(status: smeStatusType, id: number) {
    const res = await fetch(`/api/sme-applications/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(status)
    });
    if (!res.ok) throw new Error("Failed to update SMEs status");
    return res.json();
}

export async function createSmeAccount({ firstName, email, id }: { firstName: string, email: string, id: string }): Promise<any> {
    const defaultPassword = firstName + '@' + id;

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: firstName,
                email: email,
                password: defaultPassword,
                customRole: "sme",
                // Strapi user roles are usually numbers (2 for 'Authenticated') or IDs.
                role: 2
            })
        })

        const data = await res.json();

        if(data?.error === 'Email or Username are already taken'){
            throw new Error('Email or Username are already taken');
        }
        if (!res.ok) {
            throw new Error('Failed to register SME account');
        }

        // Return the full success data (should contain user details if successful)
        return data;
    }
    catch (err) {
        // Re-throw to be caught by useMutation's onError
        throw err;
    }
}

export async function sendInterviewInvite(details: any) {
    try {
        const response = await fetch(`/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                smeId: details.smeId,
                smeName: details.smeName,
                smeEmail: details.smeEmail,
                date: details.date,
                time: details.time,
                duration: details.duration,
                meetingLink: details.meetingLink
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to trigger email dispatch.');
        }

        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function sendWelcomeEmail(details: any) {
    try {
        const response = await fetch(`/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: details.firstName,
                email: details.email,
                password: details.firstName + '@' + details.id,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to trigger email dispatch.');
        }

        return await response.json();

    } catch (error) {
        throw error;
    }
}

export async function deleteSme(id: string | number) {
    const res = await fetch(`/api/sme-applications/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const failedRes = await res.json().catch(() => ({}));
        throw new Error(failedRes?.error?.message || failedRes?.error || "Failed to delete SME");
    }

    return res.json();
}

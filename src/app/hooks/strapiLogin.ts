import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export const useStrapiLogin = (successUrl: string) => {
    // State for the user's identifier (email or username)
    const [identifier, setIdentifier] = useState('');
    // State for the user's password
    const [password, setPassword] = useState('');
    // State for storing and displaying login errors
    const [error, setError] = useState('');
    // State to manage the loading status during form submission
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password }),
            });

            if (res.ok) {
                router.push(successUrl);

                const { user } = await res.json();

                localStorage.setItem('username', user.username);
                localStorage.setItem('email', user.email);


                // Refresh the router to re-fetch server components and
                // reflect the new authentication state (the cookie being set).
                // This ensures protected layouts and pages update correctly.
                router.refresh();
            } else {
                // const data = await res.json();
                setError('Failed to login. Please check your credentials.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { identifier, password, error, isLoading, setIdentifier, setPassword, handleSubmit }
}
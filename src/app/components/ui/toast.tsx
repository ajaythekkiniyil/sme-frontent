"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
} from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
    duration: number;
    createdAt: number;
    remaining: number;
    timer?: NodeJS.Timeout;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ICONS: Record<ToastType, string> = {
    success: "✔",
    error: "✖",
    info: "ℹ",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (message: string, type: ToastType = "info", duration = 6000) => {
            const id = Date.now();
            const createdAt = Date.now();

            const toast: Toast = {
                id,
                message,
                type,
                duration,
                createdAt,
                remaining: duration,
            };

            toast.timer = setTimeout(() => removeToast(id), duration);

            setToasts((prev) => [...prev, toast]);
        },
        [removeToast]
    );

    const pauseToast = (toast: Toast) => {
        if (toast.timer) {
            clearTimeout(toast.timer);
            toast.timer = undefined;
            toast.remaining -= Date.now() - toast.createdAt;
        }
    };

    const resumeToast = (toast: Toast) => {
        toast.createdAt = Date.now();
        toast.timer = setTimeout(() => removeToast(toast.id), toast.remaining);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-6 right-6 z-50 flex flex-col gap-4">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast-card toast-${toast.type}`}
                        onMouseEnter={() => pauseToast(toast)}
                        onMouseLeave={() => resumeToast(toast)}
                    >
                        <div className="toast-icon">{ICONS[toast.type]}</div>

                        <div className="toast-content">
                            <p>{toast.message}</p>
                        </div>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="toast-close"
                            aria-label="Close notification"
                        >
                            ×
                        </button>

                        {/* Progress Bar */}
                        <div
                            className="toast-progress"
                            style={{
                                animationDuration: `${toast.remaining}ms`,
                            }}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }
    return context;
}

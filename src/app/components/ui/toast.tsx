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
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ICONS = {
    success: "✔",
    error: "✖",
    info: "ℹ",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback(
        (message: string, type: ToastType = "info", duration = 4000) => {
            const id = Date.now();
            setToasts((prev) => [...prev, { id, message, type, duration }]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        },
        []
    );

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-6 right-6 z-50 flex flex-col gap-4">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast-card toast-${toast.type}`}
                    >
                        <div className="toast-icon">{ICONS[toast.type]}</div>

                        <div className="toast-content">
                            <p>{toast.message}</p>
                        </div>

                        <button
                            onClick={() =>
                                setToasts((prev) =>
                                    prev.filter((t) => t.id !== toast.id)
                                )
                            }
                            className="toast-close"
                        >
                            ×
                        </button>

                        {/* Progress Bar */}
                        <div
                            className="toast-progress"
                            style={{ animationDuration: `${toast.duration}ms` }}
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

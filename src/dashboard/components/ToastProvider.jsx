import { createContext, useCallback, useContext, useState } from "react";
import { IconCheck } from "./Icons";

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((opts) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, ...opts }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, opts.duration || 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="mm-dash__toast-wrap" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="mm-dash__toast">
            <IconCheck
              width={18}
              height={18}
              style={{ color: "var(--dash-gold)", flexShrink: 0 }}
            />
            <div>
              <strong>{t.title}</strong>
              {t.description && <span>{t.description}</span>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

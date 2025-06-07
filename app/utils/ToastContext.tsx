import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

type ToastContextType = {
  showSuccess: (summary: string, detail?: string, life?: number) => void;
  showInfo: (summary: string, detail?: string, life?: number) => void;
  showWarn: (summary: string, detail?: string, life?: number) => void;
  showError: (summary: string, detail?: string, life?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useRef<Toast>(null);

  const showSuccess = (summary: string, detail?: string, life?: number) => {
    toast.current?.show({
      severity: 'success',
      summary,
      detail,
      life: life || 5000,
      style: { background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }
    });
  };

  const showInfo = (summary: string, detail?: string, life?: number) => {
    toast.current?.show({
      severity: 'info',
      summary,
      detail,
      life: life || 5000,
      style: { background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }
    });
  };

  const showWarn = (summary: string, detail?: string, life?: number) => {
    toast.current?.show({
      severity: 'warn',
      summary,
      detail,
      life: life || 5000,
      style: { background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }
    });
  };

  const showError = (summary: string, detail?: string, life?: number) => {
    toast.current?.show({
      severity: 'error',
      summary,
      detail,
      life: life || 5000,
      style: { background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }
    });
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showInfo, showWarn, showError }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
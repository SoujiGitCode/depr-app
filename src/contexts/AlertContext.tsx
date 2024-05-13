import { createContext, ReactNode, useState, useCallback } from "react";

const ALERT_TIME = 600000;
const initialState = {
  text: "",
  type: "success" as AlertColor,
  isOpen: false,
};

type AlertProviderProps = { children: ReactNode };
type AlertColor = "success" | "info" | "warning" | "error";

const AlertContext = createContext({
  ...initialState,
  setAlert: (text: string, type: AlertColor) => { },
  hideAlert: () => { },
});

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlertState] = useState(initialState);

  let timeoutId: NodeJS.Timeout | null = null;

  const setAlert = useCallback((text: string, type: AlertColor) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setAlertState({ text, type, isOpen: true });

    timeoutId = setTimeout(() => {
      setAlertState(prev => ({ ...prev, isOpen: false }));
    }, ALERT_TIME);
  }, []);

  const hideAlert = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setAlertState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <AlertContext.Provider
      value={{
        ...alert,
        setAlert,
        hideAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
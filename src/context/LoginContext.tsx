import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface data {
    success: boolean, result: [{
        vorname: string,
        nachname: string,
        email: string,
        passwort: string,
        frage: string,
        antwort: string,
        type: string,
        status: string
    }];
}

interface LoginContextType {
  fetchLoginData: data | null;
  setFetchLoginData: Dispatch<SetStateAction<data | null>>;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fetchLoginData, setFetchLoginData] = useState<data | null>(null);

  return (
    <LoginContext.Provider value={{ fetchLoginData, setFetchLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};

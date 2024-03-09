import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface ModalContextType {
  changeClass: string;
  setChangeClass: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [changeClass, setChangeClass] = useState<string>("");

  return (
    <ModalContext.Provider value={{ changeClass, setChangeClass }}>
      {children}
    </ModalContext.Provider>
  );
};

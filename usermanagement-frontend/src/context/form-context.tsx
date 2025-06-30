import { createContext, useContext, useEffect, useState } from "react";

type FormData = {
  Name: string;
  Age: number;
  Gender: string;
  State: string;
};

type FormContextType = {
  formList: FormData[];
  addForm: (data: FormData) => void;
};
const defaultValues: FormData = {
  Name: "",
  Age: 0,
  Gender: "",
  State: "",
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formList, setFormList] = useState<FormData[]>(() => {
    const saved = localStorage.getItem("formList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("formList", JSON.stringify(formList));
  }, [formList]);

  const addForm = (data: FormData) => {
    setFormList((prev) => [...prev, data]);
  };

  return (
    <FormContext.Provider value={{ formList, addForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContextData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContextData must be used inside FormProvider");
  }
  return context;
};

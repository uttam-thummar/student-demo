import { createContext, FC, useContext, useState } from "react";
import { initialStudentEditContext, Student, StudentEditContextProps } from "./_models";

const StudentEditContext = createContext<StudentEditContextProps>(initialStudentEditContext);

const StudentEditContextProvider: FC<{ children: JSX.Element }> = ({ children }) => {
    const [studentEdit, setStudentEdit] = useState<Student | null >(null);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    return (
        <StudentEditContext.Provider value={{ studentEdit, setStudentEdit, isUpdate, setIsUpdate }}>
            {children}
        </StudentEditContext.Provider>
    )
}

export const useStudentEdit = () => {
    return useContext(StudentEditContext);
}

export default StudentEditContextProvider

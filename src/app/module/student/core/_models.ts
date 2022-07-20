export type SportOption = {
    name: string;
    id: string;
    value: string;
}

export type SportOptions = Array<SportOption>

export type Student = {
    id: string
    prefix: string
    firstname: string
    lastname: string
    age: number
    email: string
    phone: string
    gender: string
    address: string
    country: string
    state: string
    city: string
    skills: Array<string>
    sports: SportOptions
}

export type StudentInput = Omit<Student, 'id'>

export type Country = {
    id: number
    iso2: string
    name: string
}
export type State = {
    id: number
    iso2: string
    name: string
} | {
    id: 0
    iso2: null
    name: string
}
export type City = {
    id: number
    name: string
} | {
    id: 0
    name: "No Cities"
}

export type StudentEditContextProps = {
    studentEdit: Student | null
    setStudentEdit: React.Dispatch<React.SetStateAction<Student | null>>
    isUpdate: boolean
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export const initialStudentEditContext: StudentEditContextProps = {
    studentEdit: null,
    setStudentEdit: () => {},
    isUpdate: false,
    setIsUpdate: () => {}
}
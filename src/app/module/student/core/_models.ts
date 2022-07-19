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

export type State = {
    id: number
    name: string
    country_id: number
    country_code: string
    country_name: string
    state_code: string
    type: string | null
    latitude: string | null
    longitude: string | null
} | {
    id: 0
    name: string
    country_id?: number
    country_name: string
}
export type City = {
    id: number
    name: string
    state_id: number
    state_code: string
    state_name: string
    country_id: number
    country_code: string
    country_name: string
    latitude: string
    longitude: string
    wikiDataId: string
} | {
    id: 0
    name: string
    state_id: 0
    state_name: "No State"
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
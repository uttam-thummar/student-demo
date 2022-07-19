import React, { FC } from 'react'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'
import StudentEditContextProvider from './core/StudentEditContextProvider'

const Student: FC = () => {
    return (
        <>
            <StudentEditContextProvider>
                <>
                    <StudentForm />
                    <StudentList />
                </>
            </StudentEditContextProvider>
        </>
    )
}

export default Student

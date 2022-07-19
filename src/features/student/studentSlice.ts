import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../app/module/student/core/_models';
import { RootState } from '../../app/_redux/store';

interface StudentsState {
    students: Array<Student>
}

const initialState: StudentsState = {
    students: []
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        addStudentsToState: (state, action: PayloadAction<Student>) => {
            return {
                ...state,
                students: [...state.students, action.payload]
            }
        },
        updateStudentInState: (state, action: PayloadAction<Student>) => {
            let findIndex = state.students.findIndex(s => s.id === action.payload.id)
            let students = [...state.students]
            students[findIndex] = action.payload;
            return {
                ...state,
                students
            }
        },
        deleteStudentFromState: (state, action: PayloadAction<number>) => {
            state.students.splice(action.payload, 1)
        }
    }
})

export const { addStudentsToState, deleteStudentFromState, updateStudentInState } = studentSlice.actions;

export const selectStudents = (state: RootState) => state.student.students;

export default studentSlice.reducer;
import React, { FC } from 'react'
import { deleteStudentFromState, selectStudents } from '../../../../features/student/studentSlice'
import { useAppDispatch, useAppSelector } from '../../../_redux/hooks'
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash2Fill } from "react-icons/bs";
import { useStudentEdit } from '../core/StudentEditContextProvider';
import { Student } from '../core/_models';

const StudentList: FC = () => {
    const dispatch = useAppDispatch();
    const students = useAppSelector(selectStudents);
    const {setStudentEdit, setIsUpdate} = useStudentEdit();

    const parseJSON = (json: string) => {
        return JSON.parse(json);
    }

    const editStudent = (student: Student) => {
        setStudentEdit(student);
        setIsUpdate(true);
    }
    const deleteStudent = (index: number) => {
        if(window.confirm("Are you sure you want to delete.")){
            dispatch(deleteStudentFromState(index))
            setStudentEdit(null);
            setIsUpdate(false);
        }
    }
    return (
        <>
            <div className="container student-list">
                <table className="responsive-table">
                    <caption>Students Informations</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Country</th>
                            <th scope="col">Skills</th>
                            <th scope="col">Sports</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.length > 0 ? students.map((student, i) => (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td data-title="Name">{student.prefix} {student.firstname} {student.lastname}</td>
                                    <td data-title="Age">{student.age}</td>
                                    <td data-title="Email">{student.email}</td>
                                    <td data-title="Phone Number">{student.phone}</td>
                                    <td data-title="Gender" >{student.gender}</td>
                                    <td data-title="Address">{student.address}</td>
                                    <td data-title="City">{parseJSON(student.city).name}</td>
                                    <td data-title="State">{parseJSON(student.state).name}</td>
                                    <td data-title="Country">{parseJSON(student.country).name}</td>
                                    <td data-title="Skills">
                                        {student.skills.map((skill, skillIndex) => (
                                            <span key={skillIndex} className="badge badge-pill badge-dark">{skill}</span>
                                        ))}
                                    </td>
                                    <td data-title="Sports">
                                        {student.sports.length > 0 ? student.sports.map((sport, sportIndex) => (
                                            <span key={sportIndex} className="badge badge-pill badge-warning">{sport.value}</span>
                                        )) : (
                                            <span className="badge badge-pill badge-danger">No Sports Selected.</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className='d-block cursor-pointer pencil'><BsPencilSquare className='bs-pencil-square' onClick={() => editStudent(student)}/></span>
                                        <span className='d-block cursor-pointer trash' ><BsTrash2Fill className='bs-trash2-fill' onClick={() => deleteStudent(i)}/></span>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={13}>No Record Found.</td></tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default StudentList

import Multiselect from 'multiselect-react-dropdown'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { addStudentsToState, updateStudentInState } from '../../../../features/student/studentSlice';
import { useAppDispatch } from '../../../_redux/hooks';
import { sportOptionArray } from '../core/_data';
import { City, SportOption, SportOptions, State, Student, StudentInput } from '../core/_models';
import countriesJSON from '../core/countries.json';
import statesJSON from '../core/states.json';
import citiesJSON from '../core/cities.json';
import { useStudentEdit } from '../core/StudentEditContextProvider';

const { v4: uuidv4 } = require('uuid');

const StudentForm: FC = () => {
    const nameRegx = /^[a-zA-Z\s]+$/;
    const emailRegx = /^([a-z0-9.-]+)@([a-z0-9-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const multiselectRef = useRef<Multiselect>(null);
    const dispatch = useAppDispatch();
    const { studentEdit, setStudentEdit, isUpdate, setIsUpdate } = useStudentEdit();
    const [countries] = useState(countriesJSON);
    const [states, setStates] = useState<Array<State>>([]);
    const [cities, setCities] = useState<Array<City>>([]);
    const [sportsOptions] = useState<SportOptions>(sportOptionArray);
    const [selectedSports, setSelectedSports] = useState<SportOptions>([]);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<StudentInput>();
    const fetchStatesByCountry = (e: React.ChangeEvent<HTMLSelectElement> | null, countryName = '') => {
        setStates([]);
        setCities([]);
        setValue('state', '');
        setValue('city', '')
        if (e !== null) {
            const countryId = e.target.selectedOptions[0].getAttribute('data-country-id');
            if (countryId === null) {
                setStates([]);
                return;
            }
            const statesArray: Array<State> = statesJSON.filter((state) => state.country_id === parseInt(countryId));
            // setStates(statesArray);
            if(statesArray.length > 0){
                setStates(statesArray);
                setCities([]);
            }else{
                setStates([{
                    id: 0,
                    name: "No States",
                    country_id: parseInt(countryId),
                    country_name: e.target.value
                }]);
                setCities([]);
            }
            return;
        } else if (countryName !== '') {
            const statesArray: Array<State> = statesJSON.filter((state) => state.country_name === countryName);
            // setStates(statesArray);
            if(statesArray.length > 0){
                setStates(statesArray);
                setCities([]);
            }else{
                setStates([{
                    id: 0,
                    name: "No States",
                    country_name: countryName
                }]);
                setCities([])
            }
            return;
        }
        setStates([]);
        setCities([]);
        return;
    }
    const fetchCitiesByState = (e: React.ChangeEvent<HTMLSelectElement> | null, stateName = '') => {
        if (e !== null) {
            const stateId = e.target.selectedOptions[0].getAttribute('data-state-id');
            if (stateId === null) {
                setCities([]);
                return;
            }
            const citiesArray: Array<City> = citiesJSON.filter((city: City) => city.state_id === parseInt(stateId));
            // setCities(citiesArray);
            if(citiesArray.length > 0){
                setCities(citiesArray);
            }else{
                setCities([{
                    id: 0,
                    name: "No City",
                    state_id: 0,
                    state_name: "No State"
                }]);
            }
            return;
        } else if (stateName !== '') {
            const citiesArray: Array<City> = citiesJSON.filter((city: City) => city.state_name === stateName);
            // setCities(citiesArray);
            if(citiesArray.length > 0){
                setCities(citiesArray);
            }else{
                setCities([{
                    id: 0,
                    name: "No City",
                    state_id: 0,
                    state_name: "No State"
                }]);
            }
            return;
        }
        setCities([]);
        return;
    }
    const onSportSelect = (selectedList: SportOptions, selectedItem: SportOption) => {
        setSelectedSports(selectedList)
    }
    const studentFormSubmit = (data: StudentInput) => {
        if (isUpdate) {
            const updatedStudentData = { id: studentEdit?.id, ...data, sports: selectedSports }
            dispatch(updateStudentInState(updatedStudentData as Student))
            setStudentEdit(null);
            setIsUpdate(false);
            reset();
            setSelectedSports([]);
            return;
        }
        const id = uuidv4();
        const studentData = { id, ...data, sports: selectedSports };
        dispatch(addStudentsToState(studentData));
        setSelectedSports([]);
        reset();
    }
    useEffect(() => {
        if (studentEdit !== null) {
            fetchStatesByCountry(null, studentEdit.country)
            fetchCitiesByState(null, studentEdit.state);
            setValue('prefix', studentEdit.prefix);
            setValue('firstname', studentEdit.firstname);
            setValue('lastname', studentEdit.lastname);
            setValue('age', studentEdit.age);
            setValue('email', studentEdit.email);
            setValue('phone', studentEdit.phone);
            setValue('gender', studentEdit.gender);
            setValue('address', studentEdit.address);
            setValue('country', studentEdit.country);
            setValue('state', studentEdit.state);
            setValue('city', studentEdit.city);
            setValue('skills', studentEdit.skills);
            setValue('sports', studentEdit.sports);
            setSelectedSports(studentEdit.sports)
        }else{
            reset();
            setSelectedSports([]);
        }
    }, [studentEdit]);

    return (
        <>
            <div className='container'>
                <div className="student-from">
                    <div className='panel panel-primary dialog-panel'>
                        <div className='panel-heading'>
                            <h5>Student Admission</h5>
                        </div>
                        <div className='panel-body'>
                            <form
                                className='form-horizontal'
                                onSubmit={handleSubmit(studentFormSubmit)}
                            >
                                <div className='form-group'>
                                    <label className='control-label col-md-2 col-md-offset-2' htmlFor='name'>Name</label>
                                    <div className='col-md-8'>
                                        <div className='col-md-2'>
                                            <div className='form-group internal'>
                                                <select
                                                    className='form-control'
                                                    id='prefix'
                                                    {...register("prefix", {
                                                        required: "Please Select Prefix"
                                                    })}
                                                    defaultValue={'Mr'}
                                                >
                                                    <option value={'Mr'}>Mr</option>
                                                    <option value={'Ms'}>Ms</option>
                                                    <option value={'Mrs'}>Mrs</option>
                                                    <option value={'Miss'}>Miss</option>
                                                    <option value={'Dr'}>Dr</option>
                                                </select>
                                            </div>
                                            <div className="invalid-feedback">
                                                <small>{errors.prefix?.message}</small>
                                            </div>
                                        </div>
                                        <div className='col-md-3 indent-small'>
                                            <div className='form-group internal'>
                                                <input
                                                    className='form-control'
                                                    id='firstname'
                                                    placeholder='First Name'
                                                    type='text'
                                                    {...register("firstname", {
                                                        required: "Please Fill Firstname",
                                                        pattern: {
                                                            value: nameRegx,
                                                            message: "Only letters and white spaces allowed in Firstname."
                                                        }
                                                    })}
                                                />
                                            </div>
                                            <div className="invalid-feedback">
                                                <small>{errors.firstname?.message}</small>
                                            </div>
                                        </div>
                                        <div className='col-md-3 indent-small'>
                                            <div className='form-group internal'>
                                                <input
                                                    className='form-control'
                                                    id='lastname'
                                                    placeholder='Last Name'
                                                    type='text'
                                                    {...register("lastname", {
                                                        required: "Please Fill Lastname",
                                                        pattern: {
                                                            value: nameRegx,
                                                            message: "Only letters and white spaces allowed in Lastname."
                                                        }
                                                    })}
                                                />
                                            </div>
                                            <div className="invalid-feedback">
                                                <small>{errors.lastname?.message}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label col-md-2 col-md-offset-2' htmlFor='age'>Age</label>
                                    <div className='col-md-8'>
                                        <div className='col-md-4'>
                                            <div className='form-group internal'>
                                                <input
                                                    className='form-control col-md-8'
                                                    id='age'
                                                    placeholder='18+ years'
                                                    type='number'
                                                    {...register('age', {
                                                        required: "Please fill the Age.",
                                                        pattern: {
                                                            value: /^[\d]+$/,
                                                            message: "Enter valid age."
                                                        }
                                                    })}
                                                />
                                            </div>
                                            <div className="invalid-feedback">
                                                <small>{errors.age?.message}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label col-md-2 col-md-offset-2' htmlFor='contact'>Contact</label>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <div className='col-md-11'>
                                                <input
                                                    className='form-control'
                                                    id='email'
                                                    placeholder='E-mail'
                                                    type='email'
                                                    {...register('email', {
                                                        required: "Please fill the email.",
                                                        pattern: {
                                                            value: emailRegx,
                                                            message: "Enter valid email."
                                                        }
                                                    })}
                                                />
                                                <div className="invalid-feedback">
                                                    <small>{errors.email?.message}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-group internal'>
                                            <div className='col-md-11'>
                                                <input
                                                    className='form-control'
                                                    id='id_phone'
                                                    placeholder='Phone: xxxxx xxxxx'
                                                    type='text'
                                                    {...register('phone', {
                                                        required: "Please fill the Phone No.",
                                                        pattern: {
                                                            value: /^[\d+\-()\s]+$/,
                                                            message: "Enter valid Phone No."
                                                        }
                                                    })}
                                                />
                                                <div className="invalid-feedback">
                                                    <small>{errors.phone?.message}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label col-md-2 col-md-offset-2' htmlFor='gender'>Gender</label>
                                    <div className='col-md-8'>
                                        <div className="col-md-6 student-check-group">
                                            <div className='student-check-control'>
                                                <input
                                                    type="radio"
                                                    className="student-check-input"
                                                    {...register('gender', {
                                                        required: "Please select your gender",
                                                    })}
                                                    name="gender"
                                                    id="male"
                                                    autoComplete="off"
                                                    value={'Male'}
                                                />
                                                <label className="student-check-label" htmlFor="male">Male</label>
                                            </div>
                                            <div className='student-check-control'>
                                                <input
                                                    type="radio"
                                                    className="student-check-input"
                                                    {...register('gender', {
                                                        required: "Please select your gender",
                                                    })}
                                                    name="gender"
                                                    id="female"
                                                    autoComplete="off"
                                                    value={"Female"}
                                                />
                                                <label className="student-check-label" htmlFor="female">Female</label>
                                            </div>
                                            <div className="invalid-feedback">
                                                <small>{errors.gender?.message}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label col-md-2 col-md-offset-2' htmlFor='address'>Address</label>
                                    <div className='col-md-6'>
                                        <div>
                                            <textarea
                                                className='form-control'
                                                id='address'
                                                placeholder='eg. 123, Main Street'
                                                rows={3}
                                                {...register('address', {
                                                    required: "Please Fill your address",
                                                })}
                                            />
                                            <div className="invalid-feedback">
                                                <small>{errors.address?.message}</small>
                                            </div>
                                        </div>
                                        <div className='student-region-group'>
                                            <div className='col-md-4'>
                                                <div className='form-group internal'>
                                                    <label htmlFor="country" className='student-region-label'>Country</label>
                                                    <select
                                                        className='form-control'
                                                        id='country'
                                                        {...register('country', {
                                                            onChange: (e) => fetchStatesByCountry(e),
                                                            required: "Please select country.",
                                                        })}
                                                    >
                                                        <option value=''>----- select -----</option>
                                                        {countries.map((country, i) => (
                                                            <option
                                                                key={i}
                                                                data-country-id={country.id}
                                                                value={country.name}
                                                            >{country.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        <small>{errors.country?.message}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className='form-group internal'>
                                                    <label htmlFor="state" className='student-region-label'>State</label>
                                                    <select
                                                        className='form-control'
                                                        id='state'
                                                        {...register('state', {
                                                            onChange: (e) => fetchCitiesByState(e),
                                                            required: "Please select state.",
                                                        })}
                                                    >
                                                        <option value=''>----- select -----</option>
                                                        {states.map((state, i) => (
                                                            <option
                                                                key={i}
                                                                data-state-id={state.id}
                                                                value={state.name}
                                                            >{state.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        <small>{errors.state?.message}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className='form-group internal'>
                                                    <label htmlFor="city" className='student-region-label'>City</label>
                                                    <select
                                                        className='form-control'
                                                        id='city'
                                                        {...register('city', {
                                                            required: "Please select city.",
                                                        })}
                                                    >
                                                        <option value=''>----- select -----</option>
                                                        {cities.map((city, i) => (
                                                            <option
                                                                key={i}
                                                                data-city-id={city.id}
                                                                value={city.name}
                                                            >{city.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        <small>{errors.city?.message}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label col-md-2 col-md-offset-2' htmlFor='skills'>Skills</label>
                                    <div className='col-md-8'>
                                        <div className="col-md-12 student-check-group">
                                            <div className='student-check-control'>
                                                <input
                                                    type="checkbox"
                                                    className="student-check-input"
                                                    {...register('skills', {
                                                        required: "Select atleast one skill.",
                                                    })}
                                                    name="skills"
                                                    id="java"
                                                    autoComplete="off"
                                                    value={'Java'}
                                                />
                                                <label className="student-check-label" htmlFor="java">JAVA</label>
                                            </div>
                                            <div className='student-check-control'>
                                                <input
                                                    type="checkbox"
                                                    className="student-check-input"
                                                    {...register('skills', {
                                                        required: "Select atleast one skill.",
                                                    })}
                                                    name="skills"
                                                    id="python"
                                                    autoComplete="off"
                                                    value={"Python"}
                                                />
                                                <label className="student-check-label" htmlFor="python">Python</label>
                                            </div>
                                            <div className='student-check-control'>
                                                <input
                                                    type="checkbox"
                                                    className="student-check-input"
                                                    {...register('skills', {
                                                        required: "Select atleast one skill.",
                                                    })}
                                                    name="skills"
                                                    id="php"
                                                    autoComplete="off"
                                                    value={"PHP"}
                                                />
                                                <label className="student-check-label" htmlFor="php">PHP</label>
                                            </div>
                                            <div className='student-check-control'>
                                                <input
                                                    type="checkbox"
                                                    className="student-check-input"
                                                    {...register('skills', {
                                                        required: "Select atleast one skill.",
                                                    })}
                                                    name="skills"
                                                    id="javascript"
                                                    autoComplete="off"
                                                    value={"JavaScript"}
                                                />
                                                <label className="student-check-label" htmlFor="javascript">JavaScript</label>
                                            </div>
                                            <div className='student-check-control'>
                                                <input
                                                    type="checkbox"
                                                    className="student-check-input"
                                                    {...register('skills', {
                                                        required: "Select atleast one skill.",
                                                    })}
                                                    name="skills"
                                                    id="flutter"
                                                    autoComplete="off"
                                                    value={"Flutter"}
                                                />
                                                <label className="student-check-label" htmlFor="flutter">Flutter</label>
                                            </div>
                                            <div className='student-check-control'>
                                                <input
                                                    type="checkbox"
                                                    className="student-check-input"
                                                    {...register('skills', {
                                                        required: "Select atleast one skill.",
                                                    })}
                                                    name="skills"
                                                    id="c++"
                                                    autoComplete="off"
                                                    value={"C++"}
                                                />
                                                <label className="student-check-label" htmlFor="c++">C++</label>
                                            </div>
                                            <div className="invalid-feedback">
                                                <small>{errors.skills?.message}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label className='control-label col-md-2 col-md-offset-2' htmlFor='sports'>Sports You Like</label>
                                    <div className='col-md-8'>
                                        <div className='form-group internal'>
                                            <Multiselect
                                                options={sportsOptions}
                                                displayValue="name"
                                                selectionLimit={4}
                                                placeholder="Select sport that you like, Maximum 4"
                                                isObject
                                                closeIcon="cancel"
                                                id='sport_options'
                                                ref={multiselectRef}
                                                selectedValues={selectedSports}
                                                onSelect={(selectedList, selectedItem) => onSportSelect(selectedList, selectedItem)}
                                                onRemove={(selectedList, selectedItem) => onSportSelect(selectedList, selectedItem)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div className='col-md-offset-4 col-md-3'>
                                        <button className='btn-lg btn-primary' type='submit'>{isUpdate ? "Save" : "Submit"}</button>
                                    </div>
                                    <div className='col-md-3'>
                                        <button className='btn-lg btn-danger' style={{ float: 'right' }} onClick={() => { setStudentEdit(null);setIsUpdate(false);setSelectedSports([]);reset(); multiselectRef?.current?.resetSelectedValues() }} type='button'>Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentForm

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface FormData {
    userName: string;
    email: string;
    password: string;
    age: number;
    gender: 'male' | 'female' | 'other';
}

function HookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (!/\S+@\S+\.\S+/.test(data.email)) {
            alert('Invalid email address');
            return;
        }

        alert(
            `UserName: ${data.userName}\nEmail: ${data.email}\nPassword: ${data.password}\nAge: ${data.age}\nGender: ${data.gender}`
        );
    };

    console.log(errors);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>UserName</label>
                    <input
                        {...register('userName', { required: true, minLength: 2 })}
                        placeholder="Enter UserName"
                    />
                    {errors.userName && (
                        <p>UserName is required and must be at least 2 characters long.</p>
                    )}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        {...register('email', {
                            required: true,
                            pattern: /\S+@\S+\.\S+/
                        })}
                        placeholder="Enter Email"
                    />
                    {errors.email && (
                        <p>Email is required and must be in the format text@text.text.</p>
                    )}
                </div>

                <div>
                    <label>Password</label>
                    <input
                        {...register('password', {
                            required: true,
                            validate: {
                                uppercase: (value) => (/[A-Z]/.test(value) || 'Password must contain at least one uppercase letter'),
                                lowercase: (value) => (/[a-z]/.test(value) || 'Password must contain at least one lowercase letter'),
                                specialChar: (value) => (/[!@#$%^&*]/.test(value) || 'Password must contain at least one special character'),
                                digit: (value) => (/\d/.test(value) || 'Password must contain at least one digit')                            }
                        })}
                        placeholder="Enter Password"
                    />
                    {errors.password && <p>{ errors.password.message}</p>}
                </div>

                <div>
                    <label>Age</label>
                    <input
                        {...register('age', { required: true })}
                        type="number"
                        placeholder="Enter Age"
                    />
                    {errors.age && <p>Age is required.</p>}
                </div>

                <div>
                    <label>Gender</label>
                    <select {...register('gender', { required: true })}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <p>Gender is required.</p>}
                </div>

                <input type="submit" />
            </form>
        </div>
    );
}

export default HookForm;

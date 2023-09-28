import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControl, TextField, Button } from '@mui/material';

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

    return (
        <FormControl>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextField
                        {...register('userName', { required: true, minLength: 2 })}
                        label="UserName"
                        placeholder="Enter UserName"
                        error={!!errors.userName}
                        helperText={
                            errors.userName
                                ? 'UserName is required and must be at least 2 characters long.'
                                : ''
                        }
                    />
                </div>

                <div>
                    <TextField
                        {...register('email', {
                            required: true,
                            pattern: /\S+@\S+\.\S+/
                        })}
                        label="Email"
                        placeholder="Enter Email"
                        error={!!errors.email}
                        helperText={
                            errors.email
                                ? 'Email is required and must be in the format text@text.text.'
                                : ''
                        }
                    />
                </div>

                <div>
                    <TextField
                        {...register('password', {
                            required: true,
                            validate: {
                                uppercase: (value) =>
                                    /[A-Z]/.test(value) ||
                                    'Password must contain at least one uppercase letter',
                                lowercase: (value) =>
                                    /[a-z]/.test(value) ||
                                    'Password must contain at least one lowercase letter',
                                specialChar: (value) =>
                                    /[!@#$%^&*]/.test(value) ||
                                    'Password must contain at least one special character',
                                digit: (value) =>
                                    /\d/.test(value) || 'Password must contain at least one digit'
                            }
                        })}
                        label="Password"
                        placeholder="Enter Password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </div>

                <div>

                    <TextField
                        {...register('age', { required: true })}
                        type="number"
                        error={!!errors.age}
                        helperText={errors.age && 'Age is required.'}
                        label="Age"
                        placeholder="Enter Age"
                    // InputLabelProps={{ shrink: true }}
                    // InputProps={{
                    //     inputProps: {
                    //         min: 1,
                    //         max: 120
                    //     }
                    // }}
                    // variant="outlined"
                    // fullWidth
                    />
                </div>

                <div>
                    <TextField
                        {...register('gender', { required: true })}
                        select
                        label="Gender"
                        defaultValue=""
                        error={!!errors.gender}
                        helperText={errors.gender && 'Gender is required.'}
                        // variant="outlined"
                        fullWidth


                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </TextField>
                </div>

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </FormControl>
    );
}

export default HookForm;
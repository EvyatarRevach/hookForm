import  { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  username: string;
  email: string;
  password:string;
}

function RegularForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Change Me To React Hook Form</h1>
      <div>
        <input
          type="text"
          id="username"
          name="username"
          placeholder='Enter UserName'
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          id="email"
          name="email"
          placeholder='Enter Email'
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          id="password"
          name="password"
          placeholder='Enter Password'
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegularForm;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
import { useForm } from 'react-hook-form';


function Signup() {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async (data) => {
        console.log(data);
        setIsLoading(true);
    
      console.log(watch("example"))
    
    
      fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tells the server you're sending JSON
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      })
        .then((response) => {
          if (response.ok) {
            setIsLoading(false);
            navigate("/");
            return response.json(); // Parse JSON response


          }

          throw new Error("Login failed");
        })
        .then((data) => {
          console.log("Registered successful:", data); // Handle success response
            navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error.message); // Handle errors
            setError(error.message);
        });
    };






    return (
        <div className="login">
            <div className="container">
                <h1>Sign up</h1>
                {/* { && <div className="error-message">{error}</div>} */}
                <div className="error-message">{error}</div>
                
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            {...register("username", { required: true })}

                            type="text"
                            
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                        />
                         {errors.username && <span>This field is required</span>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />
                        {errors.password && <span>This field is required</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Create a account'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
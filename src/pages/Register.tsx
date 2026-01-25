import { Link, useNavigate } from "react-router";
import ApiUsersClient from "../api/apiUsersClient";
import type { UserView } from "../models/User";
import { useForm, type SubmitHandler } from "react-hook-form";
import validator from "validator";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserView>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<UserView> = async (userData: UserView) => {
    const response = await ApiUsersClient.register(userData);

    if (response.status === 200) {
      reset();
      navigate("/success", {
        state: { message: response.result.message },
      });
    }
  };

  return (
    <main>
      <div className="container">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            <div className="input-group vertical">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your name..."
                {...register("firstName", {
                  required: "What's your name?",
                })}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
          }
          {
            <div className="input-group vertical">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your surname..."
                {...register("lastName", {
                  required: "What's your last name?",
                })}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
          }
          {
            <div className="input-group vertical">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email..."
                {...register("email", {
                  required: "Email can't be empty.",
                  validate: (value) =>
                    validator.isEmail(value) ||
                    "Please use a valid email address.",
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          }
          {
            <div className="input-group vertical">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password... "
                {...register("password", {
                  required: "Password can't be empty.",
                  validate: (value) =>
                    validator.isStrongPassword(value) ||
                    "Please choose a more secure password. It should be longer than 8 characters and include at least a number, symbol and uppercase letter.",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          }
          <div className="input-group">
            <button className="primary">Sign up</button>
          </div>
        </form>
        <p>
          Already signed up? <Link to="/login">Go to Log in</Link>
        </p>
      </div>
    </main>
  );
}

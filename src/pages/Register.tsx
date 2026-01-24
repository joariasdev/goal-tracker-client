import { Link, useNavigate } from "react-router";
import ApiUsersClient from "../api/apiUsersClient";
import type { UserView } from "../models/User";
import { useForm, type SubmitHandler } from "react-hook-form";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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
                  required: {
                    value: true,
                    message: "First name can't be empty.",
                  },
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
                  required: {
                    value: true,
                    message: "Last name can't be empty.",
                  },
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
                  required: {
                    value: true,
                    message: "Email can't be empty.",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address",
                  },
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
                  required: {
                    value: true,
                    message: "Password can't be empty.",
                  },
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

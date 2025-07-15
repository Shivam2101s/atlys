import * as React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { isStringValid } from "../../../utils";
import { UserType } from "../../../types";

type AuthCardProps = {};

export function AuthCard(props: AuthCardProps) {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isSignIn, setIsSignIn] = React.useState(false);
  const [form, setForm] = React.useState({
    username: {
      input: "",
      err: null,
    },
    email: {
      input: "",
      err: null,
    },
    password: {
      input: "",
      err: null,
    },
  });

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function validate() {
    const formState = JSON.parse(JSON.stringify(form));
    if (
      !isStringValid(formState.email.input) ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formState.email.input
      )
    ) {
      formState.email.err = "Invalid email!";
    }

    if (!isStringValid(form.password.input) || form.password.input.length < 3) {
      formState.password.err = "Invalid password! Min length of password is 3";
    }

    if (isSignIn && !isStringValid(formState.username.input)) {
      formState.username.err = "Invalid username";
    }

    setForm(formState);
    return Object.keys(formState).reduce(
      (prev, key) => prev && !formState[key].err,
      true
    );
  }

  function handleSubmit() {
    if (validate()) {
      const usersLoc = localStorage.getItem("user");
      const users: (UserType & { password: string })[] = isStringValid(usersLoc)
        ? JSON.parse(usersLoc as string)
        : [];

      // if user is signing in
      if (isSignIn) {
        const isUserUnique =
          users.filter((user) => user.email === form.email.input).length ===
            0 &&
          users.filter((user) => user.username === form.username.input)
            .length === 0;

        if (isUserUnique) {
          const currUser: UserType = {
            email: form.email.input,
            username: form.username.input,
          };
          users.push({
            ...currUser,
            password: form.password.input,
          });
          localStorage.setItem("user", JSON.stringify(users));
          localStorage.setItem("userState", JSON.stringify(currUser));
          navigate("/");
        } else {
          window.alert("Username or Email is already registered!");
        }
      }
      // if user is logging in
      else {
        const currUser = users.filter(
          (user) => user.email === form.email.input
        );
        // if this user has signed up
        if (currUser.length > 0) {
          // if passwords match
          if (currUser[0].password === form.password.input) {
            localStorage.setItem("userState", JSON.stringify(currUser[0]));
            navigate("/");
          } else {
            window.alert("Wrong password");
          }
        } else
          window.alert(
            "No user found with this email! Please create a new user"
          );
      }
    }
  }

  return (
    <div className="w-[40vw] h-fit bg-[#27292D] border-[2px] border-[#969696] p-[16px] rounded-[8px] text-center">
      <p className="text-[14px] font-[500] text-[#6B6C70] mb-[6px] capitalize">
        {isSignIn ? "SIGN UP" : "WELCOME BACK"}
      </p>
      <p className="text-[18px] font-[600] text-[#fff]">
        {isSignIn ? "Create an account to continue" : "Log into your account"}
      </p>

      <div className="flex flex-col w-full max-w-[100%] mx-auto gap-[16px] mt-[36px] text-left">
        {/* Email or Username Input */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-[14px] font-[400] text-[#C5C7CA] mb-[4px]"
          >
            Email or Username
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email or username"
            className={`w-full p-[8px] bg-[#27292D] border-[1.5px] ${isStringValid(form.email.err) ? "border-red-600" : "border-[#35373B]"} rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-[16px] text-white placeholder-[#7F8084]`}
            onChange={(e) =>
              setForm({ ...form, email: { input: e.target.value, err: null } })
            }
          />
          <p className="text-[14px] font-[500] text-red-600 mt-[2px] px-[4px]">
            {form.email.err}
          </p>
        </div>

        {/* Username */}
        {isSignIn && (
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-[14px] font-[400] text-[#C5C7CA] mb-[4px]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a preferred username"
              className={`w-full p-[8px] bg-[#27292D] border-[1.5px] ${isStringValid(form.username.err) ? "border-red-600" : "border-[#35373B]"} rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-[16px] text-white placeholder-[#7F8084]`}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: { input: e.target.value, err: null },
                })
              }
            />
            <p className="text-[14px] font-[500] text-red-600 mt-[2px] px-[4px]">
              {form.username.err}
            </p>
          </div>
        )}

        {/* Password Input */}
        <div className="flex flex-col relative">
          <div className="flex items-center justify-between gap-[12px] w-[full] mb-[4px]">
            <label
              htmlFor="password"
              className="text-[14px] font-[400] text-[#C5C7CA]"
            >
              Password
            </label>

            {!isSignIn && (
              <div
                className="text-right"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                <p className="text-[12px] text-[#C5C7CA] font-[500] hover:underline cursor-pointer">
                  Forgot password?
                </p>
              </div>
            )}
          </div>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            className={`w-full p-[8px] bg-[#27292D] border-[1.5px] ${isStringValid(form.password.err) ? "border-red-600" : "border-[#35373B]"} rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-[16px] text-white placeholder-[#7F8084]`}
            onChange={(e) =>
              setForm({
                ...form,
                password: { input: e.target.value, err: null },
              })
            }
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="w-fit h-[29px] absolute right-[8px] top-[33px] flex items-center justify-center text-[#7F8084] hover:text-gray-200"
          >
            {passwordVisible ? (
              <FiEye style={{ width: "20px", height: "20px" }} />
            ) : (
              <FiEyeOff style={{ width: "20px", height: "20px" }} />
            )}
          </button>
          <p className="text-[14px] font-[500] text-red-600 mt-[2px] px-[4px]">
            {form.password.err}
          </p>
        </div>

        {/*Submit button*/}
        <div className="w-full">
          <button
            onClick={handleSubmit}
            className="bg-[#4A96FF] p-[8px] rounded-[4px] text-[16px] text-white w-full cursor-pointer active:bg-[#2b83fc] "
          >
            {isSignIn ? "Continue" : "Log in"}
          </button>
          <div className="text-[14px] font-[500] mt-[6px]">
            <span className="text-[#7F8084]">
              {isSignIn ? "Already have an account?" : "Not registered yet?"}
            </span>
            <span
              className="text-white ml-[4px] cursor-pointer"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Login →" : "Register →"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

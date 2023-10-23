import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { Button } from "@/components/Elements";
import { Form, InputField } from "@/components/Form";
import { useLogin } from "@/lib/auth";
import "../routes/auth.css";
import { AnimatePresence, motion } from "framer-motion";
import { animations } from "./Layout";
import useAnimateFn from "@/hooks/animate";

const schema = z.object({
  email: z.string().min(1, "Please enter email address"),
  password: z.string().min(1, "Please enter password"),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin();
  const navigate = useNavigate();
  const { animate, callAfterAnimateFn } = useAnimateFn();

  return (
    <AnimatePresence>
      {animate && (
        <motion.div {...animations}>
          <div className="card p-4 mt-4 mx-4">
            <h5>Register</h5>
            <h6 className="mb-4 font-light">Please enter your detail to sign up</h6>
            <Form<LoginValues, typeof schema>
              onSubmit={async (values) => {
                login.mutate(values, { onSuccess });
              }}
              schema={schema}
            >
              {({ register, formState }) => (
                <>
                  <InputField
                    type="email"
                    label="Email Address"
                    blueLabel
                    error={formState.errors["email"]}
                    registration={register("email")}
                  />
                  <InputField
                    type="password"
                    label="Password"
                    error={formState.errors["password"]}
                    registration={register("password")}
                  />
                  <div className="d-flex justify-content-center">
                    <Button
                      startIcon={<i className="fa-solid fa-lock" />}
                      isLoading={login.isLoading}
                      type="submit"
                      className="w-100"
                    >
                      Log In
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </div>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link
              to="#"
              onClick={callAfterAnimateFn(() => navigate("/auth/login"))}
              className="forget-link"
            >
              Login
            </Link>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

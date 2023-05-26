import Footer from "../../../components/footer";
import Header from "../../../components/header";
import LoginInput from "../../../components/inputs/loginInputs";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import styles from "../../../styles/forgot.module.scss";
import * as Yup from "yup";
import CircledIconBtn from "../../../components/buttons/circledIconBtn";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";
import axios from "axios";
import jwt from "jsonwebtoken";
import { getSession, signIn } from "next-auth/react";
import { Router } from "next/router";

export default function reset({ user_id }) {
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter your new password.")
      .min(6, "Password must be atleast 6 characters")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/reset", {
        user_id,
        password,
      });

      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      const res = await signIn("credentials", options);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccess("");
      setError(error.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password? <Link href="/">Login instead</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <Formik
              enableReinitialize
              initialValues={{
                password,
                conf_password,
              }}
              validationSchema={passwordValidation}
              onSubmit={() => {
                resetHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Email Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Email Password"
                    onChange={(e) => setConf_password(e.target.value)}
                  />

                  <CircledIconBtn type="submit" text="Submit" />
                  <div style={{ marginTop: "10px" }}>
                    {error && <span className={styles.error}>{error}</span>}
                    {success && (
                      <span className={styles.success}>{success}</span>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="" />
    </>
  );
}

export async function getServerSideProps(context) {
  //We can't access .env in Frontend we can only access them only in backend

  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  return {
    props: {
      user_id: user_id.id,
    },
  };
}

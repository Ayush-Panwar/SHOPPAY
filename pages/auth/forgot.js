import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "@/components/inputs/loginInputs";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import styles from "../../styles/forgot.module.scss";
import * as Yup from "yup";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import axios from "axios";

export default function forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const emailValidation = Yup.object({
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
  });
  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
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
              Forgot your password? <Link href="/">Login instead</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <Formik
              enableReinitialize
              initialValues={{
                email,
              }}
              validationSchema={emailValidation}
              onSubmit={() => {
                forgotHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <CircledIconBtn type="submit" text="Send link" />
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

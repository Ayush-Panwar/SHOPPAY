import styles from "./styles.module.scss";
import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
import { IoKeyOutline } from "react-icons/io5";
import { useField } from "formik";
export default function LoginInput({ icon, placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={styles.input}>
      {icon == "user" ? (
        <BiUser />
      ) : icon == "email" ? (
        <SiMinutemailer />
      ) : icon == "password" ? (
        <IoKeyOutline />
      ) : (
        ""
      )}
      <input
        type={field.type}
        placeholder={placeholder}
        name={field.name}
        {...field}
        {...props}
      />
    </div>
  );
}

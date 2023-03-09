import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  const { data: session } = useSession();
  return (
    <div>
      <Header country={country} />
      {session ? "you are logged in" : "you are not logged in"}
      <Footer country={country} />
    </div>
  );
}
export async function getServerSideProps() {
  // let data = await axios
  //   .get("http://api.ipregistry.co/?key=nu99kpgfz1brzfen")
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return {
    props: {
      // country: { name: data?.name, flag: data?.flag.emojitwo },
      country: {
        name: "India",
        flag: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png",
      },
    },
  };
}

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import Category from "@/components/home/category";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "@/data/home";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "@/components/productsSwiper";
import db from "@/utils/db";
import Product from "@/models/Product";
import ProductCard from "@/components/productCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country, products }) {
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <div>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes/ High Heels"
                products={women_shoes}
                // background="#3c811f"
                background="rgb(147 189 63)"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes/ High Heels"
                products={women_shoes}
                // background="#3c811f"
                background="rgb(147 189 63)"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper
            products={gamingSwiper}
            header="For Gamers"
            bg="rgb(41 206 206)"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="House Improvements"
            bg="#7c6a6a"
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>
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
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      // country: { name: data?.name, flag: data?.flag.emojitwo },
      country: {
        name: "India",
        flag: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png",
      },
    },
  };
}

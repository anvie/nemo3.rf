import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.sass";
import styles2 from "../styles/Sections.module.sass";
import Navbar from "../components/Navbar";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import { FC } from "react";
import imageLoader from "../imageLoader";
import FAQ from "../components/FAQ";

const Home: NextPage = () => {
  return (
    <div className={`${styles.container} pt-16 md:pt-0`}>
      <Head>
        <title>$name$</title>
        <meta name="description" content="$param.description$" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="blur-dot-yellow" />
      <div className="blur-dot-blue" />

      <Navbar />

      <main className={`${styles.main} home`}>
        <Section1 />
        <Section2 />
      </main>

      <div id="timeline"
        className={`${styles.gradientBar} ${styles.timeline} w-full h-auto flex flex-row space-y-5 md:space-y-0 items-center justify-center p-5`}
      >
        <div className={`${styles2.joinCommunityText} md:pr-5 md:text-sm text-center`}>
          For more information and detail please join Telegram group 👉
        </div>
        <div onClick={() => window.open("https://t.me/$name_camel_case$", "_blank")}
          className={`${styles2.joinCommunityButton} flex pt-2 pb-2 pr-6 pl-4 rounded-full items-center`}
        >
          <Image
            src="telegram.svg"
            alt="Telegram icon"
            height="30"
            width="30"
            loader={imageLoader}
          />
          <div>Telegram</div>
        </div>
      </div>

      <FAQ />

      <footer className={styles.footer}>
        <div className="flex flex-col place-items-center items-center justify-center pt-10">
          <div className="blur-dot-blue2 hidden md:block" />
          <Image
            src="$name_pascal_case$-logo.png"
            alt="$name$ Logo"
            width={300}
            height={300}
            loader={imageLoader}
          />
          <div className="pt-10 pb-10 text-center">
            Copyright &copy; $year$ $name$. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

interface TimelineBoxProps {
  title: string;
  time: string;
}

const TimelineBox: FC<TimelineBoxProps> = ({ title, time, children }) => {
  return (
    <div className="flex flex-wrap w-auto md:w-1/2 p-5">
      <div className="bg-orange-100 p-5 rounded-xl">
        <div className="flex">
          <div className={styles.title}>{title}</div>
          <div
            className={`${styles.time} ml-5 bg-orange-400 h-6 pl-2 pr-2 rounded-xl`}
          >
            {time}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Home;

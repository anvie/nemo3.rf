import styles from "../styles/Sections.module.sass";
import Image from "next/image";
import imageLoader from "../imageLoader";

const Section1 = () => {
  return (
    <div id="about" className="section-2 w-full pl-5 pr-5 md:pl-20 md:pr-20 pt-10 pb-10 items-center justify-center content-center flex flex-col md:flex-row">
      <div
        className={`${styles.overview} justify-center items-left flex flex-col`}
      >
        <div>About</div>
        <div className="block font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-300 to-pink-600 text-lg">
          $name$
        </div>

        <p className={`${styles.description} max-w-xl`}>
        $param.description$
        </p>
      </div>

      <div className="image-art">
        <Image
          src="image-art.svg"
          alt="$name$ art"
          height="300"
          width="300"
          loader={imageLoader}
        />
      </div>
    </div>
  );
};

export default Section1;

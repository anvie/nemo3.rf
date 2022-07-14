import styles from "../styles/Sections.module.sass";
import Image from "next/image";
import imageLoader from "../imageLoader";

const Section1 = () => {
  return (
    <div id="home" className="w-full">
      <div className="pb-10 w-full flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="pl-10 bounce-1">
            <Image
              src="hero-char1c.svg"
              alt="$name$ character 1"
              width="300"
              height="444"
              loader={imageLoader}
            />
          </div>
          <div className="pl-10 bounce-1">
            <Image
              src="hero-char2b.svg"
              alt="$name$ character 2"
              width="300"
              height="444"
              loader={imageLoader}
            />
          </div>
        </div>

      </div>

      <div
        className={`${styles.gradientBar} w-full h-auto flex flex-col md:flex-row space-y-5 md:space-y-0 items-center justify-center p-5`}
      >
        <div
          className={`${styles.joinCommunityText} md:pr-10 md:text-sm text-center`}
        >
          Join our community to get the latest updates
        </div>
        <div
          onClick={() => window.open("https://t.me/$name_camel_case$")}
          className={`${styles.joinCommunityButton} flex pt-2 pb-2 pr-6 pl-5 rounded-full items-center`}
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
    </div>
  );
};

export default Section1;

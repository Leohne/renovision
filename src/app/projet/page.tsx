//import { useRouter } from 'next/router'; pour importer le JSON via l'url
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import infoData from "../../asset/info.json";
import arrowBack from "../../../public/arrow.svg";

interface InfoData {
  projets: {
    id: number;
    cover: string;
    after: string;
    illustration: string;
  }[];
  description: string;
  description2: string;
}

gsap.registerPlugin(Draggable);

function Projet() {
  const beforeAfterWrap = useRef(null);
  const dragger = useRef(null);
  const afterImgWrap = useRef(null);

  const [selectImg, setSelectImg] = useState(infoData.projets[0]);

  const sendToDragger = (id: number) => {
    const newImage = infoData.projets.find((item) => item.id === id);
    newImage && setSelectImg(newImage);
  };

  //GSAP
  useEffect(() => {
    if (!dragger.current || !beforeAfterWrap.current || !afterImgWrap.current)
      return;

    Draggable.create(dragger.current, {
      type: "x",
      bounds: beforeAfterWrap.current,
      onDrag: function () {
        const x =
          beforeAfterWrap.current.offsetWidth / 2 - gsap.getProperty(this.target, "x");
        afterImgWrap.current.style.clipPath = `inset(0px ${x}px 0px 0px)`;
      },
    });
  }, []);

  const dataInfo = infoData.projets.map((item) => {
    return (
      <div
        className="relative w-[16%] h-[300px] mx-8 my-4 cursor-pointer overflow-hidden rounded-[12px]"
        key={item.id}
        onClick={() => sendToDragger(item.id)}
      >
        <div className="w-full">
          <Image
            className="object-cover min-w-[470px] "
            src={item.cover}
            alt={item.illustration}
            fill
          />
        </div>
      </div>
    );
  });

  return (
    <div>
      <header>
        <div className="flex justify-around ml-12 mt-5 ">
          <Link href={"/#projet"}>
            <div className="object-cover cursor-pointer "><Image src={arrowBack} alt="arrow back" width={50} height={50} /> </div>
          </Link>
          <h1 className="text-black text-4xl">Renovision</h1>
        </div>
      </header>
      <main className="bg-blue">
        <div className="flex justify-center m-12">
          <div ref={beforeAfterWrap} className="bg-yellow w-1/3">
            <div className="relative rounded-[16px] w-full">
              <div ref={dragger} className="dragger">
                <div className="dragger-inner"></div>
              </div>
              <div className="absolute w-full h-full ">
                {selectImg && (
                  <Image
                    src={selectImg.cover}
                    alt="image Avant"
                    className="aspect object-cover w-full rounded-[16px]"
                    fill
                  />
                )}
              </div>
              <div
                ref={afterImgWrap}
                className="relative w-full h-[500px] clip_path"
              >
                {selectImg && (
                  <Image
                    src={selectImg.after}
                    alt="image Avant"
                    className="aspect object-cover w-full rounded-[16px]"
                    fill
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
        <div className="flex flex-row  mt-12 w-2/3">{dataInfo}</div>
        </div>
      </main>
    </div>
  );
}

export default Projet;

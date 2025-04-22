"use client";
import Image from 'next/image';
import Link from 'next/link';
import imgAccueil from '../../public/visuel_accueil.webp'
import logoVisuel from '../../public/logo_visuel.webp'
import infoData from '../asset/info.json'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


interface infoData {
    projets:{
      id: number;
      cover: string;
      illustration: string;
    },
    description: string;
    description2: string;
}

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger)

function App() {
const imgRef = useRef(null)

const ScrollToProjet = () => {
  gsap.to(window, { duration: 2, scrollTo: { y: "#projet", offsetY: 0 } });
}

useEffect(() => {
  const ctx = gsap.context(() => {
    
    gsap.to(imgRef.current, {
      y: 400, 
      ease: "none",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top top",
        end: "bottom top", 
        scrub: true, 
      },
    });
  });

  
  return () => ctx.revert(); // Nettoyage du contexte GSAP quand le composant se démonte
}, []);

const infoDescrip = infoData.description
const infoDescrip2 = infoData.description2
const dataInfo = infoData.projets.map((item, index) => {
  return <Link href={"/projet"} className='relative w-[16%] h-[400px] mx-8 mt-4 mb-4 transition-all duration-200 hover:w-[20%] hover:mx-[0.42%] overflow-hidden' key={index}><div className='w-full'> {/*hover:mx-[-0.64%] pour 2k*/}
        <Image className='object-cover min-w-[470px] ' src={item.cover} alt={item.illustration} fill />        
  </div></Link>
})
  return (
    <>
    <main>
    <div className='relative'>
      <div  className='absolute top-[40%] left-[28%] z-10'>
        <h1 className='text-4xl'>Reno-vision</h1>
        <h2 className='ml-5 text-2xl'>La rénovation numérique</h2>
      </div>
      <div ref={imgRef} >
        <Image src={imgAccueil} alt="image d'accueil" className='object-cover w-full h-[100vh]'/>
      </div>
      <div className='absolute top-[5%] right-[10%] z-10 flex flex-row text-[1.2rem]'>
      <Link href="/projet"><p className='pr-2 z-10'>Offre |</p></Link>
      <Link onClick={ScrollToProjet} href="#projet"><p className='z-10'>Projet</p></Link>
      </div>
    </div>
    <div className='relative flex flex-row justify-center p-10 bg-white w-full'>
      <Image src={logoVisuel} alt="logo" className='object-cover m-5 w-[15%] rounded-[40px] '/>
      <p className='text-black text-1xl my-auto w-1/3'>{infoDescrip}<br/>{infoDescrip2}</p>
    </div>
    <div id='projet' className='relative bg-white w-full flex flex-wrap flex-row justify-center mx-auto z-12'>
      {dataInfo}
    </div>
    </main>
    <footer>
      <div className='relative bg-black w-full text-white flex flex-col justify-center items-center'>
        <div className='flex flex-row mt-10'>
        <Image src={logoVisuel} alt="logo" className='object-cover w-[25%]'/>
        <div className='flex flex-col'>
        <p>Contact</p>
        <Link href={"/pages/legale"} >Mentions légales</Link>
        <Link href={"/pages/terms"} >CGU</Link>
        <Link href={"/pages/privacy-policy"} >Politique de confidentialité</Link>
        </div>
        </div>
        <p>© 2025 - Reno-vision</p>
      </div>
    </footer>
    </>
  )
}

export default App

"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex w-full items-center min-h-[calc(100vh-4.6rem)] relative overflow-hidden">
      <div className="flex flex-col space-y-6 ml-16 w-[40%]">
        <h1 className="text-5xl font-semibold">Your Learning, <span className="text-blue-600">Your Way</span></h1>
        <h1 className="text-5xl font-semibold"><span className="text-blue-600">Anytime,</span> Anywhere!</h1>
        <h1 className="text-base font-medium text-gray-500">Experience Learning Without Limits – Designed for Students, by Students.</h1>
      </div>
      <div className="absolute bottom-0 right-12 z-10">
        <Image 
            className='object-contain w-[600px]'
            src="/edufly.png"
            width={1000}
            height={1000}
            alt="studyimg"
          />
      </div>
      <div className="absolute bottom-0 right-12 z-5">
        <Image 
            className='object-contain w-[500px]'
            src="/bg.png"
            width={1000}
            height={1000}
            alt="bgpng"
          />
      </div>
      <div className="absolute bottom-52 left-[40rem] z-10">
        <Image 
            className='object-contain w-[400px]'
            src="/edufly1.png"
            width={1000}
            height={1000}
            alt="studyimg"
          />
      </div>
      <div className="absolute bottom-60 left-[42rem]">
        <Image 
            className='object-contain w-[300px]'
            src="/bg.png"
            width={1000}
            height={1000}
            alt="bgpng"
          />
      </div>
      <div className="absolute bottom-60 left-24 rotate-45">
        <Image 
            className='object-contain w-[200px] opacity-30'
            src="/rect.png"
            width={1000}
            height={1000}
            alt="bgpng"
          />
      </div>
      <div className="absolute top-14 left-96 rotate-90">
        <Image 
            className='object-contain w-[180px] opacity-30'
            src="/triangle.png"
            width={1000}
            height={1000}
            alt="bgpng"
          />
      </div>
      <div className="absolute bottom-24 left-96 -rotate-45">
        <Image 
            className='object-contain w-[200px] opacity-30'
            src="/triangle.png"
            width={1000}
            height={1000}
            alt="bgpng"
          />
      </div>
      <div className="absolute top-12 right-24 rotate-45">
        <Image 
            className='object-contain w-[80px] opacity-60'
            src="/rect.png"
            width={1000}
            height={1000}
            alt="bgpng"
          />
      </div>
      <div className="absolute top-0 right-80 rotate-12">
        <Image 
            className='object-contain w-[80px] opacity-40'
            src="/rect.png"
            width={1000}
            height={1000}
            alt="bgpng"
          />
      </div>
    </div>
  );
}

import Sidenav from "@/components/Sidenav";

export default function layout({ children }) {
  return (
    <div className='flex justify-between min-h-screen p-5 pb-0 z-20 w-full'>
            <div>
                <Sidenav />
            </div>
            <div className='mr-5 w-full ml-[300px] p-5'>
                {children}
            </div>
        </div>
  );
}

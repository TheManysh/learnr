"use client"
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const Dashboard = () => {
  const [progress, setProgress] = useState(30);

  return (
    <div className='flex flex-col'>
      <h1 className='text-lg font-semibold text-blue-600'>My Learning</h1>
      <div className='my-10 flex items-center gap-10 p-5 bg-slate-100 shadow-md'>
        <div className='w-[160px] h-[160px]'>
          <Image 
            src="/machine-learning.jpg"
            alt="mlpng"
            width={1000}
            height={1000}
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex flex-col space-y-5 w-1/2'>
          <p className='text-gray-500 text-sm'> Course | DeepLearning.AI</p>
          <h1 className='font-semibold text-xl'>Deep Learning Neural Network</h1>
          <div className="flex items-center gap-3">
        <Progress value={progress} className="w-full h-4 rounded-lg bg-gray-300" />
        <div className="text-sm font-medium">{progress}%</div>
      </div>
        </div>
        <div>
          <Button 
            className="bg-blue-500 p-5 flex items-center gap-5 text-base w-[200px] rounded-lg hover:scale-x-105 hover:text-gray-200 hover:bg-blue-700 transition-all duration-500"
          >
            Go to course <ArrowRight className='w-5 h-5'/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

import React from 'react'
import Title from '../components/Title'
import NewsLetter from '../components/NewsLetter'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title Text1={'ABOUT'} Text2={' US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque nobis assumenda sequi praesentium magnam at maiores aliquam minus illo qui. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi vitae iste, nesciunt dolore sapiente possimus dolorum! Vel illo ipsam minus odit voluptas! Esse, doloribus veniam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugit fuga laudantium consequuntur odio eveniet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nisi adipisci quia neque nobis vel error non maxime quo eaque?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ex corporis quis impedit sit consectetur rem voluptate odio debitis voluptatem!</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title Text1={'Why'} Text2={' Choose Us'}/>
      </div>
      <div className='flex flex-col md:flex-row gap-1 text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit at dignissimos facere tempora quaerat quis officia quos aspernatur neque.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit at dignissimos facere tempora quaerat quis officia quos aspernatur neque.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, reprehenderit at dignissimos facere tempora quaerat quis officia quos aspernatur neque.</p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  )
}

export default About

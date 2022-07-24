import type { NextPage } from 'next'
import Image from 'next/image'
import Format from '../layout/format'

//components
import Section1 from '../components/section/section1'
import Section2 from '../components/section/section2'
import Section3 from '../components/section/section3'

const Home: NextPage = () => {
  return (
    <div>
      <Format>
        <Section1></Section1>
        <Section2></Section2>
        <Section3></Section3>
      </Format>
    </div>
  )
}

export default Home

import type { NextPage } from 'next'
import Image from 'next/image'
import Format from '../layout/format'

//components
import Section1 from '../components/section/section1'
const Home: NextPage = () => {
  return (
    <div>
      <Format>
        <Section1></Section1>
      </Format>
    </div>
  )
}

export default Home

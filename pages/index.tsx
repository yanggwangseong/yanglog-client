import type { NextPage } from 'next';
import Format from '../components/ui/layout/format';

//components
import Section1 from '../components/section/section1';
import Section2 from '../components/section/section2';
import Section3 from '../components/section/section3';
import Section4 from '../components/section/section4';

const Home: NextPage = () => {
	return (
		<Format title="YangLog">
			<Section1></Section1>
			<Section2></Section2>
			<Section3></Section3>
			<Section4></Section4>
		</Format>
	);
};

export default Home;

import Covid from "./covid_prediciton";
import Malaria from "./malaria_prediction";
import Pneumonia from "./pneumonia_prediction";

function App() {
	return (
		<section className="grid overflow-auto grid-cols-1 p-4 sm:p-0 gap-4 md:grid-cols-2 desktop:grid-cols-3 flex-1 h-full w-full min-w-[350px] ">
			<Covid />
      <Malaria />
      <Pneumonia />	
		</section>
	);
}

export default App;

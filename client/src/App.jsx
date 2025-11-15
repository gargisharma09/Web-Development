import Greeting from "./SkiteList";

const sites= ["google.com", "facebook.com","github.com"];
 export default function App() {
  return (
    <div> 
      <SiteList sites={sites} />
    </div>
  );
 }
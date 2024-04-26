import { useHealthCheck } from "../hooks/api/test";
import logo from "../logo.svg";
import "../App.css";
import { BASE_URL } from "../constants";

function Home() {
  const {
    data: healthCheck,
    isLoading: isHealthCheckLoading,
    refetch,
  } = useHealthCheck();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{healthCheck}</p>
        <a
          className="App-link"
          href={BASE_URL}
          onClick={() => refetch}
          rel="noopener noreferrer"
        >
          Check health
        </a>
      </header>
    </div>
  );
}

export default Home;

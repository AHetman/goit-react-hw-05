import { useState, useMemo, forwardRef, useRef, useEffect } from "react";
import Description from "../Description/Description";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import Options from "../Options/Options";
import LoginForm from "../LoginForm/LoginForm";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import LoginForm2 from "../LoginForm2/LoginForm2";
import Form from "../Form/Form";
import Filter from "../Filter/Filter";
import TaskList from "../TaskList/TaskList";
import initialTasks from "../../tasks.json";
import css from "./App.module.css";
import FeadbackForm from "../FeedbackForm/FeedbackForm";
import ArticleList from "../ArticleList/ArticleList";
import fetchArticlesWithTopic from "../../articles-api";
import SearchForm from "../SearchForm/SearchForm";

const CustomButton = forwardRef((props, ref) => (
  <button ref={ref}>{props.children}</button>
));

const Player = ({ source }) => {
  const playerRef = useRef();

  const play = () => playerRef.current.play();

  const pause = () => playerRef.current.pause();

  return (
    <div>
      <video ref={playerRef} src={source}>
        Sorry, your browser does not support embedded videos.
      </video>
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
};

const App = () => {
  const [click, setClick] = useState(() => {
    const savedClick = JSON.parse(localStorage.getItem("saved-click"));
    if (savedClick !== null) {
      return savedClick;
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem("saved-click", JSON.stringify(click));
  }, [click]);

  const updateFeedback = (feedbackType) => {
    setClick((clicks) => ({
      ...clicks,
      [feedbackType]: clicks[feedbackType] + 1,
    }));
  };

  const totalFeedback = click.good + click.neutral + click.bad;

  const resetFunction = () => {
    setClick({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const positivePercent = Math.round((click.good / totalFeedback) * 100);

  // Колбек-функція для обробки сабміту форми
  const handleLogin = (userData) => {
    // Виконуємо необхідні операції з даними
    console.log(userData);
  };

  const [inputValue, setInputValue] = useState("");

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const [lang, setLang] = useState("uk");

  const [coffeeSize, setCoffeeSize] = useState("sm");
  const handleSizeChange = (evt) => {
    setCoffeeSize(evt.target.value);
  };

  const [hasAccepted, setHasAccepted] = useState(false);

  const handlesChange = (evt) => {
    setHasAccepted(evt.target.checked);
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("");

  const addTask = (newTask) => {
    setTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };

  const visibleTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(filter.toLowerCase())
  );

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (topic) => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data.data.hits);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const [planets, setPlanets] = useState(["Earth", "Mars", "Jupiter", "Venus"]);
  const [query, setQuery] = useState("");
  const [clicks, setClicks] = useState(0);

  const filteredPlanets = useMemo(
    () => planets.filter((planet) => planet.includes(query)),
    [planets, query]
  );

  const valueRef = useRef(0);

  useEffect(() => {
    // Виконається лише один раз під час монтування.
    // Наступні оновлення значення рефа не
    // викличуть оновлення компонента
    console.log(valueRef.current);
  });

  const handleClick = () => {
    valueRef.current += 1;
  };

  const btnRef = useRef();

  useEffect(() => btnRef.current.focus(), []);

  return (
    <>
      <div>
        <CustomButton ref={btnRef}>Button with forwarded ref</CustomButton>
      </div>

      <div>
        <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />;
      </div>

      <div>
        <button onClick={handleClick}>Click to update ref value</button>
      </div>

      <>
        <button onClick={() => setClicks(clicks + 1)}>
          Number of clicks: {clicks}
        </button>
        <ul>
          {filteredPlanets.map((planet) => (
            <li key={planet}>{planet}</li>
          ))}
        </ul>
      </>

      <div>
        <SearchForm onSearch={handleSearch} />
        {loading && <p>Loading data, please wait...</p>}
        {error && (
          <p>Whoops, something went wrong! Please try reloading this page!</p>
        )}
        {articles.length > 0 && <ArticleList items={articles} />}
      </div>

      <Description />
      <Options
        updateFeedback={updateFeedback}
        click={click}
        resetFunction={resetFunction}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          click={click}
          totalFeedback={totalFeedback}
          positivePercent={positivePercent}
        />
      ) : (
        <Notification />
      )}
      <div>
        <h1>Please login to your account!</h1>
        {/* Передаємо колбек як пропс форми */}
        <LoginForm onLogin={handleLogin} />
      </div>
      <div>
        <input type="text" value={inputValue} onChange={handleChange} />
        <p>{inputValue}</p>
      </div>
      <>
        <p>Selected language: {lang}</p>
        <LangSwitcher value={lang} onSelect={setLang} />
      </>
      <>
        <h1>Select coffee size</h1>
        <label>
          <input
            type="radio"
            name="coffeeSize"
            value="sm"
            checked={coffeeSize === "sm"}
            onChange={handleSizeChange}
          />
          Small
        </label>
        <label>
          <input
            type="radio"
            name="coffeeSize"
            value="md"
            checked={coffeeSize === "md"}
            onChange={handleSizeChange}
          />
          Meduim
        </label>
        <label>
          <input
            type="radio"
            name="coffeeSize"
            value="lg"
            checked={coffeeSize === "lg"}
            onChange={handleSizeChange}
          />
          Large
        </label>
        <p>
          <b>Selected size:</b> {coffeeSize}
        </p>
      </>

      <div>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={hasAccepted}
            onChange={handlesChange}
          />
          I accept terms and conditions
        </label>
        <button type="button" disabled={!hasAccepted}>
          Proceed
        </button>
      </div>
      <div>
        <LoginForm2 />
      </div>

      <div className={css.container}>
        <Form onAdd={addTask} />
        <Filter value={filter} onFilter={setFilter} />
        <TaskList tasks={visibleTasks} onDelete={deleteTask} />
      </div>

      <div>
        <FeadbackForm />
      </div>
    </>
  );
};

export default App;

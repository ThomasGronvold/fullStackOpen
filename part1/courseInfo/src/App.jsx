const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  const part = props.course.parts;
  return (
    <div>
      <Part part={part[0].title} exercises={part[0].exercises} />
      <Part part={part[1].title} exercises={part[1].exercises} />
      <Part part={part[2].title} exercises={part[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  const part = props.course.parts;
  return (
    <>
      <p>
        Number of exercises {part[0].exercises + part[1].exercises + part[2].exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    title: "Half Stack application development",
    parts: [
      {
        title: "Fundamentals of React",
        exercises: 10,
      },
      {
        title: "Using props to pass data",
        exercises: 7,
      },
      {
        title: "State of a component",
        exercises: 14,
      }
    ]
  };

  return (
    <div>
      <Header course={course.title} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;

const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  ));
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ course }) => {
  /* Reduce method that has a starting value of 0 and adds the exercises count from every object */
  const totalExercises = course.parts.reduce((x, part) => x + part.exercises, 0);
  return <strong>Number of exercises {totalExercises}</strong>;
};

export default Course;

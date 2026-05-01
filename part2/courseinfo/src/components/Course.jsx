const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map(
      (part) => <Part part={part} key={part.id} />
    )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return(
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <strong> Total of {total} exercises </strong>
    </>
  );
}

const Total = (props) => <p>Number of exercises {props.total}</p>

export default Course;
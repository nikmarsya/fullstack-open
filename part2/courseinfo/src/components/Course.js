const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ parts }) => { return (
  <>
    {parts.map(part => <Part key={part.id} part={part} />)} 
    <Total sum={parts.reduce((sum,part)=>sum+=part.exercises,0)} /> 
  </>
)
}

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Total = ({ sum }) => <p><strong>total of {sum} exercises </strong></p>

const Course = ({course}) =>{
    return(
       <div>
       <Header course={course} />
       <Content parts={course.parts} />  
       </div>
    )
}

export default Course





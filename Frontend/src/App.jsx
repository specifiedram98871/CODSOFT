import './App.css'
import Project from './component/project/Project'
// import { sayHello } from './redux/projectSlice'
import CreateProject from './component/project/createProject'
import { useDispatch } from 'react-redux'
function App() {
  
 const dispatch = useDispatch();
  return (
    <>
      <div className='text-3xl text-red-600'>Hello</div>
      <Project />
      <CreateProject/>
    </>
  )
}

export default App

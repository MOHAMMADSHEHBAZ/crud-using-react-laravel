import UserTable from "./UserTable"
import { Link } from "react-router-dom"

function App() {

  return (
    <>
    <div className="flex flex-col">
      <div className="container px-4 mx-auto">
        <button className="float-left my-5 bg-violet-600 hover:bg-violet-500 border px-4 py-2 rounded-md">
              <Link className="text-white font-medium" to="create-user/add">
              Create user
              </Link>
        </button>
      </div>
      <div>
        <UserTable/>
      </div>
    </div>
    </>
  )
}

export default App

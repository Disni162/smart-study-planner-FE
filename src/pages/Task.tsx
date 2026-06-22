import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";

import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../redux/taskSlice";


const Task = () => {

  const dispatch = useDispatch<any>();


  const tasks = useSelector(
    (state: RootState) => state.tasks.tasks
  );


  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");



  useEffect(() => {

    dispatch(fetchTasks());

  }, [dispatch]);





  // ADD TASK

  const handleAdd = async () => {

    if (!title.trim()) return;


    try {

      await dispatch(
        addTask({
          title,
          deadline,
        })
      );


      setTitle("");
      setDeadline("");


    } catch (error) {

      console.log(error);

    }

  };





  // COMPLETE TASK

  const toggleTask = async (
    id: string,
    completed: boolean
  ) => {

    try {

      await dispatch(
        updateTask({

          id,

          data: {
            completed: !completed
          }

        })
      );


    } catch (error) {

      console.log(error);

    }

  };





  // DELETE TASK

  const deleteTaskHandler = async (
    id: string
  ) => {


    try {

      await dispatch(
        deleteTask(id)
      );


    } catch (error) {

      console.log(error);

    }


  };







  const completedCount =
    tasks.filter(
      (task: any) => task.completed
    ).length;



  const pendingCount =
    tasks.length - completedCount;





  const upcomingTasks =
    tasks
      .filter(
        (task: any) =>
          task.deadline &&
          !task.completed &&
          new Date(task.deadline)
          >= new Date()
      )
      .sort(
        (a: any, b: any) =>
          new Date(a.deadline).getTime()
          -
          new Date(b.deadline).getTime()
      )
      .slice(0, 3);







  return (

    <div className="space-y-8">



      {/* HEADER */}

      <div>

        <h1 className="
text-3xl
font-bold
text-gray-800
">

          ✅ Task Manager

        </h1>


        <p className="
text-gray-500
mt-2
">

          Manage your daily study activities

        </p>


      </div>








      {/* ADD TASK */}

      <div className="
bg-white
rounded-3xl
shadow-sm
border
p-6
">


        <h2 className="
text-xl
font-bold
mb-5
">

          Create New Task

        </h2>




        <div className="
grid
md:grid-cols-3
gap-4
">


          <input

            value={title}

            onChange={
              (e) => setTitle(e.target.value)
            }

            placeholder="Enter task title"

            className="
px-4
py-3
rounded-xl
bg-gray-50
border
outline-none
focus:ring-2
focus:ring-blue-400
"

          />





          <input

            type="date"

            value={deadline}

            onChange={
              (e) => setDeadline(e.target.value)
            }

            className="
px-4
py-3
rounded-xl
bg-gray-50
border
outline-none
"

          />







          <button

            onClick={handleAdd}

            className="
bg-gradient-to-r
from-blue-500
to-purple-600
text-white
rounded-xl
font-semibold
hover:scale-105
transition
"

          >

            + Add Task

          </button>



        </div>


      </div>









      {/* STATS */}

      <div className="
grid
md:grid-cols-3
gap-6
">





        <div className="
bg-white
rounded-2xl
p-6
shadow-sm
border
">


          <p className="
text-gray-400
">

            Total Tasks

          </p>


          <h2 className="
text-3xl
font-bold
text-blue-600
mt-2
">

            {tasks.length}

          </h2>


        </div>







        <div className="
bg-white
rounded-2xl
p-6
shadow-sm
border
">


          <p className="
text-gray-400
">

            Completed

          </p>


          <h2 className="
text-3xl
font-bold
text-green-600
mt-2
">

            {completedCount}

          </h2>


        </div>









        <div className="
bg-white
rounded-2xl
p-6
shadow-sm
border
">


          <p className="
text-gray-400
">

            Pending

          </p>


          <h2 className="
text-3xl
font-bold
text-orange-500
mt-2
">

            {pendingCount}

          </h2>


        </div>





      </div>









      {/* UPCOMING */}

      <div className="
bg-gradient-to-r
from-yellow-50
to-orange-50
border
rounded-3xl
p-6
">


        <h2 className="
text-xl
font-bold
mb-4
">

          ⏰ Upcoming Deadlines

        </h2>





        {
          upcomingTasks.length === 0

            ?

            <p className="text-gray-500">

              No upcoming deadlines

            </p>


            :

            upcomingTasks.map(
              (task: any) => (


                <div

                  key={task._id}

                  className="
bg-white
rounded-xl
p-4
mb-3
shadow-sm
"

                >


                  <h3 className="font-semibold">

                    {task.title}

                  </h3>


                  <p className="text-sm text-gray-500">

                    Due :
                    {" "}
                    {
                      new Date(
                        task.deadline
                      )
                        .toLocaleDateString()
                    }

                  </p>


                </div>


              ))


        }



      </div>









      {/* TASK LIST */}

      <div>


        <h2 className="
text-xl
font-bold
mb-5
">

          📚 All Tasks

        </h2>






        <div className="
space-y-4
">



          {

            tasks.map(
              (task: any) => (


                <div

                  key={task._id}

                  className="
bg-white
border
rounded-2xl
p-5
shadow-sm
flex
justify-between
items-center
hover:shadow-lg
transition
"


                >




                  <div>


                    <h3

                      className={`
text-lg
font-semibold

${task.completed
                          ?
                          "line-through text-gray-400"
                          :
                          "text-gray-800"
                        }

`}

                    >

                      {task.title}

                    </h3>




                    {
                      task.deadline &&

                      <p className="
text-sm
text-gray-500
mt-2
">

                        📅
                        {" "}
                        {
                          new Date(
                            task.deadline
                          )
                            .toLocaleDateString()
                        }

                      </p>

                    }





                    <span

                      className={`
inline-block
mt-3
px-3
py-1
rounded-full
text-xs
font-semibold

${task.completed

                          ?

                          "bg-green-100 text-green-600"

                          :

                          "bg-blue-100 text-blue-600"

                        }

`}

                    >


                      {
                        task.completed
                          ?
                          "Completed"
                          :
                          "Pending"
                      }


                    </span>



                  </div>









                  <div className="
flex
gap-3
">



                    <button

                      onClick={() =>
                        toggleTask(
                          task._id,
                          task.completed
                        )
                      }

                      className="
px-4
py-2
rounded-xl
bg-green-500
text-white
hover:bg-green-600
transition
"

                    >

                      ✓

                    </button>





                    <button

                      onClick={() =>
                        deleteTaskHandler(task._id)
                      }

                      className="
px-4
py-2
rounded-xl
bg-red-500
text-white
hover:bg-red-600
transition
"

                    >

                      🗑

                    </button>




                  </div>




                </div>


              ))


          }




        </div>




      </div>





    </div>


  );


};


export default Task;
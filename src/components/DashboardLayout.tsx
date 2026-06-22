import { type ReactNode ,useEffect,useState} from "react";

import {
  LayoutDashboard,
  BookOpen,
  CheckCircle,
  
  User,
  Brain,
  BarChart3,
  Sparkles,
  FileText,
  LogOut
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";


type Props = {
  children: ReactNode;
};



const DashboardLayout = ({ children }: Props) => {

  const [user, setUser] = useState<any>(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);

    console.log("Logged User:", parsedUser);

    setUser(parsedUser);
  }
}, []);
  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  navigate("/login");

};


  const menu = [

    {
      name:"Home",
      path:"/student",
      icon:<LayoutDashboard size={20}/>
    },


    {
      name:"Subjects",
      path:"/subjects",
      icon:<BookOpen size={20}/>
    },


    {
      name:"Tasks",
      path:"/tasks",
      icon:<CheckCircle size={20}/>
    },


    {
      name:"Analytics",
      path:"/analytics",
      icon:<BarChart3 size={20}/>
    },


    {
      name:"AI Planner",
      path:"/ai-planner",
      icon:<Brain size={20}/>
    },


    {
      name:"Notes",
      path:"/notes",
      icon:<FileText size={20}/>
    },


    {
      name:"Profile",
      path:"/profile",
      icon:<User size={20}/>
    }


  ];





  return (

    <div
      className="
      flex
      h-screen
      bg-gradient-to-br
      from-slate-50
      to-blue-50
      "
    >



      {/* SIDEBAR */}

      <aside
        className="
        w-72
        bg-white/80
        backdrop-blur-xl
        border-r
        border-gray-200
        shadow-xl
        p-6
        flex
        flex-col
        justify-between
        "
      >


        <div>



          {/* LOGO */}

          <div
            className="
            flex
            items-center
            gap-4
            mb-10
            "
          >


            <div
              className="
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              flex
              items-center
              justify-center
              text-white
              shadow-lg
              "
            >

              <Sparkles size={25}/>

            </div>



            <div>

              <h1
                className="
                text-xl
                font-bold
                text-gray-800
                "
              >
                Smart Planner
              </h1>


              <p
                className="
                text-sm
                text-gray-400
                "
              >
                Student Dashboard
              </p>


            </div>


          </div>





          {/* MENU */}

          <nav className="space-y-3">


            {
              menu.map((item)=>(


                <button

                  key={item.path}

                  onClick={()=>
                    navigate(item.path)
                  }


                  className={`
                  
                  flex
                  items-center
                  gap-4
                  w-full
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  duration-300

                  ${
                    location.pathname === item.path

                    ?

                    "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-[1.02]"

                    :

                    "text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"

                  }

                  `}

                >

                  {item.icon}


                  <span
                    className="
                    font-medium
                    "
                  >
                    {item.name}
                  </span>


                </button>


              ))
            }


          </nav>



        </div>







        {/* FOOTER */}


        <div className="space-y-3">


<button

onClick={handleLogout}

className="
w-full
flex
items-center
justify-center
gap-3
py-3
rounded-2xl
bg-red-50
text-red-600
font-medium
hover:bg-red-100
transition
"

>

<LogOut size={20}/>

Sign Out

</button>



<div
className="
bg-gradient-to-r
from-blue-50
to-purple-50
rounded-2xl
p-4
"
>

<p
className="
text-xs
text-gray-500
text-center
"
>
© Smart Study Planner
</p>

</div>


</div>




      </aside>









      {/* MAIN CONTENT */}


      <main
        className="
        flex-1
        overflow-auto
        "
      >




        {/* TOP BAR */}

        <header
  className="
  sticky
  top-0
  z-50
  h-20
  bg-white/90
  backdrop-blur-xl
  border-b
  border-gray-200
  flex
  items-center
  justify-end
  px-8
  "
>

          {/* PROFILE BUTTON */}


          <button
  onClick={() => navigate("/profile")}
  className="
  flex
  items-center
  gap-3
  hover:bg-gray-100
  px-3
  py-2
  rounded-xl
  transition
  "
>

  <div
    className="
    w-11
    h-11
    rounded-full
    overflow-hidden
    border-2
    border-blue-500
    "
  >

    <img
  src={
    user?.profilePic ||
    user?.avatar ||
    user?.image ||
    user?.profileImage ||
    `https://ui-avatars.com/api/?name=${user?.name || "User"}`
  }
  alt="Profile"
  className="w-full h-full object-cover"
/>

  </div>

  <div className="text-left">

    <p className="font-semibold text-gray-800">
      {user?.name || "Student"}
    </p>

    <p className="text-xs text-gray-500">
      {user?.role || "User"}
    </p>

  </div>

</button>


        </header>







        {/* PAGE */}


        <div
          className="
          p-8
          "
        >

          {children}


        </div>



      </main>




    </div>


  );

};



export default DashboardLayout;
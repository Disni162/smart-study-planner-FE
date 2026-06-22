import { useState } from "react";
import api from "../service/api";

import {
  Sparkles,
  CalendarDays,
  Clock,
  BookOpen,
  Brain,
} from "lucide-react";


const AIStudyPlanner = () => {


  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
const [topics, setTopics] = useState("");
  const [plan, setPlan] = useState("");

  const [loading, setLoading] = useState(false);





  const handleGenerate = async () => {


    if(!subject || !examDate || !hoursPerDay){

      alert("Please fill all fields");

      return;

    }


    try {


      setLoading(true);



      const res = await api.post(
        "/ai/generate-plan",
        {

          subject,
   
    examDate,
    hoursPerDay,

        }
      );



      setPlan(res.data.plan);



    } catch(err:any){


      console.log(err);


      alert(
        err.response?.data?.message ||
        "Failed to generate plan"
      );


    } finally {


      setLoading(false);


    }



  };







return (

<div className="space-y-8">





{/* HEADER */}

<div className="
bg-gradient-to-r
from-blue-600
to-purple-600
rounded-3xl
p-8
text-white
shadow-lg
">


<div className="flex items-center gap-4">


<div className="
w-14
h-14
bg-white/20
rounded-2xl
flex
items-center
justify-center
">

<Brain size={32}/>


</div>



<div>

<h1 className="
text-3xl
font-bold
">

AI Study Planner 🤖

</h1>


<p className="
text-white/80
mt-2
">

Generate your personalized study timetable using AI

</p>


</div>


</div>


</div>








{/* INPUT CARD */}


<div className="
bg-white
rounded-3xl
shadow-sm
border
p-8
">


<h2 className="
text-xl
font-bold
text-gray-800
mb-6
flex
items-center
gap-2
">


<Sparkles
className="text-purple-500"
/>


Create Study Plan


</h2>







<div className="
grid
md:grid-cols-3
gap-5
">





{/* SUBJECT */}

<div>

<label className="
text-sm
font-medium
text-gray-600
">

Subject

</label>


<div className="
relative
mt-2
">


<BookOpen

size={18}

className="
absolute
left-3
top-3.5
text-gray-400
"

/>


<input

type="text"

placeholder="Example: React"

value={subject}

onChange={
(e)=>setSubject(e.target.value)
}

className="
w-full
pl-10
py-3
rounded-xl
border
bg-gray-50
outline-none
focus:ring-2
focus:ring-blue-400
"

/>


</div>


</div>









{/* DATE */}


<div>


<label className="
text-sm
font-medium
text-gray-600
">

Exam Date

</label>


<div className="
relative
mt-2
">


<CalendarDays

size={18}

className="
absolute
left-3
top-3.5
text-gray-400
"

/>



<input

type="date"

value={examDate}

onChange={
(e)=>setExamDate(e.target.value)
}

className="
w-full
pl-10
py-3
rounded-xl
border
bg-gray-50
outline-none
focus:ring-2
focus:ring-purple-400
"

/>


</div>


</div>










{/* HOURS */}


<div>


<label className="
text-sm
font-medium
text-gray-600
">

Hours Per Day

</label>



<div className="
relative
mt-2
">


<Clock

size={18}

className="
absolute
left-3
top-3.5
text-gray-400
"

/>



<input

type="number"

placeholder="2"

value={hoursPerDay}

onChange={
(e)=>setHoursPerDay(e.target.value)
}

className="
w-full
pl-10
py-3
rounded-xl
border
bg-gray-50
outline-none
focus:ring-2
focus:ring-green-400
"

/>


</div>


</div>




</div>









<button

onClick={handleGenerate}

disabled={loading}

className="
mt-8
w-full
py-3
rounded-xl
bg-gradient-to-r
from-blue-500
to-purple-600
text-white
font-semibold
shadow-lg
hover:scale-[1.02]
transition
disabled:opacity-50
"

>


{

loading

?

"✨ Creating AI Plan..."

:

"Generate Study Plan"

}


</button>






</div>



{/* TOPICS */}

<div className="md:col-span-3">

  <label className="text-sm font-medium text-gray-600">
    Topics To Cover
  </label>

  <textarea
    placeholder="React Basics, JSX, Components, Hooks, Context API, Redux..."
    value={topics}
    onChange={(e) => setTopics(e.target.value)}
    rows={4}
    className="
      w-full
      mt-2
      p-3
      rounded-xl
      border
      bg-gray-50
      outline-none
      focus:ring-2
      focus:ring-blue-400
    "
  />

</div>









{/* RESULT */}


{

plan && (


<div className="
bg-white
rounded-3xl
shadow-sm
border
p-8
">


<div className="
flex
items-center
gap-3
mb-5
">


<div className="
w-12
h-12
rounded-xl
bg-purple-100
flex
items-center
justify-center
">


<Sparkles
className="text-purple-600"
/>


</div>


<div>


<h2 className="
text-xl
font-bold
">

Your AI Generated Plan


</h2>


<p className="
text-gray-500
text-sm
">

Follow this schedule for better results

</p>


</div>


</div>






<div className="
bg-gray-50
rounded-2xl
p-6
border
leading-8
text-gray-700
whitespace-pre-wrap
">

{plan}


</div>




</div>


)


}





</div>


);


};


export default AIStudyPlanner;
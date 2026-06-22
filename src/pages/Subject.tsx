import { useEffect, useState } from "react";
import api from "../service/api";

import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  
} from "lucide-react";


type Subject = {
  _id?: string;
  title:string;
  description?:string;
  color?:string;
};



const Subject = () => {


const [subjects,setSubjects] =
useState<Subject[]>([]);


const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [color,setColor]=useState("#6366f1");


const [editingId,setEditingId]=
useState<string|null>(null);






// FETCH SUBJECTS

const fetchSubjects = async()=>{

try{

const res =
await api.get("/subjects");


setSubjects(res.data || []);


}catch(err){

console.log(err);

}


};




useEffect(()=>{

fetchSubjects();

},[]);







// RESET

const resetForm=()=>{

setTitle("");

setDescription("");

setColor("#6366f1");

setEditingId(null);

};







// ADD

const handleAddSubject = async()=>{


if(!title){

alert("Enter subject name");

return;

}


try{


await api.post(
"/subjects",
{
title,
description,
color
}
);


resetForm();

fetchSubjects();


}catch(err){

console.log(err);

}



};








// EDIT

const handleEdit=(subject:Subject)=>{


setTitle(subject.title);

setDescription(
subject.description || ""
);


setColor(
subject.color || "#6366f1"
);


setEditingId(
subject._id || null
);



};







// UPDATE

const handleUpdate = async()=>{


if(!editingId)return;



try{


await api.put(
`/subjects/${editingId}`,
{
title,
description,
color
}
);


resetForm();

fetchSubjects();



}catch(err){

console.log(err);

}



};








// DELETE

const handleDelete=async(id?:string)=>{


try{


await api.delete(
`/subjects/${id}`
);


fetchSubjects();


}catch(err:any){

alert(
err.response?.data?.message ||
"Delete failed"
);


}


};









return (

<div className="space-y-8">





{/* HEADER */}

<div className="
flex
justify-between
items-center
">


<div>


<h1 className="
text-3xl
font-bold
text-gray-800
flex
items-center
gap-3
">


<BookOpen
className="text-blue-600"
/>


Subjects


</h1>



<p className="
text-gray-500
mt-2
">

Manage your learning subjects

</p>



</div>





<button

onClick={
editingId
?
handleUpdate
:
handleAddSubject
}

className="
flex
items-center
gap-2
bg-gradient-to-r
from-blue-500
to-purple-600
text-white
px-6
py-3
rounded-xl
shadow
hover:scale-105
transition
"

>


<Plus size={20}/>


{
editingId
?
"Update"
:
"Add Subject"
}


</button>



</div>









{/* FORM */}


<div className="
bg-white
rounded-3xl
border
shadow-sm
p-8
">


<h2 className="
text-xl
font-bold
mb-6
">


{
editingId
?
"Edit Subject"
:
"Create New Subject"
}


</h2>






<div className="
grid
md:grid-cols-2
gap-5
">





<input

value={title}

onChange={
(e)=>setTitle(e.target.value)
}

placeholder="Subject title"

className="
px-4
py-3
rounded-xl
border
bg-gray-50
outline-none
focus:ring-2
focus:ring-blue-400
"

/>








<div className="
flex
items-center
gap-4
">


<div>


<label className="
text-sm
text-gray-500
">

Color

</label>


<input

type="color"

value={color}

onChange={
(e)=>setColor(e.target.value)
}

className="
block
mt-2
w-14
h-12
rounded-xl
cursor-pointer
"

/>


</div>





<div

style={{
backgroundColor:color
}}

className="
w-14
h-14
rounded-xl
shadow
mt-5
"

/>


</div>





</div>








<textarea

value={description}

onChange={
(e)=>setDescription(e.target.value)
}

placeholder="Description"

className="
mt-5
w-full
h-32
px-4
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









{/* SUBJECT LIST */}


<div>

<h2 className="
text-2xl
font-bold
mb-5
">

📚 My Subjects

</h2>






<div className="
grid
md:grid-cols-3
gap-6
">





{

subjects.map(
(subject)=>(


<div

key={subject._id}

className="
bg-white
rounded-3xl
p-6
border
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition
"

>




<div className="
flex
justify-between
items-center
mb-5
">


<div

style={{
backgroundColor:
subject.color || color
}}

className="
w-14
h-14
rounded-2xl
flex
items-center
justify-center
font-bold
text-white
text-xl
"

>

{
subject.title
.charAt(0)
.toUpperCase()
}


</div>



<span className="
text-xs
px-3
py-1
rounded-full
bg-green-100
text-green-600
">

Active

</span>


</div>








<h3 className="
text-xl
font-bold
text-gray-800
">

{subject.title}

</h3>



<p className="
text-gray-500
mt-2
text-sm
">

{
subject.description ||
"No description"
}

</p>








<div className="
flex
gap-3
mt-6
">


<button

onClick={()=>
handleEdit(subject)
}

className="
flex-1
flex
items-center
justify-center
gap-2
bg-blue-100
text-blue-600
py-2
rounded-xl
hover:bg-blue-200
"

>


<Edit size={16}/>

Edit

</button>







<button

onClick={()=>
handleDelete(subject._id)
}

className="
flex-1
flex
items-center
justify-center
gap-2
bg-red-100
text-red-600
py-2
rounded-xl
hover:bg-red-200
"

>


<Trash2 size={16}/>

Delete


</button>



</div>






</div>


)


)



}





</div>



</div>







</div>

);


};


export default Subject;
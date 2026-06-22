import { useEffect, useState } from "react";
import api from "../service/api";
import jsPDF from "jspdf";

import {
  Plus,
  Trash2,
  Edit,
  FileText,
  Sparkles,
  Wand2
} from "lucide-react";


type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};



const Notes = () => {


  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [editId, setEditId] = useState<string | null>(null);

  const [aiTopic, setAiTopic] = useState("");

  const [aiLoading, setAiLoading] = useState(false);


  // GET NOTES

  const fetchNotes = async () => {

    try {

      const res = await api.get("/notes");

      setNotes(res.data);

    } catch (error: any) {

      console.log(
        error.response?.data || error.message
      );

    }

  };



  useEffect(() => {

    fetchNotes();

  }, []);





  // CREATE / UPDATE NOTE

  const saveNote = async () => {


    if (!title.trim()) {

      alert("Please enter note title");
      return;

    }


    if (!content.trim()) {

      alert("Please enter note content");
      return;

    }



    try {


      if (editId) {


        await api.put(
          `/notes/${editId}`,
          {
            title: title.trim(),
            content: content.trim()
          }
        );


      } else {


        await api.post(
          "/notes",
          {
            title: title.trim(),
            content: content.trim()
          }
        );


      }



      setTitle("");

      setContent("");

      setEditId(null);

      fetchNotes();



    } catch (error: any) {

      console.log(
        error.response?.data || error.message
      );

    }


  };







  // DELETE NOTE

  const deleteNote = async (id: string) => {


    try {


      await api.delete(
        `/notes/${id}`
      );


      fetchNotes();


    } catch (error: any) {

      console.log(
        error.response?.data || error.message
      );

    }


  };







  // EDIT NOTE

  const editNote = (note: Note) => {

    setTitle(note.title);

    setContent(note.content);

    setEditId(note._id);

  };


  // AI NOTE GENERATOR

  const generateAINote = async () => {


    if (!aiTopic.trim()) {

      alert("Enter topic");

      return;

    }


    try {


      setAiLoading(true);



      const res = await api.post(
        "/ai/generate-note",
        {
          topic: aiTopic
        }
      );



      setTitle(aiTopic);


      setContent(
        res.data.note
      );



      setAiTopic("");



    }
    catch (error: any) {


      console.log(
        error.response?.data || error.message
      );


      alert("AI generation failed");


    }
    finally {


      setAiLoading(false);


    }



  };




  // PDF DOWNLOAD

  const downloadPDF = (note: Note) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Smart Study Planner", 15, 18);

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(note.title, 15, 45);

    // Date
    doc.setFontSize(10);
    doc.text(
      `Created: ${new Date(note.createdAt).toLocaleString()}`,
      15,
      55
    );

    // Line
    doc.line(15, 60, 195, 60);

    const lines = doc.splitTextToSize(
      note.content,
      170
    );

    let y = 75;

    lines.forEach((line: string) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(line, 15, y);
      y += 8;
    });

    doc.save(`${note.title}.pdf`);
  };





  const cardColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-violet-500",
  ];







  return (

    <div className="space-y-8">



      {/* HEADER */}

      <div
        className="
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        rounded-3xl
        p-8
        text-white
        shadow-xl
        "
      >

        <h1 className="text-4xl font-bold">
          📝 My Notes
        </h1>


        <p className="mt-2 text-white/80">
          Create and manage your study notes
        </p>


      </div>



      {/* AI GENERATOR */}

      <div
        className="
bg-gradient-to-r
from-purple-600
to-blue-600
rounded-3xl
p-6
text-white
shadow-xl
"
      >


        <div className="flex items-center gap-3 mb-4">

          <Sparkles size={28} />

          <h2 className="text-2xl font-bold">
            AI Study Note Generator
          </h2>


        </div>



        <p className="mb-4 text-white/80">
          Generate smart study notes using Gemini AI
        </p>




        <input

          value={aiTopic}

          onChange={(e) => setAiTopic(e.target.value)}

          placeholder="Enter topic (Example: React Hooks)"

          className="
w-full
p-3
rounded-xl
text-black
mb-4
"

        />




        <button

          onClick={generateAINote}

          disabled={aiLoading}

          className="
bg-white
text-purple-700
px-6
py-3
rounded-xl
flex
items-center
gap-2
font-bold
"

        >


          <Wand2 size={20} />


          {
            aiLoading
              ?
              "Generating..."
              :
              "Generate AI Note"
          }


        </button>



      </div>



      {/* FORM */}

      <div
        className="
        bg-white
        rounded-3xl
        p-6
        shadow-md
        border
        "
      >


        <h2 className="text-2xl font-bold mb-5">

          {
            editId
              ?
              "Edit Note"
              :
              "Create New Note"
          }

        </h2>




        <input

          value={title}

          onChange={(e) => setTitle(e.target.value)}

          placeholder="Note title"

          className="
          w-full
          border
          rounded-xl
          p-3
          mb-4
          "

        />





        <textarea

          value={content}

          onChange={(e) => setContent(e.target.value)}

          placeholder="Write your note..."

          rows={5}

          className="
          w-full
          border
          rounded-xl
          p-3
          "

        />





        <button

          onClick={saveNote}

          className="
          mt-5
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
          "

        >

          <Plus size={20} />


          {
            editId
              ?
              "Update Note"
              :
              "Add Note"
          }


        </button>



      </div>









      {/* NOTES LIST */}


      <div>


        <h2 className="text-3xl font-bold mb-5">

          Saved Notes

        </h2>





        {
          notes.length === 0

            ?


            <div
              className="
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow
            "
            >

              <FileText
                size={50}
                className="mx-auto text-gray-400"
              />


              <p className="mt-3 text-gray-500">

                No notes available

              </p>


            </div>



            :



            <div
              className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            "
            >


              {

                notes.map((note, index) => (


                  <div

                    key={note._id}

                    className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  "

                  >


                    <div
                      className={`
                    h-3
                    bg-gradient-to-r
                    ${cardColors[index % cardColors.length]}
                    `}
                    />


                    <div className="p-6">


                      <h3 className="text-xl font-bold">
                        {note.title}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>

                      <p
                        className="
  text-gray-500
  mt-3
  line-clamp-4
  "
                      >
                        {note.content}
                      </p>





                      <div className="flex gap-3 mt-5">


                        <button

                          onClick={() => downloadPDF(note)}

                          className="
                        bg-green-100
                        text-green-600
                        px-4
                        py-2
                        rounded-xl
                        "

                        >

                          PDF

                        </button>





                        <button

                          onClick={() => editNote(note)}

                          className="
                        bg-blue-100
                        text-blue-600
                        p-3
                        rounded-xl
                        "

                        >

                          <Edit size={18} />

                        </button>






                        <button

                          onClick={() => deleteNote(note._id)}

                          className="
                        bg-red-100
                        text-red-600
                        p-3
                        rounded-xl
                        "

                        >

                          <Trash2 size={18} />

                        </button>



                      </div>



                    </div>



                  </div>


                ))

              }



            </div>


        }



      </div>



    </div>


  );

};


export default Notes;
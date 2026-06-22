import { useEffect, useState } from "react";
import api from "../service/api";


type Profile = {
    id: string;
    name: string;
    email: string;
    roles: string[];
    profileImage?: string;
    createdAt: string;
};


const AdminProfile = () => {


    const [profile, setProfile] =
        useState<Profile | null>(null);

    const [loading, setLoading] =
        useState(true);


    const [selectedImage, setSelectedImage] =
        useState<File | null>(null);


    const [preview, setPreview] =
        useState<string | null>(null);


    const [uploading, setUploading] =
        useState(false);



    useEffect(() => {

        fetchProfile();

    }, []);




    const fetchProfile = async () => {

        try {

            const res = await api.get("/auth/me");


            setProfile(res.data.data);


            if (res.data.data.profileImage) {

                setPreview(
                    res.data.data.profileImage
                );

            }


        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };





    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {


        const file = e.target.files?.[0];


        if (file) {

            setSelectedImage(file);


            const imageUrl =
                URL.createObjectURL(file);


            setPreview(imageUrl);

        }

    };







    const updateProfileImage = async () => {


        if (!selectedImage) {

            return;

        }



        try {


            setUploading(true);



            const formData = new FormData();



            formData.append(
                "image",
                selectedImage
            );




            const res = await api.put(
                "/auth/profile-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setProfile(
                res.data.data
            );



            setSelectedImage(null);



            alert(
                "Profile image updated successfully"
            );



        } catch (error) {


            console.log(error);


            alert(
                "Image upload failed"
            );


        } finally {


            setUploading(false);


        }


    };





    if (loading) {

        return (

            <div className="p-6">

                Loading profile...

            </div>

        );

    }




    return (

        <div className="p-6 space-y-8">



            {/* Header */}

            <div>

                <h1 className="
                text-3xl 
                font-bold 
                text-[#1C2D2A]
                ">

                    Admin Profile

                </h1>


                <p className="
                text-[#7A8A87] 
                mt-1
                ">

                    Manage administrator account details

                </p>


            </div>






            {/* Profile Card */}


            <div className="
            bg-white 
            rounded-3xl 
            border 
            border-[#E2E8E5] 
            shadow-sm 
            p-8
            ">



                <div className="
                flex 
                flex-col 
                md:flex-row 
                md:items-center 
                gap-6
                ">



                    {/* Image */}


                    {

                        preview ?

                            (

                                <img

                                    src={preview}

                                    alt="Profile"

                                    className="
                        w-28
                        h-28
                        rounded-full
                        object-cover
                        border-4
                        border-[#E2E8E5]
                        "

                                />

                            )

                            :

                            (

                                <div className="
                        w-28
                        h-28
                        rounded-full
                        bg-[#2D7A6F]
                        text-white
                        flex
                        items-center
                        justify-center
                        text-4xl
                        font-bold
                        ">


                                    {
                                        profile?.name
                                            ?.charAt(0)
                                            ?.toUpperCase()
                                    }


                                </div>

                            )


                    }








                    {/* Details */}


                    <div>


                        <h2 className="
                        text-2xl
                        font-bold
                        text-[#1C2D2A]
                        ">

                            {profile?.name}

                        </h2>



                        <p className="
                        text-[#7A8A87]
                        ">

                            System Administrator

                        </p>





                        <div className="
                        mt-3
                        flex
                        gap-2
                        flex-wrap
                        ">


                            {
                                profile?.roles?.map(
                                    (role, index) => (

                                        <span

                                            key={index}

                                            className="
                            px-3
                            py-1
                            rounded-lg
                            bg-[#E8F3F1]
                            text-[#2D7A6F]
                            text-sm
                            font-medium
                            "

                                        >

                                            {role}

                                        </span>


                                    )
                                )

                            }


                        </div>


                    </div>


                </div>





                {/* Image Buttons */}


                <div className="mt-8">


                    <label

                        className="
                inline-block
                px-5
                py-3
                bg-blue-600
                text-white
                rounded-xl
                cursor-pointer
                hover:bg-blue-700
                "

                    >

                        Change Image


                        <input

                            type="file"

                            accept="image/*"

                            className="hidden"

                            onChange={handleImageChange}

                        />

                    </label>






                    {

                        selectedImage &&

                        (

                            <button

                                onClick={updateProfileImage}

                                disabled={uploading}

                                className="
                ml-3
                px-5
                py-3
                bg-green-600
                text-white
                rounded-xl
                hover:bg-green-700
                "

                            >

                                {
                                    uploading
                                        ?
                                        "Uploading..."
                                        :
                                        "Save Image"
                                }


                            </button>


                        )


                    }



                </div>



            </div>









            {/* Details Section */}


            <div className="
            grid 
            md:grid-cols-2 
            gap-6
            ">



                <InfoCard
                    title="Full Name"
                    value={profile?.name}
                />



                <InfoCard
                    title="Email Address"
                    value={profile?.email}
                />



                <InfoCard
                    title="User ID"
                    value={profile?.id}
                />



                <InfoCard

                    title="Joined Date"

                    value={
                        profile?.createdAt
                            ?
                            new Date(
                                profile.createdAt
                            )
                                .toLocaleDateString()
                            :
                            "-"
                    }

                />


            </div>







            {/* Stats */}


            <div className="
            grid 
            md:grid-cols-3 
            gap-6
            ">


                <StatCard
                    title="Account Status"
                    value="Active"
                />



                <StatCard
                    title="Role"
                    value="Admin"
                />



                <StatCard
                    title="Access Level"
                    value="Full Access"
                />


            </div>




        </div>


    );

};








const InfoCard = (
    {
        title,
        value
    }: {
        title: string;
        value?: string;
    }) => {


    return (

        <div className="
bg-white
border
border-[#E2E8E5]
rounded-2xl
p-6
">


            <p className="
text-sm
text-[#7A8A87]
mb-2
">

                {title}

            </p>


            <p className="
font-semibold
text-lg
">

                {value}

            </p>


        </div>

    );


};







const StatCard = (
    {
        title,
        value
    }: {
        title: string;
        value: string;
    }) => {


    return (

        <div className="
bg-white
border
border-[#E2E8E5]
rounded-2xl
p-6
">


            <p className="
text-[#7A8A87]
text-sm
">

                {title}

            </p>


            <p className="
text-xl
font-bold
mt-2
">

                {value}

            </p>


        </div>

    );


};





export default AdminProfile;
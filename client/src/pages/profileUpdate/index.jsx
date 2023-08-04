import React from "react";
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import porfile from "./profile.png"

const Profile = () => {
    const [image, setImage] = useState("")
    const [imageCrop, setImageCrop] = useState("")


    return (

        <div className="profile_img text-center p-4">
            <div className="flex flex-column justify-content-center align-items-center">
                <img
                    style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "4px solid green",
                    }}
                    src={porfile} alt="" />
                <label htmlFor="" className="mt-3 font-semibold text-5xl">Yana Syahrudin</label>

                <Dialog
                    visible={imageCrop}
                    header={() => (
                        <p htmlFor="" className="text-2xl font-semibold textcolor">
                            Update Profile
                        </p>
                        )}
                        onHide={()=> setImageCrop(false)}
                    >
                        <p>hi</p>

            </Dialog >

            <InputText
                type="file"
                accept="/image/*"
                onChange={(event) => {
                    const file = event.target.files[0];
                    if (file && file.type.substring(0, 5) === "image") {
                        setImage(file);
                    } else {
                        setImage(null)
                    }
                }}
            />
        </div>
        </div >

    )
}

export default Profile;

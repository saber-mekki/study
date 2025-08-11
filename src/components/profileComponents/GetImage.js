import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    CardMedia,
} from "@mui/material";

const DEFAULT_AVATAR = "/assets/images/tutorprofil.png";

export default function GetImage({id, user_name}) {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (id) {
                    await axios
                        .get(`${process.env.REACT_APP_API_BASE_URL}/images/${id}`)
                        .then((response) => {
                            console.log({cc:response.data})
                            setImageUrl(response.data[response.data.length - 1].image_url)
                        })
                        .catch((error) => {
                            console.error("Error fetching images:", error);
                        });
                }

            } catch (err) {
                if (err.response && err.response.data.error) {
                } else {
                    console.log("An error occurred while fetching user data.");
                }
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <CardMedia
            component="img"
            sx={{ width: 80, height: 80, borderRadius: "50%", mr: 2 }}
            image={imageUrl || DEFAULT_AVATAR}
            alt={user_name}
        />
    );
}

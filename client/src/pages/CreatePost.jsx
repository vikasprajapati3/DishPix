import { useState } from "react";
import { useNavigate } from "react-router-dom";


function CreatePost() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        restaurant: "",
        foodName: "",
        caption: "",
        rating: 5,
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
}

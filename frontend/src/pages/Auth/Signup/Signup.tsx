import React from "react";
import { Form } from "../../../components/Form";
import "./Signup.scss";

const Signup: React.FC = () => {
    const handleSignup = (formData: any) => {
        console.log("Signup data:", formData);
    };

    const signupFields = [
        { name: "email", label: "Email", type: "email", required: true },
        {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
        },
        {
            name: "firstName",
            label: "First Name",
            type: "text",
            required: false,
        },
        { name: "lastName", label: "Last Name", type: "text", required: false },
    ];

    return (
        <div className="page-wrapper">
            <h1>Signup</h1>
            <Form
                onSubmit={handleSignup}
                fields={signupFields}
                buttonName="Créer un compte"
            />
        </div>
    );
};

export default Signup;

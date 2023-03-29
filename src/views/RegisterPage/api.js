import axios from "axios"; 

const loginRest = async (name, secret) => {
    return await axios.get("https://api.chatengine.io/users/me/", {
        headers: {
            "Project-ID": import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID, 
            "User-Name": name, 
            "User-Secret": secret,
        },
    });
};

const signupRest = async (name, type, dobYear, dobMonth, dobDay, email, number, gender, salutation, secret) => {
    return await axios.post(
        "https://api.chatengine.io/users/", 
        { name, type, dobYear, dobMonth, dobDay, email, number, gender, salutation, secret }, 
        { headers: { "Private-Key": import.meta.env.VITE_CHAT_ENGINE_PRIVATE_KEY }}
    );
};

export { loginRest, signupRest };


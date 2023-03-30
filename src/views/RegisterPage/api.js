import axios from "axios";    

const config = {
    'Content-Type': 'application/json',
    "Accept": "application/json",
  } 

const loginRest = async (name, secret) => {
    return await axios.get("https://api.chatengine.io/users/me", { 
        headers: {      
            'Project-ID': "3d82dfcc-f509-4c52-8214-0998a3f07da0", 
            "user-name": name, 
            "user-secret": secret, 
        },
    });
};

const signupRest = async (name, type, dobYear, dobMonth, dobDay, email, number, gender, salutation, secret) => {
    return await axios.post(
        "https://api.chatengine.io/users/", 
        { name, type, dobYear, dobMonth, dobDay, email, number, gender, salutation, secret }, 
        { headers: { "Private-Key": "f0f58726-ef77-4940-b827-cf756fe81009" }}
    );
};

export { loginRest, signupRest };


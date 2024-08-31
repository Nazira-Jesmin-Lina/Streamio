import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const UseAuthStore = create ((set)=>({
    user:null,
    isSigningUp:false,
    ischeckingAuth:true,
    isloggingOut:false,
    isLoggingIn: false,

    signup:async(credentials)=>{
        set({isSigningUp:true});
        try {
            
            console.log(credentials);
            const response =await axios.post("http://localhost:5000/api/v1/auth/signup",credentials);
            set({user:response.data.user,isSigningUp:false});
            toast.success("Account Created Successfully")

        } catch (error) {
            toast.error(error.response.data.message );
            set({isSigningUp:false,user:null})
        }
    },
    login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
            console.log("hi log in koro");
            console.log(credentials);
			const response = await axios.post("http://localhost:5000/api/v1/auth/login", credentials);
			set({ user: response.data.user, isLoggingIn: false });
            toast.success("Log in Successfully")
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error.response.data.message || "Login failed");
		}
	},


    logout:async()=>{

        set({isloggingOut:true});
        try {
            
            console.log("hello");
            const response =await axios.post("http://localhost:5000/api/v1/auth/logout");
            set({user:null,isloggingOut:false});
            console.log("hello");
            toast.success("Log out Successfully")

            
        } catch (error) {
          
            set({isloggingOut:false,user:null})
            toast.error(error.response.data.message || "logout Failed" );
        }



    },



    authCheck:async()=>{
        set({ischeckingAuth:true});
        try {
            
            console.log("dhukche");
            const response =await axios.post("http://localhost:5000/api/v1/auth/authCheck");
            set({user:response.data.user,ischeckingAuth:false});
            
        } catch (error) {
          
            set({ischeckingAuth:false,user:null})
        }

    },
}))
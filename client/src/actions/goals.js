import { getAllPosts } from "../api";
export const fetchGoals = async() => {
    try {
       const res = getAllPosts();
       console.log(res); 
    } catch (error) {
        console.log(error);
    }
};

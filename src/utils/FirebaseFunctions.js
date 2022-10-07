import { doc, setDoc, collection, query, getDocs, orderBy } from "firebase/firestore";
import { firestore } from "../firebase.config";

//Saving new items
export const saveItem = async (data) => {
    await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), data, { merge: true }
    );
};


// fetch food items from firestore database
//https://console.firebase.google.com/project/delivery-hero-86f27/firestore/data/~2FfoodItems
export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};
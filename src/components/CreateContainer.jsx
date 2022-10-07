import React, { useState } from 'react'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader'
import { storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getAllFoodItems, saveItem } from '../utils/FirebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [calories, setCalories] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    // https://www.makeuseof.com/upload-files-to-firebase-using-reactjs/

    setIsLoading(true);
    const imageFile = e.target.files[0];
    // console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        alert("Error while uploading : Try Again");
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          alert("Image Uploaded successfully");
        });
      }
    );
  };

  const deleteImg = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      alert("Image Deleted successfully")
    })
  }

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        alert("Required fields can't be empty")
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        alert("Data Uploaded successfully")
        setTimeout(() => {
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      alert("Error while uploading : Try Again")
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCalories("")
  };

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      // console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      });
    });
  };

  return (
    <div className='w-full min-h-screen p-4 flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4  '>
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdFastfood className="text-xl text-gray-700" />
          <input type="text" required value={title} placeholder="Enter a title" className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor' onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className='w-full'>
          <select onChange={(e) => setCategory(e.target.value)} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
            <option value="other" className='bg-white'>Select Category</option>
            {categories &&
              categories.map((item) => (
                <option key={item.id} className="text-base border-0 outline-none capitalize bg-white text-headingColor" value={item.urlParamName}>{item.name}</option>
              )
              )}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {
            isLoading ? <Loader /> :
              <>
                {
                  !imageAsset ? (
                    <>
                      <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                          <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                          <p className="text-gray-500 hover:text-gray-700">Click here to upload</p>
                        </div>
                        <input type="file" name='uploadimage' accept='image/*' onChange={uploadImage} className="w-0 h-0" />
                      </label>
                    </>
                  ) : (
                    <>
                      <div className='relative h-full'>
                        <img src={imageAsset} alt="uploadedimg" className='w-full h-full object-cover' />
                        <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out'
                          onClick={deleteImg}
                        ><MdDelete className='text-white' /></button>
                      </div>
                    </>
                  )}
              </>
          }
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className=''>
          <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveDetails}>Save</button>
        </div>
      </div>
    </div>
  )
}
export default CreateContainer
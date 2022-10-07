import React, { useEffect } from 'react'
import { Header, MainContainer, CreateContainer } from "./components"
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"
import { useStateValue } from './context/StateProvider'
import { getAllFoodItems } from './utils/FirebaseFunctions'
import { actionType } from './context/reducer'
import About from './components/About'

const App = () => {

  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      // console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <AnimatePresence >
      <div className='w-screen h-auto flex flex-col bg-primary'>
        <Header />
        <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/about" element={<About />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App
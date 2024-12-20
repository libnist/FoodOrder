import { useEffect } from "react";
import { useState } from "react";

import MealItem from "./MealItem";

export default function Meals() {

    const [loadedMeals, setLoadedMeals] = useState([]);



    useEffect(() => {

        const fetchMeals = async () => {

            const response = await fetch("http://localhost:3000/meals", {
                method: "GET"
            });

            if (!response.ok) {
                // ...
            }

            const meals = await response.json();

            setLoadedMeals(meals);

        }

        fetchMeals();
    }, []);





    return (
        <ul id="meals">
            {loadedMeals.map(meal => (
                <MealItem id={meal.id} meal={meal}/>
            ))}
        </ul>
    )
}
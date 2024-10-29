import { getTasks } from "../database/get-tasks";
import { generate2DArray } from "../utils/generateFactors"


export const distributeLoad = async () => {
    const factors = generate2DArray(10);
    const tasks = await getTasks();
    console.log(tasks);

    tasks.forEach((task) => {
        // Log each task's crops
        const crops = task.Crop; // Assuming Crop is an array of crop objects
        crops.forEach((crop) => {
            console.log(crop); // Log the crop object
            // You can also access specific properties of the crop if needed
            // console.log(`Crop ID: ${crop.id}, Crop Name: ${crop.name}`);
        });

        // Perform fractional knapsack logic here
        // Reduce demand from the database
        // Assign tasks to farmers with available land
        // Mark the land as filled
    });
};


distributeLoad()
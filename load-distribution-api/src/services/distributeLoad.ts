import { getTasks } from "../database/get-tasks";
import { generate2DArray } from "../utils/generateFactors";
import { getLands } from "../database/get-land";
import { calculateHeuristic } from "../utils/calculateHeuristic";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


class MinHeap {
    constructor(private heap: { heuristic: number, crop: any, land: any }[] = []) {}

    insert(item: { heuristic: number, crop: any, land: any }) {
        this.heap.push(item);
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx].heuristic <= this.heap[idx].heuristic) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }

    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0 && end) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return min;
    }

    bubbleDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let swap = null;

            if (leftChildIdx < length) {
                if (this.heap[leftChildIdx].heuristic < element.heuristic) swap = leftChildIdx;
            }
            if (rightChildIdx < length) {
                if (
                    (swap === null && this.heap[rightChildIdx].heuristic < element.heuristic) ||
                    (swap !== null && this.heap[rightChildIdx].heuristic < this.heap[leftChildIdx].heuristic)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
            idx = swap;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

export const distributeLoad = async () => {
    try {
        const tasks = await getTasks();
        
        // Fetch lands with their suitable crops
        const lands = await prisma.land.findMany({
            include: {
                SuitableCrop: true, // Retrieves crops that are suitable for each land
            },
        });

        for (const task of tasks) {
            const heap = new MinHeap();

            // Populate heap with only suitable crop-land pairs
            for (const crop of task.Crop) {
                for (const land of lands) {
                    // Check if land is suitable, not filled, and has sufficient area
                    const isSuitableCrop = land.SuitableCrop.some(suitable => suitable.id === crop.id);
                    
                    if (!land.filled && land.area >= crop.landSpacing && isSuitableCrop) {
                        const heuristic = calculateHeuristic(generate2DArray(10));
                        heap.insert({ heuristic, crop, land });
                    }
                }
            }

            // Distribute crops based on heuristic values
            while (!heap.isEmpty()) {
                const { heuristic, crop, land } = heap.extractMin();

                // Calculate max amount allocatable to this land
                const maxAllocatable = Math.min(crop.amount, Math.floor(land.area / crop.landSpacing));

                if (maxAllocatable > 0) {
                    // Calculate new area after allocation
                    const newArea = land.area - maxAllocatable * crop.landSpacing;

                    // Update the land in the database
                    await prisma.land.update({
                        where: { id: land.id },
                        data: { 
                            area: newArea,
                            filled: newArea <= 0,
                        },
                    });

                    // Update the crop in the database
                    await prisma.crop.update({
                        where: { id: crop.id },
                        data: { 
                            amount: crop.amount - maxAllocatable,
                            assignmentStatus: crop.amount - maxAllocatable <= 0
                        },
                    });

                    // Update in-memory values
                    land.area = newArea;
                    crop.amount -= maxAllocatable;

                    // Mark land as filled if its area is fully utilized
                    if (newArea <= 0) {
                        land.filled = true;
                    }

                    // Break the loop if the crop has been fully assigned
                    if (crop.amount <= 0) {
                        break;
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error distributing load:", error);
    } finally {
        await prisma.$disconnect();
    }
};

distributeLoad()
.then(data => console.log(data))
.catch(err => console.log(err))
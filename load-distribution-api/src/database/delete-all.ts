import { getTasks } from "./get-tasks";
import { generate2DArray } from "../utils/generateFactors";
import { getLands } from "./get-land";
import { calculateHeuristic } from "../utils/calculateHeuristic";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function for min-heap insertion
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
        const lands = await getLands();

        for (const task of tasks) {
            const heap = new MinHeap();

            // Populate the heap with heuristic values for each crop-land pair
            for (const crop of task.Crop) {
                for (const land of lands) {
                    if (!land.filled && land.area >= crop.landSpacing) {
                        const heuristic = calculateHeuristic(generate2DArray(10));
                        heap.insert({ heuristic, crop, land });
                    }
                }
            }

            // Fractional knapsack - distribute crop amounts based on heap order
            while (!heap.isEmpty()) {
                const { heuristic, crop, land } = heap.extractMin();
                
                // Calculate maximum amount that can be allocated to this land
                const maxAllocatable = Math.min(crop.amount, land.area / crop.landSpacing);
                
                if (maxAllocatable > 0) {
                    // Update database with distributed amounts and mark land as filled if necessary
                    await prisma.land.update({
                        where: { id: land.id },
                        data: { filled: land.area <= maxAllocatable * crop.landSpacing },
                    });

                    await prisma.crop.update({
                        where: { id: crop.id },
                        data: { 
                            amount: crop.amount - maxAllocatable,
                            assignmentStatus: crop.amount - maxAllocatable <= 0
                        },
                    });

                    // Reduce land area and crop amount accordingly
                    land.area -= maxAllocatable * crop.landSpacing;
                    crop.amount -= maxAllocatable;

                    if (land.area <= 0) {
                        // Mark land as fully filled and stop using it
                        land.filled = true;
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

distributeLoad();

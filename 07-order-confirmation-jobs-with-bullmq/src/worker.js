import { Worker } from "bullmq";
import {connection} from './queue.js'


const worker  = new Worker(
    'emails', 
    async (job)=>{
         console.log("Processing email job ", job.id, job.name, job.data)
         await new Promise((resolve)=>setTimeout(resolve, 1500))
         console.log("Email JOb completed", job.id, job.name, job.data)
    },
    {
        connection
    }
)

worker.on("completed", (job)=>{
    console.log("Job completed", job.id, job.name, job.data)
})

worker.on("failed", (job, err)=>{
    console.log("JOb failed", job.id, job.name, job.data, err)
})

/*
import {Worker} from 'bullmq'
import {connection} form './queue.js'

const worker  = new Worker(
    'emails',
    anync (job)=>{
        console.log("Processing email job", job.id, job.name, job.data)
         await new Promise((resolve)=>setTimeout(15000))
    console.log("Email job   completed", job.id, job.name, job.data)
        },
        {
        connection
        }
   
)

worker.on('completed', (job)=>{
      console.log("Job completed", jon.id, job.name, job.data)
    })

worker.on('failed), (job, err)=>{
    console.log("JOb faled", job.id, job.name, job.data)
    }

*/
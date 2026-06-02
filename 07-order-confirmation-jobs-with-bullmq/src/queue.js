import { Queue } from "bullmq";

const connection = {
  host: "localhost",
  port: 6379,
};

export const emailQueue = new Queue("emails", { connection });

export { connection };



/*
import {Queue} form 'bullmq'

const  connection = {
   host:'localhost',
   port: port no
}

export const emailQueue = new Queue("emails", {connection})
export {connection}

*/
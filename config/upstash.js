import {client , WorkflowClient} from "@upstash/workflow"

import {QSTASH_URL, QSTASH_TOKEN} from "./env.js"


export const WorkflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});
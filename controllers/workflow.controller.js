import dayjs from "dayjs";
import {createRequire} from "module";
import Subscription from "../models/subscription.model.js";
const require = createRequire(import.meta.url);
const {serve} = require("@upstash/workflow/express")

const Reminder = [7,5,2,1]
export const sendReminder = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== active) return;


    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Subscription ${subscriptionId} has already expired.`);
        return;
    }

    for (const daysBefore of Reminder) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if (reminderDate.isAfter(dayjs())) {
            await sleepReminder(context,  `reminder for ${daysBefore} days before`,  reminderDate);
        }

        await triggerReminder(context,  `reminder for ${daysBefore} days before`);
    }
})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'email name');
    })
}


const sleepReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(date.toDate());
}


const triggerReminder = async(context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
    })
}

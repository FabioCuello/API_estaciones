import { RecurrenceRule } from "node-schedule"

const RULE = new RecurrenceRule()
RULE.minute = 0
RULE.hour = 23

export { RULE }


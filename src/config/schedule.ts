import { RecurrenceRule } from "node-schedule"

const RULE = new RecurrenceRule()
RULE.minute = 38
RULE.hour = 8

export { RULE }


import * as core from '@actions/core'
import styles from 'ansi-styles';

const plan = process.env.PLAN || ""
const add = process.env.ADD || "\/"
const remove = process.env.REMOVE || "\/"
const update = process.env.UPDATE || "\/"

function colourText(text: string): string {
    const regexPlus = /^(\s*\+)/g
    const regexMinus = /^(\s*-)/g
    const regexTilde = /^(\s*~)/g
    if(regexPlus.test(text)) {
        try {
            return styles.color.ansi16m(...styles.hexToRgb(add)) + text
        } catch {
            return `\u001b[38;2;0;225;0m${text}`
        }
    }
    if(regexMinus.test(text)) {
        try {
            return styles.color.ansi16m(...styles.hexToRgb(remove)) + text
        } catch {
            return `\u001b[38;2;255;31;31m${text}`
        }
    }
    if(regexTilde.test(text)) {
        try {
            return styles.color.ansi16m(...styles.hexToRgb(update)) + text
        } catch {
            return `\u001b[38;2;255;255;0m${text}`
        }
    }
    return text;
}

function run() {
    let out = "";
    try {
        if (!plan) {
            throw Error("No Plan Provided");
        }

        let regex = /[^\r\n]+/g;
        let plan_array_filter = plan.match(regex);
        

        if (plan_array_filter != null) {
            while (plan_array_filter.length != 0) {
                var shift = plan_array_filter.shift();
                if (shift !== undefined) {
                    out = out.concat(colourText(shift));
                    out = out.concat("\n");
                }
            }
        }
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
    core.info(out)
}

run()
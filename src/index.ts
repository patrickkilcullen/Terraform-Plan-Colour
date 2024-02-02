import * as core from '@actions/core'

const plan = process.env.PLAN || ""

function colourText(text: string): string {
    const regexPlus = /^(\s*\+)/g
    const regexMinus = /^(\s*-)/g
    const regexTilde = /^(\s*~)/g
    if(regexPlus.test(text)) {
        return `\x1b[32m${text}\x1b[39m`
    }
    if(regexMinus.test(text)) {
        return `\x1b[31m${text}\x1b[39m`
    }
    if(regexTilde.test(text)) {
        return `\x1b[33m${text}\x1b[39m`
    }
    return text;
}

function run() {
    let out = "";
    try {
        if (!plan) {
            throw Error("No slack bot token provided");
        }

        let regex = /[^\r\n]+/g;
        let plan_array_filter = plan.match(regex);
        

        if (plan_array_filter != null) {
            while (plan_array_filter.length != 0) {
                var shift = plan_array_filter.shift();
                if (shift !== undefined) {
                    out = out.concat(shift);
                    out = out.concat(`\n`);
                }
            }
        }
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
    console.log(out);
}

run()
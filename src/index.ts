import * as core from '@actions/core'

const plan = process.env.PLAN || ""

function colourText(text: string): string {
    const regexPlus = /^(\s*\+)/g
    const regexMinus = /^(\s*-)/g
    const regexTilde = /^(\s*~)/g
    if(regexPlus.test(text)) {
        return `\u001b[38;2;0;225;0m${text}`
    }
    if(regexMinus.test(text)) {
        return `\u001b[38;2;255;0;0m${text}`
    }
    if(regexTilde.test(text)) {
        return `\u001b[38;2;255;255;0m${text}`
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
                    core.info(colourText(shift))
                }
            }
        }
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
    // 3/4 bit
    core.info('\u001b[35mThis foreground will be magenta')

    // 8 bit
    core.info('\u001b[38;5;6mThis foreground will be cyan')

    // 24 bit
    core.info('\u001b[38;2;255;0;0mThis foreground will be bright red')

    // 3/4 bit
    core.info('\u001b[43mThis background will be yellow');

    // 8 bit
    core.info('\u001b[48;5;6mThis background will be cyan')

    // 24 bit
    core.info('\u001b[48;2;255;0;0mThis background will be bright red')
}

run()
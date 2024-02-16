import * as core from '@actions/core'
import styles from 'ansi-styles';
import fs from 'fs'
import util from 'util'

const plan = process.env.PLAN || ""
const path = process.env.PLAN_PATH || ""
const add = process.env.ADD || "#80FF80"
const remove = process.env.REMOVE || "#FF4040"
const update = process.env.UPDATE || "#FFFF80"

function colourText(text: string): string {
    const regexPlus = /^(\s*\+)/g
    const regexMinus = /^(\s*-)/g
    const regexTilde = /^(\s*~)/g
    if(regexPlus.test(text)) {
        return styles.color.ansi16m(...styles.hexToRgb(add)) + text 
    }
    if(regexMinus.test(text)) {
        return styles.color.ansi16m(...styles.hexToRgb(remove)) + text;
    }
    if(regexTilde.test(text)) {
       return styles.color.ansi16m(...styles.hexToRgb(update)) + text;
    }
    return text;
}

async function run() {
    let out = "";
    try {
        if (!plan && !plan) {
            throw Error("No Path or Plan Provided");
        }
        if ((path.length > 0) && ( plan.length > 0)) {
            core.info("::warning ::Path and Plan passed only one expected");
        }
        console.log(plan + "\n" + path);
        console.log(path.length);
        console.log(plan.length);
        
        const regex = /[^\r\n]+/g;
        let plan_array_filter;
        
        console.log(process.cwd());

        if (path.length > 0) {
            const readFile = util.promisify(fs.readFile)
            const file = await readFile(path, "utf8")
            plan_array_filter = file.match(regex);
        } else {
            plan_array_filter = plan.match(regex);
        }

        

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
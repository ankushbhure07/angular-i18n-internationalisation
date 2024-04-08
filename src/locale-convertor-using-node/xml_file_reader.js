const fs = require('fs');
const xml2js = require('xml2js');
const Trans = require('./trans');
const translatte_obj = new Trans();
// Read the XLIFF file
var target = [];

async function translateAndUpdate(lang) {
    try {
        const data = await fs.promises.readFile('../locale/messages.xlf', 'utf-8');

        // Find all <source> elements
        let matches = [...data.matchAll(/(<source>[\s\S]*?<\/source>)/g)];

        // Process each <source> element one at a time
        let updatedText = await processMatches(data, matches, lang);
        await fs.promises.writeFile(`../locale/messages.${lang}.xlf`, updatedText);
    } catch (err) {
        console.error(err);
    }
}

async function processMatches(text, matches, lang) {
    if (matches.length === 0) {
        return text;
    }

    // Process the first <source> element
    let [match, sourceContent] = matches.shift();
    let targetContent = sourceContent.replace(/<source>/g, '');
    targetContent = targetContent.replace(/<\/source>/g, '');
    targetContent = await translation_with_conditions(targetContent, lang);
    text = text.replace(sourceContent, sourceContent + '<target>' + targetContent + '</target>');

    // Process the remaining <source> elements
    return await processMatches(text, matches, lang);
}

async function translation_with_conditions(targetContent, lang) {
    /* ========== xTag replacement goes here with **%** ==================*/
    // Replace the <x> tags with the text "**x**"
    let target = targetContent.replace(/<x[^>]*>/g, '**%**');
    console.log('target', target)
    // Store the <x> tags in an array
    let xTags = targetContent.match(/<x[^>]*>/g);
    console.log('xTags', xTags)
    /* ========== xTag replacement goes here with **%** ==================*/



    target = await translatte_obj.translation(target, { to: lang });


    /* ========== **%** replacement goes here with xTag ==================*/

    //source without <x> tag or interpolation
    // Recreate the <source> element with the renamed <x> tags
    if (xTags != null && xTags.length > 0) {
        for (let i = 0; i < xTags.length; i++) {
            target = target.replace('**%**', xTags[i]);
            console.log("target", target)
        }
    }

    /* ========== **%** replacement goes here with xTag ==================*/

    targetContent = target;
    return targetContent;
}


function read_package() {
    // Read the package.json file
    fs.readFile('../../package.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Parse the JSON data
        const package = JSON.parse(data);
        var project_name = package.name;
        fs.readFile('../../angular.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            // Parse the JSON data
            const packageData = JSON.parse(data);

            // Extract the language codes
            project_name = project_name.replaceAll('-', '_');
            console.log(project_name)
            target = Object.keys(packageData.projects[project_name].i18n.locales);

            // Log the language codes
            console.log(target); // Output: [ 'hi', 'mr' ]

            for (let lang of target) {
                translateAndUpdate(lang);
            }
        });
    });
}

read_package();
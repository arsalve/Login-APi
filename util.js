const catchHandler = (location, message, color) => {
    if (debug = true) {
        if (color == undefined) {
            color = chalk.blueBright;
        }

        console.error(color("error occured when " + location + "\n" + message))
    }
}

module.exports = {
    'catchHandler': catchHandler
};
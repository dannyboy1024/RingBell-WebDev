const CROS_handeler = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    console.log("Access-Control-Allow-Origin set to accept all for development purpose. Disable CROS_handeler after publication.");
    next();
}

module.exports = CROS_handeler;
const CROS_handeler = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    console.log("Access-Control-Allow-Origin set to accept all for development purpose. Disable CROS_handeler after publication.");
    next();
}

module.exports = CROS_handeler;
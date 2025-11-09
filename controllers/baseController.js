const baseController = {}

baseController.buildHome = async function(req, res){
    // If user is already logged in, redirect to account page
    if (res.locals.loggedin) {
        return res.redirect('/account')
    }

    res.render('index', {
        title: 'Home',
        link: '',
        errors: null
    })
}

baseController.buildAbout = async function(req, res){
    res.render('about/about', {
        title: 'About Us', 
        link: 'about', 
        errors: null
    })
}

module.exports = baseController
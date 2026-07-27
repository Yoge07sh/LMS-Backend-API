const getRegisterPage = (req, res) => {

    res.render("auth/register", {
        title: "Register"
    });

};

const getLoginPage = (req, res) => {

    res.render("auth/login", {
        title: "Login"
    });

};

const getForgotPasswordPage = (req, res) => {

    res.render("auth/forgot-password", {
        title: "Forgot Password"
    });

};

const getResetPasswordPage = (req, res) => {

    res.render("auth/reset-password", {
        title: "Reset Password"
    });

};

module.exports = {
    getRegisterPage,
    getLoginPage,
    getForgotPasswordPage,
    getResetPasswordPage
};
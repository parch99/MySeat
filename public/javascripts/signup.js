document.addEventListener('DOMContentLoaded', function () {
    console.log("stran je odprta");
    var form = document.getElementById('signupForm');

    var btn = form.getElementsByTagName('button')[0];
    btn.addEventListener('click', function () {

        var imeInput = document.getElementById('ime').value;
        var priimekInput = document.getElementById('priimek').value;
        var emailInput = document.getElementById('exampleInputEmail1').value;
        var passwordInput = document.getElementById('exampleInputPassword1').value;

        var testName = new RegExp("^[a-zA-Z ]+$");
        var testEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
        var testPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

        var testIme = testName.test(imeInput);
        var testPriimek = testName.test(priimekInput);
        var testEmail = testEmail.test(emailInput);
        var testPassword = testPassword.test(passwordInput);

        var response = "";

        if (!testIme || !testPriimek)
            response += "Non valid name input.";

        if (!testEmail)
            response += "\nInvalid email.";

        if (!testPassword)
            response += "\nPassword must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, a number, and a special character.";

        if (!testIme || !testPriimek || !testEmail || !testPassword)
            alert(response);
    });
})
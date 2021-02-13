document.addEventListener('DOMContentLoaded', function () {
    console.log("stran je odprta");
    var form = document.getElementById('commentForm');

    var btn = form.getElementsByTagName('button')[0];
    btn.addEventListener('click', function () {
        var commentInput = document.getElementById('commentContent').value;


        var testChars = new RegExp("^[a-z0-9A-ZčćžđšČĆŽĐŠ . ,]*$");
        var testLength = new RegExp("^.{0,150}$");

        var testChars = testChars.test(commentInput);
        var testLength = testLength.test(commentInput);

        var response = "";

        if (!testChars)
            response += "Non valid character input.";

        if (!testLength)
            response += "\nInput must be shorter than 150 characters.";

        if (!testChars || !testLength)
            alert(response);
    });

})
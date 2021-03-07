## 1. LP

We present "MySeat", a web application for the purpose of booking a table in any restaurant in Ljubljana.
Complete with reviews, ratings and price range, we offer you the best way to book a table for your next lunch or night out.
If you are a user, you can log in and book a table at one of the recent locations you have visited.
in a nearby place when you don’t want to go far, or choose any from a list of locations by sorting them to your liking.
If you own a site, sign up as one and you will be able to accept or reject reservations and check how it is with your city.
The messaging system will be available either within the app or via email if you do not want to check the status of your booking in the app.
Everything you need to book a table in one place.

Screens:

1. Default Homepage - The page that appears when you first open a web application and have not yet logged in.
  This is a general first page that provides some basic information about the web application, how to use it,
  and encourages you to sign up and download our mobile app.
  It contains links to a page with a list of all locations, to our About-Page and to the login page.
  (index.html)
  
2. User Homepage - The page that appears when you open a web application and are logged in as a user.
  It contains a button that takes you to a list of locations, some recent locations you’ve visited, and a quick table booking form at any of them
  and a map showing nearby locations if you have allowed the application to view your current location.
  It contains links to a page with a list of all locations, a page with all your past / current / future reservations and to our About-Page.
  
3. Owner Homepage - The page that appears when you open the web application and are logged in as the site owner.
  It has two buttons, one that takes you to your pending bookings and one that takes you to your location page.
  Furthermore, you can quickly access and accept recent bookings and reject them, as well as view some recent estimates of your location.
  It contains links to the page with all your reservations, the page with your location and to our About-Page.
  
4. Login / Signup Page - A page consisting of 2 masks on which you can log in to your account or create a new account as a user or owner.

5. Venue List Page - A page consisting of 2 masks. In the first part there is a list where you can choose whether you are looking for a restaurant, bar or cafe.
  You will then be redirected to a list of selected locations where you can find a specific location, sort them by specific criteria, or
  you simply scroll until you find the desired location. It contains links as home pages, depending on whether you are logged in or not.

6. Individual page list - An individual page for each location, including their price, estimate, opening hours, location map,
  written reviews and of course the booking button. You must be logged in to make a reservation, and you can write reviews as anonymous.
  
7. Map page - A page where you can view a map and select a location on the map.

8. About page - A page where you can see some information about us and the web application and some frequently asked questions (FAQ).

Functionalities:

Integrated delivery of email notifications. When the location is notified of your booking attempt, as well as when the location accepts or rejects your booking,
you will be notified. If you are the owner, you will be notified at the same time of any booking for your location or writing a review.

We will have an integrated messaging system where owners and users will be able to communicate in case of problems.
You may also receive an email notification for each response to a message.

For an external source, we will use the weather API to help you decide if the weather will be nice to go out. In Ljubljana, knowledge of the weather is essential.

## 2. LP
The "My Seat" website / app works flawlessly on PC, smartphone and tablet.

A list of screen masks where the user can provide data and what data they can enter.

1.Login / Signup page
          
    -Signup
        On the screen screen signup the user can create their own account. In the "First name" field, the user must enter his name,
        in the "Last name" field, the user must enter his last name. Only the letter a-z and the letter A-Z are allowed in these two fields.
        The next field is "Email address", where the user gives his email address where he will create his username
        account, in this field the user can use letters from a-z, numbers from 1-9, characters "+", "-", ".", "_", then he must give
        the "@" character, then it can use the letters from a-z, the numbers from 1-9, the characters "-" and "." .. Then comes the "Password" field
        where the user enters his password which he will later use together with the Email who previously entered how he will log in to his
        user account on the Login screen. The password must contain at least 8 characters of which one must be a capital letter, one
        a lowercase letter, and one number one special character. The last option that the user can select on this screen is
        "Log in as owner", the user confirms this if he wants the account he is creating to be the restaurant bill.

            
          
    -Login
        If the user wants to log in, he must first have an account created, ie a signup. On the Login screen, the user can type in
        field "Email address" his e-mail address, in this field the user can use letters from a-z, numbers from 1-9,
        characters "+", "-", ".", "_", then it must give the character "@", and then it can use letters from a-z, numbers from 1-9,
        characters "-" in ".". In the "Password" field your password. The password will be covered with an asterisk for security reasons. The password must
        contain at least 8 characters of which one must be uppercase, one must be lowercase, and one number must be one special letter
        character. Then if the user wants to log in as a guest proceed further by pressing the "Login" button if desired
         to register as a restaurant, you must first check the "Login as restaurant" box.

2.Individual page list (master detail) - A private page for a specific restaurant
    
        This is a private page for each restaurant where the user can read the comments for a particular restaurant, restaurant rate
        and money cost rate. On this screen the user can change the map shapes and can press the "Add comment" button which will
        opened a new screen where the user can enter their comment.

        -Add comment page
            This screen is accessed via the "Add comment" button on the private page of the restaurant. On this page the user must type in
            field "Your Name" your name, you can also and last name. In the field "Add new comment" the user enters his comment for a specific
            restaurant. The next field is the "Your rate" field, here the user can choose the number between 1 and 5 with which to give
            rating for the restaurant as a whole. The last field is the field "Price (1 Cheap - 3 Expensive)", here the user can choose
            a number between 1.2 and 3. 1 means the restaurant is cheap, 2 means the prices are normal, and 3 means the restaurant is expensive.

3. Screens Restaurants - list of restaurants

        If the user is logged in as a restaurant at the top of the page he will have a "Add new restaurant" button where the user can
        creates a screen for your restaurant and provides data.

        -Add new restaurant page
          You can get to this screen via the "Add new restaurant" button on the Restaurants page if you are logged in as on the account as
          restaurant.
          -The user must complete the following fields.
             - "Restauran name:", here the user enters the name of his restaurant.
             - "Restauran address:", here the user enters the address where his restaurant is located.
             - "Coordinates Longitude:", here the user enters the coordinate length in the form "12.123032".
             - "Coordinates Latitude:", here the user enters the width of the coordinate in the form "46.123032".
             - "Working Hours Monday - Friday:", here the user enters the working hours from Monday to Friday in the form "12:00 - 23:00".
             - "Working Hours Saturday:", here the user enters the working hours on Saturday in the form "12:00 - 23:00".
             - "Working Hours Sunday:", here the user enters the working hours on Sunday in the form "12:00 - 23:00".
             - "Phone number:", here the user enters the contact telephone number in the form "069 123 456", he can also use
             characters like "+" and "()".

    - Description of the npmjs booklet used

        - JWT is used when a user is logged in to their user accounts to be able to access routes, services and resources
          which are allowed with this token.
        - NPM-AUTH is used to locally configure credentials in .npmrc for authentication

## 3. LP

Heroku
Link to the web application on heroku: https://myseat-sp-2020-2021.herokuapp.com \
Application installation and launch: \
     * git clone: https://github.com/parch99/MySeat \
     * npm install -g heroku \
     * docker-compose up \
     * In the browser, enter: https: // localhost: 3000


## 4. LP

SPA application on one side

Link to the web application on heroku: https://myseat-sp-2020-2021.herokuapp.com \
Application installation and launch: \
     * git clone: https://github.com/parch99/MySeat \
     * npm install \
     * npm start \
     * cd app_public \
     * npm install \
     * ng serve \
     * In the browser, enter: https: // localhost: 4200


## 5. LP

Securily protected progressive web application

The application supports 2 types of users:

  - unregistered user or guest,
  - logged in user

An unregistered user on the website can only view the page, see the distance from it in the location list
view location details and location comments, create a new account and can enter their email address for weekly
myseat news.

A registered user on the website can add a comment, can add a restaurant and can access his profile page where
he looks at which restaurant he has been to recently.


# Spletno programiranje 2020/2021

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2020/2021**.


## 1. LP

Predstavljamo "MySeat", spletno aplikacijo z namenom rezervacije mize v kateri koli restavraciji / baru / kavarni v Ljubljani.
V kompletu s pregledi, ocenami in obsegom cen vam ponujamo najboljši način, da rezervirate mizo za naslednje kosilo ali nočni izlet.
Če ste uporabnik, se lahko prijavite in rezervirate mizo na enem od nedavnih lokacij, ki ste jih obiskali, 
na bližnjem kraju, ko ne želite iti daleč, ali izberite katerega koli s seznama lokacij, tako da jih razvrstite po svojih željah.
Če ste lastnik mesta, se prijavite kot eden in lahko boste sprejeli ali zavrnili rezervacije ter preverili, kako je z vašim mestom. 
Sistem za pošiljanje sporočil bo na voljo bodisi znotraj aplikacije bodisi po e-pošti, če v aplikaciji ne želite preveriti stanja svoje rezervacije. 
Vse, kar potrebujete, da rezervirate mizo na enem mestu.

Zaslonske maske:

1. Default Homepage - Stran, ki se prikaže, ko prvič odprete spletno aplikacijo in še niste bili prijavljeni.
  Gre za splošno prvo stran, ki ponuja nekaj osnovnih informacij o spletni aplikaciji, kako jo uporabljati, 
  in vas spodbuja, da se prijavite in prenesete našo mobilno aplikacijo. 
  Vsebuje povezave do strani s seznamom vseh lokacij, do naša About-Page in do strani za prijavo.
  (index.html)
  
2. User Homepage - Stran, ki se prikaže, ko odprete spletno aplikacijo in ste prijavljeni kot uporabnik.
  Vsebuje gumb, ki vas pripelje na seznam lokacij, nekaj nedavnih lokacij, ki ste jih obiskali, in hiter obrazec za rezervacijo mize na kateri koli od njih
  ter zemljevid, ki prikazuje bližnje lokacije, če ste dovolili aplikacijo, da ogleda vašo trenutno lokacijo.
  Vsebuje povezave do strani s seznamom vseh lokacij, stran z vsemi vašimi preteklimi / trenutnimi / prihodnjimi rezervacijami in do naša About-Page.
  (homeUser.html)
  
3. Owner Homepage - Stran, ki se prikaže, ko odprete spletno aplikacijo in ste prijavljeni kot lastnik lokacij.
  Ima dva gumba, enega, ki vas pripelje do vaših rezervacij, ki čakajo, in enega, ki vas pripelje na vašo lokacijsko stran. 
  Nadalje lahko hitro dostopate do nedavnih rezervacij in jih sprejmete ali zavrnete ter si ogledate tudi nekatere nedavne ocene vaše lokacije.
  Vsebuje povezave do stran z vsemi vašimi rezervacijami, stran z vašem lokaciji in do naša About-Page.
  (homeOwner.html)
  
4. Login/Signup Page - Stran, sestavljena iz 2 mask, na kateri se lahko v svoj račun prijavite ali ustvarite nov račun kot uporabnik ali lastnik.
  (signup.html) (login.html)

5. Venue List Page - Stran, sestavljena iz 2 mask. V prvem delu je seznam, kjer lahko izberete, ali iščete restavracijo, bar ali kavarno. 
  Potem boste preusmerjeni na seznam izbranih lokacij, kjer lahko poiščete določeno lokacijo, jih razvrstite po določenih kriterijih ali pa 
  se preprosto pomikate, dokler ne najdete želene lokacije. Vsebuje povezave kot domače strani, odvisno od tega, ali ste prijavljeni ali ne.
  (page1.html) (restaurant-list.html)

6. Individual page list - Posamezna stran za vsako lokacijo, ki vključuje njihovo ceno, oceno, delovni čas, zemljevid lokacije, 
  pisne ocene in seveda gumb za rezervacijo. Za rezervacijo morate biti prijavljeni, ocene pa lahko pišete kot anonimne.
  (RestaurantPage.html)
  
7. Map page - Stran, kjer si lahko ogledate zemljevid in izberete lokacijo na zemljevidu.
  (map.html)

8. About page - Stran, kjer si lahko ogledate nekaj informacij o nas in spletni aplikaciji ter nekaj pogostih vprašanj (FAQ).
  (about.html)

Funkcionalnosti:

Integrirana dostava e-poštnih obvestil. Ko bo lokacija obveščena o vašem poskusu rezervacije, pa tudi kadar bo lokacija sprejela ali zavrnila vašo rezervacijo, 
boste o tem obveščeni. Če ste lastnik, boste hkrati obveščeni o vsaki rezervaciji za vašo lokacijo ali pisanju mnenja.

Imeli bomo integriran sistem sporočanja, kjer bodo lastniki in uporabniki lahko komunicirali v primeru težav.
Za vsak odgovor na sporočilo lahko prejmete tudi e-poštno obvestilo.

Za zunanji vir bomo uporabili vremenski API, ki vam bo pomagal, da se odločite, ali bo vreme lepo iti ven. V ljubljani je znanje vremena nujno.

## 2. LP
Spletna stran/aplikacija "My Seat" deluje brezhibno na računalnik, smartphone in tabletni računalnik.

Seznam zaslonskih mask, kjer lahko uporabnik posreduje podatke in katere podatke lahko vnese.

1.Login/Singup page
          
    -Singup 
        Na zaslonsko masko singup uporabnik lahko ustvari svoji račun. V polje "First name" uporabnik mora vpisati njegovo ime,
        v polje "Last name" uporabnik mora vpisati njegov priimek. V ta dva polja dovoljen je samo vnos črke a-z in črke A-Z. 
        Naslednjo polje je "Email address", tamo uporabnik da svoji elektronski naslov na kateri bo ustvaril svoji uporabniški 
        račun, v to polje uporabnik lahko uporablja črke od a-z, števila od 1-9, karaktere "+","-",".","_", potem mora dati 
        karakter "@", pa potem lahko uporablja črke od a-z, števila od 1-9, karaktere "-" in ".".. Potem pride polje "Password" 
        kjer uporabnik vpise svoje geslo ki bo kasneje uporabljal skupaj z Email ki je prej vpisal kako se bo logiral v svoji 
        uporabniški račun na Login zaslon. Geslo mora vsebovati najmanj 8 karaktere iz katere en mora biti veliko črko, en 
        majhno črko, en število pa en neki spiecijalni karakter. Zadnja opcija ki uporabnik lahko odabere na ta zaslon je 
        "Log in as owner", uporabnik to potrdi če želi da račun ki ustvarja bo račun za restavracijo. 

            
          
    -Login
        Če uporabnik se želi logirati najprej mora imeti ustvarljen račun tj signup. Na zaslon Login uporabnik lahko vnese v 
        polje "Email address" svoji elektronski naslov, v to polje uporabnik lahko uporablja črke od a-z, števila od 1-9, 
        karaktere "+","-",".","_", potem mora dati karakter "@", pa potem lahko uporablja črke od a-z, števila od 1-9, 
        karaktere "-" in ".". V polje "Password" svoje geslo. Geslo bo prekriveno z zvezdice iz varnostne razloge. Geslo mora 
        vsebovati najmanj 8 karaktere iz katere en mora biti veliko črko, en majhno črko, en število pa en neki spiecijalni 
        karakter. Potem če se uporabnik želi prijaviti kot gost nadaljuje naprej s pritiskom na gumb "Login", če se želi 
         prijaviti kot restavracija, mora najprej potrditi polje "Login as restaurant".

2.Individual page list - Zasebna stran za določeno restavracijo
    
        To je zasebna stran za vsako restavracijo kjer uporabnik lahko prebere komentarje za doloćeno restavracijo, restaurant rate 
        pa še money cost rate. Na ta zaslon uporabnik lahko spremeni oblik zemljevida in lahko pritisne gumb "Add comment" ki bo 
        otprel nov zaslon kjer uporabnik lahko vpiše svoji komentar.

        -Add comment page
            Do tega zaslona pridemo preko gumb "Add comment" na zasebno stran restravracije. Na to stran uporabnik mora vpisati v 
            polje "Your Name" svoje ime, lahko tudi in priimek. V polje "Add new comment" uporabnik vpiše svoji komentar za določeno 
            restavracijo. Naslednjo polje je polje "Your rate", tukaj uporabnik lahko odabere število med 1 in 5 z katero bo dal 
            oceno za restavracijo v celoti. Zadnje polje je polje "Price (1 Cheap - 3 Expensive)", tukaj uporabnik lahko odabere 
            število med 1,2 in 3. 1 pomeni da je restavracija poceni, 2 pomeni da so cene normalne, 3 pa da je restavracija draga. 

3.Zaslon Restaurants - seznam restavracije

        Če je uporabnik prijavljen kot restavracija na vrhu strani bo imel gumb "Add new restaurant" kjer lahko uporabnik lahko 
        kreira zaslon za svojo restavracijo in poda podatke.

        -Add new restaurant page
          Do tega zaslona pridemo preko gumb "Add new restaurant" na stran Restaurants če smo prijavljeni kot na računu kot 
          restavracija.
          -Uporabnik mora dopolniti naslednja polja.
             -"Restauran name:", tukaj uporabnik vpiše ime svoje restavracije.
             -"Restauran address:", tukaj uporabnik vpiše naslov na kateri se nahaja njegova restavracija.
             -"Coordinates Longitude:", tukaj uporabnik vpiše dolžina koordina v obliki "12.123032".
             -"Coordinates Latitude:", tukaj uporabnik vpiše širina koordina v obliki "46.123032".
             -"Working Hours Monday - Friday:", tukaj uporabnik vpiše delovni čas od ponedeljek do petek v obliki "12:00 - 23:00".
             -"Working Hours Saturday:", tukaj uporabnik vpiše delovni čas v soboto v obliki "12:00 - 23:00".
             -"Working Hours Sunday:", tukaj uporabnik vpiše delovni čas v nedeljo v obliki "12:00 - 23:00".
             -"Phone number:", tukaj uporabnik vpiše kontaktna telefonska številka v obliki  "069 123 456", lahko tudi uporablja 
             znaki kot "+" in "( )".

    - Opis uporabljene npmjs knjižice

        - JWT se uporablja kdaj je uporabnik prijavljen na svojega uporabniška računa da lahko pristopi do poti,storitve in vire 
          ki so dovoljeni s tem žetonom.
        - NPM-AUTH se uporablja za lokalno nastavitev poverilnic v .npmrc za overjanje pred katerim koli javnim / zasebnim 
          skladiščem NPM 
        - ASSERT modul za uveljavljanje ponuja način testiranja izrazov. Če je izraz ovrednoten z 0 ali ni, je prišlo do napake 
          trditve in program se zaključi.     
          

## 3. LP

Heroku
Povezava do spletne aplikacija na heroku : https://myseat-sp-2020-2021.herokuapp.com \
Namestitev aplikacije in zagon: \
    *  git clone: https://github.com/sp-2020-2021/LP-19 \
    *  cd LP-19 \
    *  cd sp_express \
    *  npm install -g heroku \
    *  docker-compose up \
    *  V brskalniku vpišemo: https://localhost:3000   


## 4. LP

SPA aplikacija na eni strani
Heroku
Povezava do spletne aplikacija na heroku : https://myseat-sp-2020-2021.herokuapp.com \
Namestitev aplikacije in zagon: \
    *  git clone: https://github.com/sp-2020-2021/LP-19 \
    *  cd LP-19 \
    *  cd sp_express \
    *  npm install \
    *  npm start \
    *  cd app_public \
    *  npm install @angular/cli \
    *  ng serve \
    *  V brskalniku vpišemo: https://localhost:4200


## 5. LP

Varnostno zaščitena progresivna aplikacija

Aplikacija podpira 2 vrste uporabnikov:

 - neprijavljen uporabnik oz. gost,
 - prijavljen uporabnik

Neprijavljen uporabnik na spletni strani lahko samo pogleda strani, na seznamu lokacije vidi razdaljo od njega, pogleda podrobnosti lokacije in komentarje lokacije, lahko ustvari nov racun in lahko vpise svoj elektronski naslov za tedenske myseat novice.

Prijavljen uporabnik na spletni strani lahko doda komentar, lahko doda restavracijo in lahko pristopi do svojo stran s profilom kjer pogleda v katero restavracijo je pred kratkim bil.


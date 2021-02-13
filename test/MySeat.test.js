(async function Namigi() {
    // Knjižnice
    const {exec} = require("child_process");
    const {describe, it, after, before} = require("mocha");
    const {Builder, By, until} = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;

    let aplikacijaUrl = "https://myseat-sp-2020-2021.herokuapp.com/";

    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;

    const axios = require('axios').create({
        baseURL: aplikacijaUrl + "api/",
        timeout: 5000
    });

    process.on("unhandledRejection", (napaka) => {
        console.log(napaka);
    });

    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
        await brskalnik.wait(() => {
            return brskalnik.findElements(By.xpath(xpath)).then(elementi => {
                return elementi[0];
            });
        }, casVS * 1000, `Stran se ni naložila v ${casVS} s.`);
    };

    try {

        before(() => {
            brskalnik = new Builder()
                .forBrowser("chrome")
                .setChromeOptions(new chrome.Options()
                    .addArguments("start-maximized")
                    .addArguments("disable-infobars")
                    .addArguments("allow-insecure-localhost")
                    .addArguments("allow-running-insecure-content")
                )
                .usingServer(seleniumStreznikUrl)
                .build();
        });

        describe("Pregled seznama restavracije", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });

            it("število restavracije na seznam", async () => {
                await pocakajStranNalozena(brskalnik, 10, "//h4");
                let restavracije = await brskalnik.findElements(By.css("li"));
                expect(restavracije).to.be.an("array").to.have.lengthOf(5);
            });

            it("preverjanje prijavljenega uporabnika", async () => {
                await pocakajStranNalozena(brskalnik, 10, "//a[contains(text(), 'Prijava')]");
                let prijavaPovezava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Prijava')]"));
                expect(prijavaPovezava).to.not.be.empty;
            });
        });

        describe("Registracija novega uporabnika", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });

            it("izbira registracije", async () => {
                let povezavaRegistracija = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Registracija')]"));
                expect(povezavaRegistracija).to.not.be.empty;
                povezavaRegistracija.click();

                await pocakajStranNalozena(brskalnik, 10, "//h1[contains(text(), 'Registracija uporabnika')]");
            });

            it("vnos podatkov uporabnika", async () => {
                await pocakajStranNalozena(brskalnik, 10, "//button[contains(text(), 'Registriraj')]");

                let ime = await brskalnik.findElement(By.css("input[name='ime']"));
                expect(ime).to.not.be.empty;
                ime.sendKeys("Martin Krpan");
                let email = await brskalnik.findElement(
                    By.css("input[name='elektronskiNaslov']"));
                expect(email).to.not.be.empty;
                email.sendKeys("martin@krpan.si");
                let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
                expect(geslo).to.not.be.empty;
                geslo.sendKeys("test");
                brskalnik.findElement(
                    By.xpath("//button[contains(text(), 'Registriraj')]")).click();
            });

            it("preveri ali je uporabnik prijavljen", async () => {
                await pocakajStranNalozena(brskalnik, 10, "//h1[contains(text(), 'Vaje 8')]");
                let povezavaOdjava = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Odjava Martin Krpan')]"));
                expect(povezavaOdjava).to.not.be.empty;
            });

            it("pridobi JWT žeton", async () => {
                jwtZeton = await brskalnik.executeScript(function () {
                    return localStorage.getItem("myseat-zeton");
                });
                expect(jwtZeton).to.not.be.empty;
            });


        });

        describe("Dodajanje restavracije", function () {
            this.timeout(30 * 1000);
            before(async function () {
                await brskalnik.get(aplikacijaUrl);
            });

            context("vnosna forma za dodajanje restavracije", async () => {
                it("izbira dodajanja namiga", async () => {
                    await pocakajStranNalozena(brskalnik, 10, "//h1");
                    let povezavaDodajRestavracija = await brskalnik.findElement(By.xpath("//a[contains(text(), 'Dodaj Restoran')]"));
                    expect(povezavaDodajRestavracija).to.not.be.empty;
                    povezavaDodajRestavracija.click();
                });
            });
        });


        after(async () => {
            brskalnik.quit();
        });

    } catch (napaka) {
        console.log("Med testom je prišlo do napake!");
    }
})();
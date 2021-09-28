//Dates for anualized ret
var maturity3m = new Date("03/25/2022");
var maturity6m = new Date("12/31/2021");

//Notify me when direct rate is larger than: 
let notify1 = 18;//NOF
//when to re send (%)
let resend = 0.7;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January = 0!
var yyyy = today.getFullYear();

today = new Date(`${mm + '/' + dd + '/' + yyyy}`);

var diff3m = (maturity3m.getTime() - today.getTime())/(24*3600*1000);
var diff6m = (maturity6m.getTime() - today.getTime())/(24*3600*1000);

//Days to maturity
console.log(diff3m);
console.log(diff6m);

let days3m = document.querySelector(".days3m");  // los de marxo 2022
days3m.textContent += `${diff3m}`;
let days6m = document.querySelector(".days6m"); //los de dic 2021
days6m.textContent += `${diff6m}`;

//
async function f1(){

    //First Crypto
    let symb_btc = "btcusdt";
    let symb_f_btc = "btcusd_220325";
    let symb_ff_btc = "btcusd_211231";


    let ws_btc = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_btc}@trade`);
    let wsf_btc = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_btc}@trade`);//@markPrice
    let wsff_btc = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_btc}@markPrice`);



    //spot 3m
    let spot_btc = document.querySelector(".contenedor6 .BTC .spot");
    //future 3m
    let fut_btc = document.querySelector(".contenedor6 .BTC .future");
    //Tasa 3m 
    let tasa_d_btc = document.querySelector(".contenedor6 .BTC .tasa");
    let tasa_a_btc= document.querySelector(".contenedor6 .BTC .tasa1");

    //spot 6m 
    let spots_btc = document.querySelector(".contenedor4 .BTC .spot");
    //future 6m 
    let futf_btc = document.querySelector(".contenedor4 .BTC .future");
    //Tasa 6m 
    let tasaf_d_btc = document.querySelector(".contenedor4 .BTC .tasa");
    let tasaf_a_btc= document.querySelector(".contenedor4 .BTC .tasa1");

    let futy_btc = [];
    let futyf_btc = [];
    let spoty_btc = [];  

    let spotter_btc = null;
    let futter_btc = null;
    let futterf_btc = null;

    ////////////////SPOT call////////////////////////
    ws_btc.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_btc.push(JSON.parse(spot_p));

        spotter_btc = spoty_btc[spoty_btc.length-1];
    }


    ////////////////FUTURE call////////////////////////
    wsf_btc.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_btc.push(JSON.parse(fut_p));

        futter_btc = futy_btc[futy_btc.length-1];

        
        let tasa = futter_btc / spotter_btc -1;

        tasa_d_btc.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        if(anual > 15){
            spot_btc.style.color = "rgb(197, 197, 197)";
            fut_btc.style.color = "rgb(197, 197, 197)";
            tasa_a_btc.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spot_btc.style.color = "black";
            fut_btc.style.color = "black";
            spot_btc.style.color = "black";
            fut_btc.style.color = "black";
            tasa_a_btc.style.color = "rgb(255, 0, 34)";
        }else{
            spot_btc.style.color = "black";
            fut_btc.style.color = "black";
            tasa_a_btc.style.color = "yellow";}

        spot_btc.innerText = parseFloat(spotter_btc).toFixed(2);
        fut_btc.innerText = parseFloat(futter_btc).toFixed(2);

        tasa_a_btc.innerHTML = `${anual.toFixed(3)}%`;
    }


    ///////////////FUTURE call////////////////////////
    wsff_btc.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_btc.push(JSON.parse(fut_p));

        futterf_btc = futyf_btc[futyf_btc.length-1];

        
        let tasa = futterf_btc / spotter_btc -1;

        tasaf_d_btc.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        if(anual > 15){
            spots_btc.style.color = "rgb(197, 197, 197)";
            futf_btc.style.color = "rgb(197, 197, 197)";
            tasaf_a_btc.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spots_btc.style.color = "black";
            futf_btc.style.color = "black";
            tasaf_a_btc.style.color = "rgb(255, 0, 34)";
        }else{
            spots_btc.style.color = "black";
            futf_btc.style.color = "black";
            tasa_a_btc.style.color = "yellow";}

        spots_btc.innerText = parseFloat(spotter_btc).toFixed(2);
        futf_btc.innerText = parseFloat(futterf_btc).toFixed(2);

        tasaf_a_btc.innerHTML = `${anual.toFixed(3)}%`;


   
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //NEXT CRYPTO
    let symb_eth = "ethusdt";
    let symb_f_eth = "ethusd_220325";
    let symb_ff_eth = "ethusd_211231";


    let ws_eth = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_eth}@trade`);
    let wsf_eth = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_eth}@trade`);
    let wsff_eth = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_eth}@markPrice`);


    //spot 3m
    let spot_eth = document.querySelector(".contenedor6 .ETH .spot");
    //future 3m
    let fut_eth = document.querySelector(".contenedor6 .ETH .future");
    //Tasa 3m
    let tasa_d_eth = document.querySelector(".contenedor6 .ETH .tasa");
    let tasa_a_eth = document.querySelector(".contenedor6 .ETH .tasa1");

    //spot 6m 
    let spots_eth = document.querySelector(".contenedor4 .ETH .spot");
    //future 6m 
    let futf_eth = document.querySelector(".contenedor4 .ETH .future");
    //Tasa 6m 
    let tasaf_d_eth = document.querySelector(".contenedor4 .ETH .tasa");
    let tasaf_a_eth= document.querySelector(".contenedor4 .ETH .tasa1");

    let futy_eth = [];
    let futyf_eth = [];
    let spoty_eth = [];  

    let spotter_eth = null;
    let futter_eth = null;
    let futterf_eth = null;


    let enviado = 0;
    window.localStorage.setItem("Enviado", enviado);



    ////////////////SPOT call////////////////////////
    ws_eth.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_eth.push(JSON.parse(spot_p));

        spotter_eth = spoty_eth[spoty_eth.length-1];
    }


    ////////////////FUTURE call////////////////////////
    wsf_eth.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_eth.push(JSON.parse(fut_p));

        futter_eth = futy_eth[futy_eth.length-1];

        
        let tasa = futter_eth / spotter_eth -1;

        tasa_d_eth.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;
        tasa_a_eth.innerHTML = `${anual.toFixed(3)}%`;


        if(anual > 15){
            fut_eth.style.color = "rgb(197, 197, 197)";
            spot_eth.style.color = "rgb(197, 197, 197)";
            tasa_a_eth.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spot_eth.style.color = "black";
            fut_eth.style.color = "black";
            tasa_a_eth.style.color = "rgb(255, 0, 34)";
        }else{
            spot_eth.style.color = "black";
            fut_eth.style.color = "black";
            tasa_a_eth.style.color = "yellow";}

        fut_eth.innerText = parseFloat(futter_eth).toFixed(2);
        spot_eth.innerText = parseFloat(spotter_eth).toFixed(2);

        tasa_a_eth.innerHTML = `${anual.toFixed(3)}%`;
        

        //E-MAIL NOTIFICATION      futter_eth < spotter_eth
        // Direct rate larger than costs            Anual larger then notify1                    Message not sent      NOT NAN
        if(tasa*100 > 0.3               &&          (tasa*100-0.3)/diff3m*365 > notify1          && enviado == 0   && spotter_eth != NaN && futter_eth != NaN){
            //['jhoulin.chakana@gmail.com', "ignacio@chakana.com.ar", "elliot@chakana.com.ar ", "arigoli@chakana.com.ar", "tbazzani.chakana@gmail.com"]

            //jmtp mail
            Email.send({
                SecureToken : "",
                To : 'jeronimo.houlin@gmail.com',
                From : "jeronimoaisuru@gmail.com",
                Subject : "Avisoo !",
                Body : `Código: 2580;El ETH ${diff3m} días está en ${notify1}% anual NOF, avisar !`,
                Attachments : [
                {
                    name : "chakanaimggg.png",
                    path : "https://media-exp1.licdn.com/dms/image/C4E0BAQHxRffplAaY-w/company-logo_200_200/0/1549408729033?e=2159024400&v=beta&t=QMk5flu1ZaH6Yhq9JzW9TMyd-kt6R3r2amTmfjqp11s"
                }]
            }).then(
            message => console.log("Se ha enviado un mail.")
            );

            enviado += 1;
            window.localStorage.setItem("Enviado", enviado);

        }

        //Si caeo 70% la tasa, volver a habilitar el envío.
        if(anual < notify1*(1-resend) && enviado ==1){
            enviado -= 1;
            window.localStorage.setItem("Enviado", enviado);
        }
        



    }


    
    ///////////////FUTURE call////////////////////////
    wsff_eth.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_eth.push(JSON.parse(fut_p));

        futterf_eth = futyf_eth[futyf_eth.length-1];

        
        let tasa = futterf_eth / spotter_eth -1;

        tasaf_d_eth.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        if(anual > 15){
            spots_eth.style.color = "rgb(197, 197, 197)";
            futf_eth.style.color = "rgb(197, 197, 197)";
            tasaf_a_eth.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spots_eth.style.color = "black";
            futf_eth.style.color = "black";
            tasaf_a_eth.style.color = "rgb(255, 0, 34)";
        }else{
            spots_eth.style.color = "black";
            futf_eth.style.color = "black";
            tasa_a_eth.style.color = "yellow";}

        spots_eth.innerText = parseFloat(spotter_eth).toFixed(2);
        futf_eth.innerText = parseFloat(futterf_eth).toFixed(2);

        tasaf_a_eth.innerHTML = `${anual.toFixed(3)}%`;
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //NEXT CRYPTO
    let symb_bnb = "bnbusdt";
    let symb_f_bnb = "bnbusd_220325";
    let symb_ff_bnb = "bnbusd_211231";


    let ws_bnb = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_bnb}@trade`);
    let wsf_bnb = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_bnb}@trade`);
    let wsff_bnb = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_bnb}@markPrice`);



    //spot 3m
    let spot_bnb = document.querySelector(".contenedor6 .BNB .spot");
    //future 3m
    let fut_bnb = document.querySelector(".contenedor6 .BNB .future");
    //Tasa 3m
    let tasa_d_bnb = document.querySelector(".contenedor6 .BNB .tasa");
    let tasa_a_bnb = document.querySelector(".contenedor6 .BNB .tasa1");

    //spot 6m 
    let spots_bnb = document.querySelector(".contenedor4 .BNB .spot");
    //future 6m 
    let futf_bnb = document.querySelector(".contenedor4 .BNB .future");
    //Tasa 6m 
    let tasaf_d_bnb = document.querySelector(".contenedor4 .BNB .tasa");
    let tasaf_a_bnb= document.querySelector(".contenedor4 .BNB .tasa1");

    let futy_bnb = [];
    let futyf_bnb = [];
    let spoty_bnb = [];  

    let spotter_bnb = null;
    let futter_bnb = null;
    let futterf_bnb = null;


    //let enviado = [];



    ////////////////SPOT call////////////////////////
    ws_bnb.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_bnb.push(JSON.parse(spot_p));

        spotter_bnb = spoty_bnb[spoty_bnb.length-1];
    }


    ////////////////FUTURE call////////////////////////
    wsf_bnb.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_bnb.push(JSON.parse(fut_p));

        futter_bnb = futy_bnb[futy_bnb.length-1];

        
        let tasa = futter_bnb / spotter_bnb -1;

        tasa_d_bnb.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        if(anual > 15){
            fut_bnb.style.color = "rgb(197, 197, 197)";
            spot_bnb.style.color = "rgb(197, 197, 197)";
            tasa_a_bnb.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spot_bnb.style.color = "black";
            fut_bnb.style.color = "black";
            tasa_a_bnb.style.color = "rgb(255, 0, 34)";
        }else{
            spot_bnb.style.color = "black";
            fut_bnb.style.color = "black";
            tasa_a_bnb.style.color = "yellow";}

        fut_bnb.innerText = parseFloat(futter_bnb).toFixed(2);
        spot_bnb.innerText = parseFloat(spotter_bnb).toFixed(2);

        tasa_a_bnb.innerHTML = `${anual.toFixed(3)}%`;
    }



    ///////////////FUTURE call////////////////////////
    wsff_bnb.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_bnb.push(JSON.parse(fut_p));

        futterf_bnb = futyf_bnb[futyf_bnb.length-1];

        
        let tasa = futterf_bnb / spotter_bnb -1;

        tasaf_d_bnb.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        if(anual > 15){
            spots_bnb.style.color = "rgb(197, 197, 197)";
            futf_bnb.style.color = "rgb(197, 197, 197)";
            tasaf_a_bnb.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spots_bnb.style.color = "black";
            futf_bnb.style.color = "black";
            tasaf_a_bnb.style.color = "rgb(255, 0, 34)";
        }else{
            spots_bnb.style.color = "black";
            futf_bnb.style.color = "black";
            tasaf_a_bnb.style.color = "yellow";}

        spots_bnb.innerText = parseFloat(spotter_bnb).toFixed(2);
        futf_bnb.innerText = parseFloat(futterf_bnb).toFixed(2);

        tasaf_a_bnb.innerHTML = `${anual.toFixed(3)}%`;



        //E-MAIL NOTIFICATION      futter_eth < spotter_eth
        // Direct rate larger than costs            Anual larger then notify1                    Message not sent      NOT NAN
        if(tasa*100 > 0.3               &&          (tasa*100-0.3)/diff6m*365 > notify1          && enviado == 0   && spotter_bnb != NaN && futter_bnb != NaN){
            //['jhoulin.chakana@gmail.com', "ignacio@chakana.com.ar", "elliot@chakana.com.ar ", "arigoli@chakana.com.ar", "tbazzani.chakana@gmail.com"]

            //jmtp mail
            Email.send({
                SecureToken : "",
                To : 'jeronimo.houlin@gmail.com',
                From : "jeronimoaisuru@gmail.com",
                Subject : "Avisoo !",
                Body : `Código: 2580; El BNB a ${diff6m} días está en ${notify1}% anual NOF, avisar !`,
                Attachments : [
                {
                    name : "chakanaimggg.png",
                    path : "https://media-exp1.licdn.com/dms/image/C4E0BAQHxRffplAaY-w/company-logo_200_200/0/1549408729033?e=2159024400&v=beta&t=QMk5flu1ZaH6Yhq9JzW9TMyd-kt6R3r2amTmfjqp11s"
                }]
            }).then(
            message => console.log("Se ha enviado un mail.")
            );

            enviado += 1;
            window.localStorage.setItem("Enviado", enviado);

        }

        //Si caeo 70% la tasa, volver a habilitar el envío.
        if(anual < notify1*(1-resend) && enviado ==1){
            enviado -= 1;
            window.localStorage.setItem("Enviado", enviado);
        }
        
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    //NEXT CRYPTO
    let symb_dot = "dotusdt";
    let symb_f_dot = "dotusd_220325";
    let symb_ff_dot = `dotusd_211231`;

    let ws_dot = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_dot}@trade`);
    let wsf_dot = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_dot}@trade`);
    let wsff_dot = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_dot}@markPrice`);



    //spot 3m
    let spot_dot = document.querySelector(".contenedor6 .DOT .spot");
    //future 3m
    let fut_dot = document.querySelector(".contenedor6 .DOT .future");
    //Tasa 3m
    let tasa_d_dot = document.querySelector(".contenedor6 .DOT .tasa");
    let tasa_a_dot = document.querySelector(".contenedor6 .DOT .tasa1");

    //spot 6m 
    let spots_dot = document.querySelector(".contenedor4 .DOT .spot");
    //future 6m 
    let futf_dot = document.querySelector(".contenedor4 .DOT .future");
    //Tasa 6m 
    let tasaf_d_dot = document.querySelector(".contenedor4 .DOT .tasa");
    let tasaf_a_dot= document.querySelector(".contenedor4 .DOT .tasa1");

    let futy_dot = [];
    let futyf_dot = [];
    let spoty_dot = [];  

    let spotter_dot = null;
    let futter_dot = null;
    let futterf_dot = null;


    //let enviado = [];



    ////////////////SPOT call////////////////////////
    ws_dot.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_dot.push(JSON.parse(spot_p));

        spotter_dot = spoty_dot[spoty_dot.length-1];
    }


    ////////////////FUTURE call////////////////////////
    wsf_dot.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_dot.push(JSON.parse(fut_p));

        futter_dot = futy_dot[futy_dot.length-1];

        
        let tasa = futter_dot / spotter_dot -1;

        tasa_d_dot.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        if(anual > 15){
            fut_dot.style.color = "rgb(197, 197, 197)";
            spot_dot.style.color = "rgb(197, 197, 197)";
            tasa_a_dot.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spot_dot.style.color = "black";
            fut_dot.style.color = "black";
            tasa_a_dot.style.color = "rgb(255, 0, 34)";
        }else{
            spot_dot.style.color = "black";
            fut_dot.style.color = "black";
            tasa_a_dot.style.color = "yellow";}

        spot_dot.innerText = parseFloat(spotter_dot).toFixed(2);
        fut_dot.innerText = parseFloat(futter_dot).toFixed(2);

        tasa_a_dot.innerHTML = `${anual.toFixed(3)}%`;

    }


    ///////////////FUTURE call////////////////////////
    wsff_dot.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_dot.push(JSON.parse(fut_p));

        futterf_dot = futyf_dot[futyf_dot.length-1];

        
        let tasa = futterf_dot / spotter_dot -1;

        tasaf_d_dot.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        if(anual > 15){
            spots_dot.style.color = "rgb(197, 197, 197)";
            futf_dot.style.color = "rgb(197, 197, 197)";
            tasaf_a_dot.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spots_dot.style.color = "black";
            futf_dot.style.color = "black";
            tasaf_a_dot.style.color = "rgb(255, 0, 34)";
        }else{
            spots_dot.style.color = "black";
            futf_dot.style.color = "black";
            tasaf_a_dot.style.color = "yellow";}

        spots_dot.innerText = parseFloat(spotter_dot).toFixed(2);
        futf_dot.innerText = parseFloat(futterf_dot).toFixed(2);

        tasaf_a_dot.innerHTML = `${anual.toFixed(3)}%`;


        //E-MAIL NOTIFICATION      futter_eth < spotter_eth
        // Direct rate larger than costs            Anual larger then notify1                    Message not sent      NOT NAN
        if(tasa*100 > 0.3               &&          (tasa*100-0.3)/diff6m*365 > notify1          && enviado == 0   && spotter_dot != NaN && futter_dot != NaN){
            //['jhoulin.chakana@gmail.com', "ignacio@chakana.com.ar", "elliot@chakana.com.ar ", "arigoli@chakana.com.ar", "tbazzani.chakana@gmail.com"]

            //jmtp mail
            Email.send({
                SecureToken : "",
                To : 'jeronimo.houlin@gmail.com',
                From : "jeronimoaisuru@gmail.com",
                Subject : "Avisoo !",
                Body : `Código: 2580; El DOT a ${diff6m} días está en ${notify1}% anual NOF, avisar !`,
                Attachments : [
                {
                    name : "chakanaimggg.png",
                    path : "https://media-exp1.licdn.com/dms/image/C4E0BAQHxRffplAaY-w/company-logo_200_200/0/1549408729033?e=2159024400&v=beta&t=QMk5flu1ZaH6Yhq9JzW9TMyd-kt6R3r2amTmfjqp11s"
                }]
            }).then(
            message => console.log("Se ha enviado un mail.")
            );

            enviado += 1;
            window.localStorage.setItem("Enviado", enviado);

        }

        //Si caeo 70% la tasa, volver a habilitar el envío.
        if(anual < notify1*(1-resend) && enviado ==1){
            enviado -= 1;
            window.localStorage.setItem("Enviado", enviado);
        }
        
    }




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //NEXT CRYPTO
    let symb_bch = "bchusdt";
    let symb_f_bch = "bchusd_220325";
    let symb_ff_bch = `bchusd_211231`;

    let ws_bch = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_bch}@trade`);
    let wsf_bch = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_bch}@trade`); //@markPrice
    let wsff_bch = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_bch}@markPrice`);




    //spot 3m
    let spot_bch = document.querySelector(".contenedor6 .BCH .spot");
    //future 3m
    let fut_bch = document.querySelector(".contenedor6 .BCH .future");
    //Tasa 3m
    let tasa_d_bch = document.querySelector(".contenedor6 .BCH .tasa");
    let tasa_a_bch = document.querySelector(".contenedor6 .BCH .tasa1");

    //spot 6m 
    let spots_bch = document.querySelector(".contenedor4 .BCH .spot");
    //future 6m 
    let futf_bch = document.querySelector(".contenedor4 .BCH .future");
    //Tasa 6m 
    let tasaf_d_bch = document.querySelector(".contenedor4 .BCH .tasa");
    let tasaf_a_bch= document.querySelector(".contenedor4 .BCH .tasa1");

    let futy_bch = [];
    let futyf_bch = [];
    let spoty_bch = [];  

    let spotter_bch = null;
    let futter_bch = null;
    let futterf_bch = null;


    //let enviado = [];

    ////////////////SPOT call////////////////////////
    ws_bch.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_bch.push(JSON.parse(spot_p));

        spotter_bch = spoty_bch[spoty_bch.length-1];
    }


    ////////////////FUTURE call////////////////////////
    wsf_bch.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_bch.push(JSON.parse(fut_p));

        futter_bch = futy_bch[futy_bch.length-1];

        
        let tasa = futter_bch / spotter_bch -1;

        tasa_d_bch.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        if(anual > 15){
            fut_bch.style.color = "rgb(197, 197, 197)";
            spot_bch.style.color = "rgb(197, 197, 197)";
            tasa_a_bch.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spot_bch.style.color = "black";
            fut_bch.style.color = "black";
            tasa_a_bch.style.color = "rgb(255, 0, 34)";
        }else{
            spot_bch.style.color = "black";
            fut_bch.style.color = "black";
            tasa_a_bch.style.color = "yellow";}

        spot_bch.innerText = parseFloat(spotter_bch).toFixed(2);
        fut_bch.innerText = parseFloat(futter_bch).toFixed(2);

        tasa_a_bch.innerHTML = `${anual.toFixed(3)}%`;

    }

    ///////////////FUTURE call////////////////////////
    wsff_bch.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futyf_bch.push(JSON.parse(fut_p));

        futterf_bch = futyf_bch[futyf_bch.length-1];

        
        let tasa = futterf_bch / spotter_bch -1;

        tasaf_d_bch.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff6m)+1)**365)-1)*100;

        if(anual > 15){
            spots_bch.style.color = "rgb(197, 197, 197)";
            futf_bch.style.color = "rgb(197, 197, 197)";
            tasaf_a_bch.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spots_bch.style.color = "black";
            futf_bch.style.color = "black";
            tasaf_a_bch.style.color = "rgb(255, 0, 34)";
        }else{
            spots_bch.style.color = "black";
            futf_bch.style.color = "black";
            tasaf_a_bch.style.color = "yellow";}

        spots_bch.innerText = parseFloat(spotter_bch).toFixed(2);
        futf_bch.innerText = parseFloat(futterf_bch).toFixed(2);

        tasaf_a_bch.innerHTML = `${anual.toFixed(3)}%`;

        //E-MAIL NOTIFICATION      futter_eth < spotter_eth
        // Direct rate larger than costs            Anual NOF larger then notify1                    Message not sent      NOT NAN
        if(tasa*100 > 0.3               &&          (tasa*100-0.3)/diff6m*365 > notify1          && enviado == 0   && spotter_bch != NaN && futter_bch != NaN){
            //['jhoulin.chakana@gmail.com', "ignacio@chakana.com.ar", "elliot@chakana.com.ar ", "arigoli@chakana.com.ar", "tbazzani.chakana@gmail.com"]

            //jmtp mail
            Email.send({
                SecureToken : "",
                To : 'jeronimo.houlin@gmail.com',
                From : "jeronimoaisuru@gmail.com",
                Subject : "Avisoo !",
                Body : `Código: 2580; El BCH a ${diff6m} días está en ${notify1}% anual NOF, avisar !`,
                Attachments : [
                {
                    name : "chakanaimggg.png",
                    path : "https://media-exp1.licdn.com/dms/image/C4E0BAQHxRffplAaY-w/company-logo_200_200/0/1549408729033?e=2159024400&v=beta&t=QMk5flu1ZaH6Yhq9JzW9TMyd-kt6R3r2amTmfjqp11s"
                }]
            }).then(
            message => console.log("Se ha enviado un mail.")
            );

            enviado += 1;
            window.localStorage.setItem("Enviado", enviado);

        }

        //Si caeo 70% la tasa, volver a habilitar el envío.
        if(anual < notify1*(1-resend) && enviado ==1){
            enviado -= 1;
            window.localStorage.setItem("Enviado", enviado);
        }
       

    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //NEXT CRYPTO
    let symb_ada = "adausdt";
    let symb_f_ada = "adausd_220325";
    let symb_ff_ada = "adausd_211231";

    let ws_ada = new WebSocket(`wss://stream.binance.com:9443/ws/${symb_ada}@trade`);
    let wsf_ada = new WebSocket(`wss://dstream.binance.com/ws/${symb_f_ada}@trade`);
    let wsff_ada = new WebSocket(`wss://dstream.binance.com/ws/${symb_ff_ada}@markPrice`);



    //spot 3m
    let spot_ada = document.querySelector(".contenedor6 .ADA .spot");
    //future 3m
    let fut_ada = document.querySelector(".contenedor6 .ADA .future");
    //Tasa 3m
    let tasa_d_ada = document.querySelector(".contenedor6 .ADA .tasa");
    let tasa_a_ada = document.querySelector(".contenedor6 .ADA .tasa1");

    //spot 6m 
    let spots_ada = document.querySelector(".contenedor4 .ADA .spot");
    //future 6m 
    let futf_ada = document.querySelector(".contenedor4 .ADA .future");
    //Tasa 6m 
    let tasaf_d_ada = document.querySelector(".contenedor4 .ADA .tasa");
    let tasaf_a_ada= document.querySelector(".contenedor4 .ADA .tasa1");

    let futy_ada = [];
    let futyf_ada = [];
    let spoty_ada = [];  

    let spotter_ada = null;
    let futter_ada = null;
    let futterf_ada = null;


    //let enviado = [];


    ////////////////SPOT call////////////////////////
    ws_ada.onmessage = (event) => {
        //console.log(event.data);
        let spot_p = JSON.parse(event.data).p;
        spoty_ada.push(JSON.parse(spot_p));

        spotter_ada = spoty_ada[spoty_ada.length-1];
    }


    ////////////////FUTURE call////////////////////////
    wsf_ada.onmessage = (event) => {
        //console.log(event.data);
        let fut_p = JSON.parse(event.data).p;
        futy_ada.push(JSON.parse(fut_p));

        futter_ada = futy_ada[futy_ada.length-1];
        //console.log(fut_p);
        
        let tasa = futter_ada / spotter_ada -1;

        tasa_d_ada.innerText = `${(tasa*100).toFixed(3)}%`;

        let anual = ((((tasa/diff3m)+1)**365)-1)*100;

        if(anual > 15){
            fut_ada.style.color = "rgb(197, 197, 197)";
            spot_ada.style.color = "rgb(197, 197, 197)";
            tasa_a_ada.style.color = "rgb(0, 255, 34)";
        }else if(anual < 10){
            spot_ada.style.color = "black";
            fut_ada.style.color = "black";
            tasa_a_ada.style.color = "rgb(255, 0, 34)";
        }else{
            spot_ada.style.color = "black";
            fut_ada.style.color = "black";
            tasa_a_ada.style.color = "yellow";}

        spot_ada.innerText = parseFloat(spotter_ada).toFixed(4);
        fut_ada.innerText = parseFloat(futter_ada).toFixed(4);

        tasa_a_ada.innerHTML = `${anual.toFixed(3)}%`;

    }


        ///////////////FUTURE call////////////////////////
        wsff_ada.onmessage = (event) => {
            //console.log(event.data);
            let fut_p = JSON.parse(event.data).p;
            futyf_ada.push(JSON.parse(fut_p));
    
            futterf_ada = futyf_ada[futyf_ada.length-1];
    
            
            let tasa = futterf_ada / spotter_ada -1;
    
            tasaf_d_ada.innerText = `${(tasa*100).toFixed(3)}%`;
    
            let anual = ((((tasa/diff6m)+1)**365)-1)*100;
    
            if(anual > 15){
                spots_ada.style.color = "rgb(197, 197, 197)";
                futf_ada.style.color = "rgb(197, 197, 197)";
                tasaf_a_ada.style.color = "rgb(0, 255, 34)";
            }else if(anual < 10){
                spots_ada.style.color = "black";
                futf_ada.style.color = "black";
                tasaf_a_ada.style.color = "rgb(255, 0, 34)";
            }else{
                spots_ada.style.color = "black";
                futf_ada.style.color = "black";
                tasaf_a_ada.style.color = "yellow";}
    
            spots_ada.innerText = parseFloat(spotter_ada).toFixed(2);
            futf_ada.innerText = parseFloat(futterf_ada).toFixed(2);
    
            tasaf_a_ada.innerHTML = `${anual.toFixed(3)}%`;


            //E-MAIL NOTIFICATION      futter_eth < spotter_eth
            // Direct rate larger than costs            Anual larger then notify1                    Message not sent      NOT NAN
            if(tasa*100 > 0.3               &&          (tasa*100-0.3)/diff6m*365 > notify1          && enviado == 0   && spotter_ada != NaN && futter_ada != NaN){
                //['jhoulin.chakana@gmail.com', "ignacio@chakana.com.ar", "elliot@chakana.com.ar ", "arigoli@chakana.com.ar", "tbazzani.chakana@gmail.com"]

                //jmtp mail
                Email.send({
                    SecureToken : "",
                    To : 'jeronimo.houlin@gmail.com',
                    From : "jeronimoaisuru@gmail.com",
                    Subject : "Avisoo !",
                    Body : `Código: 2580;El  ADA a ${diff6m} días está en ${notify1}% anual NOF, avisar !`,
                    Attachments : [
                    {
                        name : "chakanaimggg.png",
                        path : "https://media-exp1.licdn.com/dms/image/C4E0BAQHxRffplAaY-w/company-logo_200_200/0/1549408729033?e=2159024400&v=beta&t=QMk5flu1ZaH6Yhq9JzW9TMyd-kt6R3r2amTmfjqp11s"
                    }]
                }).then(
                message => console.log("Se ha enviado un mail.")
                );

                enviado += 1;
                window.localStorage.setItem("Enviado", enviado);

            }

            //Si caeo 70% la tasa, volver a habilitar el envío.
            if(anual < notify1*(1-resend) && enviado ==1){
                enviado -= 1;
                window.localStorage.setItem("Enviado", enviado);
            }
            


        }



}

f1();

import { Injectable } from '@angular/core';
import { PRIMARY_OUTLET } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class Common {

  constructor() { }
  
     //chiamata all'api c# che gestisce l'inserimento dei dati nel database
     public static callwebapi(deviceId: string, feedBack: any) {
        
        let base_url ="";

        //base_url="https://localhost:44395/"    //x test in locale
        base_url="http://srv-iis/EurogroupFeedbackAPI/"    //x test in pubblicazione

        const uri = base_url+"insertFeedbackDB?deviceId="+deviceId+"&feedBack="+feedBack;

        fetch(uri, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                    "Access-Control-Allow-Origin": "*",
                    "content-type": "application/json",           
                    }    
        })
         .then(response => {console.log("RESPONSE STATUS : "+ response.status);
        })
         .catch(error =>{ console.log("ERROR : "+ error);});                    
      }
  }
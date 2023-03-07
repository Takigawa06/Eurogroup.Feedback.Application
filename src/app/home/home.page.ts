import { Component } from '@angular/core';
import { IonicToastService } from '../services/ionic-toast.service';
import { Device } from '@capacitor/device';
import { Common } from '../services/common';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})



export class homePage {
      
     //dichiarazione variabile necessaria al blocco del codice eseguito dopo il click
     static  save_lock = false;

     constructor(public  ionicToastService: IonicToastService)  
     {

     }
      

         //mostra pop up per ringraziare l'utente del feedback appena dato
         public showMyToast() {
            this.ionicToastService.showToast();
         }
  

         public async ImageClick(event: Event): Promise<void> {
     
             /*controlla se il codice è in esecuzione a causa di un altro evento (altro click immagine di un utente),
             se il blocco è attivato non viene eseguito il codice,e va atteso che l'operazione precedente venga completata,prima che un 
             utente possa ricliccare*/
             if(!homePage.save_lock){
      
                //mette a true il lock 
                homePage.save_lock = true;
                //prende l'id dell'immagine cliccata
                let elementId: string = (event.target as Element).id;     
                //prende l'elemnto html che corrisponde all'immagine cliccata
                let img = document.getElementById(elementId) as HTMLImageElement; 
                //salva il percorso originale dell'immagine in una variabile temporanea
                let normalSRC = img.src;
                //dichiarazione variabile che andrà a contenere il feeback dell'utente
                let FB = 0;
                //acquisisce id dispositivo
                const info =  Device.getId();
  
                //in base all'immagine cliccata viene assegnato un voto da 1 a 5, e appare su di essa una spunta verde
                if(elementId == "ARRABBIATO"){
                   img.src = "assets/imgs/arrabbiatoOK.png"         
                   FB = 1;
                }

                if(elementId == "TRISTE"){
                   img.src = "assets/imgs/tristeOK.png"
                   FB = 2;
                }

                if(elementId == "MODERATO"){
                   img.src = "assets/imgs/moderatoOK.png"
                   FB = 3;
                }

                if(elementId == "FELICE"){
                   img.src = "assets/imgs/feliceOK.png"
                   FB = 4;
                }

                if(elementId == "ottimoUmore"){
                   img.src = "assets/imgs/ottimoUmoreOK.png"
                   FB = 5;
                }
      
                //attesa Timeout per ripristino immagine originale
                await setTimeout(() => {
                   img.src = normalSRC;
                }, 400)
      
                //chiama l'api in c# che gestisce l'inserimento dei dati del database
                Common.callwebapi((await info).uuid,FB);
      
                //mostra pop up per ringraziare l'utente del feedback appena dato
                this.showMyToast();

                //attesa Timeout per sblocco click immagine
                await setTimeout(() => {
                   homePage.save_lock = false;
                }, 1800)     
              }    
          }
}

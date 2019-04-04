import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public simInfo: any;
  public cards: any;
  lat: number;
  long: number;
  subject='Denuncia';
  body='';
  to='tsuiya.hachiman@gmail.com';

  constructor(private emailComposer: EmailComposer, private geolocation: Geolocation, private sim: Sim) { }

  
  enviar(){
    let email = {
      to: this.to,
      subject: this.subject,
      body: this.body,
      isHtml: false
    }
    this.emailComposer.open(email);
  }

  async getSimData() {
    try {
      let simPermission = await this.sim.requestReadPermission();
      if (simPermission == "OK") {
        let simData = await this.sim.getSimInfo();
        this.simInfo = simData;
        this.cards = simData.cards;
        console.log(simData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  local(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.lat = resp.coords.latitude;
    this.long = resp.coords.longitude;
   }).catch((error) => {
     console.log('Error getting location', error);
   });
  }

}
  
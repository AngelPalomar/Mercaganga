import * as AccUtils from "../accUtils";
import * as ko from 'knockout';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

//datos
import * as datosJson from 'text!../dummy/bar.json';

import 'ojs/ojknockout';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import "ojs/ojswitch";
import "ojs/ojselectcombobox";

class DashboardViewModel {

  //Creamos nuestras variables
  datosProvider: ArrayDataProvider<string, null>;
  stackValue: ko.Observable<string>;
  isVertical: ko.Observable<boolean>;
  graficaTipo: ko.Observable<string>;

  constructor() {
    //Inicializar datos
    this.stackValue = ko.observable("off");
    this.datosProvider = new ArrayDataProvider(JSON.parse(datosJson), {
      keyAttributes: 'id'
    });
    this.isVertical = ko.observable(false);
    this.graficaTipo = ko.observable("bar");
  }
}

export = DashboardViewModel;

import * as ko from "knockout";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { ojDialog } from "ojs/ojdialog";
import { ojButton } from "ojs/ojbutton";
import { ojTable } from "ojs/ojtable";
import { KeySetImpl } from "ojs/ojkeyset";

import "ojs/ojbutton";
import "ojs/ojdialog";
import "ojs/ojtable";
import "ojs/ojinputtext";
import "ojs/ojinputnumber";
import "ojs/ojknockout";

//Interfaces
import IProducto from "../interfaces/IProducto";
import { get, create, update, del } from "../api";

class ProductsViewModel {

  productos: ko.ObservableArray<IProducto>;
  productosDataProvider: ArrayDataProvider<ko.ObservableArray, any>;

  //Crear producto
  nombreProducto: ko.Observable<string>;
  precioProducto: ko.Observable<number>;

  //Editar producto
  idProductoEditar: ko.Observable<number>;
  nombreProductoEditar: ko.Observable<string>;
  precioProductoEditar: ko.Observable<number>;

  constructor() {
    //Inicializamos nuestras props 
    this.productos = ko.observableArray([]);
    this.productosDataProvider = new ArrayDataProvider(this.productos, {
      //Atributo de identificador
      keyAttributes: 'id',
      //Order de la tabla
      implicitSort: [{ attribute: 'id', direction: 'descending' }]
    })

    //Crear
    this.nombreProducto = ko.observable("");
    this.precioProducto = ko.observable(0);

    //Editar
    this.nombreProductoEditar = ko.observable("");
    this.precioProductoEditar = ko.observable(0);
    this.idProductoEditar = ko.observable(0);

    //Llamamos la API
    this.getProductosApi();
  }

  //Función para guardar (crear) un producto
  public guardarProducto = (event: ojButton.ojAction) => {
    //Validaciones

    if (this.nombreProducto().trim() !== '' || this.precioProducto().toString().trim() !== '') {
      //Creamos nuestro objeto para el body
      const Producto: IProducto = {
        nombre: this.nombreProducto(),
        precio: this.precioProducto()
      }

      //Llamamos a la APi para crear producto
      create(Producto).then((response: IProducto) => {
        //Cerramos el modal y recargamos datos 
        (document.getElementById("crear-producto-dialog") as ojDialog).close();

        this.getProductosApi();

      }).catch(error => {
        console.error(error);
      });
    }
  }

  //Función para editar datos en servidor
  public editarProducto = (event: ojButton.ojAction) => {
    if (this.nombreProductoEditar().trim() !== '' || this.precioProductoEditar().toString().trim() !== '') {
      //Creamos nuestro objeto para el body
      const Producto: IProducto = {
        nombre: this.nombreProductoEditar(),
        precio: this.precioProductoEditar()
      }

      //Llamamos a la APi para crear producto
      update(this.idProductoEditar(), Producto).then((response: IProducto) => {
        //Cerramos el modal y recargamos datos 
        (document.getElementById("editar-producto-dialog") as ojDialog).close();

        this.getProductosApi();

      }).catch(error => {
        console.error(error);
      });
    }
  }

  //Función para eliminar producto
  public eliminarProducto = (event: ojButton.ojAction) => {
    //Llamamos a la APi para crear producto
    del(this.idProductoEditar()).then((response: IProducto) => {
      //Cerramos el modal y recargamos datos 
      (document.getElementById("eliminar-producto-dialog") as ojDialog).close();

      this.getProductosApi();

    }).catch(error => {
      console.error(error);
    });
  }

  //Selección de datos en tabla
  public selectedChangedListener = (event: ojTable.selectedChanged<IProducto["id"], IProducto>) => {
    let selectionText: string;

    const row = event.detail.value.row as KeySetImpl<number>;

    if (row.values().size > 0) {
      row.values().forEach((key) => {
        var selectedRow = this.productos().find(p => p.id === key);

        //asignamos ID seleccionado
        this.idProductoEditar(key);
        this.nombreProductoEditar(selectedRow.nombre);
        this.precioProductoEditar(selectedRow.precio);
      })
    }
  };

  //Funciones para abrir y cerrar el modal para crear y editar
  public closeCrearProducto(event: ojButton.ojAction) {
    (document.getElementById("crear-producto-dialog") as ojDialog).close();
  }

  public openCrearProducto(event: ojButton.ojAction) {
    (document.getElementById("crear-producto-dialog") as ojDialog).open();
  }

  public openEditarProducto() {
    (document.getElementById("editar-producto-dialog") as ojDialog).open();
  }

  public closeEditarProducto(event: ojButton.ojAction) {
    (document.getElementById("editar-producto-dialog") as ojDialog).close();
  }

  public openEliminarProducto() {
    (document.getElementById("eliminar-producto-dialog") as ojDialog).open();
  }

  public closeEliminarProducto(event: ojButton.ojAction) {
    (document.getElementById("eliminar-producto-dialog") as ojDialog).close();
  }

  //Función para traer los datos del servicio
  public getProductosApi = () => {
    get().then((response: Array<IProducto>) => {
      this.productos(response);
    }).catch(error => {
      console.error(error);
    })
  }
}

export = ProductsViewModel;

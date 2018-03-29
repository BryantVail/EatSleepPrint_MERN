"use strict";
/* global requirejs */

requirejs.config({
  baseUrl:"../scripts/",
  paths:{
    //userDefined
    "OrderAdd": "components/OrderAdd",
    "OrderList":"components/OrderList",

    //dependencies
    "react-dom" :[
      "https://unpkg.com/react-dom@16/umd/react-dom.production.min",
      "react/build/react-dom"
    ],
    react       :[
      "https://unpkg.com/react@16/umd/react/production.min",
      "react/build/react"
    ],
    jquery      :[
      "https://code.jquery.com/jquery-3.3.1",
      "jquery/jquery-3.3.1"
    ],
    fetch       : "https://cdnjs.cloudflare.com/ajax/libs/fetch/1.0.0/fetch.min"
        
  }
});















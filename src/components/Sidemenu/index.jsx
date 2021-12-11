import React from 'react';
import './sidemenu.css';

function Sidemenu() {
  const items = [];
  for (const item of getMenu()) {
    items.push(<li><a href={item.path}>{item.label}</a></li>);
  }

  return (
    <div className='sidemenu'>
      <h2>Master Inventory</h2>
      <nav>
        <ul>
          {items}
        </ul>
      </nav>
    </div>
  );
}

function getMenu() {
  return [
    {
      label : "Item Master Maintenance",
      path : "Inm00001"
    },
    {
      label : "GRN Entry (with PO)",
      path : "Inm00003"
    },
    {
      label : "Manual GRN Entry",
      path : "Inm00002"
    },
    {
      label : "SIV Entry",
      path : "Inm00004"
    },
    {
      label : "manual SIV Entry",
      path : "Inm00005"
    },
    {
      label : "SIV Combine Entry",
      path : "Inm000024"
    },
    {
      label : "SIV Consigned Entry",
      path : "Inm000033"
    },
    {
      label : "MSR Entry (Goods Return to SUpplier)",
      path : "Inm00006"
    },
    {
      label : "MRV Entry (WIP Stock Return)",
      path : "Inm00007"
    },
    {
      label : "Stock Location (Warehouse)",
      path : "Inm00008"
    },
    {
      label : "UOM Maintenance",
      path : "Inm00009"
    },
    {
      label : "Item Category Maintenance",
      path : "Inm00010"
    },
    {
      label : "Inventory Control",
      path : "Inm00013"
    },
    {
      label : "Reversal of 'Reversed Stock Items'",
      path : "Inm00016"
    },
    {
      label : "GRN Reversal",
      path : "Inm00017"
    },
    {
      label : "Project - Stock Allocation",
      path : "Inm00018"
    },
    {
      label : "Project - Stock Release",
      path : "Inm00019"
    }
  ];
}

export default Sidemenu;

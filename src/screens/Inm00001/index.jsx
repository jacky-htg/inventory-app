import React from 'react';
import {Sidemenu} from '../../components';
import './list.css';

function Inm00001() {
  const items = [];
  for (const item of getItem()) {
    items.push(<tr key={item.ItemNo}>
      <td>
        {item.ItemNo}
      </td>
      <td>
      {item.PartNo}
      </td>
      <td>{item.Manufacturer}</td>
      <td>{item.UOM}</td>
      <td>{item.BoardSize}</td>
      <td>{item.Leadtime}</td>
      <td>{item.Requestor}</td>
      <td><button>View</button><button>Edit</button> <button>Delete</button></td>
    </tr>);
  }

  const pagination = (
    <div className="pagination">
    <a href="#">&laquo;</a>
    <a className="active" href="#">1</a>
    <a href="#">2</a>
    <a href="#">3</a>
    <a href="#">4</a>
    <a href="#">5</a>
    <a href="#">6</a>
    <a href="#">&raquo;</a>
  </div>);

  const filter = (
    <div className='filter'>
      <div>
        <label>Search</label>
        <input/>
      </div>
      <div>
        <label>Item No</label>
        <input/>
      </div>
      <div>
        <label>Item No</label>
        <input/>
      </div><div>
        <label>Part No</label>
        <input/>
      </div>
      <div>
        <label>Requestor</label>
        <input/>
      </div>
      <button>Filter</button>
    </div>
  );

  return (
    <div className="maincontent">
      <Sidemenu/>
      <div className='container'>
        <div className='header-list'><h2>Item Master Maintenance</h2></div>
        <button className="create">Create Item Master Maintenance</button>
        {filter}
        <table>
          <tbody>
          <tr>
            <th>
              Item No
            </th>
            <th>
              Part No
            </th>
            <th>Manufacturer</th>
            <th>UOM</th>
            <th>Board Size</th>
            <th>Leadtime</th>
            <th>Requestor</th>
            <th></th>
          </tr>
          {items}
          </tbody>
        </table>
        {pagination}
      </div>
    </div>
  );
}

function getItem() {
  return [
    {
      ItemNo : "Item0001",
      PartNo : "Part0001",
      Manufacturer : "Manufacturer 00005",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    },
    {
      ItemNo : "Item0002",
      PartNo : "Part0002",
      Manufacturer : "Manufacturer 00005",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    },
    {
      ItemNo : "Item0003",
      PartNo : "Part0003",
      Manufacturer : "Manufacturer 00005",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    },
    {
      ItemNo : "Item0004",
      PartNo : "Part0004",
      Manufacturer : "Manufacturer 00005",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    },
    {
      ItemNo : "Item0005",
      PartNo : "Part0005",
      Manufacturer : "Manufacturer 00005",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    },
    {
      ItemNo : "Item0006",
      PartNo : "Part0006",
      Manufacturer : "Manufacturer 00006",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    },
    {
      ItemNo : "Item0007",
      PartNo : "Part0007",
      Manufacturer : "Manufacturer 00007",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    },
    {
      ItemNo : "Item0008",
      PartNo : "Part0008",
      Manufacturer : "Manufacturer 00008",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    },
    {
      ItemNo : "Item0009",
      PartNo : "Part0009",
      Manufacturer : "Manufacturer 00009",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    },
    {
      ItemNo : "Item0010",
      PartNo : "Part0010",
      Manufacturer : "Manufacturer 00010",
      UOM: "mm",
      BoardSize: "12",
      Leadtime: "40",
      Requestor: "Ramdani"
    }
  ]
}

export default Inm00001;

import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonButton, IonContent } from "@ionic/react";
import './Canvas.css'

import Konva from 'konva';

interface P {}
type Props = P & RouteComponentProps

const bdTables = [
  { x: 50, y: 50, width: 100, height: 50, fill: '#BB7654', stroke: 'black', strokeWidth: 4, draggable: true },
  { x: 175, y: 80, width: 100, height: 50, fill: '#30A250', stroke: 'black', strokeWidth: 4, draggable: true },
  { x: 70, y: 65, width: 100, height: 50, fill: '#FF7400', stroke: 'black', strokeWidth: 4, draggable: true },
  { x: 120, y: 50, width: 100, height: 50, fill: '#BB7654', stroke: 'black', strokeWidth: 4, draggable: true },
]

export const Canvas: React.FC = () => {
  const [ layer, setLayer ] = useState<any>()
  useEffect(() => {
    var stage = new Konva.Stage({
      container: 'canvas',
      width: 500,
      height: 500,
    });
    const element = new Konva.Layer()
    setLayer(element)
    stage.add(element);
    bdTables.map(table=>{
      const box = new Konva.Rect(table)
      element.add(box);
      box.on('mouseover', () => document.body.style.cursor = 'pointer' );
      box.on('mouseout', () => document.body.style.cursor = 'default' );
      box.on('click', () => alert("TESTTTT"))
    })

  }, []);
  
  const addTable = () => {
    var box = new Konva.Rect({
      x: 50,
      y: 50,
      width: 100,
      height: 50,
      fill: '#00D2FF',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true,
    });
    layer.add(box);

    box.on('mouseover', function () {
      document.body.style.cursor = 'pointer';
    });
    box.on('mouseout', function () {
      document.body.style.cursor = 'default';
    });
  }

  return (
    <IonContent>
      <div id={'canvas'} ></div>
      <IonButton onClick={()=>addTable()}>Agregar Mesa</IonButton>
    </IonContent>
    )
}

export default Canvas;
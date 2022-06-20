import 'mapbox-gl/dist/mapbox-gl.css'
import { Map } from 'mapbox-gl'
import { useEffect, useRef } from 'react';



interface Props {}
export const MapContainer: React.FC<Props> = (props: Props) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const map = new Map({
      container: 'map-box-container', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  },[])
  return (
    <div ref={mapRef} id='map-box-container' style={{ width: '500px', height: '500px' }} >

    </div>
  )
}

export default MapContainer;
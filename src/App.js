import React, { useState,useEffect } from 'react';
import ReactMapGL,{Popup,Marker} from 'react-map-gl';
// require('dotenv').config();
import {fetchblogEntry} from './APIservice'

const App=()=> {
  const [logs,setLogs]=useState([]);
  const [showPopup,setShowPopup]=useState(false);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 29.376248, 
    longitude:75.839869,
    zoom: 4
  });

  useEffect(()=>{
    ( async function (){ 
      const fetched= await fetchblogEntry();
      // console.log(fetched);
      setLogs(fetched);
      })();
  },[])

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.MAP_KEY}
      {...viewport}
      mapStyle='mapbox://styles/mittalsam98/ck6n8h2nt1unr1ip2pnjdkvbw'
      onViewportChange={setViewport}
    >{ 
      logs.map((log)=>{
        console.log(typeof(log._id));
        return(
        <>
          <Marker 
           key={log._id}
          latitude={log.latitude} 
          longitude={log.longitude} 
          >
            <div
            onClick={()=>{
              setShowPopup({[log._id]:true})
            }}
            >
              <img 
                className='marker'
                style={{
                  height:`${6*viewport.zoom}px`,
                  width:`${6*viewport.zoom}px`
                }}
                src="http://i.imgur.com/y0G5YTX.png" 
                alt='marker' 
              />
            </div>
          </Marker>
          {showPopup[log._id]?( 
          <Popup
            latitude={log.latitude}
            longitude={log.longitude}
            closeButton={true}
            closeOnClick={true}
            dynamicPosition={true}
            onClose={() =>setShowPopup({[log._id]:false})}
            anchor="top" >
            <div className='popup'>
              <h3>{log.title}</h3>
              <p>{log.description}</p>
            </div>
          </Popup>):null
          }
          </>
        )
      })
    }
     
    </ReactMapGL>
  );
}

export default App
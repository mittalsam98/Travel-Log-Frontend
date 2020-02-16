import React, { useState,useEffect } from 'react';
import ReactMapGL,{Popup,Marker} from 'react-map-gl';
// require('dotenv').config();
import {fetchblogEntry} from './APIservice'
import LogEntryForm from './LogEntryForm'
import LogFormEntry from './LogEntryForm';
const App=()=> {
  const [logs,setLogs]=useState([]);
  const [showPopup,setShowPopup]=useState(false);
  const [addEntryLocation,setaddEntryLocation]=useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 29.376248, 
    longitude:75.839869,
    zoom: 4
  });

  const showAddMarkerPopup=(event)=>{
    console.log(event.lngLat);
    const [longitude,latitude]=event.lngLat;
    setaddEntryLocation({
      latitude,
      longitude
    })
  // console.log(addEntryLocation)
  }
    const  getEntry= async ()=>{
    const fetched= await fetchblogEntry();
    setLogs(fetched);
  }
  useEffect(()=>{
    getEntry();
  },[])

  return (
    <ReactMapGL
      mapboxApiAccessToken={'pk.eyJ1IjoibWl0dGFsc2FtOTgiLCJhIjoiY2s2bjZkaXh3MHVqdTNucGE2bGJ5MWd1OCJ9.Ay4Q_u5f_FfJZIKZwjzFWg'}
      {...viewport}
      mapStyle='mapbox://styles/mittalsam98/ck6n8h2nt1unr1ip2pnjdkvbw'
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >{ 
      logs.map((log)=>{
        return(
        <React.Fragment key={log._id}
        >
          <Marker 
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
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() =>setShowPopup({[log._id]:false})}
            anchor="top" >
            <div className='popup'>
              <h3>{log.title}</h3>
              <h6>{log.description}</h6>
              <p>{log.comments}</p>
             <small>{"Visited on : "+new Date(log.visiteDate).toLocaleDateString()}</small>
             {log.image &&  <img src={log.image} alt={log.title} />}
            </div>
          </Popup>):null
          }
          { addEntryLocation?(
            <>
                <Marker 
                  latitude={addEntryLocation.latitude} 
                  longitude={addEntryLocation.longitude} 
                  >
                    <div>
                        <svg  
                          className="marker red"
                          style={{
                          height:`${6*viewport.zoom}px`,
                          width:`${6*viewport.zoom}px`
                          }} 
                          version="1.1" x='0px' y='0px'
                        >
                        <path 
                         d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
                         >
                        </path>
                         </svg>
                    </div>
                </Marker>
                <Popup
                    latitude={addEntryLocation.latitude}
                    longitude={addEntryLocation.longitude}
                    closeButton={true}
                    closeOnClick={true}
                    onClose={() =>setaddEntryLocation(null)}
                    anchor="top" >
                      <div className='popup'>
                        <h3>Add new Entry here</h3>
                        <LogFormEntry onClose={()=>{
                          setaddEntryLocation(null);
                          getEntry();
                        }} location={addEntryLocation} />
                      </div>
              </Popup>
           </> ) : null
          }
          </React.Fragment>
        )
      })
    }
     
    </ReactMapGL>
  );
}

export default App
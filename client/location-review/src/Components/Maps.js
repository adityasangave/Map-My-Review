import { Map, NavigationControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './Styles/maps.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export default function Maps(props) {
    const [pins, setPins] = useState([]);
    const [viewPort, setViewPort] = useState({
        longitude: 10.5,
        latitude: 30,
        zoom: 12,
    })
    const [placeId, setPlaceId] = useState(null)
    const [placeInfo, setPlaceInfo] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [rating, setRating] = useState(null)

    const handleOnIconClick = (id, long, lati) => {
        console.log(lati)
        setPlaceId(id)
    }

    //When user want to enter a new pin
    const handleRightClick = (e) => {
        // e.preventDefault()
        console.log("Right Click")
        setPlaceInfo({
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng
        })

    }

    // When user submit add new pin form
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const newPin = {
            username: props.currentUser,
            title: title,
            rating: rating,
            desc: desc,
            lati: placeInfo.latitude,
            long: placeInfo.longitude
        }

        try {
            if (props.currentUser) {
                const res = await axios.post("https://map-my-review-backend.onrender.com/api/pins/create-pin", newPin)
                setPins([...pins, res.data])
                setPlaceInfo(null)
                setTitle(null)
                setDesc(null)
                setRating(null)

                toast.success('New Pin Added', {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "dark",
                });
            }
            else {
                //notify
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getPins = async () => {
            const response = await axios.get("/pins/get-all-pins");
            setPins(response.data)
            console.log(response.data)
        }
        getPins()
    }, [])

    return (
        <div>
            <Map
                conatainer={'map'}
                projection={'globe'}
                initialViewState={{}}
                style={{ width: '100vw', height: '100vh' }}
                mapStyle='mapbox://styles/adityazmb/cle8mbz3s001301qs3x3sn24b'
                mapboxAccessToken='pk.eyJ1IjoiYWRpdHlhem1iIiwiYSI6ImNsZHVpdXUxczA2YmUzdnBhOWlkNWN0MWoifQ.Zgt3O3d_yGANXBD0VlOuVg'
                onDblClick={handleRightClick}
            >
                <NavigationControl />
                {

                    pins.map(p => (
                        <>
                            <Marker
                                longitude={p.long}
                                latitude={p.lati}
                            >
                                <LocationOnIcon
                                    className='icon'
                                    onClick={() => handleOnIconClick(p._id, p.long, p.lati)}
                                    style={{ fontSize: viewPort.zoom * 2, color: p.username === props.currentUser ? 'blue' : 'tomato' }}
                                />

                            </Marker>
                            {
                                p._id === placeId &&
                                (
                                    <Popup
                                        latitude={p.lati}
                                        longitude={p.long}
                                        closeOnClick={false}
                                        closeOnMove={false}
                                        anchor="left"
                                    >
                                        <div className="card">
                                            <label>Place</label>
                                            <h4 className="title">{p.title}</h4>
                                            <label>Review</label>
                                            <h4 className="descr">{p.desc}</h4>
                                            <label>Rating</label>

                                            <div className="stars">
                                                {Array(p.rating).fill(<StarOutlineIcon />)}
                                            </div>

                                            <div className="information">
                                                <span>Created By {p.username} at {p.createdAt}</span>
                                            </div>
                                        </div>
                                    </Popup>
                                )
                            }
                        </>
                    ))
                }
                {
                    placeInfo &&
                    (
                        <Popup
                            latitude={placeInfo.latitude}
                            longitude={placeInfo.longitude}
                            closeOnClick={false}
                            closeOnMove={false}
                            anchor="left"
                            onClose={() => setPlaceInfo(null)}
                        >
                            <div className="addNewPin">
                                <form onSubmit={handleFormSubmit} >
                                    <label htmlFor="">Title</label>
                                    <input type="text" className="title" placeholder='Enter Place Name' onChange={(e) => setTitle(e.target.value)} />

                                    <label htmlFor="">Description</label>
                                    <textarea type="text" className="desc" placeholder='Write a review for place' onChange={(e) => setDesc(e.target.value)} />

                                    <label htmlFor="">Rating</label>
                                    <select name="rating" id="" className='rating' onChange={(e) => setRating(e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>

                                    </select>

                                    <button type='submit'>Add Pin!</button>
                                </form>
                            </div>

                        </Popup>
                    )
                }
            </Map>
        </div >
    )
}

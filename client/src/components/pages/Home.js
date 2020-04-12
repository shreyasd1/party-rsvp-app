import React, {useContext,useEffect} from 'react'
import AuthContext from '../../context/authContext/authContext'
// import GuestsForm from '../guests/GuestsForm'
// import GuestCounter from '../guests/GuestCounter'
// import GuestFilter from '../guests/GuestFilter'
// import GuestSearch from '../guests/GuestSearch'
// import Guests from '../guests/Guests'
import Colleges from '../colleges/Colleges'
import CollegeForm from '../colleges/CollegeForm'

const Home = () => {
    const {getUser} = useContext(AuthContext)
    useEffect (()=>{
        getUser()
        //eslint-disable-next-line
    },[])
    return (
        <div className="app-container">
            <div className="main">
                {/* <div className="filter">
                    <GuestFilter />
                    <GuestSearch />
                </div> */}
            {/* <GuestsForm />
            <GuestCounter /> */}
            <CollegeForm />
            </div>
            {/* <Guests /> */}
            <Colleges />
        </div>
    )
}

export default Home
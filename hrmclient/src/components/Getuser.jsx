// import React, { useEffect, useState } from "react";
// import { Link,useParams } from "react-router-dom";
// import axios from 'axios';
// import './Getuser.css';

// function Getuser() {
//     const [data, setData] = useState([]);
//     const { id } = useParams(); 
//     const [token, setToken] = useState('');



//     useEffect(() => {
//         // Retrieve token from localStorage
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//             setToken(storedToken);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/getuser',{
//                     headers: {
                        
//                         'Authorization': `Bearer ${token}`,
//                       },
//                 });
//                 console.log('Response:', response);
//                 setData(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <>
//          <div className="ctn">
//         <div className="title">
//             <h1>Users</h1>
//         </div>
        
//             {data.length ? (
//                 data.map((user) => (
                   
//                     <div className="userctn" key={user._id} style={{border:"2px solid black" , display:"flex",flexDirection:"column",width:"300px",margin:"auto",gap:"5px",marginTop:"8px"}}>
//                         <div style={{ margin: "auto", borderBottom:"1px solid black",padding:"10px"}}>User-details</div>

//                     <div className="details" style={{margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center",gap:"5px",padding:"10px"}}>
//                         <div style={{padding:"5px"}}>name: {user.name} </div>
//                         <div style={{padding:"5px"}}>email : {user.email}</div>
//                         <div style={{padding:"5px"}}>ph.number: {user.phonenumber}</div>
//                         <div style={{padding:"5px"}}><Link to={`/viewuser/${user._id}`}><button>view user</button></Link></div>
        
//                     </div>
        
//                 </div>
//                 ))
//             ) : (
//                 <h1>Loading....</h1>
//             )}
//        </div>

//         </>
//     );
// }


// export default Getuser
import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import './Getuser.css';

function Getuser() {
    const [data, setData] = useState([]);
    const { id } = useParams(); 
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getuser', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token]);

    if (loading) {
        return <h1>Loading....</h1>;
    }

    if (error) {
        Swal.fire({
            icon: "error",
            text: error.response.data.message,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          }).then(()=>{navigate('/admin')})
        return <>
        <h1>Error: {error.response.data.message}</h1>
        
        </>
    }

    return (
        <div className="ctn">
            <div className="title">
                <h1>Users</h1>
            </div>
            {data.length ? (
                data.map((user) => (
                    <div className="userctn" key={user._id} style={{ border: "2px solid black", display: "flex", flexDirection: "column", width: "300px", margin: "auto", gap: "5px", marginTop: "8px" }}>
                        <div style={{ margin: "auto", borderBottom: "1px solid black", padding: "10px" }}>User-details</div>
                        <div className="details" style={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", padding: "10px" }}>
                            <div style={{ padding: "5px" }}>name: {user.name} </div>
                            <div style={{ padding: "5px" }}>email : {user.email}</div>
                            <div style={{ padding: "5px" }}>ph.number: {user.phonenumber}</div>
                            <div style={{ padding: "5px" }}><Link to={`/viewuser/${user._id}`}><button>view user</button></Link></div>
                        </div>
                    </div>
                ))
            ) : (
                <h1>No users found</h1>
            )}
        </div>
    );
}

export default Getuser;

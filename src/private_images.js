import React, { Component, Fragment } from 'react'
import './assests/css/App.css'

export default class image_private extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        if(!localStorage.getItem('token')){
            alert('kindly login first')
            window.location.href = '/login'
        }else{
            let token = JSON.parse(localStorage.getItem('token')) 
            const url = "https://image-hub-159.herokuapp.com/get_image_private";
            fetch(url,{
            headers:{
                "Authorization":`${token}`
            }
            })
            .then(res=>res.json())
            .then(data1=>{
            console.log(data1)
            this.setState({data:data1.data})
            })
            .catch(err=>console.log(err))
        }   

    }

    render() {
        let yahoo = this.state.data.map(element=>(
            <div key={element.id} className='img_con'>
                <div style={{marginLeft:'3em'}}>
                <h4>Title:- {element.title}</h4>
                </div>
                <center><div>
                <img src={element.img_url} alt='photorebaba' style={{width:'15em',height:'20em'}}/>
                </div></center>
                <div>
                    <h5 style={{textAlign:'center'}}>Uploaded_By:- {element.uploaded_by}</h5>
                    </div>
                </div>
        ))

        return (
            <Fragment>
                {/* <Nav1/> */}
                <center><h1>View Your Private Images</h1></center>
                <div style={{display:'flex',marginTop:'5em', flexWrap:'wrap', marginLeft:'5em'}}>
                    {this.state.data.length===0?<div className="loader">Loading...</div>:yahoo}
                </div>
            </Fragment>
        )
    }
}

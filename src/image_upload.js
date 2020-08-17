import React, { Component, Fragment } from 'react'
import './assests/css/App.css'
import Input1 from './components/input'


export default class image_upload extends Component {
    constructor(props){
        super(props)
        this.state={
            title:'',
            img_url:'',
            description:'',
            privacy_status:'',
            title1:'',
            description1:'',
            privacy_status1:'',
            file:undefined
        }
    }

    componentDidMount(){
        if(!localStorage.getItem('token')){
            alert('kindly login first')
            window.location.href = '/login'
        }
    }

    handlechange=(e)=>{
        e.preventDefault()
        if(e.target.name==='title'){
            this.setState({title:e.target.value})
        }
        if(e.target.name==='img_url'){
            this.setState({img_url:e.target.value})
        }
        if(e.target.name==='description'){
            this.setState({description:e.target.value})
        }
        if(e.target.name==='privacy_status'){
            this.setState({privacy_status:e.target.value})
        }
        if(e.target.name==='title1'){
            this.setState({title1:e.target.value})
        }
        if(e.target.name==='description1'){
            this.setState({description1:e.target.value})
        }
        if(e.target.name==='privacy_status1'){
            this.setState({privacy_status1:e.target.value})
        }
        if(e.target.name==='image'){
            // console.log(e.target.files[0])
            // console.log(typeof(e.target.files[0]))
            this.setState({file:e.target.files[0]})
        }

    }

    handlesubmit=(e)=>{
        e.preventDefault()
        let token = JSON.parse(localStorage.getItem('token'))
        if(this.state.privacy_status1==='private' || this.state.privacy_status1==='public'){
            let data={
                title:this.state.title1,
                img_url:this.state.img_url,
                description:this.state.description1,
                privacy_status:this.state.privacy_status1
            }
        // const proxyurl = "https://cors-anywhere.herokuapp.com/"
        const url = `https://image-hub-159.herokuapp.com/upload`
        // const url = "http://localhost:8080/upload"
        fetch(url, 
            {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
                "Authorization":`${token}`
              },
            body:JSON.stringify(data)
        }
        )
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            if(data.value==='success'){
                alert('file uploaded successfully')
            }
            else{
                alert(data.message)
            }
            })
        .catch(err=>console.log(err))
        // console.log(data)


        }
        else{
            alert('privacy status must be private of public')
        }
        
    }

    handlesubmit159=(e)=>{
        e.preventDefault()
        let token = JSON.parse(localStorage.getItem('token'))
        const formData = new FormData()
        if(this.state.privacy_status==='private' || this.state.privacy_status==='public'){
            formData.append("image", this.state.file)
            formData.append("title",this.state.title)
            formData.append("description",this.state.description)
            formData.append("privacy_status",this.state.privacy_status)
            // console.log(formData)
            // start
            // const proxyurl = "https://cors-anywhere.herokuapp.com/"
            const url = "https://image-hub-159.herokuapp.com/upload"
            // const url = "http://localhost:8080/upload"
            fetch(url, 
            {
            method:"POST",
            headers: {
                "Authorization":`${token}`
              },
            body:formData
            }
            )
            .then(res=>res.json())
            .then(data=>{
                if(data.value==='success'){
                    alert('file uploaded successfully')
                }
                else{
                    alert(data.message)
                }
                })
            .catch(err=>console.log(err))
            // end
            
            }
            else{
                alert('privacy status must be private of public')
            }
        
    }

    render() {
        return (
            <Fragment>
                <div style={{display:'flex', marginTop:'8em',justifyContent:'center'}}>
                    <div style={{marginLeft:'5em'}}>
                        <h1>Direct Link</h1><br/>                
                    <form onSubmit={this.handlesubmit}>            
                        <Input1 typevalue={'text'} placeholdervalue={'Image_url'} namevalue={'img_url'} classvalue={'email_register'} inputvalue={this.state.img_url} onchangevalue={this.handlechange}/><br/>
                        <Input1 typevalue={'text'} placeholdervalue={'Title'} namevalue={'title1'} classvalue={'name_register'} inputvalue={this.state.title1} onchangevalue={this.handlechange}/><br/>
                        <Input1 typevalue={'text'} placeholdervalue={'Description'} namevalue={'description1'} classvalue={'password_register'} inputvalue={this.state.description1} onchangevalue={this.handlechange}/><br/>
                        <Input1 typevalue={'text'} placeholdervalue={'Privacy Status'} namevalue={'privacy_status1'} classvalue={'password_register'} inputvalue={this.state.privacy_status1} onchangevalue={this.handlechange}/><br/>
                        <Input1 typevalue={'submit'} inputvalue={'Submit'} namevalue={'submit'} classvalue={'btn btn-outline-dark button_register'}/><br/>
                        </form>
                    </div>
                    <div style={{marginLeft:'5em'}}>
                    <h1>Upload Image</h1><br/>
                    <form onSubmit={this.handlesubmit159} >            
                        <Input1 typevalue={'file'} placeholdervalue={'image'} namevalue={'image'} classvalue={'email_register'} onchangevalue={this.handlechange}/><br/>
                        <Input1 typevalue={'text'} placeholdervalue={'Title'} namevalue={'title'} classvalue={'name_register'} inputvalue={this.state.title} onchangevalue={this.handlechange}/><br/>
                        <Input1 typevalue={'text'} placeholdervalue={'Description'} namevalue={'description'} classvalue={'password_register'} inputvalue={this.state.description} onchangevalue={this.handlechange}/><br/>
                        <Input1 typevalue={'text'} placeholdervalue={'Privacy Status'} namevalue={'privacy_status'} classvalue={'password_register'} inputvalue={this.state.privacy_status} onchangevalue={this.handlechange}/><br/>
                        <Input1 typevalue={'submit'} inputvalue={'Submit'} namevalue={'submit'} classvalue={'btn btn-outline-dark button_register'} /><br/>
                        </form>
                        </div>
                        </div>
                    
                                
            </Fragment>
        )
    }
}

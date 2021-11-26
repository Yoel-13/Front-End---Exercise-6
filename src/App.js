import './App.css';
import React,{useState,useEffect} from 'react'

function apiCall(url,res,rej){
  let datas = new XMLHttpRequest()
  datas.onreadystatechange = function (){
    if (datas.readyState === 4) {
      if (datas.status === 200) {
        res(datas.response)
      } else {
        rej()
      }
    }
  }
  datas.open('get',url)
  datas.send()
}

function App() {
  const [userInfo,setUserInfo] = useState([])
  useEffect(()=>{
    apiCall('https://reqres.in/api/users?page=2',res=>{
      const datas = JSON.parse(res)
      setUserInfo(datas.data)
    })
  },[])



  return (
    <div className="App">
      <header>
        <h1 style={{color:'white'}}>User Lists</h1>
      </header>
      <div className="container">
        {
          userInfo.map(item=>{
            return(
              <div key={item.id} className="userHolder">
                <img src={item.avatar} alt="avatar"/>
                <div style={{height:30,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                  <h3 style={{marginRight:10}}>{item.first_name}</h3>
                  <h3>{item.last_name}</h3>
                </div>
                <h5><cite>{item.email}</cite></h5>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;

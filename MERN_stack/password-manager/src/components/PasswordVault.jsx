// src/components/PasswordVault.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc
} from "firebase/firestore";
import CryptoJS from "crypto-js";
import zxcvbn from "zxcvbn";

export default function PasswordVault(){
  const [site,setSite]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [vault,setVault]=useState([]);
  const [loading,setLoading]=useState(true);
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || "dev_key_123";

  useEffect(()=>{
    const unsub = async ()=>{
      try{
        const user = auth.currentUser;
        if(!user){ setLoading(false); return; }
        const q = query(collection(db,"passwords"), where("userId","==", user.uid));
        const snap = await getDocs(q);
        const items = snap.docs.map(d=>({ id:d.id, ...d.data(), password: decryptPassword(d.data().password) }));
        setVault(items);
      }catch(e){ console.error(e) } finally { setLoading(false) }
    };
    unsub();
  },[]);

  const encryptPassword = (t)=> CryptoJS.AES.encrypt(t, SECRET_KEY).toString();
  const decryptPassword = (c)=> {
    try { const bytes = CryptoJS.AES.decrypt(c, SECRET_KEY); return bytes.toString(CryptoJS.enc.Utf8); }
    catch { return "—"; }
  };

  
  const handleAdd = async ()=>{
    if(!site||!username||!password) return alert("All fields required");
    const user = auth.currentUser; if(!user) return alert("Login first");
    const encrypted = encryptPassword(password);
    try{
      const docRef = await addDoc(collection(db,"passwords"), { site, username, password: encrypted, userId: user.uid });
      setVault(prev=>[...prev, { id:docRef.id, site, username, password }]);
      setSite(""); setUsername(""); setPassword("");
    }catch(e){ console.error(e) }
  };

  const handleDelete = async(id)=>{
    if(!confirm("Delete?")) return;
    await deleteDoc(doc(db,"passwords",id));
    setVault(prev=>prev.filter(x=>x.id!==id));
  };

  const handleCopy = (text)=>{
    navigator.clipboard.writeText(text).then(()=> alert("Copied to clipboard"));
  };

  const genPassword = (len=14)=>{
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let out="";
    for(let i=0;i<len;i++) out += chars[Math.floor(Math.random()*chars.length)];
    setPassword(out);
  };

  const getStrength = (pwd)=> {
    if(!pwd) return {label:"", color:"#999"};
    const score = zxcvbn(pwd).score;
    const map = ["Very weak","Weak","Fair","Good","Strong"];
    return { label: map[score], color: ["#ff3b30","#ff7a00","#ffbf00","#2ecc71","#16a34a"][score] };
  };

  if(loading) return <div className="vault">Loading vault...</div>;

  return (
    <div className="vault">
      <h2>Your Vault</h2>

      <div className="controls">
        <div className="input-inline" style={{minWidth:220}}>
          <input placeholder="Site / App" value={site} onChange={e=>setSite(e.target.value)} className="input-inline" />
        </div>

        <div className="input-inline">
          <input placeholder="Username / Email" value={username} onChange={e=>setUsername(e.target.value)} className="input-inline" />
        </div>

        <div className="input-inline">
          <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn secondary" onClick={()=>genPassword(14)} title="Generate">Gen</button>
        </div>

        <div style={{display:"flex",gap:8, alignItems:"center"}}>
          <div className="strength" style={{background:getStrength(password).color, color:"#001"}}>{getStrength(password).label || " "}</div>
          <button className="btn" onClick={handleAdd}>Save</button>
        </div>
      </div>

      <div className="vault-list">
        {vault.length===0 ? <div className="small">No saved passwords</div> :
          vault.map(item=>(
            <div className="vault-item" key={item.id}>
              <div className="vault-left">
                <div>
                  <div className="site">{item.site}</div>
                  <div className="user">{item.username}</div>
                </div>
              </div>

              <div style={{display:"flex", gap:12, alignItems:"center"}}>
                <div className="pwd-field">
                  <input readOnly value={item.password} />
                </div>

                <div className="actions">
                  <button className="icon-btn" onClick={()=>handleCopy(item.password)} title="Copy">Copy</button>
                  <button className="icon-btn" onClick={()=>{ setSite(item.site); setUsername(item.username); setPassword(item.password); window.scrollTo({top:0, behavior:'smooth'}) }}>Edit</button>
                  <button className="icon-btn" onClick={()=>handleDelete(item.id)} title="Delete" style={{color:"#ff9b9b"}}>Del</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

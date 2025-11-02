
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { priceBedsBaths } from '../lib/format';

export default function HomePage() {
  const [qtext, setQ] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [rows, setRows] = useState<any[]>([]);

  const search = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/properties`, { params: { qtext, city, state } });
    setRows(data);
  };

  useEffect(() => { search(); }, []);

  return (
    <div style={{ display:'grid', gap:16 }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
        <input placeholder="Search title/description" value={qtext} onChange={e=>setQ(e.target.value)} style={{ padding:8, border:'1px solid #ddd', borderRadius:8 }} />
        <input placeholder="City" value={city} onChange={e=>setCity(e.target.value)} style={{ padding:8, border:'1px solid #ddd', borderRadius:8 }} />
        <input placeholder="State" value={state} onChange={e=>setState(e.target.value)} style={{ padding:8, border:'1px solid #ddd', borderRadius:8 }} />
        <button onClick={search} style={{ padding:8, borderRadius:8, background:'#111', color:'#fff' }}>Search</button>
      </div>

      <ul style={{ listStyle:'none', padding:0, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
        {rows.map((p:any) => (
          <li key={p.id} style={{ background:'#fff', border:'1px solid #eee', borderRadius:16, padding:16 }}>
            <div style={{ fontSize:18, fontWeight:600 }}>{p.title}</div>
            <div style={{ fontSize:13, color:'#666' }}>{p.city}, {p.state}</div>
            <div style={{ marginTop:4 }}>{priceBedsBaths(p.rent, p.bedrooms, p.bathrooms)}</div>
          </li>
        ))}
      </ul>

      <a href="/owner/properties" style={{ color:'#1262ff' }}>Owner → Properties</a>
    </div>
  );
}

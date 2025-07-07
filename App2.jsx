import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Polygon, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function DrawTool({ mode, onCreate }) {
  const [points, setPoints] = useState([]);

  useMapEvents({
    click(e) {
      if (!mode) return;

      if (mode === 'point') {
        onCreate([[e.latlng.lat, e.latlng.lng]]);
      } else {
        setPoints(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
      }
    },
    dblclick() {
      if (mode === 'line' && points.length > 1) {
        onCreate(points);
        setPoints([]);
      }
      if (mode === 'polygon' && points.length > 2) {
        onCreate(points);
        setPoints([]);
      }
    }
  });

  return null;
}

function formatCoords(coords) {
  return coords.map(c => c.map(n => n.toFixed(5))).join(' | ');
}

export default function App() {
  const [mode, setMode] = useState(null);
  const [elements, setElements] = useState([]);
  const [user] = useState({ username: 'usuario' });

  function handleCreate(points) {
    const newEl = {
      id: elements.length + 1,
      usuario: user.username,
      fecha: new Date().toISOString().split('T')[0],
      tipo: mode,
      coordenadas: points,
      num1: 0,
      num2: 0,
      txt1: '',
      txt2: ''
    };
    setElements([...elements, newEl]);
    setMode(null);
  }

  function updateField(id, field, value) {
    setElements(elements.map(el => (el.id === id ? { ...el, [field]: value } : el)));
  }

  return (
    <div>
      <h3>Visor SIG Fase 1 - Usuario: {user.username}</h3>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setMode('point')} style={{ backgroundColor: mode === 'point' ? 'orange' : '' }}>
          Punto
        </button>
        <button onClick={() => setMode('line')} style={{ backgroundColor: mode === 'line' ? 'orange' : '' }}>
          Línea
        </button>
        <button onClick={() => setMode('polygon')} style={{ backgroundColor: mode === 'polygon' ? 'orange' : '' }}>
          Polígono
        </button>
        <button onClick={() => setMode(null)}>Cancelar</button>
      </div>
      <MapContainer center={[-25.2637, -57.5759]} zoom={13} style={{ height: '60vh' }} doubleClickZoom={false}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <DrawTool mode={mode} onCreate={handleCreate} />
        {elements.map(el => {
          if (el.tipo === 'point') return <Marker key={el.id} position={el.coordenadas[0]} />;
          if (el.tipo === 'line') return <Polyline key={el.id} positions={el.coordenadas} />;
          if (el.tipo === 'polygon') return <Polygon key={el.id} positions={el.coordenadas} />;
          return null;
        })}
      </MapContainer>
      <table border='1' style={{ marginTop: 10, width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Coordenadas</th>
            <th>Num1</th>
            <th>Num2</th>
            <th>Texto1</th>
            <th>Texto2</th>
          </tr>
        </thead>
        <tbody>
          {elements.map(el => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.usuario}</td>
              <td>{el.fecha}</td>
              <td>{el.tipo}</td>
              <td>{formatCoords(el.coordenadas)}</td>
              <td>
                <input value={el.num1} onChange={e => updateField(el.id, 'num1', e.target.value)} />
              </td>
              <td>
                <input value={el.num2} onChange={e => updateField(el.id, 'num2', e.target.value)} />
              </td>
              <td>
                <input value={el.txt1} onChange={e => updateField(el.id, 'txt1', e.target.value)} />
              </td>
              <td>
                <input value={el.txt2} onChange={e => updateField(el.id, 'txt2', e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

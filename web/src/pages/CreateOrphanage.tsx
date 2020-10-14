import React, { ChangeEvent, FormEvent, useState } from "react";
import {  Map, Marker, TileLayer } from 'react-leaflet';
import {  FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/create-orphanage.css'; 


export default function CreateOrphanage() {
  const history = useHistory();

  const [ position, setPosition ] = useState({ latitude: 0, longitude: 0, });
  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ opening_hours, setOpeningHours ] = useState('');
  const [ instrucions, setInstrucions ] = useState('');
  const [ open_on_weekends, setOpenOnWeekEnds ] = useState(true);
  const [ images, setImages ] = useState<File[]>([]);
  const [ previewImages, setPreviewImages ] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>){
    const files = event.target.files;
    if (!files){
      return;
    }

    const selectedImages = Array.from(files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map( image => (
      URL.createObjectURL(image)
    ))

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const {latitude, longitude } = position;

    const data = new FormData();

    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('name', name);
    data.append('about', about);
    data.append('instrucions', instrucions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach( image => data.append('images', image));
    
    const response = await api.post('orphanages', data);

    if (response.status === 201){
      alert('Cadastro realizado com sucesso!')
      history.push('/app');
    }
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-16.4256812,-39.0814827]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                position.latitude !== 0  && (
                  <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.latitude, position.longitude]} 
                />
                )
              }

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={( { target } ) => setName(target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about} 
                onChange={( { target } ) => setAbout(target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map( image => (
                    <label className="new-image image" key={image}>
                      <img src={image} alt={name}/>
                    </label>
                  ) )
                }
                <label htmlFor="images[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input 
                multiple 
                onChange={handleSelectedImages} 
                type="file" 
                id="images[]"
              />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instrucions} 
                onChange={( { target } ) => setInstrucions(target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={( { target } ) => setOpeningHours(target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekEnds(true)}
                >
                  Sim
                </button>

                <button 
                  type="button"
                  className={open_on_weekends ? '' : 'active'}
                  onClick={() => setOpenOnWeekEnds(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

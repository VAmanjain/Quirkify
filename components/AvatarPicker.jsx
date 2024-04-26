'use client'

import  { useState } from 'react';
import '@./styles/globals.css'
import * as Ariakit from "@ariakit/react";


export default function Example({ onSelect }) {
  const dialog = Ariakit.useDialogStore();
  const [selectGender, setSelectGender] = useState("");


  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const defaultSelectedId = "default-selected-tab";

  const maleAvatars = [
   
    'Assests/male3.jpeg',
    // Add more avatar options here
  ];
  const femaleAvatars = [
    'Assests/male1.jpeg',
   
    // Add more avatar options here
  ];

const handlegenderImage = ({gender})=>{
  setSelectGender(gender);
  console.log(selectGender);
}
  
  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    onSelect(avatar); // Pass selected avatar to parent component
  };


  return (
    <>
      <Ariakit.Button onClick={dialog.show} className="button">
        change
      </Ariakit.Button>
      <Ariakit.Dialog
        store={dialog}
        backdrop={<div className="backdrop" />}
        className="dialog"
      >
        <Ariakit.DialogHeading className="heading">
          Choose your Avatar
        </Ariakit.DialogHeading>
        {/* <Ariakit.TabProvider defaultSelectedId={defaultSelectedId}>
        <Ariakit.TabList className="tab-list" aria-label="Groceries">
          <Ariakit.Tab className="tab">Fruits</Ariakit.Tab>
          <Ariakit.Tab className="tab" id={defaultSelectedId}>
            Vegetables
          </Ariakit.Tab>
          <Ariakit.Tab className="tab">Meat</Ariakit.Tab>
        </Ariakit.TabList>
        <div className="panels">
          <Ariakit.TabPanel>
            <div className="avatar-picker">
        {avatars.map((avatar, index) => (
          <Ariakit.DialogDismiss >
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={selectedAvatar === avatar ? 'selected' : ''}
            onClick={() => {handleSelectAvatar(avatar)}}
          />
          </Ariakit.DialogDismiss>
        ))}
      </div>
          </Ariakit.TabPanel>
          <Ariakit.TabPanel tabId={defaultSelectedId}>
            <ul>
              <li>🥕 Carrot</li>
              <li>🧅 Onion</li>
              <li>🥔 Potato</li>
            </ul>
          </Ariakit.TabPanel>
          <Ariakit.TabPanel>
            <ul>
              <li>🥩 Beef</li>
              <li>🍗 Chicken</li>
              <li>🥓 Pork</li>
            </ul>
          </Ariakit.TabPanel>
        </div>
      </Ariakit.TabProvider> */}
        <div className="avatar-picker">
          <div className='flex justify-around '>

<button className='button' onClick={()=>{
  setSelectGender("male");

}} >Male</button>
<button className='button' onClick={()=>{
  setSelectGender("Female");
  
}}>Female</button>
          </div>
        {selectGender==="male"?
        <>
        
        {maleAvatars.map((avatar, index) => (
          <Ariakit.DialogDismiss 
          key={index}
          
          >
          <img
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={selectedAvatar === avatar ? 'selected' : ''}
            onClick={() => {handleSelectAvatar(avatar)}}
          />
          </Ariakit.DialogDismiss>
        ))}
        </>
        :<>
        {femaleAvatars.map((avatar, index) => (
          <Ariakit.DialogDismiss
          key={index}
          >
          <img
            
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={selectedAvatar === avatar ? 'selected' : ''}
            onClick={() => {handleSelectAvatar(avatar)}}
          />
          </Ariakit.DialogDismiss>
        ))}
        </>}
      </div>
        <div>
          <Ariakit.DialogDismiss className="button">OK</Ariakit.DialogDismiss>
        </div>
      </Ariakit.Dialog>
    </>
  );
}
